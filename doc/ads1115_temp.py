import time
import RPi.GPIO as GPIO
import paho.mqtt.client as paho

# Import the ADS1x15 module.
import Adafruit_ADS1x15

GPIO.setmode(GPIO.BCM)

# Create an ADS1115 ADC (16-bit) instance.
adc = Adafruit_ADS1x15.ADS1115()

#define the pin that goes to the circuit
pin_to_circuit = 7
charge_pin = 18
read_pin = 23

message = ("")

def on_connect(client, userdata, flags, rc):
    client.subscribe("IoT/labfarm")
    print("Succesfully connected with code " + str(rc))
    
def on_message(client, userdata, msg):
    value = str(msg.payload.decode("utf-8")).split(";")
    
def on_publish(msg):
    client.publish("IoT/labfarm", msg)
    
client = paho.Client("clientId-YwB7Clx1Z8")  
client.on_connect = on_connect
client.on_message = on_message
client.connect("broker.mqttdashboard.com", 1883)
client.loop_start()

def rc_time (pin_to_circuit):
    count = 0
  
    #Output on the pin for 
    GPIO.setup(pin_to_circuit, GPIO.OUT)
    GPIO.output(pin_to_circuit, GPIO.LOW)
    time.sleep(0.1)

    #Change the pin back to input
    GPIO.setup(pin_to_circuit, GPIO.IN)
  
    #Count until the pin goes high
    while (GPIO.input(pin_to_circuit) == GPIO.LOW):
        count += 1

    return count
    
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
print('| {0:>6} | {1:>6} | {2:>6} | {3:>6} | {4:>6} | {5:>6} |'.format(*range(6)))
print('-' * 56)
# Main loop.
while True:
    
    # Read all the ADC channel values in a list.
    values = [0]*6
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
    print('| {0:>6} | {1:>6} | {2:>6} | {3:>6} | {4:>6} | {5:>6} |'.format(*values))
    message = str(values[0])+" ; "+str(values[1])+" ; "+str(values[2])+" ; "+str(values[3])+" ; "+str(values[4])+" ; "+str(values[5])
    on_publish(message)
    client.loop_stop()
    # Pause for half a second.
    time.sleep(0.5)