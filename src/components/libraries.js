import React, { useState, useEffect } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
   } from "@react-google-maps/api";

// import "@reach/combobox/styles.css";
// import { APPCENTER } from "ci-info";
import mapStyles from "../mapStyles";
import { librariesCollection, db } from '../utils/firebase.js';
import { firebaseLooper } from "../utils/helpers";
import Upload from "./upload";
import ReactImageMagnify from 'react-image-magnify';
import '../index.css';
import WatchList from "./watchList";

const mapContainerStyle = {
    width: '95vw',
    height: '80vh',
}

const center = {
    lat: 47.623960,
    lng: -122.306930,
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,  
    zoomControl: true,
}

const onLoad = marker => {
    console.log('marker: ', marker)
}
        

const Libraries = () => {
    
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
    return <div className= "map">
        
        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom = {14.5} 
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
            url: '/bookshelf-svgrepo-com.svg',
            scaledSize: new window.google.maps.Size(35,35),
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
            // photo_URL= {selected.photo_URL}
            position= {{lat: selected.lat, lng: selected.lng}} 
            onCloseClick = {() => {

        setSelected(null)}} //have to reset to null once x is clicked on window so that they can pop up agian when clicked
        >


        <div className = "info-window">
        <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Library inventory image',
                    width: 300,
                    height: 300,
                    src: selected.photo_URL
                },
                largeImage: {
                    src: selected.photo_URL,
                    width: 1200,
                    height: 1800
                }
            }} />
            
            <h2> {selected.name} Inventory</h2>
            {/* <img src={selected.photo_URL} alt='Photo Inventory'/> */}
            <p> Date Image Taken: { selected.dateUploaded.toDate().toDateString()}, { selected.dateUploaded.toDate().toLocaleTimeString('en-US') }</p>
            <p>
                {selected.address}
            </p>   
            <Upload
                id = {selected.id}
                name = {selected.name}
                photo_URL= {selected.photo_URL}
                onUpdateLibrary = { onUpdateLibrary }
                lat={selected.lat}
                lng={selected.lng}
            
            />
            <br></br>
            <WatchList
            id = {selected.id}/>
        </div>
    
        </InfoWindow>
        ) : null} 
        </GoogleMap>
        </div>;
    }    


export default Libraries;