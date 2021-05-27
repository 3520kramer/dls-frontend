import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import Map from "../../../Common/Map/Map";
import ToggleSwitch from "../../../Common/ToggleSwitch/ToggleSwitch";
import TextField from "../../../Common/TextField/TextField";
import { Container, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICoordinates } from "../../../../redux/RegisterAttendanceRequest/RegisterAttendanceRequestTypes";
import { setSelectedCodeDuration, setSelectedNumberOfStudents, setSelectedLocation } from "../../../../redux/RegisterAttendanceRequest/RegisterAttendanceRequestActions";

// interface that we use to define which props our component can have.
interface IProps {
  children?: React.ReactNode;
  handleIsNextButtonDisabledinGeo: Function;
}

// functional component that handles the geolocation of the user
const Geo: React.FC<IProps> = ({children, handleIsNextButtonDisabledinGeo, }) => {
  const dispatch = useDispatch();

  const { selectedCodeDuration, selectedNumberOfStudents, selectedLocation } =
    useSelector((state: AppState) => state.registerAttendanceRequest);

  const [hasEnabledGPS, setHasEnabledGPS] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);

  // When component mounts
  useEffect(() => {
    if (hasEnabledGPS) {
      getGeoLocation();
      dispatch(setSelectedNumberOfStudents(0));
    } else {
      dispatch(setSelectedNumberOfStudents(1));
      dispatch(setSelectedLocation({ latitude: 0, longitude: 0, accuracy: 100 }));
    }
  }, [hasEnabledGPS]);

  // logs the location of the user. only used for debugging
  useEffect(() => {
    console.log("location", selectedLocation);
  }, [selectedLocation]);

  // this checks each time location is called is location.accuracy is within 100 meters. if not tries again
  // also holds the messages alerting the user that something is wrong
  useEffect(() => {
    console.log("location.accuracy", selectedLocation.accuracy);
    if (selectedLocation.accuracy > 100) {
      setCount(count + 1);
      console.log(count);
      getGeoLocation();

      if (count === 2) {
        toast.warn("trying to get your precise location. Please wait", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      if (count === 3) {
        setHasEnabledGPS(false);
        setCount(1);
        toast.error("Can't get your precise location, try again", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
        });
      }
    }
  }, [selectedLocation]);

  // this function gets the user location
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates: ICoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        dispatch(setSelectedLocation(coordinates));
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      { enableHighAccuracy: true }
    );
  };

  // takes textField input from number of students
  const handleNumberOfStudentsChange = (value: string) => {
    if (value !== undefined && value.match("^[0-9]*$") && value.length <= 3) {
      console.log("handleTextChange", value);
      dispatch(setSelectedNumberOfStudents(Number.parseInt(value)));
    }
  };

  // takes textField input from code duration
  const handleCodeDurationChange = (value: string) => {
    if (value !== undefined && value.match("^[0-9]*$") && value.length <= 3) {
      console.log("handleTextChange", value);
      dispatch(setSelectedCodeDuration(Number.parseInt(value)));
    }
  };

  const codeDurationhasError = () =>
    selectedCodeDuration <= 0 || !selectedCodeDuration;

  const numberOfStudentsHasError = () => {
    if (!hasEnabledGPS) {
      return selectedNumberOfStudents <= 0 || !selectedNumberOfStudents;
    }
  };

  // handles if next button is disabled or not by the input
  const handleIsNextButtonDisabled = () => {
    if (hasEnabledGPS) {
      if (
        selectedCodeDuration <= 0 ||
        !selectedCodeDuration ||
        selectedLocation.accuracy >= 100
      ) {
        return true;
      }
    } else if (!hasEnabledGPS) {
      if (
        !selectedCodeDuration ||
        !selectedNumberOfStudents ||
        selectedCodeDuration <= 0 ||
        selectedNumberOfStudents <= 0
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    let hasError = handleIsNextButtonDisabled();
    console.log("handleIsNextButtonDisabled", hasError);

    handleIsNextButtonDisabledinGeo(hasError);
  }, [selectedNumberOfStudents, selectedCodeDuration, selectedLocation]);

  // Returns the view of the funtional component
  return (
    <Container>
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
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            hasEnabledGPS={hasEnabledGPS}
          />
        </Col>
      </Row>
    </Container>
  );
};

// export Geo so we can use it in other components
export default Geo;
