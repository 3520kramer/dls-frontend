import React, { useEffect, useState } from 'react';
import VerticalStepper from '../../Common/VerticalStepper/VerticalStepper'
import CoursesAndClasses from './CoursesAndClasses/CoursesAndClasses';
import GenerateCode from './GenerateCode/GenerateCode';
import Map from '../../Common/Map/Map'
import './RegisterAttendance.css'
import { Coordinates, getGeoLocation } from '../../../services/GeoService';

export const RegisterAttendance = () => {
    const [location, setLocation] = useState<Coordinates>({latitude: 0, longitude: 0, accuracy: 0});

    useEffect(() => {
        getGeoLocation();
    },[])

    useEffect(() => {
        console.log('location', location);    
    },[location])

    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition( (position) => {
      
            const coordinates: Coordinates = {
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
        <>
            <VerticalStepper>
                <CoursesAndClasses />
                <GenerateCode />
                <Map long={location.longitude} lang={location.latitude}/>
                {/*
                The geolocation component
                Possibly with this toggleswitch
                    <ToggleSwitch 
                        condition={hasEnabledGPS}
                        setCondition={setHasEnabledGPS}
                        names="EnableLocation"
                        label="Enable Location Services"
                    />
                */}
            </VerticalStepper>
        </>
    );
}
