---
kind: work
role: Advanced Exercise Intern
org: NASA Johnson Space Center
logo: /assets/images/logos/meatball.png
start: 2019-01
period: Spring 2019
blurb: The Physiology-Sensing, Intelligent Optimization Nucleus (PSION) lab, led by ARED manager Cody Burkhart at NASA JSC, develops innovative solutions for human countermeasure systems in long duration space flight missions.
skills: ["C#", Unity Game Engine, ZMQ, Protobuf, Game Design, Linux, Human Factors, Bluetooth Low Energy, Hardware Test Plan]
highlights:
  - Game development in Unity with C# (<a href="/kibosh/">see the project</a>)
  - Integrated with Miniature Exercise Device 2 (MED-2) and Modular Bluetooth Integrator (MoBI)
  - Test plan for Hopper 3 hardware from IHMC
  - NASA Extreme Environment Mission Operations (NEEMO) 23 preparation
photos:
  - src: ../../assets/work/advanced-exercise-intern-at-nasa-johnson-space-center-spring-2019-1.jpg
    href: https://photos.google.com/share/AF1QipPXcma2HXJVc1wXmNLYSqzrReAGTpmpkTg9VoSiUcx6UCXcp5Fx2g8FDnbRW3lJVg?key=MThMU05INlhmTEpzS1d2VDRIVFZkcVJWc0xVdUN3&source=ctrlq.org
---

This semester I focused on two projects: a test plan for new exercise hardware and primarily developing games to be tested on the NASA Extreme Environment Mission Operations (NEEMO). NEEMO serves as an analogue for the International Space Station as well as future exploration missions. NEEMO is in a small underwater habitat that mimics the confined vehicles in space. So as part of a project to improve human fitness in long duration missions, I developed games to test if the interactive portion of the game will increase the user's performance. These games involved integration with the in-house exercise hardware, Miniature Exercise Device 2 (MED-2), and the in-house software package, Modular Bluetooth Integrator (MoBI), which provided the interactive element, biometrics, and telemetry for our game.

The other project that I worked on was a test plan for Hopper 3. ER3 is trying to create a database of exercise devices that can be used to keep records/compare & contrast different devices and their applications. The test plan that I developed can be done by a layman and was used to profile the device and its exercise envelope. I also worked to execute the first application of this test plan on the Hopper 3.

I developed the game from scratch. I created all the backend in C# to communicate via ZMQ with the MED-2 and MoBI. This particular application had never been used up to this point. I generated protobuf files for C# for the first time and learned how to make the ZMQ reply/subscriber sockets. Having established the backend, I started working on game states and conditions. Every state in the game has a corresponding state of MED-2 and MoBI data. Having established where and when data was needed, I proceeded to create the actual game dynamics, visuals, and play. One key outcome of integrating with the data collection scripts is that we can now post-process the raw data from the game/user.

Having established the architecture for the software in Unity, I generated two different game variations. The first game matches user position to their location on the screen based on telemetry from the MED-2. The second game uses heart rate to position the player on the screen. While these games will not be the final versions delivered as an on-orbit asset, they will provide lessons learned for future VR gamification in the Physiology-Sensing, Intelligent Optimization Nucleus (PSION) Lab. Therefore, the most important part of my work was the backend development that provides the foundation for more complex future games. Particularly, the expansion of our communications between MoBI and MED-2 beyond python to a protocol streamline using C#, directly integrated with Unity, is a massive upgrade to our system foundations.

Although not a main focus of my field of study, I learned a lot of programming workflows and techniques this semester. As a result, I understand, better, how software fits into larger systems and have increased interest in collaborative projects between computer science and mechanical engineering. This internship has shown how good hardware enables interesting and powerful software applications to maximize their impact.

### Code sample

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
