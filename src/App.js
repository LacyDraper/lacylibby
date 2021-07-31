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

//prop. The map takes up the space of the container it's in. If you don't add width & height, it won't
//appear. If you set it to 100, it fills the whole screen
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
    disableDefaultUI: true, //gets rid of all teh controls on the map, then add back in 
    zoomControl: true,
}
const position = {
    lat: 47.606209,
    lng: -122.332069
}
const onLoad = marker => {
    console.log('marker: ', marker)
}

export default function App() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        //leaving out places library becuase not using the library 

    });

    
    // const [ id, setId ] = React.useState(0);
    // const [ drawMarker, setDrawMarker ] = React.useState(false);
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

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
       // this adds an icon everytime it's clicked. Need to change it to when the icon is clicked
      // onClick = { onMapClick }
        >
        {/* marker component comes with the google maps package */}
        {/* used time as key, but could use library charter number  */}
        {markers.map((marker => 
        <Marker 
            onLoad={onLoad}
          // key={marker.time.toISOString()} 
          // position = {{lat: 47.599192, lng: 47.599192}}
            position= { position } 
            icon= {{
            url: '/3redbooks.svg',
            scaledSize: new window.google.maps.Size(30,30),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15) //half of size makes in middle
            }}
          // onClick={() => {
          //   setSelected(marker);
          // }}
            />
        ))}
        {/* //infowindow is component that pops up white window. Can take 1 child*/}
        {selected ? (
        <InfoWindow position= {{lat: selected.lat, lng: selected.lng}} onCloseClick = {() => {
        setSelected(null); //have to reset to null once x is clicked on window so that they can pop up agian when clicked
        }}>
        <div>
            <h2> image goes here </h2>
            <p>Library inventory last updated {formatRelative(selected.time, new Date())}</p>
        </div>
        </InfoWindow>) : null} 
        </GoogleMap>
    </div>;
    }