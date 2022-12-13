// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCez5zzpuenn7xNnE5lP92wnKGV3a-z4mc",
    authDomain: "fit-talk-1539e.firebaseapp.com",
    projectId: "fit-talk-1539e",
    storageBucket: "fit-talk-1539e.appspot.com",
    messagingSenderId: "868548811634",
    appId: "1:868548811634:web:7870e58dfd1b4894ae9beb",
    measurementId: "G-6YKH4HGYSB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})
export const db = getFirestore(app)
