void setup() {
  Serial.begin(115200);
  pinMode(23, OUTPUT);
}
void loop() {
  int soil = analogRead(32);
  Serial.println(soil);
  if (soil > 2500) {
    digitalWrite(23, HIGH);
  } else {
    digitalWrite(23, LOW);
  }
  delay(500);
}
