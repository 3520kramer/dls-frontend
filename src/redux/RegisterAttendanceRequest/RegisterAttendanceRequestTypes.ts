import { ISubject, IStudentClass, IModule} from '../RegisterAttendanceData/RegisterAttendanceDataTypes'

export const SET_SELECTED_SUBJECT = 'SET_SELECTED_SUBJECT';
export const SET_SELECTED_STUDENT_CLASSES = 'SET_SELECTED_STUDENT_CLASSES';
export const SET_SELECTED_MODULES = 'SET_SELECTED_MODULES';
export const SET_SELECTED_CODE_DURATION = 'SET_SELECTED_CODE_DURATION';
export const SET_SELECTED_NUMBER_OF_STUDENTS = 'SET_SELECTED_NUMBER_OF_STUDENTS';
export const SET_SELECTED_LOCATION = 'SET_SELECTED_LOCATION';

export interface RegisterAttendanceRequestStateType {
  selectedSubject: ISubject,
  selectedStudentClasses: IStudentClass[],
  selectedModules: IModule[],
  selectedCodeDuration: ISelectedCodeDuration,
  selectedNumberOfStudents: INumberOfStudents,
  selectedLocation: ICoordinates
}

interface SetSelectedSubjectActionType {
  type: typeof SET_SELECTED_SUBJECT;
  payload: ISubject;
}
interface SetSelectedStudentClassesActionType {
  type: typeof SET_SELECTED_STUDENT_CLASSES;
  payload: IStudentClass[];
}
interface SetSelectedModulesActionType {
  type: typeof SET_SELECTED_MODULES;
  payload: IModule[];
}
interface SetSelectedCodeDurationActionType {
  type: typeof SET_SELECTED_CODE_DURATION;
  payload: ISelectedCodeDuration;
}
interface SetSelectedNumberOfStudentActionType {
  type: typeof SET_SELECTED_NUMBER_OF_STUDENTS;
  payload: INumberOfStudents;
}
interface SetSelectedLocationActionType {
  type: typeof SET_SELECTED_LOCATION;
  payload: ICoordinates;
}

export interface _ICoordinates { 
  latitude: number, 
  longitude: number,
  accuracy: number
}

export interface ICodeDuration { 
  minutes: number, 
  timeStamp: string 
}

export type ICoordinates = _ICoordinates
export type INumberOfStudents = number
export type ISelectedCodeDuration = number

export type SetSelectedSubjectActionTypes = SetSelectedSubjectActionType
export type SetSelectedStudentClassesActionTypes = SetSelectedStudentClassesActionType
export type SetSelectedModulesActionTypes = SetSelectedModulesActionType
export type SetSelectedCodeDurationActionTypes = SetSelectedCodeDurationActionType
export type SetSelectedNumberOfStudentActionTypes = SetSelectedNumberOfStudentActionType
export type SetSelectedLocationActionTypes = SetSelectedLocationActionType

