---
layout: post
title:  "Learning the environment through Deep Learning"
author: Sreejith Sreekumar
image: "assets/images/bot_v2.png"
featured: true
tags: [Machine Learning, Robotics, Programming, Python, Embedded]
featured: true
hidden: false
---

In the <a href="https://srjit.github.io/elementary-blocks-of-robotics/">previous post</a> we disussed on the basics of building a robot; mostly the electronics and mechanical components of it, and a little bit of the basic programming for motion. Here, we discuss making the robot a little more intelligent with some machine learning!

It was my friend's suggestion to modify the robot's construction and use a tank chassis since the wheels weren't aligned enough resulting in sideways movement during forward motion. A tank track could also easily climb through the carpets and other uneven sufaces in my house. In addition, it can rotate or turn around itself any degree with minimal motion sideways. The picture shows the modified version of the robot. Although the mechanical parts have changed, this code that was used before is the same here to drive it.

#### Additional Hardware

##### Camera Module

The camera that is being used here is <a href="https://www.aliexpress.us/item/2255800029242375.html">IMX219</a>, an infrared camera with 160 Degree FOV. It is assisted by two IR Leds on either sides as seen in the picture. The picture quality from this camera isn't great from my experience, however for our project this does decently well.

##### Wireless

For the wifi module, <a href="https://www.amazon.com/gp/product/B07SM4SPLV">this</a> Dual Mode AC8265 Wireless NIC Module is being used. Since python modules need to be installed, and some prebuilt models need to be downloaded, having a steady wifi connection would be a plus!
