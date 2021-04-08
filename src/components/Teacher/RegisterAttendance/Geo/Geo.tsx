import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Map from '../../../Common/Map/Map';
import ToggleSwitch from '../../../Common/ToggleSwitch/ToggleSwitch';

interface IProps{
    children?: React.ReactNode,
    onLocationChange: Function,
};

export interface ICoordinates {
    accuracy: number
    latitude: number
    longitude: number
  }

const Geo: React.FC<IProps> = ({children, onLocationChange}) => {

    const [location, setLocation] = useState<ICoordinates>({latitude: 0, longitude: 0, accuracy: 0});

    const [hasEnabledGPS, setHasEnabledGPS] = useState<boolean>(false);

    // When component mounts
    useEffect(() => {
        if(hasEnabledGPS) {
            getGeoLocation();
        }
    },[hasEnabledGPS])

    useEffect(() => {
        console.log('location', location);
    },[location])

    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition( (position) => {
      
            const coordinates: ICoordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            }
            
            setLocation(coordinates);
          },
          (error => {
            console.error("Error Code = " + error.code + " - " + error.message);
          }), {enableHighAccuracy: true}
        );
    }

    return (
        <Container>
            <Row>
                <Col> 
                    <ToggleSwitch 
                        condition={hasEnabledGPS}
                        setCondition={setHasEnabledGPS}
                        names="EnableLocation"
                        label="Enable Location Services"
                    />
                </Col>
                <Col>
                    <Map 
                        longitude={location.longitude} 
                        latitude={location.latitude}
                        hasEnabledGPS={hasEnabledGPS}
                    />     
                </Col>
            </Row>

        </Container>
         
    )
}

export default Geo;