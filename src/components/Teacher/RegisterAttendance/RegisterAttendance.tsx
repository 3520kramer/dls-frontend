import React, { useEffect, useState } from 'react';
import VerticalStepper from '../../Common/VerticalStepper/VerticalStepper'
import CoursesAndClasses from './CoursesAndClasses/CoursesAndClasses';
import GenerateCode from './GenerateCode/GenerateCode';
import './RegisterAttendance.css'
import { ICourse, IStudentClass, getCoursesByTeacherId, getStudentClasses } from '../../../services/CoursesAndClassesService';
import Geo from './Geo/Geo';


export const RegisterAttendance = () => {
    const [courses, setCourses] = useState<ICourse[] | []>([]);
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

    const [studentClasses, setStudentClasses] = useState<IStudentClass[] | []>([]);
    const [selectedStudentClasses, setSelectedStudentClasses] = useState<IStudentClass[] | []>([]);

    // When component mounts
    useEffect(() => {

        // Fetches the courses which will be passed to 
        // the child components CoursesAndClasses and then to ListView
        getCoursesByTeacherId(1).then(data => {
            setCourses(data)
            handleCourseChange(0, data)
        });
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

   const handleLocationChange = () => {
       console.log("gello");
       
   }

    return (
        <>
            <VerticalStepper
                CoursesAndClasses={ 
                    <CoursesAndClasses 
                        courses={courses}
                        studentClasses={studentClasses}
                        onCoursesChange={handleCourseChange}
                        onClassesChange={handleStudentClassesChange}
                    /> 
                }
                GenerateCode={ <GenerateCode /> }
                Geo={
                    <Geo 
                        onLocationChange={handleLocationChange} 
                    />
                }
                
            />

        </>
    );
}
