import React, { useEffect, useState } from 'react';
import VerticalStepper from '../../Common/VerticalStepper/VerticalStepper'
import SubjectsAndClasses from './SubjectsAndClasses/SubjectsAndClasses';
import GenerateCode from './GenerateCode/GenerateCode';
import './RegisterAttendance.css'
import { ISubject, IStudentClass, getStudentClasses, IModule, sendRegisterAttendanceInfo, IAttendanceCodeDuration, IAttendanceCode, getInitialValues } from '../../../services/RegisterAttendanceService';
import Geo, { ICoordinates } from './Geo/Geo';

export const RegisterAttendance = () => {
    const [subjects, setSubjects] = useState<ISubject[] | []>([]);
    const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null);

    const [studentClasses, setStudentClasses] = useState<IStudentClass[] | []>([]);
    const [selectedStudentClasses, setSelectedStudentClasses] = useState<IStudentClass[] | []>([]);

    const [modules, setModules] = useState<IModule[] | []>([]);
    const [selectedModules, setSelectedModules] = useState<IModule[] | []>([]);

    const [selectedCodeDuration, setCodeDuration] = useState<number>(5);
    const [selectedNumberOfStudents, setSelectedNumberOfStudents] = useState<number>(1);

    const [selectedLocation, setSelectedLocation] = useState<ICoordinates>({ latitude: 0, longitude: 0, accuracy: 0 });

    const [attendanceCode, setAttendenceCode] = useState<IAttendanceCode | null>(null);

    // When component mounts
    useEffect(() => {
        getInitialValues().then(data => {
            console.log("URL", data);

            setSubjects(data.subjects.map((subject: string) => ({ title: subject })));
            setStudentClasses(data.classes.map((map: string) => ({ title: map })));
            setModules(data.modules);

        });
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log('selectedCodeDuration', selectedCodeDuration);
    }, [selectedCodeDuration])

    useEffect(() => {
        console.log('selectedNumberOfStudents', selectedNumberOfStudents);
    }, [selectedNumberOfStudents])

    // When a subject is selected we will need to fetch the student classes related to the selected subject
    useEffect(() => {
        if (selectedSubject !== null)
            getStudentClasses(selectedSubject.title).then(classes => setStudentClasses(classes.map((_class: string) => ({ title: _class }))));
    }, [selectedSubject])

    useEffect(() => {
        console.log('selectedCourse', selectedSubject);
    }, [selectedSubject])

    useEffect(() => {
        console.log('selectedClasses', selectedStudentClasses);
    }, [selectedStudentClasses])

    useEffect(() => {
        console.log('selectedModules', selectedModules);
    }, [selectedModules])

    useEffect(() => {
        console.log('attendanceCode', attendanceCode);
    }, [attendanceCode])

    // Sets the state of the selected subject by the index from the list component
    const handleSubjectChange = (index: number) => {
        setSelectedSubject(subjects[index]);
    }

    const handleStudentClassesChange = (indexes: number[]) => {
        // Uses map to iterate the indexes and get the chosen studentClasses
        let classes = indexes.map(index => studentClasses[index])
        setSelectedStudentClasses(classes)
    }

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

    const handleModulesChange = (indexes: number[]) => {
        // Uses map to iterate the indexes and get the chosen modules
        let chosenModules = indexes.map(index => modules[index])
        setSelectedModules(chosenModules);
    }

    // if any of the values are null or empty then the registration is not complete, 
    // and we will use this to determine if the next button should be disabled
    const hasNotCompletedRegistration = () => {
        return !selectedSubject || selectedStudentClasses.length === 0 || selectedModules.length === 0;
    };

    const handleLastStep = (isLastStep: boolean) => {
        console.log("handleLastStep", isLastStep)
        if (isLastStep && selectedSubject && selectedStudentClasses.length >= 1 && selectedModules.length >= 1) {
            const newAttendanceCodeDuration: IAttendanceCodeDuration = { durationMinutes: selectedCodeDuration, timeStamp: new Date() }

            sendRegisterAttendanceInfo(
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
                })
        }
    }

    const handleHasReset = () => {
        setSelectedSubject(null);
        setSelectedStudentClasses([]);
        setSelectedModules([]);
        setCodeDuration(5);
        setSelectedNumberOfStudents(1)
        setSelectedLocation({ latitude: 0, longitude: 0, accuracy: 0 })
        setAttendenceCode(null);
    }

    return (
        <>
            <VerticalStepper
                isNextButtonDisabled={hasNotCompletedRegistration() || selectedCodeDuration <= 0 || selectedNumberOfStudents <= 0}
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
                GenerateCode={attendanceCode !== null && <GenerateCode attendanceCode={attendanceCode}/>}
                Geo={
                    <Geo
                        location={selectedLocation}
                        onLocationChange={handleLocationChange}
                        onNumberOfStudentsChange={handleNumberOfStudentsChange}
                        onCodeDurationChange={handleCodeDurationChange}
                        selectedNumberOfStudents={selectedNumberOfStudents}
                        selectedCodeDuration={selectedCodeDuration}
                    />
                }
            />
        </>
    );
}