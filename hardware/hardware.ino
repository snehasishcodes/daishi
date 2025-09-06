#include <MD_MAX72xx.h>
#include <SPI.h>
#include <SPI.h>
 
// Hardware type (check your module)
// FC16_HW is common, but yours may differ
#define HARDWARE_TYPE MD_MAX72XX::FC16_HW

#define MAX_DEVICES 1   // 4 x 8x8 = 32 columns
#define CS_PIN 10       // Chip select

MD_Parola display = MD_Parola(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);

String inputText = "";

void setup() {
  Serial.begin(9600);
  display.begin();
  display.setIntensity(5);   // Brightness 0–15
  display.displayClear();
}

void loop() {
  // If serial has new data
  if (Serial.available()) {
    inputText = Serial.readStringUntil('\n');  // read line
    inputText.trim(); // remove \r or spaces
    if (inputText.length() > 0) {
      display.displayClear();
      display.displayText(
        inputText.c_str(),
        PA_CENTER,
        100,    // speed (lower = faster scroll)
        0,
        PA_SCROLL_LEFT,
        PA_SCROLL_LEFT
      );
      display.displayAnimate(); 
    }
  }

  if (display.displayAnimate()) {
    display.displayReset();
  }
}
