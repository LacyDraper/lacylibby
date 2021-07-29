import React, { Component } from 'react';
import { db } from '../../utils/firebase';
import { librariesCollection } from '../../utils/firebase';

class Libraries extends Component {
    state = {
        libraries: null
    }
    
    getAllLibraries(){
        librariesCollection
        
        .get()
        .then(snapshot => {
            //using helper function from helpers.js
            const cars = firebaseLooper(snapshot);
            // setting state to cars list of objects
            this.setState({
                cars
            });
         });
    }
    
    
    
    render(){

        <>
        Libraries
        </>
    }
}

export default Libraries;