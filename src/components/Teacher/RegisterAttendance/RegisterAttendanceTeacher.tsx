import React, { useEffect, useState } from 'react';
import VerticalStepper from '../../Common/VerticalStepper/VerticalStepper'
import SubjectsAndClasses from './SubjectsAndClasses/SubjectsAndClasses';
import GenerateCode from './GenerateCode/GenerateCode';
import './RegisterAttendanceTeacher.css'
import { ISubject, IStudentClass, getStudentClasses, IModule, sendRegisterAttendanceInfo, IAttendanceCodeDuration, IAttendanceCode, getInitialValues } from '../../../services/RegisterAttendanceService';
import Geo, { ICoordinates } from './Geo/Geo';
import { ToastContainer, toast } from 'react-toastify';
import { useOktaAuth } from '@okta/okta-react';

const RegisterAttendanceTeacher = () => {
    const [subjects, setSubjects] = useState<ISubject[] | []>([]);
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);

    const [studentClasses, setStudentClasses] = useState<IStudentClass[] | []>([]);
    const [selectedStudentClasses, setSelectedStudentClasses] = useState<IStudentClass[] | []>([]);

    const [modules, setModules] = useState<IModule[] | []>([]);
    const [selectedModules, setSelectedModules] = useState<IModule[] | []>([]);

    const [selectedCodeDuration, setCodeDuration] = useState<number>(5);
    const [selectedNumberOfStudents, setSelectedNumberOfStudents] = useState<number>(1);
    const [hasError, setError] = useState<boolean>(false);

    const [selectedLocation, setSelectedLocation] = useState<ICoordinates>({ latitude: 0, longitude: 0, accuracy: 100 });

    const [attendanceCode, setAttendenceCode] = useState<IAttendanceCode | null>(null);

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { authState, oktaAuth } = useOktaAuth();

    useEffect(() => {
        if(authState.isAuthenticated && authState.accessToken){
            setAccessToken(authState.accessToken?.accessToken);
        }
    }, [authState])

    // When component mounts and authentication has update 
    useEffect(() => {
        if(accessToken){
            getInitialValues(accessToken).then(data => {
                console.log("URL", data);
                setSelectedSubject({ title: data.subjects[0]});
                setSubjects(data.subjects.map((subject: string) => ({ title: subject })));
                setStudentClasses(data.classes.map((map: string) => ({ title: map })));
                setModules(data.modules);
    
            }).catch(error => {
                toast.error("Unable to fetch data", {position: toast.POSITION.TOP_RIGHT, autoClose: false })
            });
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
        if (selectedSubject !== null && accessToken)
            getStudentClasses(accessToken, selectedSubject.title).then(classes => 
                setStudentClasses(classes.map((_class: string) => ({ title: _class }))
            )).catch(error => {
                toast.error("Unable to fetch data", {position: toast.POSITION.TOP_RIGHT, autoClose: false })
            });;
    }, [selectedSubject])

    useEffect(() => {
        console.log('DATA selectedSubject', selectedSubject);
    }, [selectedSubject])

    useEffect(() => {
        console.log('DATA selectedClasses', selectedStudentClasses);
    }, [selectedStudentClasses])

    useEffect(() => {
        console.log('DATA selectedModules', selectedModules);
    }, [selectedModules])

    useEffect(() => {
        console.log('attendanceCode', attendanceCode);
    }, [attendanceCode])

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
        setSelectedSubject(null);
        setSelectedStudentClasses([]);
        setSelectedModules([]);
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
                SubjectsAndClasses={ 
                        <SubjectsAndClasses
                            subjects={subjects}
                            studentClasses={studentClasses}
                            modules={modules}
                            onSubjectsChange={(index: number) => handleSubjectChange(index)}
                            onClassesChange={(indexes: number[]) => handleStudentClassesChange(indexes)}
                            onModulesChange={(indexes: number[]) => handleModulesChange(indexes)}
                        />
                }
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