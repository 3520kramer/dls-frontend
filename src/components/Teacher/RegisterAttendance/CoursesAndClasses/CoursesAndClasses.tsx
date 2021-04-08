import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ICourse, IStudentClass } from '../../../../services/CoursesAndClassesService';
import CheckedListView from '../CheckedListView/CheckedListView';
import ListView from '../ListView/ListView';

interface IProps{
    children?: React.ReactNode,
    onCoursesChange: Function,
    onClassesChange: Function,
    courses: ICourse[]
    studentClasses: IStudentClass[]
};

const CoursesAndClasses: React.FC<IProps> = ({children, onCoursesChange, onClassesChange, courses, studentClasses}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Pick a course</h4>
                    <ListView listData={courses} onChange={onCoursesChange}/>
                </Col>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Select one or more classes</h4>
                    <CheckedListView listData={studentClasses} onChange={onClassesChange}/> 
                </Col>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Choose number of lectures</h4>
                </Col>
            </Row>
        </Container>
    )
}
export default CoursesAndClasses;
