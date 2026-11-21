---
kind: work
role: Advanced Exercise Intern
org: NASA Johnson Space Center
logo: /assets/images/logos/meatball.png
start: 2018-01
period: Spring 2018
skills: [Structures Design, Linux, Bluetooth Low Energy, Team Leading, Documentation, Mission Preparation, Python, ZMQ, Protobuf]
highlights:
  - Project managing and team leading for a group of 5 interns
  - Developed and demonstrated flight exercise software in LabView to test exercise equipment and sensors
  - Designed test rig to convert Miniature Exercise Device 2 (MED-2) into a rowing machine (<a href="/rowingTower/">see the project</a>)
  - Coded software in Python for getting data from biosensors and displaying the raw data in a GUI
  - Received award for best team of interns at NASA
photos:
  - src: ../../assets/work/advanced-exercise-intern-at-nasa-johnson-space-center-spring-2018-1.jpg
    href: https://photos.google.com/share/AF1QipOv7u9SQpfJVo_DFKJFrT0T2P5NJLjSePt1DRpmz9Zr_3HHiCSTXpr8W-UnJMTXhA?key=UWtjbm9PNlBjZEU5dlVpb2dBNk53cG8xX29UNEhB&source=ctrlq.org
  - src: ../../assets/work/advanced-exercise-intern-at-nasa-johnson-space-center-spring-2018-2.jpg
    href: https://photos.google.com/share/AF1QipOn8-58uW6O-VgotFAZdHjaPgwHo83AW8KnlVCQfL_KO7zgeHOK6_9Krxytg4Nc5Q?key=cktvX3Q1ZFJqSWV1R3dRLWZIb1FINFY3ODhZWnRR&source=ctrlq.org
---

At NASA JSC in the Spring of 2018, I had the opportunity to work with a team of 5 interns as an Advanced Exercise Development Intern. ER3, the robotics and simulation branch I worked under, is tasked with maintaining and developing current and future exercise solutions for The International Space Station and long duration space flight missions. The intern team I worked with was charged with preparing software and an experiment for the NASA Extreme Environment Mission Operations (NEEMO). NEEMO is an underwater ground analog for space flight missions, and we created a test to validate new technologies being developed for long duration missions. Details of our project are as follows: develop a software application that can display data in an interactive and visual way, create procedures for an experiment on NEEMO to test our application as well as the MED-2 (Miniature Exercise Device 2) with its rowing functionality, and test sensors with a Modular Bluetooth Integrator (MoBI) which will be integrated into the application.

I functioned as a team lead and software engineer. I worked on backend software that helped tunnel the data from MoBI to our application. Additionally, I supported the design, prototyping, and testing of our GUI. I designed a tower for testing rowing on the MED. I ran compatibility and functionality tests for sensors with MoBI. As a team lead I arranged meetings, brought food, and helped set goals for our work. I also acted as a point of contact for external groups such as our mentors and any other external help we needed. I also made, managed, and ran the demonstrations and presentations for our branch chiefs. Towards the end of the semester, I designed a rowing rig in Creo Parametric that allows the MED-2 to be used as a seated rowing device.

We successfully set up and tested MoBI on a Raspberry Pi 3 platform for the first time. Furthermore, we demonstrated real time data flow with Polar H7 and the Empatica E4 such that those devices could be used on NEEMO or Space Station. We developed from concept to product for our application. We also developed the entire experiment to be used on NEEMO. This rowing rig was later built by interns after me and tested by the lab.

I've learned a lot more Python. I learned a lot about Bluetooth, sensors, and Linux. From a business engineering side of things, I was able to have a lot of conversations about the structure of NASA and why it works and how it needs to improve. Leading taught me a lot about scheduling time and breaking down the task of developing a project. Together, our team pioneered new ways to collect human data in real time for spaceflights.

### Code sample

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
