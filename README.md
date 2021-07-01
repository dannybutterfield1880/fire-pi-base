# fire-pi

Boilerplate for creating Pi Network integrated web apps running on the Firebase platform.

**Firebase**

[https://firebase.google.com/](https://firebase.google.com/)

Firebase is a Google product and is a decendant of and runs on the Google Cloud platform. There are pricing packages; Spark plan (free with limitations) or Blaze (pay as you go with free limitations). Basically this means its free to begin with and the cost will all depend ultimitaly depend on site traffic. If the site doesn't take off it wont cost a thing! 

This all includes hosting, serverless cloud functions (server side on the cloud), storage for file upload, authentication, and so much more. Baring in mind everything has a limitation for free use.

[Firebase pricing page](https://firebase.google.com/pricing)

> **Important: To use this boilerplate you will need to active the Blaze plan as the firebase cloud functions are required but don't worry we will set a very low budget and we will not hit it. It will be completely free to develop.**

To enable to Blaze plan you will need to enter debit/credit card details.

For a full guide on how to create and setup your firebase project [click here](Firebase.md)

**You should now have a fully set up firebase project and be ready to develop your app**

Go to your projects folder (I use C:\\Users\danny\Projects) and run:

`git clone https://github.com/dannybutterfield1880/fire-pi-base pi-app` 

This will pull in the fire-pi boilerplate and put it in a directory called pi-app. You can now open this directory from your favourite code editor. I'll be using VS Code.

Get your Pi Apps API Key

Set pinetwork.apikey variable in firebase functions, this is to protect your api key. Only firebase functions will be able to access this variable.

`firebase functions:config:set pinetwork.apikey="YOUR API KEY HERE"`






