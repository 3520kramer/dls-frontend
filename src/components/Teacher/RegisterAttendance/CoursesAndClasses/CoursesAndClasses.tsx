import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getCoursesByTeacherId, getStudentClasses, ICourse, IStudentClass } from '../../../../services/CoursesAndClassesService';
import CheckedListView from '../CheckedListView/CheckedListView';
import ListView from '../ListView/ListView';

interface IProps{
    children?: React.ReactNode,
    onCoursesChange: Function,
    onClassesChange: Function,
    selectedCourse: ICourse,
};

const CoursesAndClasses: React.FC<IProps> = ({children, onCoursesChange, onClassesChange, selectedCourse}) => {
    const [courses, setCourses] = useState<ICourse[] | []>([]);
    const [studentClasses, setStudentClasses] = useState<IStudentClass[] | []>([]);

    useEffect(() => {
        getCoursesByTeacherId(1).then(data => {
            setCourses(data)
            onCoursesChange(data[0])
        });
    },[])

    useEffect(() => {
        if (selectedCourse) 
            getStudentClasses(selectedCourse.id, 1).then(classes => setStudentClasses(classes));
    }, [selectedCourse])

    useEffect(() => {
        console.log(courses)
    },[courses])

    useEffect(() => {
        console.log(studentClasses)
    },[studentClasses])

    return (
        <Container>
            <Row>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Pick a course</h4>
                    <ListView listData={courses} onChange={(sc: ICourse) => onCoursesChange(sc)}/>
                </Col>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Select one or more classes</h4>
                    <CheckedListView listData={studentClasses} onChange={(sc: IStudentClass[]) => onClassesChange(sc)}/>
                </Col>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Choose number of lectures</h4>
                </Col>
            </Row>
        </Container>
    )
}
export default CoursesAndClasses;
