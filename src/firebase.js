// import the Firebase core and then the Firestore functionality that will be used
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const apiKey = process.env.VUE_APP_FIREBASE_API_KEY;
const projectId = process.env.VUE_APP_FIREBASE_PROJECT_ID;
const messagingSenderId = process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID;

// Initialize Firebase
const config = {
  apiKey,
  projectId,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
