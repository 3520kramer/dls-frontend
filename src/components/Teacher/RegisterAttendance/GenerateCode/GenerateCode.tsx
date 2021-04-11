import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

interface IProps{
    children?: React.ReactNode,
};

const GenerateCode: React.FC<IProps> = ({children}) => {
    
    return (
        <Container>
            <Row>
                <Col>
                    <h4 style={{textAlign: 'center'}}>Generate Code</h4>
                </Col>
            </Row>
        </Container>
    )
}

export default GenerateCode;
