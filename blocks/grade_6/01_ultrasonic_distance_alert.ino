void setup() {
  Serial.begin(115200);
  pinMode(14, OUTPUT);
  pinMode(27, INPUT);
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(14, LOW); delayMicroseconds(2);
  digitalWrite(14, HIGH); delayMicroseconds(10); digitalWrite(14, LOW);
  long dist = pulseIn(27, HIGH) / 58;
  Serial.println(dist);
  if (dist < 20) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
  delay(100);
}
