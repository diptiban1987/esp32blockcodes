// Upload MicroPython code to Raspberry Pi Pico via Web Serial Raw REPL.
//
// The Raspberry Pi Pico running MicroPython uses the IDENTICAL Raw REPL
// protocol as the ESP32 — Ctrl+C, Ctrl+A, send code, Ctrl+D.
// After executing the code, this uploader also optionally saves it as
// main.py so it auto-runs on every boot (no USB needed after that).
//
// Pico USB identifiers: VID=0x2E8A (Raspberry Pi), PID=0x0005 (Pico MicroPython)

import { getActivePort, getConnectionState } from '../ui/ConnectModal';
import { pauseSerialMonitor } from '../ui/SerialMonitor';

const BAUD_RATE = 115200;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const enc = new TextEncoder();
const dec = new TextDecoder();

/**
 * Upload MicroPython code to Raspberry Pi Pico via Web Serial Raw REPL.
 *
 * Uses the same Ctrl+A / Ctrl+D raw REPL protocol as ESP32 MicroPython.
 * After successful execution, optionally saves the code to main.py on the
 * Pico's flash filesystem so it survives reboots.
 *
 * @param {string}   code       MicroPython source code to upload
 * @param {Function} onStatus   Status callback: (status: string) => void
 * @param {boolean}  saveToFlash  If true, writes code to main.py after running
 */
export async function uploadToPico(code, onStatus = () => {}, saveToFlash = true) {
  if (!('serial' in navigator)) {
    const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
    if (!isSecure) {
      throw new Error(
        'Upload requires a secure connection (HTTPS). ' +
        'Please access this app over HTTPS, or run it locally.'
      );
    }
    throw new Error(
      'Web Serial API not supported in this browser. ' +
      'Please use Chrome or Edge (version 89+).'
    );
  }

  let port = null;
  let ownedPort = false;
  let writer = null;
  let reader = null;
  let resumeMonitor = null;

  const releaseLocks = async () => {
    if (reader) {
      try { await reader.cancel(); } catch (_) {}
      try { reader.releaseLock(); } catch (_) {}
      reader = null;
    }
    if (writer) {
      try { writer.releaseLock(); } catch (_) {}
      writer = null;
    }
  };

  try {
    // ── 0. Pause serial monitor (releases its reader lock) ──
    resumeMonitor = await pauseSerialMonitor();

    // ── 1. Acquire port ──────────────────────────────────
    const existingPort = getActivePort();
    if (existingPort && getConnectionState() === 'connected') {
      port = existingPort;
      ownedPort = false;
      onStatus('connecting');

      if (!port.readable) {
        try { await port.close(); } catch (_) {}
        await delay(300);
        await port.open({ baudRate: BAUD_RATE });
      }
      await delay(100);
    } else {
      onStatus('waiting_port');
      port = await navigator.serial.requestPort();
      ownedPort = true;
      onStatus('connecting');
      await port.open({ baudRate: BAUD_RATE });
      await delay(300);
    }

    // ── 2. Acquire reader/writer ──────────────────────────
    writer = port.writable.getWriter();
    reader = port.readable.getReader();

    const send = (text) => writer.write(enc.encode(text));

    // Read with timeout — collects data until deadline
    const readFor = async (timeoutMs) => {
      let result = '';
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        const remaining = Math.max(10, deadline - Date.now());
        const timer = new Promise(r => setTimeout(() => r('TIMEOUT'), remaining));
        const readP = reader.read();
        const winner = await Promise.race([readP, timer]);
        if (winner === 'TIMEOUT') break;
        const { value, done } = winner;
        if (done) break;
        if (value) result += dec.decode(value);
      }
      return result;
    };

    // ── 3. Interrupt any running program ─────────────────
    onStatus('interrupting');
    await send('\x03');   // Ctrl+C
    await delay(200);
    await send('\x03');   // Ctrl+C again
    await delay(300);
    await readFor(400);   // drain output

    // ── 4. Enter Raw REPL ─────────────────────────────────
    onStatus('entering_repl');
    await send('\x01');   // Ctrl+A = enter raw REPL
    await delay(300);
    let greeting = await readFor(600);

    if (!greeting.includes('raw REPL')) {
      // Soft-reset and retry
      await send('\x04'); // Ctrl+D = soft reset
      await delay(1500);
      await send('\x03'); // Ctrl+C to stop boot code
      await delay(200);
      await send('\x01'); // Ctrl+A
      await delay(300);
      greeting = await readFor(600);
    }

    if (!greeting.includes('raw REPL')) {
      throw new Error(
        'Could not enter MicroPython Raw REPL on Pico.\n' +
        'Make sure MicroPython firmware is installed on your Pico.\n' +
        'Download it from: https://micropython.org/download/rp2-pico/'
      );
    }

    // ── 5. Send user code ─────────────────────────────────
    onStatus('uploading');

    const CHUNK_SIZE = 256;
    for (let i = 0; i < code.length; i += CHUNK_SIZE) {
      await send(code.slice(i, i + CHUNK_SIZE));
      await delay(20);
    }

    await delay(100);
    await send('\x04'); // Ctrl+D = compile & execute

    // ── 6. Read response ──────────────────────────────────
    onStatus('reading_output');
    const response = await readFor(2500);

    let stdout = '';
    let stderr = '';
    const match = response.match(/OK([\s\S]*?)\x04([\s\S]*?)\x04/);
    if (match) {
      stdout = match[1].trim();
      stderr = match[2].trim();
    } else {
      if (response.includes('OK')) {
        stdout = response.replace('OK', '').trim();
      } else {
        stdout = response.trim();
      }
    }

    if (stderr.length > 0) {
      await send('\x02'); // Ctrl+B = exit raw REPL on error
      await delay(200);
    }

    // ── 7. Optionally save to main.py for persistence ─────
    if (saveToFlash && stderr.length === 0) {
      onStatus('saving');
      // Re-enter raw REPL to write main.py
      await send('\x01'); // Ctrl+A
      await delay(300);
      const replCheck = await readFor(500);
      if (replCheck.includes('raw REPL')) {
        // Escape the code string for embedding in Python string literal
        const escaped = code
          .replace(/\\/g, '\\\\')
          .replace(/"""/g, '\\"\\"\\"')
          .replace(/\r/g, '');
        const saveCmd = `with open('main.py', 'w') as _f:\n _f.write("""${escaped}""")\n`;
        const SAVE_CHUNK = 200;
        for (let i = 0; i < saveCmd.length; i += SAVE_CHUNK) {
          await send(saveCmd.slice(i, i + SAVE_CHUNK));
          await delay(25);
        }
        await delay(100);
        await send('\x04'); // execute
        await readFor(1500);
        await send('\x02'); // exit raw REPL
        await delay(200);
      }
    }

    // ── 8. Release locks & resume monitor ─────────────────
    await releaseLocks();
    await delay(400);
    if (resumeMonitor) { resumeMonitor(); resumeMonitor = null; }

    if (stderr.length > 0) {
      return { success: false, output: stderr };
    }
    return {
      success: true,
      output: stdout ||
        (saveToFlash
          ? 'Code uploaded to Pico and saved as main.py (runs on every boot)!'
          : 'Code uploaded and running on Raspberry Pi Pico!'),
    };

  } catch (err) {
    await releaseLocks();
    if (ownedPort && port) {
      try { await port.close(); } catch (_) {}
    }
    if (resumeMonitor) {
      try { resumeMonitor(); } catch (_) {}
    }
    throw err;
  }
}
