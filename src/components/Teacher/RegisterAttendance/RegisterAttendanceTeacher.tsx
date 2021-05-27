import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import VerticalStepper from '../../Common/VerticalStepper/VerticalStepper'
import SubjectsAndClasses from './SubjectsAndClasses/SubjectsAndClasses';
import GenerateCode from './GenerateCode/GenerateCode';
import './RegisterAttendanceTeacher.css'
import { sendRegisterAttendanceInfo, IAttendanceCodeDuration, IAttendanceCode } from '../../../services/RegisterAttendanceService';
import { IModule } from '../../../redux/RegisterAttendanceData/RegisterAttendanceDataTypes';
import Geo, { ICoordinates } from './Geo/Geo';
import { ToastContainer, toast } from 'react-toastify';
import { useOktaAuth } from '@okta/okta-react';
import { getRegisterAttendanceData, getStudentClassesData } from '../../../redux/RegisterAttendanceData/RegisterAttendanceDataEffect'
import { useDispatch } from 'react-redux';

const RegisterAttendanceTeacher = () => {
    const { subjects, classes, modules } = useSelector((state: AppState) => state.registerAttendanceData);
    const { selectedSubject, selectedStudentClasses, selectedModules } = useSelector((state: AppState) => state.registerAttendanceRequest);

    const [selectedCodeDuration, setCodeDuration] = useState<number>(5);
    const [selectedNumberOfStudents, setSelectedNumberOfStudents] = useState<number>(1);
    const [hasError, setError] = useState<boolean>(false);
    const [fetchCount, setFetchCount] = useState<number>(0);

    const [selectedLocation, setSelectedLocation] = useState<ICoordinates>({ latitude: 0, longitude: 0, accuracy: 100 });

    const [attendanceCode, setAttendenceCode] = useState<IAttendanceCode | null>(null);

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch()

    useEffect(() => {
        if(authState.isAuthenticated && authState.accessToken){
            setAccessToken(authState.accessToken?.accessToken);
        }
    }, [authState])

    // When component mounts and authentication has update 
    useEffect(() => {
        if(accessToken && fetchCount < 1){
            setFetchCount(fetchCount + 1);
            dispatch(getRegisterAttendanceData(accessToken));
            // getInitialValues(accessToken).then(data => {
            //     console.log("URL", data);
            //     // setSelectedSubject(data.subjects[0]);
            //     // setSubjects(data.subjects.map((subject: string) => ({ title: subject })));
            //     // setStudentClasses(data.classes.map((map: string) => ({ title: map })));
            //     // setModules(data.modules);
    
            // }).catch(error => {
            //     toast.error("Unable to fetch data", {position: toast.POSITION.TOP_RIGHT, autoClose: false })
            // });
        }
        
        //eslint-disable-next-line
    }, [accessToken])

    useEffect(() => {
        console.log('selectedCodeDuration', selectedCodeDuration);
    }, [selectedCodeDuration])

    useEffect(() => {
        console.log('selectedNumberOfStudents', selectedNumberOfStudents);
    }, [selectedNumberOfStudents])

    // When a subject is selected we will need to fetch the student classes related to the selected subject
    useEffect(() => {
        // After the first fetch, the selectedSubject will be updated with the first item in the subjects list.
        // When this happens we dont want to fetch the classes as we already have it from the first fetch
        if (fetchCount === 1 && selectedSubject === subjects[0]) return;
        
        if(accessToken) {
            setFetchCount(fetchCount + 1);
            dispatch(getStudentClassesData(accessToken, selectedSubject));
        }
        
        // getStudentClasses(accessToken, selectedSubject).then(classes => 
            //     setStudentClasses(classes.map((_class: string) => ({ title: _class }))
            // )).catch(error => {
            //     toast.error("Unable to fetch data", {position: toast.POSITION.TOP_RIGHT, autoClose: false })
            // });;
    }, [selectedSubject])

    // get the locations data from Geo
    const handleLocationChange = (coordinates: ICoordinates) => {
        setSelectedLocation(coordinates);
        console.log("handleLocationChange", coordinates);
    }

    // gets the number of students from Geo
    const handleNumberOfStudentsChange = (value: number) => {
        setSelectedNumberOfStudents(value);
        console.log("handleNumberOfStudentsChange", value);
    }

    // gets the number of code duration from Geo
    const handleCodeDurationChange = (value: number) => {
        setCodeDuration(value);
        console.log("handleCodeDurationChange", value);
    }

    // if any of the values are null or empty then the registration is not complete, 
    // and we will use this to determine if the next button should be disabled
    const hasNotCompletedRegistration = () => {
        return !selectedSubject || selectedStudentClasses.length === 0 || selectedModules.length === 0;
    };

    const handleLastStep = (isLastStep: boolean) => {
        console.log("handleLastStep", isLastStep)
        if (isLastStep && accessToken && selectedSubject && selectedStudentClasses.length >= 1 && selectedModules.length >= 1) {
            const newAttendanceCodeDuration: IAttendanceCodeDuration = { durationMinutes: selectedCodeDuration, timeStamp: new Date() }

            sendRegisterAttendanceInfo(
                accessToken,
                selectedSubject,
                selectedStudentClasses,
                selectedModules,
                selectedLocation,
                newAttendanceCodeDuration,
                selectedNumberOfStudents)
                .then((attendanceCode: string) => {
                    setAttendenceCode({
                        attendanceCode: attendanceCode,
                        durationMinutes: newAttendanceCodeDuration.durationMinutes,
                        timeStamp: newAttendanceCodeDuration.timeStamp
                    })
                }).catch(error => {
                    toast.error("Unable to create roll call - please try again", {position: toast.POSITION.TOP_RIGHT, autoClose: false })
                });
        }
    }

    const handleHasReset = () => {
        setCodeDuration(5);
        setSelectedNumberOfStudents(1)
        setSelectedLocation({ latitude: 0, longitude: 0, accuracy: 100 })
        setAttendenceCode(null);
    }


    const handleIsNextButtonDisabledinGeo = (hasError: boolean) => {
        setError(hasError);
    }


    return (
        <>
            <ToastContainer />
            <VerticalStepper
                isNextButtonDisabled={hasNotCompletedRegistration() || hasError}
                onLastStep={handleLastStep}
                hasReset={handleHasReset}
                SubjectsAndClasses={ <SubjectsAndClasses/> }
                GenerateCode={attendanceCode !== null && <GenerateCode attendanceCode={attendanceCode} />}
                Geo={
                    <Geo
                        location={selectedLocation}
                        onLocationChange={handleLocationChange}
                        onNumberOfStudentsChange={handleNumberOfStudentsChange}
                        onCodeDurationChange={handleCodeDurationChange}
                        selectedNumberOfStudents={selectedNumberOfStudents}
                        selectedCodeDuration={selectedCodeDuration}
                        handleIsNextButtonDisabledinGeo={handleIsNextButtonDisabledinGeo}
                    />
                }
            />
        </>
    );
}

export default RegisterAttendanceTeacher;