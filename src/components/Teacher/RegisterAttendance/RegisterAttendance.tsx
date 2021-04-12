import React, { useEffect, useState } from 'react';
import VerticalStepper from '../../Common/VerticalStepper/VerticalStepper'
import CoursesAndClasses from './CoursesAndClasses/CoursesAndClasses';
import GenerateCode from './GenerateCode/GenerateCode';
import './RegisterAttendance.css'
import Geo, { ICoordinates } from './Geo/Geo';
import { ICourse, IStudentClass, getCoursesByTeacherId, getStudentClasses, IModule, getModules } from '../../../services/RegisterAttendanceService';

export const RegisterAttendance = () => {
    const [courses, setCourses] = useState<ICourse[] | []>([]);
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

    const [studentClasses, setStudentClasses] = useState<IStudentClass[] | []>([]);
    const [selectedStudentClasses, setSelectedStudentClasses] = useState<IStudentClass[] | []>([]);
    const [selectedNumberOfStudents, setSelectedNumberOfStudents] = useState<number>(0);
    const [selectedCodeDuration, setCodeDuration] = useState<number>(0);
    const [selectedLocation, setSelectedLocation] = useState<ICoordinates | ''>('');


    useEffect(() => {
        console.log('selectedCodeDuration', selectedCodeDuration);    
    },[selectedCodeDuration])

    useEffect(() => {
        console.log('selectedNumberOfStudents', selectedNumberOfStudents);    
    },[selectedNumberOfStudents])


    const [modules, setModules] = useState<IModule[] | []>([]);
    const [selectedModules, setSelectedModules] = useState<IModule[] | []>([]);

    // When component mounts
    useEffect(() => {

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

    useEffect(() => {
        console.log('selectedCourse', selectedCourse);    
    },[selectedCourse])

    useEffect(() => {
        console.log('selectedClasses', selectedStudentClasses);    
    },[selectedStudentClasses])

    useEffect(() => {
        console.log('selectedModules', selectedModules);
    },[selectedModules])

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

    // get the locations data from Geo
    const handleLocationChange = (coordinates: ICoordinates) => {
        setSelectedLocation(coordinates);
        console.log("handleLocationChange", coordinates);
    }

    // gets the number of students from Geo
    const handleNumberOfStudentsChange = (value: number) => {        
        setSelectedNumberOfStudents(value);
        console.log("handleNumberOfStudentsChange", value);
    }

    // gets the number of code duration from Geo
    const handleCodeDurationChange = (value: number) => {        
        setCodeDuration(value);
        console.log("handleCodeDurationChange", value);
    }

    const handleModulesChange = (indexes: number[]) => {
        // Uses map to iterate the indexes and get the chosen modules
        let chosenModules = indexes.map(index => modules[index])
        setSelectedModules(chosenModules);
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
                GenerateCode={ <GenerateCode /> }
                Geo={
                    <Geo 
                        onLocationChange={handleLocationChange} 
                        onNumberOfStudentsChange={handleNumberOfStudentsChange}
                        onCodeDurationChange={handleCodeDurationChange}
                        selectedNumberOfStudents={selectedNumberOfStudents}
                        selectedCodeDuration={selectedCodeDuration}
                    />
                }
                
            />

        </>
    );
}