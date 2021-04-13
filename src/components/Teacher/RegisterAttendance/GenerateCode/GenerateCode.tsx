import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IAttendanceCodeResponse } from '../../../../services/RegisterAttendanceService';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import './GenerateCodeStyles.css';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

interface IProps{
    children?: React.ReactNode,
    attendanceCode: IAttendanceCodeResponse,
};

const colors = [
    ['#004777', 0.33],
    ['#F7B801', 0.33],
    ['#A30000', 0.33],
]
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '20px',
    },
    rootButton: {
        '& > *': {
          margin: theme.spacing(1),
        },
    }
  }),
);

const GenerateCode: React.FC<IProps> = ({children, attendanceCode}) => {
    const classes = useStyles();

    useEffect(() => {
        if(attendanceCode !== null){
            console.log("attendanceCode", attendanceCode)
        }
    },[attendanceCode])

    return (
        <Container>
            <Row>
                <Col>
                    <h2 style={{textAlign: 'center', marginBottom: '50px'}}>Code to register attendance</h2>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className={classes.root}>
                        <Paper elevation={3} className="code-wrapper">
                            <h2 className="code-content">{attendanceCode.attendanceCode}</h2>
                            <div className={classes.root}>
                                <IconButton 
                                    aria-label="FileCopy"
                                    onClick={() => {navigator.clipboard.writeText(attendanceCode.attendanceCode)}}
                                >
                                    <FileCopyOutlinedIcon />
                                </IconButton>
                            </div>
                        </Paper>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <CountdownTimer
                        timestamp={attendanceCode.timestamp}
                        duration={attendanceCode.duration}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default GenerateCode;
