import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({text}: any) => <div>{text}</div>;

// TODO: needs to figure out how to get local location (lang/long) from Geo 
const Map = (props: any) => {
    const [center, setCenter] = useState({lat: props.lang, lng:  props.long});
    const [zoom, setZoom] = useState(17);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAhtOogYXuE6fkGl7jrwd7vOQQRFmDh-so' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={props.lang}
            lng={props.long}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}

Map.displayName = "Map"
export default Map;