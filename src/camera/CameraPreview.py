#! /usr/bin/env python
from picamera import PiCamera
from time import sleep
import os

camera = PiCamera()

def capture(filename="/home/pi/Pictures/camera_preview.jpeg"):
    counter = 3
    while counter > 0:
        print(str(counter), end="\r")
        sleep(1)
        counter -= 1
    print("Snap!")
    camera.capture(filename)

def printInvalidInput():
    print("##############")
    print("Invalid input!")
    print("##############")
    print("")

def changeBrightness():
    br = int(input("Enter a number between 0 and 100: "))
    if 0 < br and br < 100:
        camera.brightness = br
    else:
        printInvalidInput()
        changeBrightness()

def changeContrast():
    ctr = int(input("Enter a number between 0 and 100: "))
    if 0 < ctr and ctr < 100:
        camera.contrast = ctr
    else:
        pintInvalidInput()
        changeContrast()

def prompt():
    _ = os.system("clear")
    print("choose one of the following options:")
    print("1. Contrast")
    print("2. Brightness")
    print("3. Capture photo")
    print("4. Exit")
    command = input("Please enter your number of choice: ")
    if command == "1":
        changeContrast()
        prompt()
    elif command == "2":
        changeBrightness()
        prompt()
    elif command == "3":
        capture()
        prompt()
    elif command == "4":
        pass
    else:
        print("Unknown command, please enter a valid command.")
        prompt()

prompt()
