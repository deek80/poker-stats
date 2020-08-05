import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  appId: process.env.REACT_APP_appId,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
});

export const {auth, database} = firebase;
