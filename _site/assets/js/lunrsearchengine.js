
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/about",
    "title": "About",
    "body": "I currently work as a Senior Data Scientist at Digitas Inc. Currently I am passionate about robotics, embedded deep learning and understanding Bayesian methods in machine learning. This blog is intended to be my scribbling place for hobby projects and things that I find interesting. Feel free to connect with me on Linkedin or on Twitter. "
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                                 Learning the environment through Deep Learning                              :               In the previous post we discussed the basics of building a robot; mostly the electronics and mechanical components of it, with a little bit of. . . :                                                                                                                                                                        25 Apr 2023                                                                                                                  All Stories:                                                                                                     Adding (Sarcastic) Voice Interaction Capabilities to the Robot              :       Coming Soon…:                                                                                25 Apr 2023                                                                                                                             Learning the environment through Deep Learning              :       In the previous post we discussed the basics of building a robot; mostly the electronics and mechanical components of it, with a little bit of the programming for basic motion. . . . :                                                                                25 Apr 2023                                                                                                                             Building Elementary Blocks of Robot Motion; Powered by Jetson Nano               :       Lately, I’ve been curious if embedded machine learing could make my life more fun, or even simplify it primarily along the lines of having a robot assistant or improve home. . . :                                                                                30 Mar 2023                                    "
    }, {
    "id": 4,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/adding-sarcastic-voice-interactions/",
    "title": "Adding (Sarcastic) Voice Interaction Capabilities to the Robot",
    "body": "2023/04/25 - Coming Soon… "
    }, {
    "id": 6,
    "url": "http://localhost:4000/Learning-an-environment/",
    "title": "Learning the environment through Deep Learning",
    "body": "2023/04/25 - In the previous post we discussed the basics of building a robot; mostly the electronics and mechanical components of it, with a little bit of the programming for basic motion. Here, in the following iteration we will be making the robot a little more intelligent with some machine learning! It was my friend’s suggestion to modify the robot’s construction and use a tank chassis since the wheels weren’t aligned enough resulting in sideways movement during forward motion. A tank track could also easily climb through the carpets and other uneven sufaces in my house. In addition, it can rotate or turn around itself any degree with minimal motion sideways. The picture shows the modified version of the robot. Although the mechanical parts have changed, this code that was used before is the same here to drive it. Additional Hardware: Camera ModuleThe camera that is being used here is IMX219, an infrared camera with 160 Degree FOV. It is assisted by two IR Leds on either sides as seen in the picture. The picture quality from this camera isn’t great from my experience, however for our project this does decently well. WirelessFor the wifi module, this Dual Mode AC8265 Wireless NIC Module is being used. Since python modules need to be installed, and some prebuilt models need to be downloaded, having a steady wifi connection would be a plus! Automating Movement: ObjectiveOne of the issues with the previous version of the robot, as mentioned earlier was its uncontrolled sideways motion although it was set on a straight path. In my case, this resulted in the robot drifting slowly off onto my fur floor carpet and getting stuck, or running off to under my furniture. A little bit of computer vision based deep learning is used here to automate the motion of the robot. Designing &amp; Implementing the solution Data Collection: I started off by defining a track for the robot, around the region of motion; in my case, this was my living room. To teach the robot about the track, plently of pictures were taken using the robot’s camera (what it could see during its motion). The pictures included parts of the normal track, what it’d see if it drifted sideways, or if it ran into some furniture. Some regions where the robot is expected to move forward (straight path besides the carpet):   Some regions where the robot is expected to reverse its path (eg. About to get stuck near some furniture, or near my house plant):   The idea here was to let the robot move a minimal amount of distance, capture a picture and let it decide which direction to move next. For training the first version of the decision making, I collected 500 images of my room.    The classifier: At least for the first version of decision making, I’ll be keeping things simple with a small multi-class classfier. The classifier has 4 classes (directions) - forward, reverse, turn-left, turn-right. To make things easy all the collected images were grouped into 4 different folders with the classname (direction) as foldername.     Training: After a bunch of experiments coding and tuning classifiers, I turned to Transfer learning. Using PyTorch framework, I loaded AlexNet and changed the fully connected layer to return the number of classes (4) in this use case. . The training code can be found here. The model reaches 99% accuracy in about 50 epochs. I wasn’t getting decent enough accuracy during early experiments. To check if I was losing accuracy for a specific class, I had the class level error rates printed out for each epoch. The best model was saved during training as best_model_tank_v1. pth.     Coding the Next-Step Decision Maker: The code for testing the motion of the robot controlled by this neural net classifier can be found here. As mentioned earlier, we make the motion in discrete steps. At each step of the motion, the robot captures an image, and decides an action for the next time step. The captured image is received as a numpy array parameter to this function, where it undergoes all the pre-processing which was done during the training of the classifier. The engine module also takes care of loading the previously saved weights from our best model during training, and setting it to eval mode for deployement. The classfied output corresponds to an index that maps to one of the four levels. Returning back to our motion iteration, if the decision made is forward, the robot moves 0. 4 seconds straight forward etc. This part of the code is particularily not intelligent, and has been customized according to the time taken by the robot for 90 degree sideways turns. Moving the robot in different directions has been detailed in the previous post.     Testing/ Deployment: A small portion of the robot motion guided by the classifier can be seen here: Clip 1: Robot Motion. Also, here is a short clip of the robot detecting objects in its path and choosing to move back to form a different path in the next timestep: Clip 2: Avoiding Collisions.  "
    }, {
    "id": 7,
    "url": "http://localhost:4000/elementary-blocks-of-robotics/",
    "title": "Building Elementary Blocks of Robot Motion; Powered by Jetson Nano ",
    "body": "2023/03/30 - Lately, I’ve been curious if embedded machine learing could make my life more fun, or even simplify it primarily along the lines of having a robot assistant or improve home automation. This blog post is about getting the basic hardware in shape for working towards that goal. Choosing the processor: When hobbists think about processors for embedded applications, the one that first comes to mind is the Raspberry Pi. However, supply chain issues in recent years have made it really hard to obtain one. For this reason, I started researching for alternate candidates and among them Jetson Nano was a clear winner. Jetson Nano is a small yet powerful computer developed by Nvidia Inc.  It can run AI frameworks and models, and is very power efficient. It is also supported by Nvidia’s JetPack SDK. In addition, it is priced reasonably for the hardware included! The robot we build here is similar to the Jetbot. Building the Chassis: For the load bearing component, I used components from this set. As seen in the pictures, the motion is controlled by the two wheels (motors) on either side and a rear-end freewheel. For the motors, instead of using the ones that came with this set, I’ve used these N20 motors that can withstand upto 6V. The Motor Driver CircuitThe movement of these motors have to be controlled through logic (or a program); a few of Nano’s GPIO pins needs to be programmed to pass turn signals. Since we have two motors for the bot, lets call them motor1 (Left) and motor2 (right). These motors are driven using the IC DRV8833 shown below. IN1 and IN2 provides turn direction signal for motor 1, and IN3 and IN4 for motor 2. The other inputs to the IC are Vcc and GND. We tap the unregulated 5V supply from GPIO pin 2 for Vcc voltage and a connection from pin 14 as the GND. OUT1 and OUT2 are the connections to motor1 and OUT3 and OUT4 are the connections to motor2. This circuit, wired on the breadboard is shown below. The voltages from even numbered GPIO pins (second row of the GPIO pins) has been wired to the breadboard using a ribbon cable   De-complicating this circuit after removing the breadboard and the ribbon cable, we have something that looks like the following left image. The image on the right is the same chassis, cleaned up a bit further to smooth motion.    Powering the processor: Since the robot has to move around its environment, a portable power source is inevitable. I am using the Waveshare UPS Power Module for Jetson Nano. This UPS needs four 18650 batteries. It comes with a small OLED display that provides information on batteries voltage, IP address, RAM usage, etc. collected via I2C pins (SDA and SDL). For activating this display, a service has to be enabled on the jetson OS. The UPS mounted on the chassis is shown below.  After placing the UPS, the board has been affixed on to the top layer of the chassis. Driving the motors using GPIO Controls. : Now that the body of the robot has been built, it is time to program the logic for its movement! The Nano has a 40 pin GPIO layout quite similar to the Raspberry Pi. Enabling voltage on selected pins and wiring them as input signals to the motors is how the robot motion would be controlled. The GPIO pins numbered 12, 16, 18 and 22 are the ones being used here for motion control. As mentioned earlier, IN1 and IN2 are the inputs of the motor driver chip for motor1. GPIO pins 12 and 16 has been wired to IN1 and IN2 to control the direction of motor1. Similarly, pins 18 and 22 are wired to IN3 and IN4 for controlling motor2. A logical high on IN1 (pin 12) drives motor1 forward whereas a logical high on IN2 (pin 16) drives it backward. Similarily, a logical high on IN4 (pin 22) drives the motor forward whereas that on IN3 (pin 18) drives it backward. The Code!:  For driving the robot forward, motor1 and motor2 needs to be turned in the forward direction, i. e we have to set logical highs on GPIO pins 12 and 22 (IN1 and IN4). For driving it back, motor1 and motor2 needs to be turned in the reverse directions, i. e pins 16 and 18 (IN2 and IN3) needs to set high. The Jetson GPIO python library is what is used here to change the signals on board pins. We use the BCM pin-numbering scheme from Raspberry Pi while programming the GPIO; there is a mapping of each board pin to a different BCM number. The following python code moves the robot 1 second forward and reverses 5 seconds! 1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162636465666768697071---import subprocessimport RPi. GPIO as GPIOimport timeimport nanocamera as nanofrom PIL import Imageimport sys# Pin Definitionsoutput_pin1 = 18 # BCM pin 18, BOARD pin 12output_pin2 = 23 # BCM pin 23, BOARD pin 16output_pin3 = 24 # BCM pin 24, BOARD pin 18output_pin4 = 25 # BCM pin 25, BOARD pin 22def turn_right(turn_time):  GPIO. output(output_pin1, GPIO. HIGH)  time. sleep(turn_time)     GPIO. output(output_pin1, GPIO. LOW)def turn_left(turn_time):  GPIO. output(output_pin4, GPIO. HIGH)  time. sleep(turn_time)     GPIO. output(output_pin4, GPIO. LOW)def forward(running_time):  GPIO. output(output_pin1, GPIO. HIGH)  GPIO. output(output_pin4, GPIO. HIGH)  time. sleep(running_time)  GPIO. output(output_pin1, GPIO. LOW)  GPIO. output(output_pin4, GPIO. LOW)  def reverse(running_time):    GPIO. output(output_pin2, GPIO. HIGH)  GPIO. output(output_pin3, GPIO. HIGH)  time. sleep(running_time)  GPIO. output(output_pin2, GPIO. LOW)  GPIO. output(output_pin3, GPIO. LOW)def initialize():  GPIO. setmode(GPIO. BCM)  GPIO. setup(output_pin1, GPIO. OUT, initial=GPIO. LOW)  GPIO. setup(output_pin2, GPIO. OUT, initial=GPIO. LOW)  GPIO. setup(output_pin3, GPIO. OUT, initial=GPIO. LOW)  GPIO. setup(output_pin4, GPIO. OUT, initial=GPIO. LOW)  def main(start):  # Pin Setup:  initialize()  # Move forward for 1 second and stop  forward(1)  # Move back for 5 seconds and stop  ---"
    }, {
    "id": 8,
    "url": "http://localhost:4000/quick-start-guide/",
    "title": "Let's test spoilers",
    "body": "2018/01/11 - Director Roland Suso Richter’s enigmatic psychological thriller (direct to video/DVD) was based upon screenwriter Michael Cooney’s own play “Point of Death” - a title that gave away the film’s entire plot twist premise. As in many similar films, such as Jacob’s Ladder (1990), Soul Survivors (2001), and The Butterfly Effect (2004), events and people were thoroughly distorted and confused because the protagonist was at the point of death. The tagline was misleading: “When You Don’t Have a Memory, How Can You Remember Who to Trust?” The mind-warping film opened with a hospital patient Simon Cable (Ryan Phillippe) awakening in a hospital with little knowledge (amnesia perhaps?) of what had happened, and why he was there, etc. He was told by attending Dr. Jeremy Newman (Stephen Rea) that it was July 29, 2002 (Simon thought it was the year 2000 - he was confused - he heard a doctor say 20:00 hours!) and that he had died for two minutes from cardiac arrest following the near-fatal accident – but he had been revived (“You’re as good as new”). Dr. Newman: “Simon, this is the 29th of July. The year is 2002. And your wife, whose name is Anna, is waiting outside. ” (The doctor left off four crucial additional words, revealed in the film’s ending. ) (Spoiler: Simon had died and was not resuscitated!). A major clue to everything that truly happened was the scene that played next under the credits - hospital staff failed to bring a patient back to life with a defibrillator after a car accident. Chest compressions failed and there was no pulse. A second major clue was provided by hospital orderly Travis (Stephen Graham): Everybody dies. No mystery there. But why and how everyone dies. Now, there’s a mystery worth solving. Probably the biggest mystery there is. So how do we do spoilers?: 1&lt;span class= spoiler &gt;My hidden paragraph here. &lt;/span&gt;"
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});