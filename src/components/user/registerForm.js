import React, { Component } from 'react';
import firebase,{ usersCollection} from '../../utils/firebase'


class RegisterForm extends Component {
    
    // if register is true, it means it will register new user, false means user is already registered and will sign in 
    state = {
        register: true,
        user: {
            firstname: '',
            lastname: '',
            email:'',
            password:''
        }
    }
    
    // event handler function
    handleForm = (e) => {
        e.preventDefault();
        const email = this.state.user.email
        const password =  this.state.user.password
        const firstname = this.state.user.firstname
        const lastname = this.state.user.lastname
        
        if(this.state.register){
            firebase
            .auth()
            // id is generated with this email and password. need to now grab user by uid and use the id to generate the user into firestore
            .createUserWithEmailAndPassword(email,password)
            .then((user) => {
                //this.handleRegisterUser(user);
                console.log(user,'*********')
                user.user.sendEmailVerification().then(async(createUser)=> {
                    const newUser = await
                    usersCollection.doc.set({
                        firstname : firstname,
                        lastname : lastname,
                        email: email
                    })
                })
            
            })
        } else {
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
               //console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
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
        firebase.auth().signOut().then(()=> {
            console.log('User logged out')
        })
    }
 
    
    // gets a users info in case you need to use if for something else maybe to add a library to watch list
    handleGetUserInfo = () => {
        let getUser = firebase.auth().currentUser;
        if (getUser){
            console.log(getUser)
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