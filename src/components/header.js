import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 
import '../index.css';



// firebase.auth().onAuthStateChanged( (user) => {
//     if (user) {
//         const email = user.email
//         console.log(user.email, `user email from header`)
//         // console.log(user.uid)
//     } else{
//         console.log('no user logged in from header')
//     }
//     })

// const user = firebase.auth().currentUser;
// const isLoggedIn = firebase.auth().onAuthStateChanged(user) ? ' successfully ': ' user is not '
// console.log(`this is user`, user )

const Header = () => {
    const [loggedIn, setLoggedIn]  = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                console.log(user.email,'<-----USERNAME from header')
                
                setLoggedIn(true)
            }else{
                setLoggedIn(false)
            }})
        }, []);
 
    const isLoggedIn = loggedIn ? ' are ': ' are not '
    
    

    return (
        <header>
            
            <nav className="navbar navbar-expand-md navbar-light  fixed-top " style={{ color: '#fffff'}}>
                <Link className="navbar-brand" to="/">Little Free Libraries Inventory</Link>
                {/* //what is collapse navbar?  */}
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                       
                        <li className="nav-item active">
                            <Link className="nav-link" to="/libraries">Libraries</Link>
                        </li>
                    
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    
                            <li className="nav-item active">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    
                    </ul>
                    </div>
                <div>
                <Card style={{ color: '#000', height: '3rem'}}>
                <Card.Body>
                    {/* <Card.Title> */}
                        
                    {/* </Card.Title> */}
                    <Card.Text>
                        Your Login Status : You { isLoggedIn } logged in
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
            </nav>
        </header>
    );
};

export default Header;