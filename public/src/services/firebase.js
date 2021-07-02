import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/storage'
import 'firebase/messaging'
import firebaseConfig from './firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const storageRef = firebase.storage().ref();

if (process.env.NODE_ENV === 'development') {
    console.log('using auth emulator')
    auth.useEmulator("http://localhost:9099");
}

export const login = async (email, password) => {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    const authUser = await firebase.auth().signInWithEmailAndPassword(email, password);
    
    return authUser
}

export const createAuthUser = async (email, password) => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password)
    return authUser
}

export const getCurrentUser = async () => {
    return await firebase.auth().currentUser
}

export const refreshToken = async () => {
    const currentUser = await getCurrentUser()
    return await currentUser.getIdToken()
}

export const createImageRef = async (filename) => await storageRef.child(`images/${encodeURI(filename)}`);

export const uploadImage = async (image) => {
    /* // let imageExt = image.name;
    // let path = `${uuidv4()}.${imageExt}`;
    // console.log('path', path) */
    const ref = await createImageRef(image.name)

    console.log(image.name)
    const uploadTask = ref.put(image)

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.log('image upload error: ', error)
        }, 
        () => {
            // // Handle successful uploads on complete
            // // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            // .then((downloadURL) => {
            //     console.log('File available at', downloadURL);
            //     returnImageUrl(downloadURL)
            // });
        })

        return uploadTask.snapshot.ref.getDownloadURL()
}

export const uploadMultipleImages = async (images) => {
    const uploadPromises = []

    images.forEach((image) => {
        uploadPromises.push(uploadImage(image))
    })

    return await Promise.all(uploadPromises);
}

export const getClientToken = async (user, notification) => {
    try {
        const messaging = firebase.messaging();

        const token = await await messaging.getToken({vapidKey: "BHXGNrLARrxvcP2ai-b_iRepTHNVBK5AlB-8UcXsvHVXLJdIzxMsF1RmbS0BLynRZ3-RTRT8EDxo7nZdKegoNGo"});

        return token
    } catch(err) { 
        console.log(err)
    }
    
}


export default app;