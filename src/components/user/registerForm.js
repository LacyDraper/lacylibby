import React, { Component } from 'react';
import firebase,{ db, usersCollection} from '../../utils/firebase'


class RegisterForm extends Component {
    
    // if register is true, it means it will register new user, false means user is already registered and will sign in 
    state = {
        register: true,
        loggedIn : false,
        firstname: '',
        lastname: '',
        email: '',
        password : ''
        }
    
    
    // event handler function
    handleForm = (e) => {
        e.preventDefault();
        const email = this.state.email
        const password  = this.state.password
        const firstname = this.state.firstname
        const lastname = this.state.lastname
        
        
        firebase
        .auth()
        // id is generated with this email and password. need to now grab user by uid and use the id to generate the user into firestore
        .createUserWithEmailAndPassword(email,password)
        .then(userInfo => {
            // prints the users status signIn
            console.log(userInfo.operationType,'USER INFO FROM AOTH')
            this.setState({
                loggedIn : true,
            
            })
            return db.collection('users').doc(userInfo.user.uid).set({
                firstname : firstname,
                lastname : lastname,
                email : email
            })
            
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

    // logs a customer out if they are logged in 
    handleLogout = (e) => {
        firebase.auth().signOut().then(userInfo => {
            // prints the users status signIn
            this.setState(this.state.loggedIn)
            console.log(this.state.loggedIn, '<-------logged in state')
            
            console.log('User logged out registerForm comoponent')
        })
    }
 
    
    // gets a users info in case you need to use if for something else maybe to add a library to watch list
    handleGetUserInfo = () => {
        let getUser = firebase.auth().currentUser;
        if (getUser){
            this.state.logged
        } else {
            console.log('No User')
        }
    }

    render() {
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

                    <button type="submit" className="btn btn-primary">
                        { this.state.register ? 'Register' : 'Sign in'}
                    </button>
                    
                </form>
                {/* // <hr/> */}
                <button onClick={ ()=> this.handleLogout()}>
                    Logout

                </button>
            </div>
            //</>

        )

    }  
}    
export default RegisterForm;