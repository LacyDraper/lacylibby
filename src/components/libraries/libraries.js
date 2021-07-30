import React, { Component } from 'react';
import { db } from '../../utils/firebase';
import { firebaseLooper } from '../../utils/helpers';
import { librariesCollection } from '../../utils/firebase';


class Libraries extends Component {
    componentDidMount(){
        db.collection('libraries').get().then( snapshot => {
            const libraries = firebaseLooper(snapshot);
            console.log(libraries);
        })
    }
    
    
    
    render() {
            return(
        <>
        Libraries
        </>
    )
}
}

export default Libraries;