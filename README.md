# 🧯FEMS🧯

# 목차
1. [FEMS?](#fems)
2. [기획배경 및 목적](#기획배경-및-목적)
3. [Installation & Development](#installation--development)
4. [PPT](#ppt)
5. [Demo](#demo)

## FEMS?
FEMS는 소화기 관리 시스템입니다. 소화기의 상태를 웹애플리케이션에서 간편히 확인할 수 있습니다.
아두이노, 라즈베리파이, NRF24L01모듈을 이용하여 센서 값을 전송받으며 이를 이용하여 사용자에게 소화기 상태를 경고 및 알림을 줄 수 있습니다.

  <img width="875" alt="image" src="https://github.com/jjhwan-h/FEMS/assets/92563695/be361240-4384-416f-9ec6-e93740031e0c">

## 시스템구성도
<img width="816" alt="image" src="https://github.com/jjhwan-h/Fire-Extinguisher-Management-System/assets/92563695/7389f85f-8970-4b47-b7ac-379b68378180">

## 기획배경 및 목적
- 기존 소화기 검침은 소화기의 위치를 하나하나 기록하고 직접 찾아가서 소화기의 상태를 확인하여야 합니다.
- FEMS는 초기에 소화기정보를 입력하는 비용만 투자하면 소화기 상태를 웹어플리케이션에서 확인가능 합니다.
- 또한 소화기의 센서가 비정상적인 값을 전송한다면 사용자의 이메일로 경고메일을 발송. 또는 사이트 접속시 toast로 알림을 제공합니다.
  
## Installation & Development

  - HW
    
    | 제품 | 제품명 | 수량 |
    | --- | --- | --- |
    | 아두이노 | Arduino Uno | 소화기 개수만큼 |
    | 라즈베리파이 | Raspberry Pi 4 Model B | 각 구역마다 1개 필요 |
    | 온/습도 센서 | DHT22 | 소화기 개수만큼 |
    | 무선통신모듈 | NRF24L01 | 소화기 개수 + 구역 개수 |

    - 결선맵
      
    | Arduino Uno R3
    (ICSP) | NRF24L01P pin | 기타 |
    | --- | --- | --- |
    | +3.3v | +3.3v | 3.3v를 사용. 5v사용시 탈 수 있다. |
    | GND | GND | ground in |
    | D8 | CSN(=ss) | chip select in SS
    (Slave select)핀
    프로그램 소스 코딩 시  핀 변경가능 |
    | D7 | CE | chip enable in 프로그램 소스 코딩시 핀 변경 가능 |
    | MOSI(4) | MOSI | Mater Out Slave IN |
    | SCK(3) | SCK | SPI clock in |
    |  | IRQ |  |
    | MISO(1) | MISO | Master In Slave Out |

    - 회로도
      
      | MISO | IRQ |
      | --- | --- |
      | SCK | MOSI |
      | CE | CSN |
      | GND | VCC |
    
    <img width="243" alt="image" src="https://github.com/jjhwan-h/Fire-Extinguisher-Management-System/assets/92563695/d1e5597b-eca1-4a7b-a268-3b079f933c39">

  - clone
    ```
      https://github.com/jjhwan-h/FEMS.git
    ```
    
  - env
    ```
      PORT=
      COOKIE_SECRET=
      KAKAO_APIKEY=
      KEY_FILENAME=
      PROJECT_ID=
      BUCKET=
      EMAIL_SERVICE=
      EMAIL=
      EMAIL_PW=

    ```
    - kakao map api
      - https://apis.map.kakao.com/web/
      - 회원가입 후 api key를 발급받는다.
    - google storage
      - https://cloud.google.com/?hl=ko
      - 회원가입 후 버킷생성
      - json key file을 발급받아 저장
    - nodemailer
      - 구글 email가입
      - 계정의 앱비밀번호 생성하여 저장

  - 

## PPT
https://docs.google.com/presentation/d/1Ui6cg4TD2geBbXyWnBpFWWBV4NxyYxwL/edit?usp=sharing&ouid=101563845514655195312&rtpof=true&sd=true

## Demo
https://drive.google.com/drive/folders/1QlDGjs0iyIVKxVqcIHYLpaNYIMONaNLy?usp=sharing

## 참고

