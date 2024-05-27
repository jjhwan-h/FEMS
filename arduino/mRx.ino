#include <SPI.h> 
#include <nRF24L01.h>
#include <RF24.h>
#include <ArduinoJson.h>

#define PIPE_CNT 3


RF24 radio(7, 8);     // SPI통신을 위한 (CE, CSN) 핀 선언
const uint64_t address[PIPE_CNT]= {0xF1F1F0F0E0LL,0xF1F1F0F0E1LL}; // 송신기와 수신기가 동일한 값으로 주소 설정함(5자리,최대 6)
int temp[PIPE_CNT]={0};
int humi[PIPE_CNT]={0};
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

    String splitStr[3];
    String temp[3]; // 최대 3개로 분할한다고 가정
    String humi[3];
    
    int index = 0;
    // strtok 함수를 사용하여 쉼표를 기준으로 문자열을 분할
    char* token = strtok(text, ",");
    while (token != NULL && index < 10) {
      // 분할된 토큰을 String 객체로 변환하여 배열에 저장
      splitStr[index] = String(token);
      index++;
      token = strtok(NULL, ",");
    }
    temp[splitStr[2].toInt()]=splitStr[0];
    humi[splitStr[2].toInt()]=splitStr[1];
    
    for (int i = 0; i < PIPE_CNT; i++) {
    Serial.print(temp[i]);
    Serial.println(humi[i]);
  }
    
    delay(5000);
  }
}