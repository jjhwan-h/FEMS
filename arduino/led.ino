import RPi.GPIO as GPIO
import time
import bluetooth

// GPIO 설정
BLUE_PIN = 2
GREEN_PIN = 3
RED_PIN = 4

GPIO.setmode(GPIO.BCM)
GPIO.setup(RED_PIN, GPIO.OUT)
GPIO.setup(GREEN_PIN, GPIO.OUT)
GPIO.setup(BLUE_PIN, GPIO.OUT)
try:
    while True:
        GPIO.output(RED_PIN, True)
        time.sleep(1)
        GPIO.output(RED_PIN, False)
        time.sleep(1)
except KeyboardInterrupt:
    pass

GPIO.cleanup()
