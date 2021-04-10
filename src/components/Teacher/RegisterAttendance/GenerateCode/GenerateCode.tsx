import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { IAttendenceCode } from '../RegisterAttendance';


interface IProps{
    children?: React.ReactNode,
    attendenceCode: IAttendenceCode | null,
};

const colors = [
    ['#004777', 0.33],
    ['#F7B801', 0.33],
    ['#A30000', 0.33],
]

const GenerateCode: React.FC<IProps> = ({children, attendenceCode}) => {

    useEffect(() => {
        if(attendenceCode !== null){
            console.log("attendenceCode", attendenceCode)
            var startDate = attendenceCode.timestamp
            
            // Do your operations -- CALCULATE THE MINUTES AND SECONDS FOR THE CICULAR THINGY
            var endDate   = new Date();
            var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
            console.log(seconds)
        }
        
    },[])

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
                    <CountdownCircleTimer
                        isPlaying
                        duration={10}
                        colors={[
                            ['#004777', 0.33],
                            ['#F7B801', 0.33],
                            ['#A30000', 0.33],
                        ]}
                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                </Col>
            </Row>
        </Container>
    )
}

export default GenerateCode;
