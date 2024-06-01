#include <ArduinoJson.h>

#include <SPI.h> 
#include <nRF24L01.h>
#include <RF24.h>

#define raspiNUM 1 //1, 7, 13, 19
#define PIPE_CNT 6

RF24 radio(7, 8);     // SPI통신을 위한 (CE, CSN) 핀 선언
const uint64_t address[PIPE_CNT]= {0xF1F1F0F0E0LL,0xF1F1F0F0E1LL,0xF1F1F0F0E2LL}; // 송신기와 수신기가 동일한 값으로 주소 설정함(5자리,최대 6)
const int extinguisher[PIPE_CNT] ={22,23,24,25,26,27};
void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.setChannel(0x72);
  for(int i=0;i<PIPE_CNT;i++){
    radio.openReadingPipe(i, address[i]);// 데이터를 받을 송신기 주소를 설정  
  }
  radio.setPALevel(RF24_PA_MIN); // 송신거리에 따른, 전원공급 파워레벨 설정
//(최소) RF24_PA_MIN / RF24_PA_LOW / RF24_PA_HIGH / RF24_PA_MAX (최대) 설정가능
//송신이 약하다고 판단될 경우 nRF24모듈의 GND와 3.3V 단자에 전해콘덴서(10uF이상:+를3.3V연결)사용권장
  radio.startListening();   // 모듈을 수신기(상태)로 설정
}
void loop() {
  if (radio.available()) {
    char text[32] = "";   // 데이터를 수신 받을 변수 설정
    radio.read(&text, sizeof(text)); // 수신되는 데이터 길이만큼 읽어 저장
    
    String splitStr[PIPE_CNT];
    String temp[PIPE_CNT]; // 최대 3개로 분할한다고 가정
    String humi[PIPE_CNT];
    String num[PIPE_CNT];
    
    int index = 0;
    // strtok 함수를 사용하여 쉼표를 기준으로 문자열을 분할
    char* token = strtok(text, ",");
    while (token != NULL && index < PIPE_CNT) {
      // 분할된 토큰을 String 객체로 변환하여 배열에 저장
      splitStr[index] = String(token);
      index++;
      token = strtok(NULL, ",");
    }
    temp[splitStr[2].toInt()]=splitStr[0]; //temp
    humi[splitStr[2].toInt()]=splitStr[1]; //humi
    num[splitStr[2].toInt()]=extinguisher[splitStr[2].toInt()]; //지역별 소화기+raspiNUM
      Serial.print("s");
      Serial.print(temp[splitStr[2].toInt()]+",");
      Serial.print(humi[splitStr[2].toInt()]+",");
      Serial.println(num[splitStr[2].toInt()]);
//    StaticJsonDocument<200> json;
//    String parsedJsonToString;
//    json["humidity"]=humi[splitStr[2].toInt()];
//    json["temperature"]=temp[splitStr[2].toInt()];
//    json["num"]=num[splitStr[2].toInt()];
//    serializeJson(json,parsedJsonToString);
//    
    delay(5000);
  }
}