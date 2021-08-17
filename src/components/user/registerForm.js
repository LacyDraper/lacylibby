import React, { Component } from 'react';
import firebase,{ usersCollection} from '../../utils/firebase'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class RegisterForm extends Component {
    
   
    state = {        
        register: true,
        loggedIn : false,
        user : { 
            email: '',
            password : '',
            firstname :'',
            lastname : ''
        }
    }
    
    // registers user into the auth database using .auth and stores current state into firestore by using handleRegisterUser helper function
    handleForm = (e) => {
        e.preventDefault();
        const email = this.state.user.email;
        const password  = this.state.user.password;
       
        firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then(response => {
            this.handleRegisterUser(response);
            
            this.setState({
                loggedIn : true,
                })
            console.log(this.state.loggedIn,`<---- ${this.state.user.email} logged in status`)
            console.log(this.state,"<---handleForm CAPTURES current state")
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
        })
        )
        
    }
    
    // stores current state into the firestore db user collection using .add
    handleRegisterUser = () => {
        usersCollection.add({
            //... this.state adds the current state to the database
            ...this.state
            }).then (() => {
             }).catch(e => { console.log(e)})
    }    
    
    

    // logs customer out and changes loggedIn state value
    handleLogout = (e) => {
        firebase.auth().signOut().then(user => {
            this.setState({
                loggedIn: false
            })
            console.log(this.state.loggedIN,`<---- ${this.state.user.email} logged in status`)
        })
    }
 
    
 

    render() {
        const registered = this.state.register ? '' : 'is not';
            
        return(
                
                <div>
                <form onSubmit={ (event)=> this.handleForm(event) }>
                
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="firstname"
                            className="form-control"
                            name="firstname"
                            onChange={ (event) => this.changeHandler(event)}
                        >
                        </input>
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="lastname"  
                            className="form-control"
                            name="lastname"
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
                            value={this.state.password}
                            className="form-control"
                            name="password"
                            onChange={ (event) => this.changeHandler(event)}
                        >
                        </input>
                    </div>

                    
                    <Button type="submit" className="btn btn-info ">
                        Register
                    </Button>
                  
                </form>
                <br></br>
                    <Button onClick={this.handleLogout} className="btn btn-warning">
                        Logout
                    </Button>
                
                   
                </div>
        )

    }  
}    
export default RegisterForm;