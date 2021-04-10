import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IAttendanceCodeResponse } from '../../../../services/RegisterAttendanceService';
import CountdownTimer from './CountdownTimer/CountdownTimer';

interface IProps{
    children?: React.ReactNode,
    attendanceCode: IAttendanceCodeResponse | null,
};

const colors = [
    ['#004777', 0.33],
    ['#F7B801', 0.33],
    ['#A30000', 0.33],
]

const GenerateCode: React.FC<IProps> = ({children, attendanceCode}) => {

    useEffect(() => {
        if(attendanceCode !== null){
            console.log("attendanceCode", attendanceCode)
            // var startDate = attendanceCode.timestamp
            
            // // Do your operations -- CALCULATE THE MINUTES AND SECONDS FOR THE CICULAR THINGY
            // var endDate   = new Date();
            // var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
            // console.log(seconds)
        }
    },[attendanceCode])

    return (
        <Container>
            <Row>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Generate Code</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 style={{textAlign: 'center'}}>123456</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Generate Code</h4>
                </Col>
                <Col>
                    {/* <CountdownTimer duration={attendanceCode.duration} /> */}
                </Col>
            </Row>
        </Container>
    )
}

export default GenerateCode;
