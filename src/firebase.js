import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUS-qtexk8Dmzq26zKmZPR9PDv20ePF28",
  authDomain: "yo-random-mads.firebaseapp.com",
  databaseURL: "https://yo-random-mads.firebaseio.com",
  projectId: "yo-random-mads",
  storageBucket: "yo-random-mads.appspot.com",
  messagingSenderId: "813929221121",
  appId: "1:813929221121:web:2e758a866cd9294f0e0400",
  measurementId: "G-ZC51Z17963",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAppAuth = firebaseApp.auth();
export const database = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();
