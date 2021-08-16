import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

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
export const auth = firebase.auth(); 

export const storage = firebase.storage();
export const storageRef = storage.ref();

export const db = firebase.firestore();
export const librariesCollection = db.collection('libraries');
export const usersCollection = db.collection('users')
export default firebase;
