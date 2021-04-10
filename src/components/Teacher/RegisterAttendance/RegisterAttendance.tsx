import React, { useEffect, useState } from 'react';
import VerticalStepper from '../../Common/VerticalStepper/VerticalStepper'
import CoursesAndClasses from './CoursesAndClasses/CoursesAndClasses';
import GenerateCode from './GenerateCode/GenerateCode';
import Map from '../../Common/Map/Map'
import './RegisterAttendance.css'
import { ICoordinates } from '../../../services/GeoService';
import { ICourse, IStudentClass, getCoursesByTeacherId, getStudentClasses, IModule, getModules, sendRegisterAttendanceInfo } from '../../../services/RegisterAttendanceService';

export interface IAttendenceCode{
    id: string,
    attendanceCode: string,
    timestamp: Date,
    duration?: string

}

export const RegisterAttendance = () => {
    const [courses, setCourses] = useState<ICourse[] | []>([]);
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

    const [studentClasses, setStudentClasses] = useState<IStudentClass[] | []>([]);
    const [selectedStudentClasses, setSelectedStudentClasses] = useState<IStudentClass[] | []>([]);

    const [location, setLocation] = useState<ICoordinates>({latitude: 0, longitude: 0, accuracy: 0});

    const [modules, setModules] = useState<IModule[] | []>([]);
    const [selectedModules, setSelectedModules] = useState<IModule[] | []>([]);

    const [attendenceCode, setAttendenceCode] = useState<IAttendenceCode | null>(null);

    // When component mounts
    useEffect(() => {
        getGeoLocation();
        
        // Fetches the courses which will be passed to 
        // the child components CoursesAndClasses and then to ListView
        getCoursesByTeacherId(1).then(data => {
            setCourses(data)
            handleCourseChange(0, data)
            //setModules(getModules) // TODO: needs to be implemented in getcoursesbyteacherid
        });
            getModules().then(data => setModules(data))

    },[])

    // When a course is selected we will need to fetch the 
    // student classes related to the selected course
    useEffect(() => {
        if (selectedCourse !== null) 
            getStudentClasses(1, selectedCourse.id).then(classes => setStudentClasses(classes));
    }, [selectedCourse])

    // testing to see if the post request is working
    useEffect(() => {
        if(selectedCourse && selectedStudentClasses.length >= 1 && selectedModules.length >= 1 ) {
            sendRegisterAttendanceInfo(selectedCourse, selectedStudentClasses, 1, selectedModules).then(data => {
                let date = new Date();
                console.log("date", date)
                //var minutes = date.getTim
                console.log("date test", )
                let attendenceCode: IAttendenceCode = {id: data.id, attendanceCode: data.attendanceCode, timestamp: date}

                setAttendenceCode(attendenceCode)
            })
        }
    },[selectedModules])

    useEffect(() => {
        console.log('location', location);
    },[location])

    useEffect(() => {
        console.log('selectedCourse', selectedCourse);    
    },[selectedCourse])

    useEffect(() => {
        console.log('selectedClasses', selectedStudentClasses);    
    },[selectedStudentClasses])

    useEffect(() => {
        console.log('selectedModules', selectedModules);
    },[selectedModules])

    useEffect(() => {
        console.log('attendenceCode', attendenceCode);
    },[attendenceCode])
    // When the component mounts and call this function it will take data as an argument 
    // as 'courses' state is updated to slow. On all other occasions we will use the local state 
    const handleCourseChange = (index: number, data: ICourse[] | undefined) => {
        let course;

        if (data !== undefined){
            course = data[index];
        } else {
            course = courses[index];
        }

        setSelectedCourse(course)
    }

    const handleStudentClassesChange = (indexes: number[]) => {        
        // Uses map to iterate the indexes and get the chosen studentClasses
        let classes = indexes.map(index => studentClasses[index])
        setSelectedStudentClasses(classes)
    }

    const handleModulesChange = (indexes: number[]) => {
        // Uses map to iterate the indexes and get the chosen modules
        let chosenModules = indexes.map(index => modules[index])
        setSelectedModules(chosenModules);
    }

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

    // if any of the values are null or empty then the registration is not complete, 
    // and we will use this to determine if the next button should be disabled
    const hasNotCompletedRegistration = () => {
        return !selectedCourse || selectedStudentClasses.length === 0 || selectedModules.length === 0
    };

    return (
        <>
            <VerticalStepper
                isNextButtonDisabled={hasNotCompletedRegistration()}
                CoursesAndClasses={ 
                    <CoursesAndClasses 
                        courses={courses}
                        studentClasses={studentClasses}
                        modules={modules}
                        onCoursesChange={handleCourseChange}
                        onClassesChange={handleStudentClassesChange}
                        onModulesChange={handleModulesChange}
                    /> 
                }
                GenerateCode={ <GenerateCode attendenceCode={attendenceCode}/> }
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
