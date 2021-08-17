import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import 'firebase/auth';
import firebase, { librariesCollection } from '../utils/firebase.js';



// library id from libraries component
const WatchList = ( {id}) => {

const [watched, setWatched] = useState(false);

const updateWatchlist = () => {
    setWatched(true);
    console.log(watched, '<----- state')
};

const handleWatchlistClick = (event) => {
    const user = firebase.auth().currentUser.email
        console.log(id,'<----library id from watchlist')
        console.log(event.target, '<----watchlist event.target') 
        console.log(user, '<-----user from watchlist')
        console.log(id, '<------library id coming from watchlist')
        const library = librariesCollection.doc(id)
        library.update(
                    { followers : firebase.firestore.FieldValue.arrayUnion(user)}
                    )
    setWatched(true);
    console.log(watched, '<----- state')
};

const watch =  watched ? 'are': 'are not'



return(
        <div>
            <Button className="btn btn-warning btn-sm" 
            type='submit'
            onClick= {handleWatchlistClick}
            onClick ={updateWatchlist} 
            >
                Add Library to Watchlist
            </Button>
            <div>
            <br></br>  
            </div>
            
            <div>
             <p> You {watch} following this library </p>   
            </div>
        </div>   
        
)




}
export default WatchList;