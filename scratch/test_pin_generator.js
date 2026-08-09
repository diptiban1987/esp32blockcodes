// Test script to verify MicroPython pin generation logic against user test cases
import { buildESP32Code } from "../src/upload/codeBuilder.js";

console.log("=== Testing MicroPython Pin Generator Logic ===");

// Case 1 — One pin + delay
const rawCase1 = `
from machine import Pin
import time
gpio25 = Pin(25, Pin.OUT)

gpio25.value(1)
time.sleep(3)
gpio25.value(0)
`;

console.log("\n--- Case 1 Output ---");
const out1 = buildESP32Code(rawCase1);
console.log(out1);

// Case 2 — Same pin multiple times
const rawCase2 = `
from machine import Pin
gpio25 = Pin(25, Pin.OUT)

gpio25.value(1)
gpio25.value(0)
gpio25.value(1)
`;

console.log("\n--- Case 2 Output ---");
const out2 = buildESP32Code(rawCase2);
console.log(out2);

// Case 3 — Multiple pins
const rawCase3 = `
from machine import Pin
gpio25 = Pin(25, Pin.OUT)
gpio26 = Pin(26, Pin.OUT)

gpio25.value(1)
gpio26.value(0)
`;

console.log("\n--- Case 3 Output ---");
const out3 = buildESP32Code(rawCase3);
console.log(out3);

console.log("\n=== Test Finished ===");
