import {
  SET_REGISTER_ATTENDANCE_DATA,
  SET_STUDENT_CLASSES,
  setRegisterAttendanceDataActionTypes,
  setStudentsClassesActionTypes,
  RegisterAttendanceData,
  IStudentClass
} from "./RegisterAttendanceDataTypes";

export const setRegisterAttendanceData = (
  registerAttendanceData: RegisterAttendanceData
): setRegisterAttendanceDataActionTypes => {
  return {
    type: SET_REGISTER_ATTENDANCE_DATA,
    payload: registerAttendanceData,
  };
};

export const setStudentsClasses = (
  studentClasses: IStudentClass[]
): setStudentsClassesActionTypes => {
  return {
    type: SET_STUDENT_CLASSES,
    payload: studentClasses,
  };
};