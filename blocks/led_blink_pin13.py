# ── LED Blinking Example (Pin 13 - 1 Second Interval) ──
# Language: MicroPython
# Board: ESP32

import time
from machine import Pin

led = Pin(13, Pin.OUT)

while True:
    led.value(1)
    time.sleep(1)
    led.value(0)
    time.sleep(1)
