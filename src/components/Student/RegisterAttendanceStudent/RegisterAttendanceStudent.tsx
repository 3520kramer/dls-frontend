import { useEffect, useState } from 'react';
import TextField from '../../Common/TextField/TextField'
import { Container, Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ICoordinates } from '../../Teacher/RegisterAttendance/Geo/Geo';


// TODO: perhaps show that the students location is ok or bad. 

const RegisterAttendanceStudent = () => {

    const [attendanceCode, setAttendanceCode] = useState<string>("");
    const [count, setCount] = useState<number>(1);

    const [location, setLocation] = useState<ICoordinates>({ latitude: 0, longitude: 0, accuracy: 0 });


    useEffect(() => {
        getGeoLocation();
    }, []);

    // just for debug
    useEffect(() => {
        console.log(attendanceCode);
    }, [attendanceCode]);

    // this checks each time location is called is location.accuracy is within 100 meters. if not tries again
    // also holds the messages alerting the user that something is wrong
    useEffect(() => {
        console.log("location.accuracy", location.accuracy);
        if (location.accuracy > 100) {
            setCount(count + 1);
            console.log(count);
            getGeoLocation();

            if (count === 2) {
                toast.warn("trying to get your precise location. Please wait", { position: toast.POSITION.TOP_RIGHT });
            }

            if (count === 3) {
                //setHasEnabledGPS(false);
                setCount(1);
                toast.error("Can't get your precise location, try again", { position: toast.POSITION.TOP_RIGHT, autoClose: false });
            }
        } 
    }, [location])

    
    // this function gets the user location 
    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {

            const coordinates: ICoordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
            }
            setLocation(coordinates);
        },
            (error => {
                console.error("Error Code = " + error.code + " - " + error.message);
            }), { enableHighAccuracy: true }
        );
    }

    return (
        <Container>
            <ToastContainer />
            <Row>
                <Col>
                    <TextField
                        type="text"
                        label="Attendance Code"
                        onChange={(value: string) => setAttendanceCode(value)}
                        value={attendanceCode}
                    ></TextField>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterAttendanceStudent;