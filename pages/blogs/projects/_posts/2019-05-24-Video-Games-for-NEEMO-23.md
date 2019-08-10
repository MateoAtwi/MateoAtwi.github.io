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

*Please see the end of this page for code examples*

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

<br>

Code to send messages to MED-2:

<br>

```cs
//using System.Diagnostics;
using System.Collections.Concurrent;
using System.Threading;
using System;
using NetMQ;
using NetMQ.Sockets;
using UnityEngine;
//using static Request;
using Google.Protobuf;

public class NetMqRequester
{
    private readonly Thread _requesterWorker; //this thread will handle sending messages
    private bool _requesterCancelled;//this is a handy on/off switch to have for our loop

    private byte[] message; //this is the message to send
    private Request req = new Request(); //this is our protobuf class for a request
    private string reply; //use this to catch the string sent by the device
    private readonly ConcurrentQueue<Request> _messageQueue = new ConcurrentQueue<Request>();

    private string hostC = "127.0.0.1";
    private string portC = "42025";

    RequestSocket requester;

    //eventually I think you should just pass a message in through here
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
                        Debug.Log("Sending message");
                    }
                    if (_requesterCancelled)
                    {
                        poller.Stop();
                    }
                };
                requester.ReceiveReady += (s, a) =>
                {
                    reply = requester.ReceiveFrameString();
                    Debug.Log(reply);
                    if (_requesterCancelled)
                    {
                        poller.Stop();
                    }
                };

                //requester.SendFrame(message);
                poller.Run();
            }
            requester.Close();
        }
        //NetMQConfig.Cleanup();
    }



    public void SendMessage(Request rqst)
    {
        _messageQueue.Enqueue(rqst);
        Debug.Log("Request " + rqst.ToString());
    }

    public NetMqRequester()
    {
        req = new Request();
        _requesterWorker = new Thread(RequesterWork);
    }

    public void Start()
    {
        _requesterCancelled = false;
        _requesterWorker.Start();
    }

    public void Stop()
    {
        _requesterCancelled = true;
        NetMQConfig.Cleanup();
        _requesterWorker.Join();
    }
}

//public class MEDCommander : MonoBehaviour
public class MEDCommander
{
    public bool _requesterCancelled;
    private NetMqRequester _netMqRequester;

    public MEDCommander()
    {
        _netMqRequester = new NetMqRequester();
        _netMqRequester.Start();
    }

    private void Update()
    {
        //think about what you might want in the update function
        //get commands from your game here and change the MED based on them
    }

    public void SendMessage(Request rqst)
    {
        _netMqRequester.SendMessage(rqst);
    }

    public void Stop()
    {
        _netMqRequester.Stop();
    }
}
```

<br>

Code to receive messages from MED-2:

```cs
using System.Collections.Concurrent;
using System.Threading;
using System;
using System.Text;
using NetMQ;
using UnityEngine;
using NetMQ.Sockets;

public class NetMqListenerClone //We create this class to be a listener
{
    private readonly Thread _listenerWorker;

    public bool _listenerCancelled;

    public delegate void MessageDelegate(byte[] message);

    private byte[] frameByte; //current message

    private byte[] throwAwayMessage;

    private readonly MessageDelegate _messageDelegate;

    private readonly ConcurrentQueue<byte[]> _messageQueue = new ConcurrentQueue<byte[]>();

    private string hostC = "127.0.0.1";
    private string portC = "42024";

    private void ListenerWork()
    {
        AsyncIO.ForceDotNet.Force();
        using (var subSocket = new SubscriberSocket())
        {
            subSocket.Options.ReceiveHighWatermark = 1000;
            subSocket.Connect("tcp://"+hostC+":" + portC); //this is relative to the IP addres of the MoBI or other system you are connecting to
            //Debug.Log("tcp://" + hostC + ":" + portC);
            subSocket.Subscribe("");
            while (!_listenerCancelled)
            {
                //Thread.Sleep(250);
                //Debug.Log("Waiting for message");
                if (!subSocket.TryReceiveFrameBytes(out frameByte)) continue;
                if (_messageQueue.Count > 2)
                {
                    _messageQueue.TryDequeue(out throwAwayMessage);
                }//we never want the queue to grow too large
                _messageQueue.Enqueue(frameByte);
            }
            subSocket.Close();
        }
        //NetMQConfig.Cleanup();
    }

    public void Update()
    {
        while (!_messageQueue.IsEmpty)
        {
            byte[] message;
            if (_messageQueue.TryDequeue(out message))
            {
                _messageDelegate(message);
            }
            else
            {
                break;
            }
        }
    }

    public NetMqListenerClone(MessageDelegate messageDelegate)
    {
        _messageDelegate = messageDelegate;
        _listenerWorker = new Thread(ListenerWork);
    }

    public void Start() //runs on program start
    {
        _listenerCancelled = false;
        _listenerWorker.Start();
    }

    public void Stop() //runs on program stop
    {
        _listenerCancelled = true;
        NetMQConfig.Cleanup();
        _listenerWorker.Join();
    }
}


public class MEDCommunication
{
    private NetMqListenerClone _netMqListenerClone;

    private State medState; //create our MedEdp object that we created with protobuf

    private void HandleMessage(byte[] message)
    {
        medState = State.Parser.ParseFrom(message);
    }

    public float GetHandleForceDesN()
    {
        this.Update();
        if (medState != null)
        {
            return medState.HandleForceDesN;
        }
        return 0;
    }

    public ExerciseModeT GetExerciseMode()
    {
        this.Update();
        return medState.ExerciseMode;
    }

    public State GetState()
    {
        this.Update();
        return medState;
    }

    public float GetPosition()
    {
        this.Update();
        return medState.HandlePositionM;
    }

    public Boolean isStopped()
    {
        this.Update();
        if (medState == null)
        {
            return true;
        }
        return medState.ExerciseMode == ExerciseModeT.Stop;
    }

    public bool isHome()
    {
        this.Update();
        if (medState == null)//default state
        {
            return false;
        }
        return medState.AtHomePosition;
    }

    public MEDCommunication()
    {
        _netMqListenerClone = new NetMqListenerClone(HandleMessage);
        _netMqListenerClone.Start();
    }

    public void Update()
    {
        _netMqListenerClone.Update();
    }

    public void Stop()
    {
        _netMqListenerClone.Stop();
    }
}
```
<br>

Code to receive from MoBI:

```cs
using System.Collections.Concurrent;
using System.Threading;
using System;
using System.Text;
using System.Timers;
using NetMQ;
using UnityEngine;
using NetMQ.Sockets;

public class NetMqListener //We create this class to be a listener
{
    private readonly Thread _listenerWorker;

    private bool _listenerCancelled;

    public delegate void MessageDelegate(byte[] message);

    private byte[] throwAwayMessage;

    private readonly MessageDelegate _messageDelegate;

    private readonly ConcurrentQueue<byte[]> _messageQueue = new ConcurrentQueue<byte[]>();

    private DateTime latest;


    //To Do, I think this whole section can go in it's own class so that you only have to give it a host and port and you can connect to anything
    //I imagine a system where this is just a node that allows you to zmq
    //Then we have a node that allows you to protobuf decode the incoming stream as it comes in
    //private string host = "192.168.0.107";
    //private string port = "5556";
    private string host = "localhost";
    private string port = "12345";

    private void ListenerWork()
    {
        AsyncIO.ForceDotNet.Force();
        using (var subSocket = new SubscriberSocket())
        {
            subSocket.Options.ReceiveHighWatermark = 1000;
            subSocket.Connect("tcp://"+ host + ":" + port); //this is relative to the IP addres of the MoBI or other system you are connecting to
            subSocket.Subscribe(""); //Subscribe all
            while (!_listenerCancelled)
            {
                byte[] frameByte;
                Thread.Sleep(500);
                if (!subSocket.TryReceiveFrameBytes (out frameByte)) continue;

                if (_messageQueue.Count > 2)
                {
                    _messageQueue.TryDequeue(out throwAwayMessage);
                }//we never want the queue to grow too large

                _messageQueue.Enqueue(frameByte);
                latest = DateTime.UtcNow;
            }
            subSocket.Close();
        }
        NetMQConfig.Cleanup();
    }

    public void Update()
    {
        while (!_messageQueue.IsEmpty)
        {
            byte[] message;
            if (_messageQueue.TryDequeue(out message))
            {
                _messageDelegate(message);
            }
            else
            {
                break;
            }
        }
    }

    public bool queueEmpty()
    {
        return _messageQueue.IsEmpty;
    }

    public DateTime getTimeOfLatest(){
        return latest;
    }

    public NetMqListener(MessageDelegate messageDelegate)
    {
        //get ip config file
        try
        {
            string text = System.IO.File.ReadAllText("config.txt");
            host = text.Substring(0, text.IndexOf(':'));
            port = text.Substring(text.IndexOf(':') + 1, text.Length - text.IndexOf(':') - 1);
        }
        catch (Exception e)
        {
            Debug.Log(e.ToString());
        }


        _messageDelegate = messageDelegate;
        _listenerWorker = new Thread(ListenerWork);
    }

    public void Start() //runs on program start
    {
        _listenerCancelled = false;
        _listenerWorker.Start();
    }

    public void Stop() //runs on program stop
    {
        _listenerCancelled = true;
        _listenerWorker.Join();
    }
}


public class MoBICommunication
{
    private NetMqListener _netMqListener;
    private BtPacket MoBIPacket; //create our BtPacket object that we created with protobuf
    private TimeSpan hrDelayTolerance = TimeSpan.FromSeconds(5);
    private CsvWriter heartRateFile;
    private bool collect = false;

    private void HandleMessage(byte[] message)
    {

        MoBIPacket = BtPacket.Parser.ParseFrom(message); //parse the message into our protobuffer

        if (collect)
        {
            heartRateFile.AppendRow(DateTime.Now.TimeOfDay.ToString(), parseHR(MoBIPacket).ToString());
        }
    }

    public int getHR(){
        this.Update();
        if (MoBIPacket != null & ((DateTime.UtcNow - _netMqListener.getTimeOfLatest()) < hrDelayTolerance) )
        {
            return parseHR(MoBIPacket);
        }
        return -1;
    }

    public int parseHR(BtPacket packet)
    {
        String strData = packet.Data.ToStringUtf8(); //convert it to a Utf8 string
        strData = strData.Substring(2, 2); //grab the HR data
        return Int16.Parse(strData, System.Globalization.NumberStyles.HexNumber);
    }

    public MoBICommunication()
    {
        _netMqListener = new NetMqListener(HandleMessage);
        _netMqListener.Start();
    }

    //pulls the latest data
    public void Update()
    {
        _netMqListener.Update();
    }

    public void Stop()
    {
        _netMqListener.Stop();
    }

    public void startCollectingHR()
    {
        collect = true;
        heartRateFile = new CsvWriter(".", "HR");
        heartRateFile.CreateHeader("Time", "HeartRate");
    }

    public void stopCollectingHR()
    {
        collect = false;
    }

    public void continueCollectingHR()
    {
        collect = true;
    }
}
```
