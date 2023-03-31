---
layout: post
title:  "Building Elementary Blocks of Robot Motion; Powered by Jetson Nano "
author: John
tags: [Robotics, Programming, Python, Embedded]
image: assets/images/bot.jpeg
description: ""
featured: true
hidden: true
---

Lately, I've been curious if embedded machine learing could simplify daily life, primarily along the lines of having a robot assistant or improved home automation. This blog post is about getting the basic hardware in shape for working towards that goal.

#### Choosing the processor

When hobbists think about processors for embedded applications, the one that first comes to mind is the <a href="https://www.raspberrypi.com/">Raspberry Pi</a>. However, supply chain issues in recent years have made it really hard to obtain one. For this reason, I started researching for alternate candidates and among them Jetson Nano was a clear winner. Jetson Nano is a small yet powerful computer developed by Nvidia Inc.  It can run AI frameworks and models, and is very power efficient. It is also supported by <a href="https://developer.nvidia.com/embedded/jetpack">Nvidia's JetPack SDK</a>.

In addition, it is priced reasonably for the hardware included!

The robot we build here is similar to the <a href="https://jetbot.org/master/">Jetbot</a>.

#### Building the Chassis

For the load bearing component, I used components from <a href="https://www.amazon.com/Mixse-Tracking-Chassis-Compatible-Electric/dp/B08RMTJ8RP/">this</a> set. As seen in the pictures, the motion is controlled by the two wheels (motors) on either side and a rear-end freewheel. For the motors, instead of using the ones that came with this set, I've used <a href="https://www.amazon.com/Augiimor-Reduction-Gearwheel-Gearbox-Electric/dp/B08B3L7T8D/">these</a> N20 motors that can withstand upto 6V.

##### The Motor Driver Circuit

The movement of these motors have to be controlled through logic (or a program), a few of Nano's <a href="https://jetsonhacks.com/2019/06/07/jetson-nano-gpio/">GPIO</a> pins needs to be programmed to pass turn signals. Since we have two motors for the bot, lets call them motor 1 (Left) and motor 2 (right). These motors are driven using the IC DRV8833 shown below. IN1 and IN2 provides turn direction signal for motor 1, and IN3 and IN4 for motor 2. The other inputs on the IC are Vcc and GND. We tap the unregulated 5V supply from GPIO pin 2 for Vcc voltage and a connection from pin 14 as the GND. OUT1 and OUT2 are the connections to motor 1 and OUT3 and OUT4 are the connections to motor 2. These circuit is shown in the breadboard connection below. The values from even numbered GPIO pins has been taken to the breadboard using a <a href="https://www.amazon.com/dp/B08T9HCL37">ribbon cable</a>

<div align="left">
  <img src="../assets/images/motor-driver.jpg"/>
  <img src="../assets/images/breadboard.jpeg"/>
</div>

Simplifying this circuit after removing the breadboard and the ribbon cable, we have something that looks like the following left image. The image on the right is the same chassis, cleaned up a bit further to smooth motion.

<div align="left">
  <img src="../assets/images/motors.jpeg"/>
  <img src="../assets/images/clean_chassis.jpg"/>
</div>

<br>

#### Powering the processor

Since the robot has to move around its environment, a portable power source is inevitable. I am using the <a href="https://www.amazon.com/dp/B08BRMZ4G6">Waveshare UPS Power Module</a> for Jetson Nano. This UPS needs four <a href="https://www.amazon.com/dp/B0BC947XDJ">18650</a> batteries. It comes with a small OLED display that provides information on batteries voltage, IP address, RAM usage, etc. collected via I2C pins (SDA and SDL). For activating this display, a <a href="https://www.waveshare.com/wiki/UPS_Power_Module">service</a> has to be enabled on the jetson OS. The UPS mounted on the chassis is shown below.

<div align="left">
  <img src="../assets/images/ups.jpg"/>
</div>

After placing the UPS, the board has been affixed on to the top layer of the chassis.

#### Driving the motors using GPIO Controls.

Now that the body of the robot has been built, it is time to program the logic for its movement! The Nano has a 40 pin <a href="https://jetsonhacks.com/2019/06/07/jetson-nano-gpio/">GPIO</a> layout quite similar to the Raspberry Pi. Enabling voltage on selected ones of these pins is how the robot motion would be controlled.

 The GPIO pins numbered 12, 16, 18 and 22 are the ones being used here for motion control. As mentioned earlier, IN1 and IN2 are the inputs of the motor driver chip for motor 1. GPIO pins 12 and 16 has been wired to these two inputs to control the motion of motor1. Similarly, pins 18 and 22 are wired to IN3 and IN4 for controlling motor2.





```html
---
layout: post
title:  "Inception Movie"
author: john
categories: [ Jekyll, tutorial ]
tags: [red, yellow]
image: assets/images/11.jpg
description: "My review of Inception movie. Actors, directing and more."
rating: 4.5
---
```
