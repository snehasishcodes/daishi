# Code to Board using CLI
Upload the hardware code from `/hardware` to the Arduino UNO Board using the Arduino CLI.

## Step by Step
- Directly from VSCode
- No Arduino IDE required
- No additional VSCode extension required
- Simply using the Arduino CLI

### Install Arduino CLI
- [Documentation](https://arduino.github.io/arduino-cli/0.32/installation/)
- For NixOS, add `arduino-cli` to your packages. [Registry URL](https://search.nixos.org/packages?channel=25.05&show=arduino-cli&query=arduino-cli)

### Install Board Core
```bash
arduino-cli core update-index
arduino-cli core install arduino:avr
```

### Install Libraries/Dependencies
Libraries requried:
- MD_MAX72XX
- MD_Parola

```bash
arduino-cli lib install "MD_MAX72XX"
arduino-cli lib install "MD_Parola"
```

- Check installation
```bash
arduino-cli lib list
```

### Find your Board
- Connect your Arduino UNO to your computer, then run the following command to identify which serial port the board is using:
```bash
arduino-cli board list
```

- This outputs something like:
```pgsql
Port           Type                Board Name     FQBN
/dev/ttyACM0   Serial Port (USB)   Arduino Uno    arduino:avr:uno
```

### Compile your sketch (`hardware.ino`)
```bash
arduino-cli compile --fqbn arduino:avr:uno hardware
```
- `hardware` is the folder name and must match the file name (`hardware.ino`)

### Upload to board
```bash
arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno hardware
```

That's it.

---

## Extras
Some extra tuts.

### How to open serial monitor 
```bash
arduino-cli monitor -p /dev/ttyACM0 -c baudrate=9600
```