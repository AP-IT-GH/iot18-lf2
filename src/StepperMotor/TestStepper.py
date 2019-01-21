from Stepper import stepper
import RPi.GPIO as gpio

ms1Pin = 5
ms2Pin = 6

#use the broadcom layout for the gpio
gpio.setmode(gpio.BCM)

#set gpio pins
gpio.setup(ms1Pin, gpio.OUT)
gpio.setup(ms2Pin, gpio.OUT)

#set microstep resolution
gpio.output(ms1Pin, True)
gpio.output(ms2Pin, True)

testStepper = stepper([22, 17, 23]) #[stepPin, directionPin, enablePin]

testStepper.step(5000,'left'); #steps, dir, speed, stayOn
