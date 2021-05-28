export const SET_REGISTER_ATTENDANCE_DATA = 'SET_REGISTER_ATTENDANCE_DATA';
export const SET_STUDENT_CLASSES = 'SET_STUDENT_CLASSES';

interface setRegisterAttendanceDataActionType {
  type: typeof SET_REGISTER_ATTENDANCE_DATA;
  payload: RegisterAttendanceData;
}

interface setStudentsClassesActionType {
  type: typeof SET_STUDENT_CLASSES;
  payload: IStudentClass[];
}

export interface RegisterAttendanceDataStateType {
  subjects: string[]
  classes: string[]
  modules: IModule[]
}
export interface IModule{
  id: string,
  timespan: {
    start: string,
    end: string
  }
}

export type ISubject = string;
export type IStudentClass = string;

export type RegisterAttendanceData = RegisterAttendanceDataStateType;

export type setStudentsClassesActionTypes = setStudentsClassesActionType;
export type setRegisterAttendanceDataActionTypes = setRegisterAttendanceDataActionType;