import { ICoordinates } from "../components/Teacher/RegisterAttendance/Geo/Geo";
import { requestHeader, REQUEST_STUDENT_ROUTE } from "../api-endpoints/endpoints";


// TEMP 
const STUDENTID: string = "6075d39f03e2bc1884194738";


export interface IRegisterAttendanceStudentDTO {
    student_Id: string,
    attendanceCode: string,
    timeStamp: string,
    coordinates: { latitude: number, longitude: number } | null
}


export const sendRegisterAttendanceStudentInfo = async (accessToken: string, coordinates: ICoordinates, attendanceCode: string) => {

    let url = new URL(REQUEST_STUDENT_ROUTE);

    const coordinatesDTO = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    }

    const date = new Date();

    // Creating the body
    let registerAttendanceStudentDTO: IRegisterAttendanceStudentDTO = {
        student_Id: STUDENTID,
        attendanceCode: attendanceCode,
        timeStamp: date.toISOString(),
        coordinates: coordinates.accuracy === 0 && coordinates.latitude === 0 ? null : coordinatesDTO,
    }

    console.log("registerAttendanceStudentDTO", registerAttendanceStudentDTO);

    // Sending our newly created DTO to the backend
    const response = await fetch(url.href, {
        method: "POST",
        headers: requestHeader(accessToken, "POST"),
        body: JSON.stringify(registerAttendanceStudentDTO)
    });

    console.log("response", response);

    // Get a ok/fail response from the sent data
    return await response.json();
}
