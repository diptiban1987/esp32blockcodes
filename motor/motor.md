BOTH FORWARD
-------------
#define L298N_IN1 15
#define L298N_IN2 16
#define L298N_IN3 19
#define L298N_IN4 17

void setup() {
  Serial.begin(115200);

  pinMode(L298N_IN1, OUTPUT);
  pinMode(L298N_IN2, OUTPUT);
  pinMode(L298N_IN3, OUTPUT);
  pinMode(L298N_IN4, OUTPUT);

  digitalWrite(L298N_IN1, LOW);
  digitalWrite(L298N_IN2, LOW);
  digitalWrite(L298N_IN3, LOW);
  digitalWrite(L298N_IN4, LOW);
}

void loop() {

  // BOTH FORWARD
  Serial.println("BOTH FORWARD");

  digitalWrite(L298N_IN1, HIGH);
  digitalWrite(L298N_IN2, LOW);

  digitalWrite(L298N_IN3, HIGH);
  digitalWrite(L298N_IN4, LOW);

  delay(3000);

  // STOP
  Serial.println("STOP");

  digitalWrite(L298N_IN1, LOW);
  digitalWrite(L298N_IN2, LOW);
  digitalWrite(L298N_IN3, LOW);
  digitalWrite(L298N_IN4, LOW);

  delay(5000);
}
