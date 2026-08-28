void setup() {
  pinMode(4, INPUT_PULLUP);
  pinMode(13, OUTPUT);
}
void loop() {
  if (digitalRead(4) == LOW) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}
