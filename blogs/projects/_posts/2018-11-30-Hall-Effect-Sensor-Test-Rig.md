---
layout: post
title: Hall Effect Sensor Test Rig
categories: projects
permalink: /testRig/
author: Mateo Atwi
summary: Fall of 2019 I designed a test rig to mount a hall effect sensor near an electric motor with toothed wheel attached to the output shaft. The goal was to find ways to measure RPM on a spinning system. I created this both [for GTOR](/dataAquisition/) and for a mechanical engineering class called Experimental Methods. It was a lot of fun to CAD then create a fully functioning rig with a powerful electrical motor.
thumbnail: https://lh3.googleusercontent.com/Cbmrc8F1Ao1XPzyBhq5GreNGpWejB78jsHWB_zRzkzs_eyqjl3wU69cod3c4ZeSVoUasuNCfsDLRcX3MtMwqfKwz7WE6BtXwYxWM3ieBInu1JsLQQd5jzCYO9BiShV_mONXTE8oxmrU=w2400
---

\\
{{ page.summary }}

<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.app.goo.gl/mqQWzByrxmz9o6Tm6'><img src='{{ page.thumbnail }}' style="max-width: 49%; position: relative;"/></a>
</div>

<br>
### Background

\\
This is related to [my work at GTOR](/dataAquisition/) on the Data Aquisition Team. We wanted to figure out the best ways to measure rotational speed at different points on the transmission and engine our car. The team had little experience measuring rotational speed, so this project was really an opportunity to learn as much as I could about different systems for measuring rotational speed. I ended up using a hall effect sensor like the kind that are used in car wheels because we had one. Additionally, I was able to build the rig to use in my Experimental Methods Lab. The whole point of the class is to learn how to use sensors to measure things and how to analize the data from measurements.

\\
For the lab expirement I decided to study how reliable the hall effect sensor is for measuring rotational speed. Additionally, I studied the Nyquist frequency or how the sampling rate effects the measurements. Finally, I studied how differnet tooth shapes and the number of teeth on a wheel effect the reading of the device.

<br>

### Design

<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.app.goo.gl/ZE4yfPLpeSvWHPCP7'><img src='https://lh3.googleusercontent.com/9cjFo7BQlDTdwvlu_2Pb5bDdONrA3KL6oafT46p7Y14uuCLn_MidT6dsFI2omomRzCNYFy8ng9Cgg53_xxnB5iLqUKahEqDj3iTF0eHGfHpL8f5jd0SRAzNPFIpx17H95TyRf-9TOw8=w2400' style="max-width: 49%; position: relative;"/></a>
</div>

\\
I designed the test rig from scratch. I knew that I needed the following:
* A ferrous toothed wheel
* Some way to spin a ferrous toothed wheel wheel very fast
* Some way to hold a sensor very close the the spinning toothed wheel.
Those were the goals that I set out with.

\\
I found quarter inch steel to water jet toothed wheels out of. I machined 4 different kinds of wheels. I made one per the spec sheet of the guide. I made another one with fewer teeth. I made a zigzag toothed one, and I made a convoluted gear shaped one. That process was pretty straight forward.

<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.app.goo.gl/cE37b2jMtzmtvzuAA'><img src='https://lh3.googleusercontent.com/wVPI8WrQJEhcOCKsEm28XDj8qWYXX-2yqTbhbgpL_gPIWSopDSmvfPkavWMCN1lIk0IOd25-dEUfGqs3lD2Ii2vtvJBp_U_RGUaE-BUFHhXlf_fbimZ2hc5RlQgdvQJ3_H3RO-m2o4c=w2400' style="max-width: 49%; position: relative;"/></a>
</div>

<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.app.goo.gl/D4UrGQjVUwXzJbWq5'><img src='https://lh3.googleusercontent.com/PtX9GSgCeNesfQ3yUrusYPld8BJV_t6HHJK2xdQpjnW8G_jUqjFs3AjoeGm-Foctbglanf8ZbJmAN-zvdI6-yhnZ572ZLfccXBJ-dO-w1P8joh0KxKdQmwvxBhkJL0QO_3aii3zV028=w2400' style="max-width: 49%; position: relative;"/></a>
</div>

\\
I decided to use my electric longboard motor to spin the wheels because I already had it. All I had to do was make sure that the holes in the toothed wheels were big enough. There was already a collet system for clamping the wheels in.

<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.app.goo.gl/kbKgpmpia8nPwvNb9'><img src='https://lh3.googleusercontent.com/g_YmI0p93kcR6Seb3kXy5vA8eXL90MMypQu5u2FkfP6el8AM-bKwwQvaiuUrleLb4GvXVur428WAoemDt_i7PrAvqa5Hus7MQi6UibzPkdM8cmBxpq1ZiG8vt1naVnbwgikrCVCHeVA=w2400' style="max-width: 49%; position: relative;"/></a>
</div>

\\
Lastly, I machined a scrap peice of aluminium to mount my parts to and bent a small mounting bracket for the hall effect sensor. I made strips in the mounting peice so that I could finely adjust the location of the sensor.

### Lab

\\
The lab went very well. I was able to adapt code from a vibrations lab to be used with the hall effect sensor. The code would run an FFT on the measurements of the hall effect sensor. I had the power supply hooked up to the speed controller for the motor. There was a very linear correlation between the speed of the wheel and the voltage supplied. We measured the first few data points with a handheld laser tachiometer to verify the linear realtionship of voltage to max RPMs. We ran the lab fairly smoothly. We even showed the Nyquist frequency!

<div style="text-align:center;">
  <video style="max-width: 80%; height:100%;" controls>
    <source src="https://lh3.googleusercontent.com/e3R7KecYsZIu4IrRyPxUzxHeBCfPcc9VxnnapRJNE3chFa-uRfPSvApKCGDPemxvnk0O_JKNsi9Jjoj-96h9mr1qBoF5UdQ53FLbBYUWQve-qXHhlP7oW_FOzfOLrwwFkeoC1gMNVCo=w600-h315-k-no-m18" type="video/mp4">
  </video>
</div>

<br>

### Lessons Learned

\\
Measuring RPMs is very tricky.