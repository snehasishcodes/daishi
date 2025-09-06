#!/usr/bin/env sh
# ^^^^^^^^^^ don't remove the previous line

# compile and upload the Arduino sketch to the connected board
arduino-cli compile --fqbn arduino:avr:uno hardware
arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno hardware
# start serial monitor too
arduino-cli monitor -p /dev/ttyACM0 -c baudrate=9600