import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAe9Ut2Us-408VPhKq8Tb9eBtfHJQLNnfs",
  authDomain: "docs-clone-1c0a8.firebaseapp.com",
  projectId: "docs-clone-1c0a8",
  storageBucket: "docs-clone-1c0a8.appspot.com",
  messagingSenderId: "305015132041",
  appId: "1:305015132041:web:5155adfbfcb9ed541bdb58",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db }; 