import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getStudentClasses } from '../../../../services/CoursesAndClassesService';
import CheckedListView from '../CheckedListView/CheckedListView';
import ListView from '../ListView/ListView';
export interface IStudentClass{
    id: number,
    title: string,
}
interface IProps{
    children?: React.ReactNode,
};

const CoursesAndClasses: React.FC<IProps> = ({children}) => {
   
    const [studentClasses, setStudentClasses] = useState<IStudentClass[] | []>([]);

    useEffect(() => {
        getStudentClasses().then((data: IStudentClass[]) => setStudentClasses(data))
    },[])

    useEffect(() => {
        console.log(studentClasses)
    },[studentClasses])

    return (
        <>
            <Container>
            <Row>
                <Col>
                    <h4>Pick a course</h4>
                    <ListView listData={studentClasses}/>
                </Col>
                <Col>
                    <ListView listData={studentClasses}/>
                </Col>

                <Col>
                    <p style={{textAlign: 'center'}}>Show courses</p>
                </Col>
                <Col>
                    <CheckedListView listData=""/>
                </Col>
            </Row>
            </Container>
        </>
    )
}

CoursesAndClasses.displayName = "CoursesAndClasses"
export default CoursesAndClasses;