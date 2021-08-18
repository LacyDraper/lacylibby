import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import 'firebase/auth';
import firebase, { librariesCollection } from '../utils/firebase.js';



// library id from libraries component passed as props
const WatchList = ( {id}) => {

const [watched, setWatched] = useState(false);


const handleWatchlistClick = (event) => {
    event.preventDefault();
    const user = firebase.auth().currentUser.email
        console.log(user, '<-----user from watchlist')
        console.log(id, '<------library id coming from watchlist')
    const library = librariesCollection.doc(id)
        library.update(
                    { followers : firebase.firestore.FieldValue.arrayUnion(user)}
                    )
    setWatched(true);
    console.log(watched, '<----- state')
};

const watch =  watched ? 'are': 'are not';


return(
        <div>
            <Button className="btn btn-warning btn-sm" 
            type='submit'
            onClick= {handleWatchlistClick}
            >
                Add Library to Watchlist
            </Button>
            <div>
            <br></br>  
            </div>
            
            <div className="alert alert-warning" role="alert">
                <h6 className="alert-heading">You {watch} following this library</h6>
                
            </div>
        </div>   
)
}
export default WatchList;