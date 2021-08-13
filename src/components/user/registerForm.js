import React, { Component } from 'react';
import firebase,{ db, usersCollection} from '../../utils/firebase'
import { Button } from 'react-bootstrap'
//imports all the styling we need for css to get started
import 'bootstrap/dist/css/bootstrap.min.css'
class RegisterForm extends Component {
    
    // if register is true, it means it will register new user
    state = {        
        register: true,
        loggedIn : false,
        user : { 
            email: '',
            password : ''
        }
    }
    
    // event handler function
    handleForm = (e) => {
        e.preventDefault();
        const email = this.state.user.email
        const password  = this.state.user.password
       
        firebase
        .auth()
        // id is generated with this email and password. need to now grab user by uid and use the id to generate the user into firestore
        .createUserWithEmailAndPassword(email,password)
        .then(user => {
            this.handleRegisterUser(user);
            
            this.setState({
                loggedIn : true,
                })
            console.log(this.state.loggedIn,`<---- ${this.state.user.email} logged in status`)
        })
    } 

    // updates state to true or false with new user register or sign in 
    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState( prevState => ({
            user:{
                ...prevState.user,
                [name]: value
            }
        }))
    }

    handleRegisterUser = (data) => {
        usersCollection.doc(data.user.uid).set({
            email: data.user.email
        }).then (data => {
            console.log(data)
        }).catch(e => { console.log(e)})
    }    
    
    
    
    
    // logs customer out and changes loggedIn state 
    handleLogout = (e) => {
        firebase.auth().signOut().then(user => {
            this.setState({
                loggedIn: false
            })
            console.log(this.state.loggedIN,`<---- ${this.state.user.email} logged in status`)
        })
    }
 
    
 

    render() {
        const isLoggedIn = this.state.loggedIn ? ' successfully ': ' user is not '
            return(
                // <>
                <div>
                <form onSubmit={ (event)=> this.handleForm(event) }>
                
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="firstname"
                            
                            className="form-control"
                            name="email"
                            onChange={ (event) => this.changeHandler(event)}
                        >
                        </input>
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="lastname"
                            value={this.state.lastname}
                            className="form-control"
                            name="email"
                            onChange={ (event) => this.changeHandler(event)}
                        >
                        </input>
                    </div>
                    
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={this.state.email}
                            className="form-control"
                            name="email"
                            onChange={ (event) => this.changeHandler(event)}
                        >
                        </input>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={this.state.password}
                            className="form-control"
                            name="password"
                            onChange={ (event) => this.changeHandler(event)}
                        >
                        </input>
                    </div>

                    
                        <Button type="submit" className="btn btn-info ">
                            { this.state.register ? 'Register' : 'Sign in'}
                        </Button>
                  
                </form>
                
               <br></br>
                        <Button onClick={this.handleLogout} className="btn btn-warning">
                            Logout
                        </Button>
                
                
            </div>
            //</>

        )

    }  
}    
export default RegisterForm;