import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyC9po2Vax8AXnJVpPqtff9p3S6OjbjkS-w",
    authDomain: "keeper-app-704a9.firebaseapp.com",
    projectId: "keeper-app-704a9",
    storageBucket: "keeper-app-704a9.appspot.com",
    messagingSenderId: "1065893585345",
    appId: "1:1065893585345:web:426c00cdb28b3871658f40"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export {auth ,provider};
  export default db;
