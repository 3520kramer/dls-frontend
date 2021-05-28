import { ICoordinates } from "../redux/RegisterAttendanceRequest/RegisterAttendanceRequestTypes";
import {
  requestHeader,
  REQUEST_STUDENT_ROUTE,
} from "../api-endpoints/endpoints";

export interface IRegisterAttendanceStudentDTO {
  attendanceCode: string;
  timeStamp: string;
  coordinates: { latitude: number; longitude: number } | null;
}

export const sendRegisterAttendanceStudentInfo = async (
  accessToken: string,
  coordinates: ICoordinates,
  attendanceCode: string
) => {
  let url = new URL(REQUEST_STUDENT_ROUTE);

  const coordinatesDTO = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
  };

  const date = new Date();

  // Creating the body
  let registerAttendanceStudentDTO: IRegisterAttendanceStudentDTO = {
    attendanceCode: attendanceCode,
    timeStamp: date.toISOString(),
    coordinates:
      coordinates.accuracy === 0 && coordinates.latitude === 0
        ? null
        : coordinatesDTO,
  };

  console.log("registerAttendanceStudentDTO", registerAttendanceStudentDTO);

  // Sending our newly created DTO to the backend
  const response = await fetch(url.href, {
    method: "POST",
    headers: requestHeader("POST", accessToken),
    body: JSON.stringify(registerAttendanceStudentDTO),
  });

  console.log("response", response);

  // Get a ok/fail response from the sent data
  return await response.json();
};
