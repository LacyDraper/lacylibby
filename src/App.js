import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    MarkerClusterer,
} from "@react-google-maps/api";

// import { formatRelative } from "date-fns";

// import "@reach/combobox/styles.css";
// import { APPCENTER } from "ci-info";
import mapStyles from "./mapStyles";
import { formatRelative } from "date-fns";
import Libraries from "./components/libraries/libraries";
import { data } from "browserslist";


const libraryData = [
    {   id: 1,
        lat:47.597998,
        lng:-122.318739
    },
    {   id: 2,
        lat:47.600757,
        lng:-122.332526
    },
    {   id: 3,
        lat:47.598528,
        lng:-122.326986
    }


]

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
const position = {
    lat: 47.6050,
    lng: -122.3344
}

const App = () => {
    
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        
    });

    // we need to create a variable that holds the state of libraries component here so we can render the markers to the page
    

    
    // const [markers, setMarkers] = React.useState([]);
    // const [selected, setSelected] = React.useState(null);

    // const onMapClick = React.useCallback((event) => {
    //   setMarkers(current => [ //when user clicks, call the setMarkers function. Is that built in??
    //     ...current, 
    //     {  
    //     lat: event.latLng.lat(),
    //     lng: event.latLng.lng(),
    //     time: new Date(),
    //   },
    // ]); 
    // }, []);


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
            // position = { position }
            icon= {{
            url: '/3redbooks.svg',
            scaledSize: new window.google.maps.Size(30,30),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15) 
            }}
            // onClick={() => {
            // setSelected(marker);
            // }}
            />
        )))}
        
        {/* {selected ? (
        <InfoWindow position= {{lat: selected.lat, lng: selected.lng}} onCloseClick = {() => {
        setSelected(null); //have to reset to null once x is clicked on window so that they can pop up agian when clicked
        }}>
        <div>
            <h2> image goes here </h2>
            <p>Library inventory last updated {formatRelative(selected.time, new Date())}</p>
        </div>
        </InfoWindow>) : null}  */}
        </GoogleMap>
        </div>;
    };


export default App;