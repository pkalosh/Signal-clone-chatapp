// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCuTJAh71xDlUx0E8FJMXQv8AYtrGU9CM8",
    authDomain: "signal-app-clone-8f7d6.firebaseapp.com",
    projectId: "signal-app-clone-8f7d6",
    storageBucket: "signal-app-clone-8f7d6.appspot.com",
    messagingSenderId: "839131391714",
    appId: "1:839131391714:web:de6dcbd6f06bd3d9f120bb"
  };

  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };