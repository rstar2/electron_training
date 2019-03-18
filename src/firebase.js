// import the Firebase core and then the Firestore functionality that will be used
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const apiKey = process.env.VUE_APP_FIREBASE_API_KEY;
const projectId = process.env.VUE_APP_FIREBASE_PROJECT_ID;
const messagingSenderId = process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID;

// Initialize Firebase
const config = {
  apiKey,
  projectId,
  // authDomain has to be changed when using real production custom domain,
  // and when this custom domain is added in the the list of authorized domains in Firebase Console
  // Also in Google Console it should be in the whitelist of the redirect URLs
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

export { db, auth, functions, firebase };
