#include <OneWire.h>
#include <DallasTemperature.h>

// 2번 핀에 연결
#define ONE_WIRE_BUS 2

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(9600);
  sensors.begin();
}

void loop() {
  // 센서에서 온도 값을 읽어옴
  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);

  // 온도 값 출력
  Serial.print("온도(C): ");
  Serial.println(temperatureC);

  delay(1000); // 1초에 한 번씩 측정
}
