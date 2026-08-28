void setup() {
  pinMode(26, OUTPUT); pinMode(27, OUTPUT);
  pinMode(14, OUTPUT); pinMode(12, OUTPUT);
}
void loop() {
  digitalWrite(26, HIGH); digitalWrite(27, LOW);
  digitalWrite(14, HIGH); digitalWrite(12, LOW);
  delay(2000);
  digitalWrite(26, LOW); digitalWrite(27, LOW);
  digitalWrite(14, LOW); digitalWrite(12, LOW);
  delay(1000);
}
