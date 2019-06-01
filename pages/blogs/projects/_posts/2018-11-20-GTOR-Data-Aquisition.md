---
layout: post
title: GTOR Data Aquisition
categories: projects
permalink: /dataAquisition/
author: Mateo Atwi
summary: In the Fall of 2019, I joined the Georgia Tech Off Road (GTOR) club to help as a Data Aquisition Engineer. GTOR develops and builds a new off road car every year to compete with. The data aquisition team started this semester. There was a little bit of work done prior, but not much. It was a lot of fun to research the best ways to gather data and different sensors to use. It also made me realize that it is very tricky to get good sensor data.
thumbnail: https://lh3.googleusercontent.com/-xPSbxPmCXSmiOEUU-GuTUuSVhsFzuh1PRHNzlldgMbKkTq4RmCMwVXmammgft4B3GkYAsUnmCSXfZ-SKlr80U-oa5aZcu_BYv8iKC-ifpQwUvMPFrf_BMY-FMKiUDiDkva0OotTExg=w2400
---

\\
{{ page.summary }}

<br>
<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.app.goo.gl/CBo89hCGVrjREooB8'><img src='https://lh3.googleusercontent.com/-xPSbxPmCXSmiOEUU-GuTUuSVhsFzuh1PRHNzlldgMbKkTq4RmCMwVXmammgft4B3GkYAsUnmCSXfZ-SKlr80U-oa5aZcu_BYv8iKC-ifpQwUvMPFrf_BMY-FMKiUDiDkva0OotTExg=w2400' style="max-width: 49%; position: relative;"/></a>
</div>

<br>

### Background

\\
Data collection (as I've discovered) is a very tricky business. Here's my list of things you need to do to get meaningful results from data collection:

<br>

1. Good sensors with adequate resolution
2. Mounting the sensors to your system
3. Wiring the sensors to a computer or a small portable computer for a moving system like ours
4. Program the computer to collect data fast enough
5. Reliably store data
6. Analyize the data
7. Make changes and adjustments based off of the data

\\
Here's a parallel project that I did to work with a [hall effect sensor as research](/testRig/) for the group and as part of a class project.

<br>

### Development Work

\\
Before the Fall of 2019, GTOR had a few students working on measuring RPMs and setting up data aquisition systems. Their work was several years old by the time I got around to joining. The first thing we had to do was decide what kind of data we wanted to gather. We opted to get IMUs and place them on the suspension. Additionally, we had some linear potentiometers that we could mount to the shocks on the car. We used a MyRio to collect data.

<br>

<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.app.goo.gl/r7tfavzBz8yW75HL8'><img src='https://lh3.googleusercontent.com/6IQ0gmRmLJUxVfN0y9P3Pbz0hMecVxR9uZVhIN5UHd1NY9_EDxnWABfMWWL5SOc4TrMRERXOgNvmB3Be2aVtK1IaIKrjYVvIM6cSL_hVndYNMxcEB-i8ScJ9Cwblp-b_VLSyC7uGynU=w2400' style="max-width: 49%; position: relative;"/></a>
</div>

\\
We mounted our parts and coded the program. I learned how to use I2C on the accelerometers with labview. That was a cool experience to learn how to send values to the registers. Unfortunately, I didn't have a good grasp of how to increase the data collection rate, so the accelerometers did not gather useful data.

<br>

### Lessons Learned

\\
Data collection with sensors is very tricky. I would reccomend really understand what are the best computers to use for this process. Additionally, I think that it would be nice to consult industry experience to see how they measure things. I want to learn better how to do data measurement with python and C as well as FPGA stuff.

...