#include <SPI.h>
#include <RF24.h>
#include<nRF24L01.h>
#include <DHT.h>


#define DHTPIN 2      
#define DHTTYPE DHT22 

DHT dht(DHTPIN, DHTTYPE);

RF24 radio(7, 8); // SPI통신을 위한 (CE, CSN) 핀 선언
const uint64_t address= 0xF1F1F0F0E0LL; // 송신기와 수신기가 동일한 값으로 주소 설정함(5자리)
void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.setChannel(0x72);
  radio.openWritingPipe(address); // 데이터를 보낼 수신 주소를 설정
  radio.setPALevel(RF24_PA_MIN); // 송신거리에 따른, 전원공급 파워레벨 설정
//(최소) RF24_PA_MIN / RF24_PA_LOW / RF24_PA_HIGH / RF24_PA_MAX (최대) 설정가능
//송신이 약하다고 판단될 경우 nRF24모듈의 GND와 3.3V 단자에 전해콘덴서(10uF이상:+를3.3V연결)사용권장
  radio.powerUp();
  radio.stopListening();
  dht.begin();
}
void loop() {
  char send[32];
  String temp = String(dht.readTemperature(),2);
  String humi= String(dht.readHumidity(),2);
  
  String text=temp+","+humi;
  Serial.println(text);

  text.toCharArray(send,sizeof(send));
  
  bool success = radio.write(&send, sizeof(send));
  
  if(success){
    Serial.println("Data sent successfully");
  }
  else{
    Serial.println("Failed to send Data");
  }
  
  delay(5000);
}#include <SPI.h>
#include <RF24.h>
#include<nRF24L01.h>
#include <DHT.h>


#define DHTPIN 2      
#define DHTTYPE DHT22 

DHT dht(DHTPIN, DHTTYPE);

RF24 radio(7, 8); // SPI통신을 위한 (CE, CSN) 핀 선언
const uint64_t address= 0xF1F1F0F0E0LL; // 송신기와 수신기가 동일한 값으로 주소 설정함(5자리)
void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.setChannel(0x72);
  radio.openWritingPipe(address); // 데이터를 보낼 수신 주소를 설정
  radio.setPALevel(RF24_PA_MIN); // 송신거리에 따른, 전원공급 파워레벨 설정
//(최소) RF24_PA_MIN / RF24_PA_LOW / RF24_PA_HIGH / RF24_PA_MAX (최대) 설정가능
//송신이 약하다고 판단될 경우 nRF24모듈의 GND와 3.3V 단자에 전해콘덴서(10uF이상:+를3.3V연결)사용권장
  radio.powerUp();
  radio.stopListening();
  dht.begin();
}
void loop() {
  char send[32];
  String temp = String(dht.readTemperature(),2);
  String humi= String(dht.readHumidity(),2);
  
  String text=temp+","+humi;
  Serial.println(text);

  text.toCharArray(send,sizeof(send));
  
  bool success = radio.write(&send, sizeof(send));
  
  if(success){
    Serial.println("Data sent successfully");
  }
  else{
    Serial.println("Failed to send Data");
  }
  
  delay(5000);
}