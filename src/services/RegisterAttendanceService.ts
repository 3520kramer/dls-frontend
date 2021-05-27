import { ICoordinates } from "../components/Teacher/RegisterAttendance/Geo/Geo";
import { CLASSES_ROUTE, INITIAL_INFO_ROUTE, requestHeader, REQUEST_CODE_ROUTE } from "../api-endpoints/endpoints";
import { IModule, ISubject, IStudentClass } from "../redux/RegisterAttendanceData/RegisterAttendanceDataTypes"

export const getStudentClasses = async (accessToken: string, subject: ISubject) => {
    let url = new URL(CLASSES_ROUTE);

    url.searchParams.append("subject", subject.toString())
    
    let response = await fetch(url.href, { method: "GET", headers: requestHeader("GET", accessToken) });

    return await response.json();
}

export interface IStudent {
    id: number,
    title: string
}

export interface IAttendanceCodeDuration{
    durationMinutes: number,
    timeStamp: Date
}

export interface IRegisterAttendanceDTO{
    subject: string,//ISubject,
    classes: string[],//IStudentClass[],
    modules: IModule[],
    coordinates: { latitude: number, longitude: number } | null
    duration: { minutes: number, timeStamp: string },
    numberOfStudents: number | null
}

export const sendRegisterAttendanceInfo = async (accessToken: string, subject: ISubject, classes: IStudentClass[],
    selectedModules: IModule[], coordinates: ICoordinates, attendanceCodeDuration: IAttendanceCodeDuration, numberOfStudents: number) => {
    
    let url = new URL(REQUEST_CODE_ROUTE);

    // Mapping to DTO for the body of the request
    const subjectDTO = subject;
    const classesDTO = classes.map((_class: IStudentClass) => _class);
    const durationDTO = { 
        minutes: attendanceCodeDuration.durationMinutes, 
        timeStamp: attendanceCodeDuration.timeStamp.toISOString()
    };
    const coordinatesDTO = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    }

    // Creating the body
    let registerAttendanceDTO: IRegisterAttendanceDTO = {
        subject: subjectDTO,
        classes: classesDTO,
        modules: selectedModules,
        coordinates: coordinates.accuracy === 100 && coordinates.latitude === 0 ? null : coordinatesDTO,
        numberOfStudents: coordinates.accuracy !== 0 && coordinates.latitude !== 0 ? 0 : numberOfStudents,
        duration: durationDTO
    }

    console.log("registerAttendanceDTO", registerAttendanceDTO)

    // Sending our newly created DTO to the backend
    const response = await fetch(url.href, { method: "POST", headers: requestHeader("POST", accessToken), body: JSON.stringify(registerAttendanceDTO)});
    
    // Get the attendance code as a repsonse
    return await response.json();
}

// response from api
export interface IAttendanceCode{
    attendanceCode: string,
    durationMinutes: number,
    timeStamp: Date
}


export const getInitialValues = async (accessToken: string) => {
    let url = new URL(INITIAL_INFO_ROUTE);
    
    const response = await fetch(url.href, { method: "GET", headers: requestHeader("GET", accessToken) });

    return await response.json();
}