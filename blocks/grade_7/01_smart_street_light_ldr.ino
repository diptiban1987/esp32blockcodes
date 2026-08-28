void setup() {
  Serial.begin(115200);
  pinMode(13, OUTPUT);
}
void loop() {
  int lightVal = analogRead(34);
  Serial.print("LDR: "); Serial.println(lightVal);
  if (lightVal < 1500) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
  delay(200);
}
