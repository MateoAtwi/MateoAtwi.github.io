---
layout: post
title: Video Games for NEEMO 23
categories: projects
permalink: /kibosh/
author: Mateo Atwi
summary: At NASA in the Spring of 2019, I was tasked with creating [video games to be tested at NEEMO 23](/work&education/#advanced-exercise-intern-at-nasa-johnson-space-center-spring-2019). I created two games. The first game used the position telemetry from the MED-2 to map to a character position in the game. The second game received heart rate data from MoBI and used that to control the character's position vertically. I then went on to run operations at NEEMO 23 with a crew including an astronaut, an astronaut candidate, and two scientists.
thumbnail: https://lh3.googleusercontent.com/pwStv6sF32ZreBRNx7gkt2hZkOzbPVFA7RTb21JwgVDJj3oaHmDdKinIvs4lEUHkz-nFLWFSzHDXchLSeCd5BCqWgLggO5OkbLvysR--B-bXMGbq-f_tlog6oKe1W7lfNzM33-mhHIs=w2400
---

\\
{{ page.summary }}

<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.app.goo.gl/8nWTaaU3VXTfLWTi8'><img src='https://lh3.googleusercontent.com/ytBDPB4UZ2CCjqQUd0dNAnlLMuENwnDz6Dj-Rn4EspAvUd80m-xOdANectbyrQ7pXO8NWRBP4EC4knzqAslEkjNVD25NXNAAzE0W3E-Tyvvz2KJBLxULd-hQcebip_sOGwhJ5MvqB8w=w2400' style="max-width: 49%; position: relative;"/></a>
</div>

<br>

### Skills Learned and Used

<br>

* C#
* Unity
* MED-2
* MoBI
* Protobuf
* ZMQ
* Game Testing
* UI
* Data storage
* Rule making
* Gamification
* Game planning
* game mechanics

<br>

### Background

<br>

This is the second time that I work at NASA, so I didn't have to orient myself too much. I knew that I wanted to hit the ground running. My boss, Cody Burkhart, conferred with my team about aspirations and interests for the semester. We decided on roles and goals. I told him that I was interested in making a video game, so that's what I did. I designed a video game from scratch this semester. I worked on every part of this game from the back-end to the front-end. I learned so much programming in one semester. It was quite incredible. To top it all off, I was allowed to run the mission in Florida.

<br>

Here's what I had to do:

<br>

* Design a video game
* Program a video game
* Incorporate control from the MED-2
* Get HR data from MoBI
* Collect and store data
* Run mission operations at NEEMO 23

<br>

### Using Unity

<br>

I had only previously used Unity a little bit before, so it was very cool to learn more about it. I started to understand the work flow with prefabs, game objects, children, and components. Then I began to understand the usage of scripts in game objects. I learned how to generate objects and move them and detect collisions.

<br>

### MED-2

<br>

The miniature exercise device 2 (MED-2 ) is a device developed by NASA for use in space. It uses a motor with a cable to apply a force on the user based off of a feedback loop. I had to figure out the zmq protocol to communicate with the MED-2. I successfully read and commanded the MED-2 with netMQ in a C# script from Unity. More can be understood in my code base on how I did that. This was one of the biggest challenges that I overcame in this project.

<br>

In the end, I used the position of the cable from the MED-2 to control the position of the character on the screen. I would change the load based off of the user's selection in game or if the user got injured in game.

<br>

### MoBI Integration

<br>

I also figured out how to pull data from the modular bluetooth integrator (MoBI). I used this to get each user's heart rate data to display in real time in game. I had done this before with python, so it was challenging and cool to figure out how to do it in C#!

<br>

### ZMQ and Protobuf

<br>

I really figured out what I was doing this time around. I became pretty familiar with aspects of ZMQ and Protobuf. ZMQ is a great library for quickly and easily sending messages over a network between devices. It even works between languages! MoBI was transmitting with Python, and I was using C# to receive. Protobuf is used to serialize data to send using ZMQ, so it was very interesting to learn how to take the same packet from Python and read it in C#. Again, I won't go into depth here, but I have presentations and documentation for how to do this in my code.

<br>

### Operations

<br>

Running mission operations was one of my favorite parts of this whole project. It was stressful. It was tough, but it was so rewarding. As mentioned above our crew consisted of one flown astronaut, one astronaut candidate, and two scientists. So in essence, I got to see two astronauts and two prominent scientists play my video games! I could write a book about those two weeks I spent in Key Largo. I sat on console and talked with capcoms and made sure we got through NEEMO.

<br>

### Lessons Learned

<br>

Go for it. Develop smarter, faster, and harder!
