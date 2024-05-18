int sensorPin = A0;  // 습도 센서 신호 핀 (아날로그 핀)
int sensorValue = 0; // 센서 값

void setup() {
  Serial.begin(9600); // 시리얼 통신 시작
}

void loop() {
  sensorValue = analogRead(sensorPin); // 아날로그 핀에서 센서 값 읽기
  // 습도 값 출력
  Serial.print("습도: ");
  Serial.println(sensorValue);

  // 센서 값은 0에서 1023까지의 범위를 가짐
  // 더 높은 값은 더 많은 수분을 의미하고 더 낮은 값은 더 적은 수분을 의미함
  if(sensorValue < 300) {
    Serial.println("상태: 매우 건조");
  } else if(sensorValue >= 300 && sensorValue < 700) {
    Serial.println("상태: 적당한 습기");
  } else {
    Serial.println("상태: 매우 습함");
  }

  delay(1000); // 1초에 한 번씩
}
