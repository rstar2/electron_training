// import the Firebase core and then the Firestore functionality that will be used
import firebase from 'firebase/app';
import 'firebase/firestore';


// Initialize Firebase
const config = {
    apiKey: "AIzaSyDElR8XJIg1krDJmQHrlykb7pjpTRtQUdM",
    authDomain: "traininglog-4a7a9.firebaseapp.com",
    databaseURL: "https://traininglog-4a7a9.firebaseio.com",
    projectId: "traininglog-4a7a9",
    storageBucket: "traininglog-4a7a9.appspot.com",
    messagingSenderId: "895735022739"
};
firebase.initializeApp(config);