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
    const [libraryData, setLibraryData]  = useState([]);

    useEffect(() => {
        
        librariesCollection.get().then(snapshot => {
            const libraries = firebaseLooper(snapshot);
            console.log(libraries);
            setLibraryData(libraries)
        }).catch (e => {
            console.log(e)
        })
    },[]);
    
    // function to update state
    const onUpdateLibrary = (libraryToUpdate) => {
        const libraries = libraryData.map((library) => {
            if (library.id === libraryToUpdate.id) {
                return libraryToUpdate;
            }
            return library;
        });
        
       setLibraryData(libraries);
    }
    
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        
    });

    
    

    
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
        {libraryData.map((marker => (
        <Marker 
             
            key={marker.id}     
            onLoad={onLoad}
            position = {{lat: marker.lat, lng: marker.lng}}
            onUpdateLibrary={onUpdateLibrary}
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
            photo_URL= {selected.photo_URL}
            position= {{lat: selected.lat, lng: selected.lng}} 
            onCloseClick = {() => {

        setSelected(null)}} //have to reset to null once x is clicked on window so that they can pop up agian when clicked
        >
        <div>
            <h2> image goes here </h2>
            <p>
                Name of Library : {selected.name}
            </p>   
            <Upload
                id = {selected.id}
                name = {selected.name}
                photo_URL= {selected.photo_URL}
                onUpdateLibrary = { onUpdateLibrary }
                lat={selected.lat}
                lng={selected.lng}
            
            />
        </div>
        </InfoWindow>
        ) : null} 
        </GoogleMap>
        </div>;
    }    


export default App;