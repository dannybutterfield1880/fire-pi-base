**Firebase setup guide**

First create a firebase project by going to the firebase website and pressing "Go to console" in the navigation bar.

![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2Fbanner.png?alt=media&token=4d5808ed-4d81-4805-a077-82cd90b014d7)

From here you can press "Add New" then choose a name

![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2Fcreated.png?alt=media&token=49e0a5c4-2d33-4f77-9220-b2bc90c16756)


Once you can access your project in the sidebar press upgrade (circled)


![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2Fsidebar.jpg?alt=media&token=8977bc76-835b-40e1-8a74-f3867d099237)


Then choose the Blaze package. You will now need to create a Google billing account if you don't already have one.


![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2Fpricing%201.png?alt=media&token=71f3ca1b-add9-4a59-9538-b3a2ed8948c0)

Once this is complete you will be able to set a budget alert 

![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2Fpricing%202.png?alt=media&token=6bba3e07-3adb-4934-950a-3f03dcd766f2)

I set my budget to $1 which means i will sent email notifications once my budget reaches $0.50, $0.90 and $1.00 when my service will be cut off. Meaning the most this project can cost me each month is $1.

![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2Fpricing%203.png?alt=media&token=9b4d2071-eca7-47be-93ef-63772c863d24)



![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2Fpricing%204.png?alt=media&token=9f3292d5-0fb6-44da-bd62-8dfe0d890130)


Now in your sidebar you should see 

![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2Fpricing%205.png?alt=media&token=d8cd72d9-9cff-482e-a640-3dbc98ce48be)

now firebase is set up to be able to run cloud functions (server side capability).

**Add Web App to your project**

Press the web app icon on your projects home page (circled)

![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2F2.png?alt=media&token=85b8e5ac-b39c-4d11-930f-ba5715cb89f6)

> Make sure you select Also set up Firebase Hosting for this app

![Project Created](https://firebasestorage.googleapis.com/v0/b/firepi-react.appspot.com/o/repo-guide%2F3.png?alt=media&token=a6b014bb-50ae-459a-aeed-f824ff5e1a7e)

Next you will need to install firebase-tools. For this you need node and npm installed.

if you do not have node and npm installed you can go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and download the correct version for your operating system (Windows/Mac).

For linux users follow this guide [https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/) for a list of all linux distributions.

**Now that node and npm is installed**

Open any command line tool and type:

`npm install -g firebase-tools`

Now you can login to firebase from the command line

`firebase login`

At this point do not run `firebase init`  or  `firebase deploy`.
