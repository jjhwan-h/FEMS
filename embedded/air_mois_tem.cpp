#include "DHT.h"


#define DHTPIN 2      
#define DHTTYPE DHT22 

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // 센서에서 데이터 읽기
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // 읽은 데이터가 유효한지 확인
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("센서로부터 데이터를 읽을 수 없습니다!");
    return;
  }

  // 온도와 습도 값을 시리얼 모니터에 출력
  Serial.print("습도: ");
  Serial.print(humidity);
  Serial.print(" %\t");
  Serial.print("온도: ");
  Serial.print(temperature);
  Serial.println(" °C");

  delay(2000); // 2초마다 데이터 읽기
}
