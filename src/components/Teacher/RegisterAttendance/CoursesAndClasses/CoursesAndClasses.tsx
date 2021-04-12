import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ISubject, IModule, IStudentClass } from '../../../../services/RegisterAttendanceService';
import CheckedListView from '../CheckedListView/CheckedListView';
import ListView from '../ListView/ListView';

interface IProps{
    children?: React.ReactNode,
    onCoursesChange: Function,
    onClassesChange: Function,
    onModulesChange: Function,
    courses: ISubject[],
    studentClasses: IStudentClass[],
    modules: IModule[]
};

const CoursesAndClasses: React.FC<IProps> = ({children, onCoursesChange, onClassesChange, onModulesChange, courses, studentClasses, modules}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <div style={{padding: "0 40px"}}>
                        <h4 style={{textAlign: 'center', paddingBottom: '20px'}}>Pick one course</h4>
                    </div>
                </Col>
                <Col>
                    <h4 style={{textAlign: 'center', paddingBottom: '20px'}}>Select one or more classes</h4>
                </Col>
                <Col>
                    <h4 style={{textAlign: 'center', paddingBottom: '20px'}}>Choose number of lectures</h4>
                </Col>
            </Row>
            <Row>
                <Col style={{padding: 0}}>
                    { /* Courses */ }
                    <ListView
                        listData={courses}
                        onChange={onCoursesChange}
                    />
                </Col>
                <Col>
                    { /* Classes */ }
                    <CheckedListView
                        listData={studentClasses}
                        onChange={onClassesChange}
                    /> 
                </Col>
                <Col>
                    { /* Modules */ }
                    <CheckedListView
                        listData={modules}
                        onChange={onModulesChange} 
                        allowMultiToggle
                    /> 
                </Col>
            </Row>
        </Container>
    )
}

export default CoursesAndClasses;
