import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import "./Map.css"

interface IProps{
  children?: React.ReactNode,
  latitude: number
  longitude: number
  hasEnabledGPS: boolean
};

const Marker = ({text}: any) => <div>{text}</div>;

// TODO: needs to figure out how to get local location (lang/long) from Geo 
const Map: React.FC<IProps> = ({latitude, longitude, hasEnabledGPS}) => {
    const [center, setCenter] = useState({lat: latitude, lng: longitude});
    const [zoom, setZoom] = useState(17);
    
    useEffect(() => {
      console.log("hasEnabledGPS", hasEnabledGPS);
    },[hasEnabledGPS])

    useEffect(() => {
      console.log("center", center);
    },[center])
    
    return (
        <div className={hasEnabledGPS === false ? "hideMap": ""} style={{ height: '50vh', width: '100%' }} >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAhtOogYXuE6fkGl7jrwd7vOQQRFmDh-so' }}
          center={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={latitude}
            lng={longitude}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}

Map.displayName = "Map"
export default Map;