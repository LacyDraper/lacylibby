import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { Button, Alert, Breadcrumb, Card} from 'react-bootstrap'



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
                setLoggedIn(true)
            }else{
                setLoggedIn(false)
            }})
        }, []);
 
    const isLoggedIn = loggedIn ? ' are ': ' are not '

    return (
        <header>
            
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <Link className="navbar-brand" to="/">Little Free Libraries Inventory</Link>
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
                <Card style={{ color: '#000'}}>
                <Card.Body>
                    <Card.Title>
                        Your Login Status:
                    </Card.Title>
                    <Card.Text>
                        You { isLoggedIn } logged in
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
            </nav>
        </header>
    );
};

export default Header;