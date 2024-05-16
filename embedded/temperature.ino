#include <OneWire.h>
#include <DallasTemperature.h>

// DS18B20 센서를 연결한 디지털 핀 번호 설정
#define ONE_WIRE_BUS 2 // 아두이노의 디지털 핀 2에 연결된 경우

// OneWire 객체 생성
OneWire oneWire(ONE_WIRE_BUS);

// DallasTemperature 객체 생성
DallasTemperature sensors(&oneWire);

void setup() {
  // 시리얼 통신 시작
  Serial.begin(9600);

  // DS18B20 센서 시작
  sensors.begin();
}

void loop() {
  // DS18B20 센서에서 온도 값을 읽기
  sensors.requestTemperatures();
  
  // DS18B20 센서에서 읽은 온도 값을 변수에 저장
  float temperatureC = sensors.getTempCByIndex(0);

  // 온도 값을 시리얼 모니터에 출력
  Serial.print("Temperature: ");
  Serial.print(temperatureC);
  Serial.println(" °C");

  // 잠시 대기
  delay(1000);
}
