void setup() {
  Serial.begin(115200);
  pinMode(19, INPUT);
  pinMode(13, OUTPUT);
}
void loop() {
  if (digitalRead(19) == HIGH) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
  delay(100);
}
