import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import firebase from './utils/firebase';
import App from './App';


ReactDOM.render(

 <React.StrictMode>
    
    <Routes/>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

//this detects a change in user status login logout etc. everytime a user is logged in you get the email and id of user. we get a user object back 
firebase.auth().onAuthStateChanged( user => {
  if (user) {
    console.log(user.email)
    console.log(user.uid)
  } else{
    console.log('no user logged in')
  }
})
