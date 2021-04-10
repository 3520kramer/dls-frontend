import { ICoordinates } from "./GeoService";

export interface  IStudentClass{
    id: number,
    title: string,
}

export const getStudentClasses = async (teacher_id: Number, course_id: Number) => {
    // mocked url
    let url;
    if(course_id === 1){
        url = new URL("https://run.mocky.io/v3/1dd15620-f16e-410a-aff4-16b3a835b9b5");
    }else{
        url = new URL("https://run.mocky.io/v3/ca9efd80-eb38-4f31-a4a9-38cb463ff810");
    }
    
    url.searchParams.append("teacher_id", teacher_id.toString())
    url.searchParams.append("course_id", course_id.toString())
    
    let response = await fetch(url.href);

    return await response.json();
}

export interface ICourse{
    id: number,
    title: string
}

export const getCoursesByTeacherId = async (teacher_id: number) => {
    let url = new URL("https://run.mocky.io/v3/3f8459f4-b181-4d9c-8a06-916eb831ea21");
    
    url.searchParams.append("teacher_id", teacher_id.toString())
    
    let response = await fetch(url.href);
    
    // Need to improve error handling as this API call is essential for registering attendance
    if(!response.ok){
        let course: ICourse = {id: -1, title: "Error"}
        return [course]
    }

    return await response.json();
}

export interface IModule{
    id: number,
    timespan: string
}

export const getModules = async () => {
    
    //let url = new URL("https://run.mocky.io/v3/3f8459f4-b181-4d9c-8a06-916eb831ea21");
        
    //let response = await fetch(url.href);
    let response = fetchedModules;
    // // Need to improve error handling as this API call is essential for registering attendance
    // if(!response.ok){
    //     let course: ICourse = {id: -1, title: "Error"}
    //     return [course]
    // }

    //let modules: IModule[] = [];
    //response.forEach(module => modules.push({id: module.id, title: module.timespan}));
    return response;

    //return await response.json();
}

export const fetchedModules = [
    { id: 1, timespan: "08:15 - 09:00" },
    { id: 2, timespan: "09:00 - 09:45" },
    { id: 3, timespan: "10:00 - 10:45" },
    { id: 4, timespan: "10:45 - 11:30" },
    { id: 5, timespan: "12:15 - 13:00" },
    { id: 6, timespan: "13:00 - 13:45" },
    { id: 7, timespan: "14:00 - 14:45" },
    { id: 8, timespan: "14:45 - 15:30" }
]

export interface IAttendanceCodeDuration{
    durationMinutes: number,
    timeStamp: Date
}

export interface IAttendanceCodeDurationDTO{
    durationMinutes: number,
    timeStamp: string
}

export interface IRegisterAttendanceDTO{
    course: ICourse,
    classes: IStudentClass[],
    modules: IModule[],
    geo: ICoordinates,
    duration: IAttendanceCodeDurationDTO,
}

export const sendRegisterAttendanceInfo = async (course: ICourse, classes: IStudentClass[],
    selectedModules: IModule[], geo: ICoordinates, attendanceCodeDuration: IAttendanceCodeDuration, ) => {
    
    // Mocked endpoint
    let url = new URL("https://run.mocky.io/v3/9e1d8240-f66f-492f-9ef1-c515d76bc641");

    // Creating the body of the request
    let registerAttendanceDTO: IRegisterAttendanceDTO = {
        course: course,
        classes: classes,
        modules: selectedModules,
        geo: geo,
        duration: { // converts attendanceCodeDuration to DTO
            durationMinutes: attendanceCodeDuration.durationMinutes, 
            timeStamp: attendanceCodeDuration.timeStamp.toISOString()
        },
    }

    console.log("registerAttendanceDTO", registerAttendanceDTO)

    // Sending our newly created DTO to the backend
    const response = await fetch(url.href, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerAttendanceDTO)
      });
      //response.json().then(data => console.log(data))
    // Get the attendance code as a repsonse
    return await response.json();
}

// response from api
export interface IAttendanceCodeResponse{
    id: string,
    attendanceCode: string,
    timestamp: Date,
    duration: number, // minutes
}
