import firebase from "firebase/app";
import "firebase/firestore"; // NEW
import "firebase/auth";
import "firebase/storage";
// import "firebase/message";

const config = {
  apiKey: "AIzaSyD_3MkHdqwpz4N8_M-aKtcXh4MLSiJabH0",
  authDomain: "slack-clone-react-firebase.firebaseapp.com",
  databaseURL: "https://slack-clone-react-firebase.firebaseio.com",
  projectId: "slack-clone-react-firebase",
  storageBucket: "slack-clone-react-firebase.appspot.com",
  messagingSenderId: "884938332115"
};

window.firebase = firebase;

try {
  firebase.initializeApp(config);
} catch (e) {}

export const firestore = firebase.firestore(); // NEW
export const firebaseAuth = firebase.auth();
export const storage = firebase.storage();
// export const messaging = firebase.messaging();

export const provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = () => firebaseAuth.signInWithPopup(provider);
// export const signOut = () => firebaseAuth.signOut();

// messaging.usePublicVapidKey("BHu_3-U19kvS9Wmpb64oDVtuV5eKcDxF6x7dR-GvqwlPoG8wF3SLiOPAusmq5PIzImWjhpHnN8YkoxkRPL2Y5NQ....moL0ewzQ8rZu");

export default firebase;
