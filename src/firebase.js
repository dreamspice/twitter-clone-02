import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6m2HPnFZ-03vYKZU2Dz8JmMLhciDQVBg",
  authDomain: "twitter-84fdc.firebaseapp.com",
  databaseURL: "https://twitter-84fdc-default-rtdb.firebaseio.com",
  projectId: "twitter-84fdc",
  storageBucket: "twitter-84fdc.appspot.com",
  messagingSenderId: "205047202269",
  appId: "1:205047202269:web:3785c5f5f65f36ba72b634",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
