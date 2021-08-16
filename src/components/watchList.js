import React from 'react';
import { Button } from 'react-bootstrap';
import 'firebase/auth';
import firebase, { librariesCollection } from '../utils/firebase.js';


const WatchList = ( {id}) => {
// library id from libraries component
 const addFollower = (event) => {
    const user = firebase.auth().currentUser.email
        console.log(id,'<----library id from watchlist')
        console.log(event.target, '<----watchlist event.target') 
        console.log(user, '<-----user from watchlist')
        console.log(id, '<------library id coming from watchlist')
        const library = librariesCollection.doc(id)
        library.update(
                    { followers : firebase.firestore.FieldValue.arrayUnion(user)},
                   );


 }

return(
        <div>
            <Button className="btn btn-warning btn-sm" 
            type='submit'
            onClick ={addFollower}>
                Add Library to Watchlist
            </Button>
        </div>
)




}
export default WatchList;