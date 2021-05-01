import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ISubject, IModule, IStudentClass } from '../../../../services/RegisterAttendanceService';
import CheckedListView from '../CheckedListView/CheckedListView';
import ListView from '../ListView/ListView';

interface IProps{
    children?: React.ReactNode,
    onSubjectsChange: Function,
    onClassesChange: Function,
    onModulesChange: Function,
    subjects: ISubject[],
    studentClasses: IStudentClass[],
    modules: IModule[]
};

const SubjectsAndClasses: React.FC<IProps> = ({children, onSubjectsChange, onClassesChange, onModulesChange, subjects, studentClasses, modules}) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h4 style={{textAlign: 'center', paddingBottom: '20px'}}>Pick one subject</h4>
                </Col>
                <Col>
                    <h4 style={{textAlign: 'center', paddingBottom: '20px'}}>Select one or more classes</h4>
                </Col>
                <Col>
                    <h4 style={{textAlign: 'center', paddingBottom: '20px'}}>Choose number of lectures</h4>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    { /* Subjects */ }
                    <ListView
                        listData={subjects}
                        onChange={onSubjectsChange}
                    />
                </Col>
                <Col className="d-flex justify-content-center">
                    { /* Classes */ }
                    <CheckedListView
                        listData={studentClasses}
                        onChange={onClassesChange}
                    /> 
                </Col>
                <Col className="d-flex justify-content-center">
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

export default SubjectsAndClasses;
