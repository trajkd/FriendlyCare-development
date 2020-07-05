# FriendlyCare
The Friendly Care web app was built in occasion of the 2020 [TIM Smart Spaces Hackathon](https://events.codemotion.com/hackathons/hackathon-tim-smart-spaces/home/) by team21.

## Demo
***IMPORTANT*** Please access the website one at a time, as the Cloud Vision API has a rate limit of 1 request per second.
https://friendlycare.uc.r.appspot.com
## The challenge
#### **Topic 5: Care Residence**

> In che modo la tecnologia può avere un reale impatto sulle modalità di
> utilizzo degli spazi in cui ci prendiamo cura dei nostri cari?

In which way technology can have a real impact on the use of spaces in which we take care of our loved ones?

> Esploriamo il potenziale delle più moderne tecnologie nel contesto
> dell’assistenza a persone in difficoltà, anziani e disabili
> nell’ambito ospedaliero o dei servizi di health care.

Let's explore the potential of the most cutting-edge technologies within the context of assistance to people in need, the elderly and the disabled in an hospital setting or health care services.

## Our proposed solution
We've built a web app that tracks the emotion/mood through facial recognition and vocal interaction and provides suggestions and alerts about your level of motivation and tiredness. This will help the person or his caregivers to get a good picture about what they are feeling.

## Usage of APIs
In order to work properly, the web app needs to communicate with a few APIs. 

 - [Cloud Vision](https://5g-api-portal.telecomitalia.it/apiexposure/web/node/54) for facial recognition
 - [Dialogflow](https://5g-api-portal.telecomitalia.it/apiexposure/web/node/63) for the chatbot

***IMPORTANT*** Kindly replace the API key with your API key inside `/static/js/compute.js`.

    var settings = {
		"url": "https://hackathon.tim.it/gcloudvision/v1/images:annotate",
		"method": "POST",
		"timeout": 0,
		"headers": {
		// Change to your API key
		"apikey": "xyladasjdj23knw22oo2no2",
		"Content-Type": "application/json"
		},
		"data": JSON.stringify({"requests":[{"image":{"content":canvas.toDataURL("image/png").split(",")[1]},"features":[{"type":"FACE_DETECTION"}]}]}),
	};

## Installation
### Installing App Engine with Google Cloud SDK
#### For MacOS and Linux
##### Google Account 
If you haven’t already got a Google account, you can register for one [here](https://accounts.google.com/SignUp). 
##### Create App Engine Project 
Next you’ll create your App Engine project. Start by navigating to https://console.cloud.google.com/start, select email contact preference and agree to Google Cloud Platform's terms and conditions. You might need to setup your billing information. Click on the `Projects` drop down in the menu bar at the top of the page and click `Create project`. Type a name for your project. Note that a unique project ID is created on the line below. This is the ID that you will use when working with the `gcloud` command. Wait around 30 seconds for your new project to be created and for its dashboard to load. Your unique project ID can also be found at the end of the URL on this page.

##### Python 
Please check you have a version of Python 2.7 with the following command: 
`python -V` 
If the python command is not found or the version is lower than 2.7, please install or update Python. For MacOS, installers are provided on the python.org site, or use the Homebrew package manager. For Linux, use your distribution's package manager (apt-get for Ubuntu, yum for Red Hat/CentOS) or download from python.org.

#### Install Google Cloud SDK 
##### Downloading and extracting on MacOS 
The following detailed steps are based on these [instructions](https://cloud.google.com/sdk/docs/#mac), provided by Google. Visit that link and download the correct package file, depending whether your OS is 64 or 32-bit. Save it to the root of your home directory (`~/`). 
Extract the gzip file here, either with your file manager or with the following console command: 

    tar -zxvf google-cloud-sdk-nnn.n.n-darwin-x86[_64].tar.gz

 
The contents of the archive should now being in the directory `google-cloud-sdk` in the root of your home directory.

##### Downloading and extracting on Linux 
It is recommended to use the general method for installing the Google Cloud SDK (GCS) on to a Linux machine, rather than the packages provided for some distributions. GCS can update itself and its components. It will provide a notice about available updates, when they are available. 
The following detailed steps are based on these [instructions](https://cloud.google.com/sdk/docs/#linux), provided by Google. Visit that link and download the correct package file, depending whether your OS is 64 or 32-bit. Save it to the root of your home directory (`~/`). 
Extract the gzip file here, either with your file manager or with the following console command: 
`tar -zxvf google-cloud-sdk-nnn.n.n-linux-x86[_64].tar.gz` 
The contents of the archive should now being in the directory `google-cloud-sdk` in the root of your home directory.

##### Run installation script and initialize GCS 
Next, run the following install script to add the GCS tools to your path, etc.: 

    ./google-cloud-sdk/install.sh

 
Now close your terminal and open a new one, to allow for the changes to take effect. 
You now need to initialise the SDK - allowing it access to your Google account and set the default configuration. You should be able now to just issue the command: 

    gcloud init

 
...as the `gcloud` command is now on your path. If it didn’t work, you can give the full path (the below path assumes you have installed google-cloud-sdk to your home directory) to the command instead: 

    ./google-cloud-sdk/bin/gcloud init

 
You will be asked to login to your Google Account (or if you are already logged in, give GCS access to your account). 
Since you have only one project, this project will be your default project. As you add more projects, you can either reset the default (see `gcloud topic configurations` to learn more) to another project or specify which project you want to operate on with the `--project <project id>` option to `gcloud` commands.

##### Location of configurations and credentials on Linux 
If you ever need to delete your GCS configurations and login credentials, these are stored in the following location: 
`~/.config/gcloud`

#### Install App Engine Python Extensions 
Since the `gcloud` command can manage all of Google’s cloud development platforms, not everything is installed by default. You need to install the Python version of App Engine that is used throughout this project. 
You can list currently installed and available components with the command: 
`gcloud components list` 
Go ahead and install the App Engine Python Extensions with the command: 

    gcloud components install app-engine-python

 
To find out more information about the available components, navigate your browser [here](https://cloud.google.com/sdk/docs/components).

#### Your App Engine webapp 
With Git installed, clone the repo. Once you have the code, change your current directory with the following command: 
`cd FriendlyCare` 
To run App Engine locally, you use the command `dev_appserver.py` - a Python script program. If this file is in your user PATH environment variable, the next command to run is: 

    dev_appserver.py .

 
Notice the dot (or full stop) on the end of the command. That’s very important and tells the command to use the current directory to search for a file called `app.yaml`. This file configures the App Engine webapp. Giving `dev_appserver.py` this file directly as an argument will also work. 
If you find the command `dev_appserver.py` is not found, either add its location to your path (instructions [here](http://www.tecmint.com/set-path-variable-linux-permanently/)), or pass the file to Python with the command: 

    python ~/google-cloud-sdk/bin/dev_appserver.py .
##### Firewall 
Depending on the configuration of your firewall software, you may receive a pop-up notification asking to give Python permission to accept incoming network connections. In order to proceed, please allow these connections for Python. 
#### Browse your first app 
To look at the web output of the your first app, go to this address in your browser: 
http://localhost:8080 
Each App Engine app also has an admin server at the following address: 
http://localhost:8000 
This has many useful features, like the Datastore Viewer. There’s not a lot to see at the moment, but come back to this page when you start putting data into the Datastore: 
http://localhost:8000/datastore
##### Stop the server 
To stop the local server, press the key combination `Ctrl+C`.
#### Deploy your app to the cloud 
You can deploy your app to the cloud so anyone in the world can view it with the following command: 

    gcloud app deploy

 
This will deploy your default project in the current configuration. You can also specify another project or version of a project. More details on this options are [here](https://cloud.google.com/appengine/docs/python/quickstart#deploy_your_app). 
Once deployed, your app will be available to view and use at the address http://[YOUR_PROJECT_ID].appspot.com. Or issue the command: 
`gcloud app browse` 
which will open up your default browser to the public URL for the project. This may not work though, depending on your configuration.

## Usage
Once the web app is live you can start using its intuitive interface. Make sure to allow access to your webcam from the browser and just be in front of the camera and watch your mood and emotions being tracked. Use the chatbot on the bottom right for more interaction. 
Enjoy and stay well!

## Dialogflow chatbot example
Install this [Chrome extension](https://chrome.google.com/webstore/detail/github-%2B-mermaid/goiiopgdnkogdbjmncgedmgpoajilohe/related?hl=en) to view the diagram below in GitHub.

```mermaid
sequenceDiagram
Me ->> hAPI: Ciao
hAPI->> Me: Ciao!
Me->>hAPI: Come sto?
hAPI->> Me: Sembri motivato. 
hAPI->> Me: Continua così! 
hAPI->> Me: Parlami di cosa stai pensando 
hAPI->> Me: e analizzerò meglio il tuo stato d'animo.
Me->>hAPI: Oggi è una bella giornata.
