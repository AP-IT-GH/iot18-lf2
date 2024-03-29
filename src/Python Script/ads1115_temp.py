import time
import RPi.GPIO as GPIO
import paho.mqtt.client as paho
import requests
from datetime import datetime, timedelta
import subprocess
from Stepper import stepper

# Import the ADS1x15 module.
import Adafruit_ADS1x15

GPIO.setmode(GPIO.BCM)

# Create an ADS1115 ADC (16-bit) instance.
adc = Adafruit_ADS1x15.ADS1115()

#Setup for water level sensor
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(27, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(9, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(11, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

#stepper pin
ms1Pin = 5
ms2Pin = 6
#set gpio pins
GPIO.setup(ms1Pin, GPIO.OUT)
GPIO.setup(ms2Pin, GPIO.OUT)
#set microstep resolution
GPIO.output(ms1Pin, True)
GPIO.output(ms2Pin, True)

testStepper = stepper([13, 19, 26]) #[stepPin, directionPin, enablePin]

#define the pin that goes to the circuit
ldr_power_pin = 4
pin_to_circuit = 7
charge_pin = 18
read_pin = 23

ledpin = 8


#Command booleans
Lampcmd = False
Pumpcmd = False
value = ""

GPIO.setup(ldr_power_pin, GPIO.OUT)
GPIO.output(ldr_power_pin, GPIO.HIGH)

GPIO.setup(ledpin, GPIO.OUT)


waterlvlmsg = ""
waterlvlValue = ""
message = ("")
c = ""
timeCheck = True
dt = 0

#Methods required for MQTT
def on_connect(client, userdata, flags, rc):
    client.subscribe("testtopic/labfarm")
    print("Succesfully connected with code " + str(rc))
    
def on_message(client, userdata, msg):
    global value
    value = str(msg.payload.decode("utf-8"))
    print(value)
    
def on_publish(msg):
    client.publish("testtopic/labfarm", msg)
    
def on_command(msg):
    global Lampcmd, Pumpcmd
    if(msg == "foto b1"):
        cameraScript1()
    elif(msg == "foto b2"):
        cameraScript2()
    elif(msg == "foto b3")
        cameraScript3()
    if(msg == "lamp on"):
        Lampcmd = True    
    elif(msg == "lamp off"):
        Lampcmd = False
    elif(msg == "pump on"):
        Pumpcmd = True
    elif(msg == "pump off"):
        Pumpcmd = False
    elif(msg == "motor right"):
        testStepper.step(5000,'right'); #steps, dir, speed, stayOn
    elif(msg == "motor left"):
        testStepper.step(5000,'left'); #steps, dir, speed, stayOn
    if(Lampcmd == True):
        GPIO.output(ledpin, GPIO.HIGH)
    elif(Lampcmd == False):
        GPIO.output(ledpin, GPIO.LOW)
    #if(Pumpcmd == True):
    
    #else:

        

#create client for MQTT   
client = paho.Client("clientId-UMPaYuqrEd")  
client.on_connect = on_connect
client.on_message = on_message
client.connect("broker.mqttdashboard.com", 1883)
client.loop_start()
client.subscribe("testtopic/labfarm/cmd")


#Method for measuring LDR value
def rc_time (pin_to_circuit):
    count = 0
  
    #Output on the pin for 
    GPIO.setup(pin_to_circuit, GPIO.OUT)
    GPIO.output(pin_to_circuit, GPIO.LOW)
    time.sleep(0.1)

    #Change the pin back to input
    GPIO.setup(pin_to_circuit, GPIO.IN, pull_up_down=GPIO.PUD_UP)
  
    #Count until the pin goes high
    while (GPIO.input(pin_to_circuit) == GPIO.LOW):
        count += 1

    return count

#Methods for measuring resistance/air humidity    
def discharge():
    GPIO.setup(charge_pin, GPIO.IN)
    GPIO.setup(read_pin, GPIO.OUT)
    GPIO.output(read_pin, False)
    time.sleep(0.005)

def charge_time():
    GPIO.setup(read_pin, GPIO.IN)
    GPIO.setup(charge_pin, GPIO.OUT)
    count = 0
    GPIO.output(charge_pin, True)
    while not GPIO.input(read_pin):
        count = count + 1
    return count

def analog_read():
    discharge()
    return charge_time()
    
#Method for measuring water level sensor

def measure_water_level():
    global waterlvlValue
    if GPIO.input(11) == 1:
      waterlvlmsg = "85% - 100%"
      waterlvlValue = 100
    elif GPIO.input(9) == 1:
      waterlvlmsg = "70% - 85%"
      waterlvlValue = 80
    elif GPIO.input(10) == 1:
      waterlvlmsg = "55% - 70%"
      waterlvlValue = 65
    elif GPIO.input(22) == 1:
      waterlvlmsg = "40% - 55%"
      waterlvlValue = 50
    elif GPIO.input(27)== 1:
      waterlvlmsg = "25% - 40%"
      waterlvlValue = 35
    elif GPIO.input(17)== 1:
      waterlvlmsg = ">10% - 25%"
      waterlvlValue = 15
    else:
      waterlvlmsg = "error"
      waterlvlValue = 0
      
    return waterlvlmsg

def cameraScript1() {
    camera1 = "python3 camera1.py"  # launch script using bash, 1 = enroll, 2 = verify

    process = subprocess.Popen(camera1.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()  # receive output from the python3 script
}

def cameraScript2() {
    camera2 = "python3 camera2.py"  # launch script using bash, 1 = enroll, 2 = verify

    process = subprocess.Popen(camera2.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()  # receive output from the python3 script
}

def cameraScript3() {
    camera3 = "python3 camera3.py"  # launch script using bash, 1 = enroll, 2 = verify

    process = subprocess.Popen(camera3.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()  # receive output from the python3 script
}
    
def quit():
    GPIO.cleanup()
    client.loop_stop()

# Note you can change the I2C address from its default (0x48), and/or the I2C
# bus by passing in these optional parameters:
#adc = Adafruit_ADS1x15.ADS1015(address=0x49, busnum=1)

# Choose a gain of 1 for reading voltages from 0 to 4.09V.
# Or pick a different gain to change the range of voltages that are read:
#  - 2/3 = +/-6.144V
#  -   1 = +/-4.096V
#  -   2 = +/-2.048V
#  -   4 = +/-1.024V
#  -   8 = +/-0.512V
#  -  16 = +/-0.256V
# See table 3 in the ADS1015/ADS1115 datasheet for more info on gain.
GAIN = 1

print('Reading ADS1x15 values, press Ctrl-C to quit...')
# Print nice channel column headers.
print('| {0:>6} | {1:>6} | {2:>6} | {3:>6} | {4:>6} | {5:>6} | {6:>6} |'.format(*range(7)))
print('-' * 56)
# Main loop.
while True:
    # Read all the ADC channel values in a list.
    values = [0]*7
    
    #values[0] = 28
    #values[1] = 35
    #values[2] = 34
    #values[3] = 41
    #values[4] = 20
    #values[5] = 10
    #values[6] = 25
    
    for i in range(4):
        # Read the specified ADC channel using the previously set gain value.
        values[i] = adc.read_adc(i, gain=GAIN)
        values[i] = values[i] / 8
        # Note you can also pass in an optional data_rate parameter that controls
        # the ADC conversion time (in samples/second). Each chip has a different
        # set of allowed data rate values, see datasheet Table 9 config register
        # DR bit values.
        #values[i] = adc.read_adc(i, gain=GAIN, data_rate=128)
        # Each value will be a 12 or 16 bit signed integer value depending on the
        # ADC (ADS1015 = 12-bit, ADS1115 = 16-bit).
    # Print the ADC values.
    values[0] = ((values[0] / 1000) - 0.5) * 100
    values[4] = rc_time(pin_to_circuit)
    values[5] = analog_read()
    values[6] = measure_water_level()
    print('| {0:>6.2f} | {1:>6.2f} | {2:>6.2f} | {3:>6.2f} | {4:>6.2f} | {5:>6.2f} | {6}'.format(*values))
   
    
    message = str(values[0])+" ; "+str(values[1])+" ; "+str(values[2])+" ; "+str(values[3])+" ; "+str(values[4])+" ; "+str(values[5])+" ; "+str(waterlvlValue)
    messagemqtt = str(values[0])+" ; "+str(values[1])+" ; "+str(values[2])+" ; "+str(values[3])+" ; "+str(values[4])+" ; "+str(values[5])+" ; "+str(values[6])+" ; "+str(Lampcmd)+" ; "+str(Pumpcmd)
    on_publish(messagemqtt)
    on_command(value)

    # Check every 20 min
    if timeCheck:
        dt = datetime.now() + timedelta(minutes=20)
        timeCheck = False

    if datetime.now() > dt:
        timeCheck = True
        s = requests.Session()
        url = 'https://labfarmrest147.azurewebsites.net/api/data'
        r = requests.post(url, headers = {'key': message})

    # Pause for second.
    time.sleep(1)

quit()