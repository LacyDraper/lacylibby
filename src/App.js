import React, { useState, useEffect } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    MarkerClusterer,
} from "@react-google-maps/api";


// import "@reach/combobox/styles.css";
// import { APPCENTER } from "ci-info";
import mapStyles from "./mapStyles";
import { formatRelative } from "date-fns";
import { data } from "browserslist";
import { librariesCollection, db } from './utils/firebase.js';
import { firebaseLooper } from "./utils/helpers";
import Upload from "./components/upload";


// const libraryData = [
//     {   id: 1,
//         lat:47.597998,
//         lng:-122.318739,
//         time: new Date()
//     },
//     {   id: 2,
//         lat:47.600757,
//         lng:-122.332526,
//         time: new Date()
//     },
//     {   id: 3,
//         lat:47.598528,
//         lng:-122.326986,
//         time: new Date()
//     }

// ]



const mapContainerStyle = {
    width: '90vw',
    height: '90vh',
}

const center = {
    lat: 47.599940,
    lng: -122.327750,
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,  
    zoomControl: true,
}

const onLoad = marker => {
    console.log('marker: ', marker)
}




const App = () => {
    
    // state to hold all library objects
    const [libraryMarkers, setLibraryMarkers]  = useState([]);

    useEffect(() => {
        
        db.collection('libraries').get().then(snapshot => {
            const libraries = firebaseLooper(snapshot);
            console.log(libraries);
            setLibraryMarkers(libraries)
        }).catch (e => {
            console.log(e)
        })
    },[]);
    
    // state to hold current inventory images
    const [ inventoryImages, setInventoryImages] = useState([]);

    
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        
    });

    // we need to create a variable that holds the state of libraries component here so we can render the markers to the page
    

    
   
    const [selected, setSelected] = React.useState(null);

 


    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";
    //props: container, see notes above where the variable is
    //position the map
    return <div>
        
        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom = {15} 
        center = {center}
        options = { options }
        id= "marker-example"

        >
        {libraryMarkers.map((marker => (
        <Marker 
            key={marker.id}     
            onLoad={onLoad}
            position = {{lat: marker.lat, lng: marker.lng}}
        
            // position = { position }
            icon= {{
            url: '/3redbooks.svg',
            scaledSize: new window.google.maps.Size(30,30),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15) 
            }}
            onClick={() => {
            setSelected(marker);
            }}
            />
        )))}
        
        {selected ? (
            
        <InfoWindow 
            position= {{lat: selected.lat, lng: selected.lng}} 
            onCloseClick = {() => {

        setSelected(null)}} //have to reset to null once x is clicked on window so that they can pop up agian when clicked
        >
        <div>
            <h2> image goes here </h2>
            <p>
                Name of Library : {selected.name}
            </p>   
            <Upload/>
        </div>
        </InfoWindow>
        ) : null} 
        </GoogleMap>
        </div>;
    }    


export default App;