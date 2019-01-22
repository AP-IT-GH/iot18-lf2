#!/udisr/bin/env/ python
from datetime import datetime
from threading import Timer
from picamera import PiCamera
from imgurpython import ImgurClient
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import configparser
import time
import configparser
import sys

# Defining some variables
client = None
access_token = None
refresh_token = None

imgName = None

def Authenticate():
    config = configparser.ConfigParser()
    config.read('auth.ini')
    
    # Setting up all variables for the connection
    print("Gathering Data from auth.ini")
    client_id = config.get('credentials', 'client_id')
    client_secret = config.get('credentials', 'client_secret')
    client = ImgurClient(client_id, client_secret)
    
    imgur_username = config.get('credentials', 'imgur_username')
    imgur_password = config.get('credentials', 'imgur_password')
    
    authorization_url = client.get_auth_url('pin')
    print("Connecting to " + authorization_url)

    # Setting up the web browser
    cap = DesiredCapabilities().FIREFOX
    cap["marionette"] = False
    fp = webdriver.FirefoxProfile()
    fp.set_preference("browser.download.folderList", 2)
    fp.set_preference("javascript.enabled", False)
    fp.set_preference("permissions.default.stylesheet", 2)
    fp.set_preference("permissions.default.image", 2)
    fp.set_preference("dom.ipc.plugins.enabled.libflashplayer.so", "false")
    driver = webdriver.Firefox(capabilities=cap, firefox_profile=fp, executable_path="usr/local/bin/geckodriver")    
    driver.get(authorization_url)
    
    # Waiting to fill in the login form
    for i in range(1, 9):
        print("\r" + 'Waiting 5 seconds for page to load [' + str(i) + ']', end="")
        time.sleep(1)
    
    # Filling in the login form
    print("\r\nAccepting cookies")
    driver.find_element_by_class_name("qc-cmp-button").click()
    print("Locating authentication fields")
    username = driver.find_element_by_xpath('//*[@id="username"]')
    password = driver.find_element_by_xpath('//*[@id="password"]')
    
    username.clear()
    password.clear()
    
    print("Filling in information")
    username.send_keys(imgur_username)
    password.send_keys(imgur_password)
    
    driver.find_element_by_name("allow").click()
    
    # element_present = EC.present_of_element_located(By.ID, 'pin')
    print(driver.current_url)
    pin_element = driver.find_element_by_id('pin')
    pin = pin_element.get_attribute("value")
    driver.close()
    print('pin: ' + pin)
    
    credentials = client.authorize(pin, 'pin')
    client.set_user_auth(credentials['access_token'], credentials['refresh_token'])
    print("Authentication successful!")
    global imgName
    album = ["4naDlCx","QbQd40H","PxUx4w5"]

    for i in range(1,4):
        try:
            config = {
                    'name': 'Labfarm' + str(i) + '_' + imgName + ".png",
            }
            print('Uploading image ' + str(i))
            image = client.upload_from_path('/home/pi/labfarm' + str(i) + '/img/' + imgName + '.png', config, False)
        except:
            print("UploadinDidnDoNuffin :(")

    print("")
    print("♩ This is the end ♩")
    print("♩ Hold your breath and count to ten ♩")
    print("♩ Hear the earth move, and then ♩")
    print("♩ Hear my heart burst again ♩")

def wipe_line():
    sys.stdout.write('r')
    sys.stdout.flush()

def WaitADay():
    x = datetime.today()
    y = x.replace(day=x.day+1, hour=12, minute=0, second=0, microsecond=0)
    delta_t = y-x
    secs = delta_t.seconds+1
    t = Timer(secs, TakePicture)
    print("Next picture will be taken on" + y.strftime(" %c"))
    t.start()

def TakePicture():
    print("Taking today's picture...")
    global imgName
    imgName = "labfarm_" + datetime.today().strftime("%s")
    MoveCamera(1)
    camera.capture("/home/pi/labfarm1/img/" + imgName + ".png")
    MoveCamera(2)
    camera.capture("/home/pi/labfarm2/img/" + imgName + ".png")
    MoveCamera(3)
    camera.capture("/home/pi/labfarm3/img/" + imgName + ".png")

    Authenticate()

    WaitADay()
    
def MoveCamera(loc):
    pass

# Setting up the PiCamera
camera = PiCamera()

camera.contrast = 60
camera.brightness = 60

# Defining the initial date
x = datetime.today()
y = x.replace(day=x.day+1, hour=12, second=0, microsecond=0)
print("\"Quote\"")
print("Starting the program...")
TakePicture()
WaitADay()
