# Hardware Programs for Sud0 Hardware Polygon ID Wallet

## Introduction

This is the code for the hardware programs for the Sud0 Hardware Polygon ID Wallet. written in C++ integrated with Arduino.

## Hardware Setup

This project uses the following hardware:

Esp32-wroom development kit
MFRC522 RFID module
I2c OLED Display
external power supply

## Installation

Install the Arduino IDE and the ESP32 board manager. Install the MFRC522, NfcAdapter library and the U8g2lib library.

To setup rfid cards use the Write_data_to_card.ino file and to read data from the card use the Read_data_from_card.ino file.

To use the hardware wallet use the wallet_hardware.ino file.

## Link to Demonstration Video: [Click Here](https://youtu.be/euoEZ8p4uLk)