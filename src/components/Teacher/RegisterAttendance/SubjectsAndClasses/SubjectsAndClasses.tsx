import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { Col, Container, Row } from 'react-bootstrap';
import { ISubject, IModule, IStudentClass } from '../../../../services/RegisterAttendanceService';
import CheckedListView from '../CheckedListView/CheckedListView';
import ListView from '../ListView/ListView';
import { setSelectedSubject, setSelectedStudentClasses, setSelectedModules } from '../../../../redux/RegisterAttendance/RegisterAttendanceActions';
import { Module } from '../../../../redux/RegisterAttendance/RegisterAttendanceTypes';

interface IProps{
    children?: React.ReactNode,
    subjects: ISubject[],
    studentClasses: IStudentClass[],
    modules: IModule[]
};

const SubjectsAndClasses: React.FC<IProps> = ({children, subjects, studentClasses, modules}) => {
    const dispatch = useDispatch();
    
    const { selectedModules } = useSelector((state: AppState) => state.registerAttendance);

    // Sets the state of the selected subject by the index from the list component
    const handleSubjectChange = (index: number) => {
        dispatch(setSelectedSubject(subjects[index] as unknown as string));
    }

    const handleStudentClassesChange = (indexes: number[]) => {
        // Uses map to iterate the indexes and get the chosen studentClasses
        const classes = indexes.map(index => studentClasses[index]) as unknown as string[]
        dispatch(setSelectedStudentClasses(classes));
    }

    const handleModulesChange = (indexes: number[]) => {
        // Uses map to iterate the indexes and get the chosen modules
        const chosenModules = indexes.map(index => modules[index]) as unknown as Module[]
        dispatch(setSelectedModules(chosenModules));
    }

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
                        onChange={handleSubjectChange}
                    />
                </Col>
                <Col className="d-flex justify-content-center">
                    { /* Classes */ }
                    <CheckedListView
                        listData={studentClasses}
                        onChange={handleStudentClassesChange}
                    /> 
                </Col>
                <Col className="d-flex justify-content-center">
                    { /* Modules */ }
                    
                    <CheckedListView
                        //listData={selectedModules as unknown as IModule[]}
                        listData={modules}
                        onChange={handleModulesChange} 
                        allowMultiToggle
                    /> 
                </Col>
            </Row>
        </Container>
    )
}

export default SubjectsAndClasses;
