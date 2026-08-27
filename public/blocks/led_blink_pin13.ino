// ── LED Blinking Example (Pin 13 - 1 Second Interval) ──
// Board: ESP32

void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}
