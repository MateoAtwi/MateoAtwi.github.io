---
layout: page
title: Work&Education
permalink: /work&education/
---
This is a summary of all my work and education. Checkout [my projects page](/projects/) for more fleshed out descriptions and examples from my projects of the last few years.


* TOC
{:toc}

<br>
# Work
---

<br>
## Current: Research & Development Intern at Stuller
> Stuller, Inc. is the #1 supplier of fine jewelry, findings, mountings, tools, packaging, diamonds & gemstones for today's retail jeweler.

<br>
*Summer 2019*

<br>
More information after I am finished with the internship.

<br>
## Advanced Exercise Intern at NASA Johnson Space Center (Spring 2019)
> The Physiology-Sensing, Intelligent Optimization Nucleus (PSION) lab lead by ARED manager, Cody Burkhart, at NASA JSC develops innovative solutions for human counter measure systems in long duration space flight missions.

<br>
*Spring 2019*

<br>
### Skills: C#, Unity Game Engine, ZMQ, Protobuf, Game Design, Linux, Human Factors, Bluetooth Low Energy, Hardware Test Plan

<br>
### Summary
* Game development in Unity with C# ([Link to project](/kibosh/))
* Integrated with Minature Exercise Device 2 (MED-2) and Modular Bluetooth Integrator (MoBI)
* Test plan for Hopper 3 hardware from IHMC
* NASA Extreme Environment Mission Operations (NEEMO) 23 preperation

<br>
<details><summary><h3 style="margin: 0px; display: inline">Description</h3></summary>
<p>
This semester I focused on two projects: a test plan for new exercise hardware and primarily developing games to be tested on the NASA Extreme Environment Mission Operations (NEEMO). NEEMO serves an analogue for the International Space Station as well as future exploration missions. NEEMO is in a small underwater habitat that mimics the confined vehicles in space. So as part of a project to improve human fitness in long duration missions, I developed games to test if the interactive portion of the game will increase the user’s performance. These games involved integration with the in-house exercise hardware, Miniature Exercise Device 2 (MED-2), and the in-house software package, Modular Bluetooth Integrator (MoBI), which provided the interactive element, biometrics, and telemetry for our game.
<br>
<br>
The other project that I worked on was a test plan for Hopper 3. ER3 is trying to create a database of exercise devices that can be used to keep records/compare & contrast different devices and their applications. The test plan that I developed can be done by a layman and was used to profile the device and its exercise envelope. I also worked to execute the first application of this test plan on the Hopper 3.
<br>
<br>
I developed the game from scratch. I created all the backend in C# to communicate via ZMQ with the MED-2 and MoBI. This particular application had never been used up to this point. I generated protobuf files for C# for the first time and learned how to make the ZMQ reply/subscriber sockets. Having established the backend, I started working on game states and conditions. Every state in the game has a corresponding state of MED-2 and MoBI data. Having established where and when data was needed, I proceeded to create the actual game dynamics, visuals, and play. One key outcome of integrating with the data collection scripts is that we can now post-process the raw data from the game/user.
<br>
<br>
Having established the architecture for the software in Unity, I generated two different game variations. The first game matches user position to their location on the screen based on telemetry from the MED-2. The second game uses heart rate to position the player on the screen. While these games will not be the final versions delivered as an on-orbit asset, they will provide lessons learned for future VR gamification in the Physiology-Sensing, Intelligent Optimization Nucleus (PSION) Lab. Therefore, the most important part of my work was the backend development that provides the foundation for more complex future games. Particularly, the expansion of our communications between MoBI and MED-2 beyond python to a protocol streamline using C#, directly integrated with Unity, is a massive upgrade to our system foundations.
<br>
<br>
Although not a main focus of my field of study, I learned a lot of programming workflows and techniques this semester. As a result, I understand, better, how software fits into larger systems and have increased interest in collaborative projects between computer science and mechanical engineering. This internship has shown how good hardware enables interesting and powerful software applications to maximize their impact.

</p>
</details>
<br>

<details><summary><h3 style="margin: 0px; display: inline">Code Sample</h3></summary>
<p>
<div markdown="1">

```cs
//This requester is working in its own thread to communicate with the MED-2
private void RequesterWork()
    {
        AsyncIO.ForceDotNet.Force();
        //This is using the lazy pirate method of sending requests
        using (var requester = new RequestSocket())
        {
            NetMQTimer pollTime = new NetMQTimer(TimeSpan.FromMilliseconds(100));

            requester.Connect("tcp://" + hostC + ":" + portC);
            using (var poller = new NetMQPoller { requester, pollTime })
            {
                requester.SendReady += (s, a) =>
                {
                    if (_messageQueue.TryDequeue(out req))
                    {
                        message = req.ToByteArray();
                        a.Socket.SendFrame(message);
                    }
                    if (_requesterCancelled)
                    {
                        poller.Stop();
                    }
                };
                requester.ReceiveReady += (s, a) =>
                {
                    reply = requester.ReceiveFrameString();
                    if (_requesterCancelled)
                    {
                        poller.Stop();
                    }
                };
                poller.Run();
            }
            requester.Close();
        }
    }
```

</div>
</p>
</details>

<br>
<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.google.com/share/AF1QipPXcma2HXJVc1wXmNLYSqzrReAGTpmpkTg9VoSiUcx6UCXcp5Fx2g8FDnbRW3lJVg?key=MThMU05INlhmTEpzS1d2VDRIVFZkcVJWc0xVdUN3&source=ctrlq.org'><img src='https://lh3.googleusercontent.com/LckSD6euePL7ib0pA993QtHsHdseX1oZ3vqIj1ECYUmXMa7i8S8h3UVCX0K4WrFERvOULAvPHloHD5L8bviTqcFvdUl2E7zYBurQK5DvVRzdEEGFZ8LiXO9PAKj2ZFpfAmm6S6UhRiQ=w2400' style="max-height: 400px; position: relative;"/></a>
</div>

<br>
## Advanced Exercise Intern at NASA Johnson Space Center (Spring 2018)

<br>
*Spring 2018*

<br>
### Skills: Structures Design, Linux, Bluetooth Low Energy, Team Leading, Documentation, Mission Preperation, Python, ZMQ, Protobuf

<br>
### Summary
* Project managing and team leading for a group of 5 interns 
* Developed and demonstrated flight exercise software in LabView to test exercise equipment and sensors
* Designed test rig to convert Miniature Exercise Device 2 (MED-2) into a rowing machine
* Coded software in python for getting data from biosensors and displaying the raw data in a GUI
* Received award for best team of interns at NASA

<br>
<details><summary><h3 style="margin: 0px; display: inline">Description</h3></summary>
<p>
At NASA JSC in the Spring of 2018, I had the opportunity to work with a team of 5 interns as an Advanced Exercise Development Intern. ER3, the robotics and
simulation branch I worked under, is tasked with maintaining and developing current and future exercise solutions for The International Space Station and long
duration space flight missions. The intern team I worked with was charged with preparing software and an experiment for the NASA Extreme Environment
Mission Operations (NEEMO). NEEMO is an underwater ground analog for space flight missions, and we created a test to validate new technologies being
developed for long duration missions. Details of our project are as follows: develop a software application that can display data in an interactive and visual way,
create procedures for an experiment on NEEMO to test our application as well as the MED-2 (Miniature Exercise Device 2) with its rowing functionality, and test
sensors with a Modular Bluetooth Integrator (MoBI) which will be integrated into the application.
<br>
<br>
I functioned as a Team lead and software engineer. I worked on backend software that helped tunnel the data from MoBI to our application. Additionally, I
supported the design, prototyping, and testing of our GUI. I designed a tower for testing rowing on the MED. I ran compatibility and functionality tests for sensors
with MoBI. As a Team lead I arraigned meetings, brought food, and helped set goals for our work. I also acted as a point of contact for external groups such as
our mentors and any other external help we needed. I also made, managed, and ran the demonstrations and presentations for our branch chiefs. Towards the
end of the semester, I designed a rowing rig in Creo Parametric that allows the MED-2 to be used as a seated rowing device.
We successfully setup and tested MoBI on a Raspberry Pi 3 platform for the first time. Furthermore, we demonstrated real time data flow with Polar H7 and the
Empatica E4 such that those devices could be used on NEEMO or Space Station. We developed from concept to product for our application. We also developed
the entire experiment to be used on NEEMO. This rowing rig was later built by interns after me and tested by the lab.
I’ve learned a lot more python. I learned a lot about Bluetooth, sensors, and Linux. From a business engineering side of things, I was able to have a lot of
conversations about the structure of NASA and why it works and how it needs to improve. Leading taught me a lot about scheduling time and breaking down the
task of developing a project. Together, our team pioneered new ways to collect human data in real time for spaceflights.
</p>
</details>

<br>
<details><summary><h3 style="margin: 0px; display: inline">Code Sample</h3></summary>
<p>
<div markdown="1">

```python
# This class is used to subscribe to the heart rate data published by MoBI
class HeartRateMeasurement(object):
    host = "192.168.0.101"
    context = zmq.Context()
    subSocket = context.socket(zmq.SUB)
    subSocket.connect("tcp://%s:5556" % host)
    subSocket.setsockopt_string(zmq.SUBSCRIBE, "")
    topicName = "Polar H7 AEA87610/Heart Rate/Heart Rate Measurement"

    # call this method to get the heart rate as passed from MoBI
    @classmethod
    def getHR(cls):
        rate = 0
        try:
            while True:
                try:
                    packetString = cls.subSocket.recv(zmq.NOBLOCK)
                except zmq.ZMQError:
                    return rate
                btPacket = BtPacket_pb2.BtPacket()
                btPacket.ParseFromString(packetString)
                if btPacket.topicName == cls.topicName:
                    print(btPacket.topicName)
                    data = btPacket.data
                    rate = int(data[2:4], 16)
                    print(" heart rate: %d" % rate)

        except KeyboardInterrupt:
            exit(0)
        return rate
```

</div>
</p>
</details>

<br>
<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.google.com/share/AF1QipOv7u9SQpfJVo_DFKJFrT0T2P5NJLjSePt1DRpmz9Zr_3HHiCSTXpr8W-UnJMTXhA?key=UWtjbm9PNlBjZEU5dlVpb2dBNk53cG8xX29UNEhB&source=ctrlq.org'><img src='https://lh3.googleusercontent.com/ERzSGNXqC8YCEsgkIUQWP2MX8nUW9nwFH3ayoNIgLJOclq4ckg842pqnJm347hqIbX4uL4WHkG_q-kUeslZcOhOKs7HfDgqelq4l_5wKkmclmBzDiqyty6iA6NgSlcAXHkyZeIn4fm4=w2400' style="max-width: 49%; position: relative;"/></a>
<a href='https://photos.google.com/share/AF1QipOn8-58uW6O-VgotFAZdHjaPgwHo83AW8KnlVCQfL_KO7zgeHOK6_9Krxytg4Nc5Q?key=cktvX3Q1ZFJqSWV1R3dRLWZIb1FINFY3ODhZWnRR&source=ctrlq.org'><img src='https://lh3.googleusercontent.com/PSIgBabIXNqQAmnZoQN_PD3gy877pplVjFJrbtvXWqfAehbfNq4C4i8NhM0mzA3B9JXHNti-lgzU35B8ESSf93dyuVcM6jF4tvDGlkGmbzYWjYbBbLJkt7qYeO7QW7x6yaw-zSiPuLM=w2400' style="max-width: 49%; position: relative;"/></a>
</div>

<br>
## Mechanical Intern at Landis+Gyr
> From advanced smart metering technology to renewables, Landis+Gyr has the solutions, services and technology to bring the grid into the modern digital age.

<br>
*Spring 2017*

<br>
### Skills: Creo Parametric, 3D Printing, IP-67 Testing, CAD Drawings for Manufacturing, Tolerances, Prodct Life Cycle Management

<br>
### Summary
* Designed and tested utility meters for IP 67 rating with 3D printed parts
* Modeled testing components and parts with Creo Parametric and learned how to use Arena software
* Learned how to use the Python Selenium library to automate repetitive tasks on my computer


<br>
<details><summary><h3 style="margin: 0px; display: inline">Description</h3></summary>
<p>
The mechanical team at Landis+Gyr develops water proof enclosures for electrical meters. Currently, all the utility meters are becoming radio controlled, so that
they can wirelessly send data without having anyone go read the actual meter. The point of enclosure design is to make sure the meters can withstand wet and
dirty conditions while having their antennas, power cables, and internet cables be external. With Landis+Gyr I've learned how to use Creo Parametric to create
and edit parts and drawings. I came in with no Creo experience. I had cadding experience, but I still had to learn the new program. I also learned how to do
cabling, the process of routing cables in the enclosures to see how long they need to be and where they will fit in the assembly instructions.
<br>
<br>
One of my tasks
was to edit and make professional engineering drawings for manufacturers and assembly plants based on decisions of the main engineers. I also conducted
IP67 testing. IP67 is a standard for how waterproof an design is. Specifically, something has to stay under a meter of water for 30 minutes without leaking. In
order to test this, I had to make test rigs that either submerged the testing part or 3D printed adapters for pipes so that I could fill them with water. I worked on
contacting suppliers to test and get materials for test rigs. Additionally, I tested different gasket cut outs and materials for enclosures. When waiting for
assignments, I started learning how to automate my browser using python with the selenium library. It was really engaging and fun to watch my computer start to
take over my menial tasks and do them with 100 percent precision and at a much faster rate. The main task I automated was updating part revision numbers in
the software that managed revision histories.
</p>
</details>

<br>
<div class="separator" style="clear: both; text-align: center;">
<a href='https://photos.google.com/share/AF1QipPvSbFC1PTlgx0i-dF4BAwLZKmwI5SxaknJoAkEL3kVP0ZJDyX4Ato6Au2ZFjFwhA?key=OEUtM2Y5N3FtSTM0aHlLdW5pZl9DRDluNDRpV3d3&source=ctrlq.org'><img src='https://lh3.googleusercontent.com/zUP242m9erMlKklC0SUJxHRgm1inXRtI-FOAYRhLl_uLpp77atqggwowifbnQP4oWl5iVEOCcV9brshjXt_cxWBRiWXrk6gxvnSXLJ6rKyTiihFL_yDBQyBP7bpqWLtGFsSPB_wg0fc=w2400' style="max-width: 49%; position: relative;"/></a>
<a href='https://photos.google.com/share/AF1QipPw593ngFU8AB0v-pMIA4b6XPqcVvPLI6-5Bb15k6HfIqHPh3tX7SRCeho8bYTQDA?key=ZGRXRW9QTUsydGM5OWhzbzR0YTZhZlBkYnBtS1ln&source=ctrlq.org'><img src='https://lh3.googleusercontent.com/xFCxeoG7LolzrxDuA_Jg8r_JQnzTmMb2YH7kNm-oph-ZvyA6KTHnfEfqXcyoxW0bqcNYacKXqqksZNnw5hgWc8KxSGUvp--YoGPnqyxBc6_N3rJy_hR4sfsEbn_q7SlB-R97fUothHg=w2400' style="max-width: 49%; position: relative;"/></a>
</div>
<br>

# Education
---

<br>
## Current: Bachelors in Mechanical Engineering at Georgia Tech
> The Georgia Institute of Technology, also known as Georgia Tech, is a top-ranked public college and one of the leading research universities in the USA.

<br>
*Fall 2015 - Fall 2019*

<br>
* GPA: 3.90
* Credit hours: 121/129
* Clubs:
	* Reformed University Fellowship (RUF) *Fall 2015 - Now*
		* Small Group Leader, Worship Team
	* Theta Xi Fraternity *Fall 2016 - Fall 2018*
		* T-shirt Chairman, Member Education Meetings Coordinator
	* Invention Studio *Fall 2017 - Now*
		* Prototyping Instructor
	* Georgia Tech Off Road (GTOR) *Fall 2019 - Now*
		* Data Aquisition Engineer
	* GT Chamber Choir *Fall 2015 - Now*
		* Bassist

<br>
<details><summary><h3 style="margin: 0px; display: inline">Description</h3></summary>
<p>

<br>
At Georgia Tech, I have taken up to senior level classes in Mechanical Engineering which includes the following classes: Circuits and Electronics, Statics,
Dynamics, Fluid Dynamics, Thermodynamics, Numerical Methods with Matlab, Heat Transfer, Deformable Bodies, System Dynamics, and a design and build
class. In the design and build class, I worked with a team of 3 other students to create a mechatronics robot to compete with other team's robots. I learned to
use and program a myRIO with LabView and work with various sensors to collect data. Outside of my major, I have taken a couple of classes in the computer
science major. The classes are Introduction to Java and course that covered computers from transistors to programming in C including programming in
Assembly and the circuitry of computers. In addition to analytical skills, I have learned and used a lot of design and prototyping skills both in and out of the classroom. My work with the
Invention Studio Maker Space and Georgia Tech Off Road develops and hones my engineering acuity.
</p>
</details>