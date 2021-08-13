import React, { Component } from 'react';
import firebase,{ usersCollection} from '../../utils/firebase'
import { Button, Alert, Breadcrumbs, Form } from 'react-bootstrap'
//imports all the styling we need for css to get started
import 'bootstrap/dist/css/bootstrap.min.css'


class LoginForm extends Component {
    
    // if register is false, it means existing user, user to login 
    state = {
        register : false,
        loggedIn : false,
        user: {
            email:'',
            password: ''
        }
    }
    
    // event handler function
    handleForm = (e) => {
        e.preventDefault();
        const email = this.state.user.email
        const password =  this.state.user.password
        
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            this.setState({
                loggedIn : true
            })
            console.log(this.state.loggedIn, `<---- ${this.state.user.email} logged in status`)
            }
            )
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


    // logs customer out and changes loggedIn state 
    handleLogout = (e) => {
        firebase.auth().signOut().then(user => {
            this.setState({
                loggedIn: false
            })
            console.log(this.state.loggedIn,`<---- ${this.state.user.email} logged in status`)
            
        })
    }
    
 
 
    render(){
        const isLoggedIn = this.state.loggedIn ? ' is': ' user is not '
            return(
                
             
                <div>
                
                <form onSubmit={ (event)=> this.handleForm(event) }>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
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
                            className="form-control"
                            name="password"
                            onChange={ (event) => this.changeHandler(event)}
                        >
                        </input>
                    </div>
                    
                    
                <div class="alert alert-info" role="alert">    
                    <Button type="submit" className="btn btn-info">
                        { this.state.register ? 'Register New User' : 'Sign in'}
                    </Button>
                </div>
                </form>
                
                <div class="alert alert-info" role="alert">
                    <Button onClick={this.handleLogout} className="btn btn-warning" >
                        Logout
                    </Button> 
                </div>
               
            </div>
        )
 }

}
export default LoginForm;