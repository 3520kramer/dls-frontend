import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import "./Map.css"
import LoadingOverlay from 'react-loading-overlay-ts';

interface IProps{
  children?: React.ReactNode,
  latitude: number
  longitude: number
  hasEnabledGPS: boolean
};

// this is the marker for the map 
const Marker = (props: any) => {
  const { color, name } = props;
  return (
    <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer'}}
      title={name}
    />
  );
};


const Map: React.FC<IProps> = ({latitude, longitude, hasEnabledGPS}) => {
    const [isActive, setActive] = useState(false)
    const [center, setCenter] = useState({lat: latitude, lng: longitude});
    const [zoom, setZoom] = useState(17);
    
    const GOOGLE_API_KEY: string = process.env.GOOGLE_API_KEY !== undefined ? process.env.GOOGLE_API_KEY : "";
    
    // for debugging
    useEffect(() => {
      console.log("hasEnabledGPS", hasEnabledGPS);
    },[hasEnabledGPS])

    // for debugging
    useEffect(() => {
      console.log("center", center);
    },[center])
    
    // looks at toggle switch and if latitude is zero (start value)
    // for the loading display when waiting for getting user location
    useEffect(() => {  
      if(hasEnabledGPS && latitude === 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    },[hasEnabledGPS, latitude])
    
      // returns the view of the map (have to hide the google map API at some point)
      return (
      <LoadingOverlay 
        active={isActive}
        spinner
        text='Loading your position from outer space...'
      >
      <div className={hasEnabledGPS === false ? "hideMap": ""} style={{ height: '50vh', width: '100%' }} >
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={{lat: 0, lng: 0}}
          center={{lat: latitude, lng: longitude}}
          defaultZoom={zoom}
        >
          <Marker
            lat={latitude}
            lng={longitude}
            name="You are here"
            color="red"
          />
        </GoogleMapReact>
      </div>
      </LoadingOverlay>
    );
}

Map.displayName = "Map"
export default Map;