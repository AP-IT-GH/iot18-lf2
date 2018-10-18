#! /usr/bin/env python
from picamera import PiCamera
from time import sleep
import os

camera = PiCamera()
counter = 3
filename = "picture_"
fileId = 0
cameraPath = "/home/pi/Pictures/CameraTest/"

while os.path.isfile( cameraPath + filename + str(fileId) + ".jpeg"):
    fileId += 1
print(str(fileId) + " dupes found!")
camera.start_preview()
while counter > 0:
    print(str(counter), end="\r")
    sleep(1)
    counter -= 1
camera.capture( cameraPath + filename + str(fileId) + ".jpeg")
print("Snap!")
