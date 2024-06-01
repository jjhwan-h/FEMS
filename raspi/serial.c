// just that the Arduino IDE doesnt compile these files.
#ifdef RaspberryPi

//include system librarys
#include <stdio.h> //for printf
#include <stdint.h> //uint8_t definitions
#include <stdlib.h> //for exit(int);
#include <string.h> //for errno
#include <errno.h> //error output

//wiring Pi
#include <wiringPi.h>
#include <wiringSerial.h>

//HTTP POST
#include <curl/curl.h>

// Find Serial device on Raspberry with ~ls /dev/tty*
// ARDUINO_UNO "/dev/ttyACM0"
// FTDI_PROGRAMMER "/dev/ttyUSB0"
// HARDWARE_UART "/dev/ttyAMA0"
char device[]= "/dev/ttyACM0";
// filedescriptor
int fd;
unsigned long baud = 9600;
char req[32];
int idx=0;
//prototypes
int main(void);
void loop(void);
void setup(void);

void setup(){

  printf("%s \n", "Raspberry Startup!");
  fflush(stdout);

  //get filedescriptor
  if ((fd = serialOpen (device, baud)) < 0){
    fprintf (stderr, "Unable to open serial device: %s\n", strerror (errno)) ;
    exit(1); //error
  }

  //setup GPIO in wiringPi mode
  if (wiringPiSetup () == -1){
    fprintf (stdout, "Unable to start wiringPi: %s\n", strerror (errno)) ;
    exit(1); //error
  }

}

void loop(){
  CURL *curl;
  CURLcode res;
  char newChar;
//curl_global_init(CURL_GLOBAL_ALL);

// read signal
  if(serialDataAvail (fd)){
    newChar = serialGetchar (fd);
    //printf("%c", newChar);
    //fflush(stdout);

    if(newChar=='\n'){
	for(int i=0;i<32;i++){
		printf("%c",req[i]);
		fflush(stdout);
	}
  /* get a curl handle */
  curl = curl_easy_init();
  if(curl) {
    /* First set the URL that is about to receive our POST. This URL can
       just as well be an https:// URL if that is what should receive the
       data. */
    curl_easy_setopt(curl, CURLOPT_URL, "https://f77a-113-198-137-2.ngrok-free.app/extinguishers/raspi");

    /* Now specify the POST data */
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, req);

    /* Perform the request, res gets the return code */
    res = curl_easy_perform(curl);
    /* Check for errors */
    if(res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(res));

    /* always cleanup */
    curl_easy_cleanup(curl);
    idx=0;
  }
  //curl_global_cleanup();
    }
    else if(newChar=='s'){
	idx=0;
    }
    else{
	req[idx++]=newChar;
	if(idx>31) idx=0;
    }
  }
}

// main function for normal c++ programs on Raspberry
int main(){
  setup();
  while(1) loop();
  return 0;
}

#endif //#ifdef RaspberryPi