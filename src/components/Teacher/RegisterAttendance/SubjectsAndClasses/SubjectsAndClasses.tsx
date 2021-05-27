import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store';
import { Col, Container, Row } from 'react-bootstrap';
import CheckedListView from '../CheckedListView/CheckedListView';
import ListView from '../ListView/ListView';
import { setSelectedSubject, setSelectedStudentClasses, setSelectedModules } from '../../../../redux/RegisterAttendanceRequest/RegisterAttendanceRequestActions';
import { ISubject, IModule, IStudentClass } from '../../../../redux/RegisterAttendanceData/RegisterAttendanceDataTypes';

interface IProps{
    children?: React.ReactNode,
    subjects?: ISubject[],
    studentClasses?: IStudentClass[],
    modules?: IModule[]
};

const SubjectsAndClasses: React.FC<IProps> = ({children}) => {
    const dispatch = useDispatch();
    
    const { subjects, classes, modules } = useSelector((state: AppState) => state.registerAttendanceData);

    // Sets the state of the selected subject by the index from the list component
    const handleSubjectChange = (index: number) => {
        dispatch(setSelectedSubject(subjects[index] as unknown as string));
    }

    const handleStudentClassesChange = (indexes: number[]) => {
        // Uses map to iterate the indexes and get the chosen studentClasses
        const studentClasses = indexes.map(index => classes[index]) as unknown as string[]
        dispatch(setSelectedStudentClasses(studentClasses));
    }

    const handleModulesChange = (indexes: number[]) => {
        // Uses map to iterate the indexes and get the chosen modules
        const chosenModules = indexes.map(index => modules[index]) as unknown as IModule[]
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
                        listData={subjects as unknown as ISubject[]}
                        onChange={handleSubjectChange}
                    />
                </Col>
                <Col className="d-flex justify-content-center">
                    { /* Classes */ }
                    <CheckedListView
                        listData={classes as unknown as IStudentClass[]}
                        onChange={handleStudentClassesChange}
                    /> 
                </Col>
                <Col className="d-flex justify-content-center">
                    { /* Modules */ }
                    
                    <CheckedListView
                        listData={modules as unknown as IModule[]}
                        onChange={handleModulesChange} 
                        allowMultiToggle
                    /> 
                </Col>
            </Row>
        </Container>
    )
}

export default SubjectsAndClasses;
