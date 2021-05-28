import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";
import VerticalStepper from "../../Common/VerticalStepper/VerticalStepper";
import SubjectsAndClasses from "./SubjectsAndClasses/SubjectsAndClasses";
import GenerateCode from "./GenerateCode/GenerateCode";
import { toast } from "react-toastify";
import { useOktaAuth } from "@okta/okta-react";
import Geo from "./Geo/Geo";
import { useDispatch } from "react-redux";
import "./RegisterAttendanceTeacher.css";
import {
  sendRegisterAttendanceInfo,
  IAttendanceCodeDuration,
  IAttendanceCode,
} from "../../../services/RegisterAttendanceService";
import {
  setSelectedCodeDuration,
  setSelectedNumberOfStudents,
  setSelectedLocation,
} from "../../../redux/RegisterAttendanceRequest/RegisterAttendanceRequestActions";
import {
  getRegisterAttendanceData,
  getStudentClassesData,
} from "../../../redux/RegisterAttendanceData/RegisterAttendanceDataEffect";

const RegisterAttendanceTeacher = () => {
  const { subjects } = useSelector(
    (state: AppState) => state.registerAttendanceData
  );
  const {
    selectedSubject,
    selectedStudentClasses,
    selectedModules,
    selectedCodeDuration,
    selectedNumberOfStudents,
    selectedLocation,
  } = useSelector((state: AppState) => state.registerAttendanceRequest);

  const [hasError, setError] = useState<boolean>(false);
  const [fetchCount, setFetchCount] = useState<number>(0);

  const [attendanceCode, setAttendenceCode] =
    useState<IAttendanceCode | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { authState } = useOktaAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    if (authState.isAuthenticated && authState.accessToken) {
      setAccessToken(authState.accessToken?.accessToken);
    }
  }, [authState]);

  // When component mounts and authentication has update
  useEffect(() => {
    if (accessToken && fetchCount < 1) {
      setFetchCount(fetchCount + 1);
      dispatch(getRegisterAttendanceData(accessToken));
    }
    //eslint-disable-next-line
  }, [accessToken]);

  useEffect(() => {
    console.log("selectedCodeDuration", selectedCodeDuration);
  }, [selectedCodeDuration]);

  useEffect(() => {
    console.log("selectedNumberOfStudents", selectedNumberOfStudents);
  }, [selectedNumberOfStudents]);

  // When a subject is selected we will need to fetch the student classes related to the selected subject
  useEffect(() => {
    // After the first fetch, the selectedSubject will be updated with the first item in the subjects list.
    // When this happens we dont want to fetch the classes as we already have it from the first fetch
    if (fetchCount === 1 && selectedSubject === subjects[0]) return;

    if (accessToken) {
      setFetchCount(fetchCount + 1);
      dispatch(getStudentClassesData(accessToken, selectedSubject));
    }
  }, [selectedSubject]);

  // if any of the values are null or empty then the registration is not complete,
  // and we will use this to determine if the next button should be disabled
  const hasNotCompletedRegistration = () => {
    return (
      !selectedSubject ||
      selectedStudentClasses.length === 0 ||
      selectedModules.length === 0
    );
  };

  const handleLastStep = (isLastStep: boolean) => {
    console.log("handleLastStep", isLastStep);
    if (
      isLastStep &&
      accessToken &&
      selectedSubject &&
      selectedStudentClasses.length >= 1 &&
      selectedModules.length >= 1
    ) {
      const newAttendanceCodeDuration: IAttendanceCodeDuration = {
        durationMinutes: selectedCodeDuration,
        timeStamp: new Date(),
      };

      sendRegisterAttendanceInfo(
        accessToken,
        selectedSubject,
        selectedStudentClasses,
        selectedModules,
        selectedLocation,
        newAttendanceCodeDuration,
        selectedNumberOfStudents
      )
        .then((attendanceCode: string) => {
          setAttendenceCode({
            attendanceCode: attendanceCode,
            durationMinutes: newAttendanceCodeDuration.durationMinutes,
            timeStamp: newAttendanceCodeDuration.timeStamp,
          });
        })
        .catch((error) => {
          toast.error("Unable to create roll call - please try again", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
          });
        });
    }
  };

  const handleHasReset = () => {
    dispatch(setSelectedCodeDuration(5));
    dispatch(setSelectedNumberOfStudents(1));
    dispatch(setSelectedLocation({ latitude: 0, longitude: 0, accuracy: 100 }));
    setAttendenceCode(null);
  };

  const handleIsNextButtonDisabledinGeo = (hasError: boolean) => {
    setError(hasError);
  };

  return (
    <>
      <VerticalStepper
        isNextButtonDisabled={hasNotCompletedRegistration() || hasError}
        onLastStep={handleLastStep}
        hasReset={handleHasReset}
        SubjectsAndClasses={<SubjectsAndClasses />}
        GenerateCode={
          attendanceCode !== null && (
            <GenerateCode attendanceCode={attendanceCode} />
          )
        }
        Geo={
          <Geo
            handleIsNextButtonDisabledinGeo={handleIsNextButtonDisabledinGeo}
          />
        }
      />
    </>
  );
};

export default RegisterAttendanceTeacher;
