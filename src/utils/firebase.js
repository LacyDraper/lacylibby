import firebase from 'firebase/app';
// We need to import the firebase services we want to use
import 'firebase/firestore';
import 'firebase/auth';

// SDK setup from lacy_libby_capstone firebase project
const firebaseConfig = {
    apiKey: "AIzaSyByFSF0w1UjdsJw7QfZF3THdws7AJeLJak",
    authDomain: "lacylibbycapstonepractice.firebaseapp.com",
    projectId: "lacylibbycapstonepractice",
    storageBucket: "lacylibbycapstonepractice.appspot.com",
    messagingSenderId: "483873171024",
    appId: "1:483873171024:web:1b1054cc5eb7e856451355"

  };
  
  

firebase.initializeApp(firebaseConfig);
firebase.auth(); 
 

export const db = firebase.firestore();
export const librariesCollection = db.collection('libraries');
export const usersCollection = db.collection('users')
export default firebase;
