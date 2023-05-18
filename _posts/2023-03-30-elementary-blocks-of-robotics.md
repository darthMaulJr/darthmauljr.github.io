---
layout: post
title:  "Building Elementary Blocks of Robot Motion; Powered by Jetson Nano "
tags: [Robotics, Programming, Python, Embedded]
image: assets/images/bot.jpeg
description: ""
hidden: false
---

Lately, I've been curious if embedded machine learing could make my life more fun, or even simplify it primarily along the lines of having a robot assistant or improve home automation. This blog post is about getting the basic hardware in shape for working towards that goal.

### **Choosing the processor**

When hobbists think about processors for embedded applications, the one that first comes to mind is the <a href="https://www.raspberrypi.com/">Raspberry Pi</a>. However, supply chain issues in recent years have made it really hard to obtain one. For this reason, I started researching for alternate candidates and among them Jetson Nano was a clear winner. Jetson Nano is a small yet powerful computer developed by Nvidia Inc.  It can run AI frameworks and models, and is very power efficient. It is also supported by <a href="https://developer.nvidia.com/embedded/jetpack">Nvidia's JetPack SDK</a>.

In addition, it is priced reasonably for the hardware included!

The robot we build here is similar to the <a href="https://jetbot.org/master/">Jetbot</a>.

### **Building the Chassis**

For the load bearing component, I used components from <a href="https://www.amazon.com/Mixse-Tracking-Chassis-Compatible-Electric/dp/B08RMTJ8RP/">this</a> set. As seen in the pictures, the motion is controlled by the two wheels (motors) on either side and a rear-end freewheel. For the motors, instead of using the ones that came with this set, I've used <a href="https://www.amazon.com/Augiimor-Reduction-Gearwheel-Gearbox-Electric/dp/B08B3L7T8D/">these</a> N20 motors that can withstand upto 6V.

### **The Motor Driver Circuit**

The movement of these motors have to be controlled through logic (or a program); a few of Nano's <a href="https://jetsonhacks.com/2019/06/07/jetson-nano-gpio/">GPIO</a> pins needs to be programmed to pass turn signals. Since we have two motors for the bot, lets call them motor1 (Left) and motor2 (right). These motors are driven using the IC DRV8833 shown below. IN1 and IN2 provides turn direction signal for motor 1, and IN3 and IN4 for motor 2. The other inputs to the IC are Vcc and GND. We tap the unregulated 5V supply from GPIO pin 2 for Vcc voltage and a connection from pin 14 as the GND. OUT1 and OUT2 are the connections to motor1 and OUT3 and OUT4 are the connections to motor2. This circuit, wired on the breadboard is shown below. The voltages from even numbered GPIO pins (second row of the GPIO pins) has been wired to the breadboard using a <a href="https://www.amazon.com/dp/B08T9HCL37">ribbon cable</a>

<div align="left">
  <img src="{{ site.baseurl }}/assets/images/motor-driver.jpg"/>
  <img src="{{ site.baseurl }}/assets/images/breadboard.jpeg"/>
</div>

De-complicating this circuit after removing the breadboard and the ribbon cable, we have something that looks like the following left image. The image on the right is the same chassis, cleaned up a bit further to smooth motion.

<div align="left">
  <img src="{{ site.baseurl }}/assets/images/motors.jpeg"/>
  <img src="{{ site.baseurl }}/assets/images/clean_chassis.jpg"/>
</div>

<br>

### **Powering the processor**

Since the robot has to move around its environment, a portable power source is inevitable. I am using the <a href="https://www.amazon.com/dp/B08BRMZ4G6">Waveshare UPS Power Module</a> for Jetson Nano. This UPS needs four <a href="https://www.amazon.com/dp/B0BC947XDJ">18650</a> batteries. It comes with a small OLED display that provides information on batteries voltage, IP address, RAM usage, etc. collected via I2C pins (SDA and SDL). For activating this display, a <a href="https://www.waveshare.com/wiki/UPS_Power_Module">service</a> has to be enabled on the jetson OS. The UPS mounted on the chassis is shown below.

<div align="left">
  <img src="{{ site.baseurl }}/assets/images/ups.jpg"/>
</div>

After placing the UPS, the board has been affixed on to the top layer of the chassis.

  <img src="{{ site.baseurl }}/assets/images/bot.jpeg" />

### **Driving the motors using GPIO Controls**

Now that the body of the robot has been built, it is time to program the logic for its movement! The Nano has a 40 pin <a href="https://jetsonhacks.com/2019/06/07/jetson-nano-gpio/">GPIO</a> layout quite similar to the Raspberry Pi. Enabling voltage on selected pins and wiring them as input signals to the motors is how the robot motion would be controlled.

 The GPIO pins numbered 12, 16, 18 and 22 are the ones being used here for motion control. As mentioned earlier, IN1 and IN2 are the inputs of the motor driver chip for motor1. GPIO pins 12 and 16 has been wired to IN1 and IN2 to control the direction of motor1. Similarly, pins 18 and 22 are wired to IN3 and IN4 for controlling motor2. A logical high on IN1 (pin 12) drives motor1 forward whereas a logical high on IN2 (pin 16) drives it backward. Similarily, a logical high on IN4 (pin 22) drives the motor forward whereas that on IN3 (pin 18) drives it backward.


### **The Code!**

> For driving the robot forward, motor1 and motor2 needs to be turned in the forward direction, i.e we have to set logical highs on GPIO pins 12 and 22 (IN1 and IN4). For driving it back, motor1 and motor2 needs to be turned in the reverse directions, i.e pins 16 and 18 (IN2 and IN3) needs to set high.

The <a href="https://github.com/NVIDIA/jetson-gpio">Jetson GPIO</a> python library is what is used here to change the signals on board pins. We use the BCM pin-numbering scheme from Raspberry Pi while programming the GPIO; there is a mapping of each board pin to a different BCM number.

The following python code moves the robot 1 second forward and reverses 5 seconds!

{% highlight python linenos %}
import subprocess

import RPi.GPIO as GPIO
import time
import nanocamera as nano
from PIL import Image
import sys

# Pin Definitions
output_pin1 = 18  # BCM pin 18, BOARD pin 12
output_pin2 = 23  # BCM pin 23, BOARD pin 16

output_pin3 = 24  # BCM pin 24, BOARD pin 18
output_pin4 = 25  # BCM pin 25, BOARD pin 22


def turn_right(turn_time):

    GPIO.output(output_pin1, GPIO.HIGH)
    time.sleep(turn_time)     
    GPIO.output(output_pin1, GPIO.LOW)


def turn_left(turn_time):

    GPIO.output(output_pin4, GPIO.HIGH)
    time.sleep(turn_time)     
    GPIO.output(output_pin4, GPIO.LOW)



def forward(running_time):

    GPIO.output(output_pin1, GPIO.HIGH)
    GPIO.output(output_pin4, GPIO.HIGH)
    time.sleep(running_time)
    GPIO.output(output_pin1, GPIO.LOW)
    GPIO.output(output_pin4, GPIO.LOW)
    


def reverse(running_time):    

    GPIO.output(output_pin2, GPIO.HIGH)
    GPIO.output(output_pin3, GPIO.HIGH)
    time.sleep(running_time)
    GPIO.output(output_pin2, GPIO.LOW)
    GPIO.output(output_pin3, GPIO.LOW)

def initialize():

    GPIO.setmode(GPIO.BCM)
    GPIO.setup(output_pin1, GPIO.OUT, initial=GPIO.LOW)
    GPIO.setup(output_pin2, GPIO.OUT, initial=GPIO.LOW)
    GPIO.setup(output_pin3, GPIO.OUT, initial=GPIO.LOW)
    GPIO.setup(output_pin4, GPIO.OUT, initial=GPIO.LOW)
    


def main(start):
    # Pin Setup:

    initialize()

    # Move forward for 1 second and stop
    forward(1)

    # Move back for 5 seconds and stop
{% endhighlight %}
