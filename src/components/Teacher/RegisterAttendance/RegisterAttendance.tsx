import React, { useEffect, useState } from 'react';
import VerticalStepper from '../../Common/VerticalStepper/VerticalStepper'
import CoursesAndClasses from './CoursesAndClasses/CoursesAndClasses';
import GenerateCode from './GenerateCode/GenerateCode';
import Map from '../../Common/Map/Map'
import './RegisterAttendance.css'
import { ICoordinates } from '../../../services/GeoService';
import { ICourse, IStudentClass } from '../../../services/CoursesAndClassesService';

export const RegisterAttendance = () => {
    const [location, setLocation] = useState<ICoordinates>({latitude: 0, longitude: 0, accuracy: 0});
    const [selectedCourse, setSelectedCourse] = useState<ICourse>({id: 0, title: ""});
    const [selectedClasses, setSelectedClasses] = useState<IStudentClass[] | []>([]);

    useEffect(() => {
        getGeoLocation();
    },[])

    useEffect(() => {
        console.log('location', location);    
    },[location])

    useEffect(() => {
        console.log('selectedCourse', selectedCourse);    
    },[selectedCourse])

    useEffect(() => {
        console.log('selectedClasses', selectedClasses);    
    },[selectedClasses])

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
        <>
            <VerticalStepper
                CoursesAndClasses={ 
                    <CoursesAndClasses 
                        onCoursesChange={(sc: ICourse) => setSelectedCourse(sc)}
                        onClassesChange={(sc: IStudentClass[]) => setSelectedClasses(sc)}
                        selectedCourse={selectedCourse}
                    /> 
                    }
                    GenerateCode={ <GenerateCode /> }
                    Map={ <Map long={location.longitude} lang={location.latitude}/> }
                    
            />
            {/*
            Example of toggleswitch
                <ToggleSwitch 
                    condition={hasEnabledGPS}
                    setCondition={setHasEnabledGPS}
                    names="EnableLocation"
                    label="Enable Location Services"
                />
            */}
        </>
    );
}
