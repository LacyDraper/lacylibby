import React, { Component } from 'react';
import firebase,{ usersCollection} from '../../utils/firebase'

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
        .then( response => {
            this.state.loggedIn = true
        })
        .catch(error => {
            console.log(error)
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


    // want "user logged out"  to render to the screen 
    // logs a customer out if they are logged in 
    handleLogout = (e) => {
        firebase.auth().signOut().then(()=> {
            this.state.loggedIn = false
            console.log(this.state.loggedIn,'<---- login status User clicked on logout from login component')
            
        })
    }
    
 
    // gets a users info in case you need to use if for something else maybe to add a library watch list
    handleGetUserInfo = () => {
        let getUser = firebase.auth().currentUser;
        if (getUser){
            console.log(getUser)
        } else {
            console.log('No User')
        }
    }

    render(){
            return(
                // <>
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

                    <button type="submit" className="btn btn-primary">
                        { this.state.register ? 'Register New User' : 'Sign in'}
                    </button>
                    
                </form>
                
                <button onClick={ ()=> this.handleLogout()} >
                    Logout

                </button>
            </div>
        )
 }

}
export default LoginForm;