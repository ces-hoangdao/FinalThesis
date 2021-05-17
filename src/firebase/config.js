import firebase  from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDrjjSl4OLLn2baG5MK0bB6iGIpXahw-tU",
    authDomain: "images-test-143c5.firebaseapp.com",
    projectId: "images-test-143c5",
    storageBucket: "images-test-143c5.appspot.com",
    messagingSenderId: "568673656974",
    appId: "1:568673656974:web:03323d1e831984e11f29df"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
 const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { projectStorage, projectFirestore, timestamp };