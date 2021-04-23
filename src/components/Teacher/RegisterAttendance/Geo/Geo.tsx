import React, { useEffect, useState } from 'react';
import Map from '../../../Common/Map/Map';
import ToggleSwitch from '../../../Common/ToggleSwitch/ToggleSwitch';
import TextField from '../../../Common/TextField/TextField'
import { Container, Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// interface that we use to define which props our component can have.
interface IProps {
    children?: React.ReactNode,
    onLocationChange: Function,
    onNumberOfStudentsChange: Function,
    selectedNumberOfStudents: number,
    onCodeDurationChange: Function,
    selectedCodeDuration: number,
    location: ICoordinates
};

// interface that holds our coordinates
export interface ICoordinates {
    accuracy: number
    latitude: number
    longitude: number
}

// functional component that handles the geolocation of the user 
const Geo: React.FC<IProps> = ({
    children,
    location,
    onLocationChange,
    onNumberOfStudentsChange,
    selectedNumberOfStudents,
    onCodeDurationChange,
    selectedCodeDuration }) => {

    const [hasEnabledGPS, setHasEnabledGPS] = useState<boolean>(false);
    const [count, setCount] = useState<number>(1);

    // When component mounts
    useEffect(() => {
        if (hasEnabledGPS) {
            getGeoLocation();
            onNumberOfStudentsChange(0);
        } else {
            onNumberOfStudentsChange(1);
            onLocationChange({ latitude: 0, longitude: 0, accuracy: 0 });
        }
    }, [hasEnabledGPS])

    // logs the location of the user. only used for debugging
    useEffect(() => {
        console.log('location', location);
    }, [location])

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
                setHasEnabledGPS(false);
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
            onLocationChange(coordinates);
        },
            (error => {
                console.error("Error Code = " + error.code + " - " + error.message);
            }), { enableHighAccuracy: true }
        );
    }

    // takes textField input from number of students
    const handleNumberOfStudentsChange = (value: string) => {
        if (value !== undefined && value.match("^[0-9]*$") && value.length <= 3) {
            console.log("handleTextChange", value);
            onNumberOfStudentsChange(Number.parseInt(value));
        }
    }

    // takes textField input from code duration
    const handleCodeDurationChange = (value: string) => {
        if (value !== undefined && value.match("^[0-9]*$") && value.length <= 3) {
            console.log("handleTextChange", value);
            onCodeDurationChange(Number.parseInt(value));
        }
    }

    const codeDurationhasError = () => selectedCodeDuration <= 0;

    const numberOfStudentsHasError = () => {
        if (!hasEnabledGPS) {
            return selectedNumberOfStudents <= 0
        } else {
            return false;
        }
    };

    // Returns the view of the funtional component
    return (
        <Container>
            <ToastContainer />
            <Row>
                <Col>
                    <ToggleSwitch
                        condition={hasEnabledGPS}
                        setCondition={(value: boolean) => setHasEnabledGPS(value)}
                        names="EnableLocation"
                        label="Enable Location Services"
                    />
                    <TextField
                        type="number"
                        label="Number of students"
                        onChange={(value: string) => handleNumberOfStudentsChange(value)}
                        disabled={hasEnabledGPS}
                        value={selectedNumberOfStudents.toString()}
                        showError={numberOfStudentsHasError()}
                    />
                    <TextField
                        type="number"
                        label="Code duration in mins"
                        onChange={(value: string) => handleCodeDurationChange(value)}
                        value={selectedCodeDuration.toString()}
                        showError={codeDurationhasError()}
                    />

                </Col>
                <Col>
                    <Map
                        longitude={location.longitude}
                        latitude={location.latitude}
                        hasEnabledGPS={hasEnabledGPS}
                    />
                </Col>
            </Row>
        </Container>
    )
}


// export Geo so we can use it in other components
export default Geo;