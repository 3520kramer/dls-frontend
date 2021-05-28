import {
  SET_SELECTED_SUBJECT,
  SET_SELECTED_STUDENT_CLASSES,
  SET_SELECTED_MODULES,
  SET_SELECTED_CODE_DURATION,
  SET_SELECTED_NUMBER_OF_STUDENTS,
  SET_SELECTED_LOCATION,
  SetSelectedSubjectActionTypes,
  SetSelectedStudentClassesActionTypes,
  SetSelectedModulesActionTypes,
  SetSelectedCodeDurationActionTypes,
  SetSelectedNumberOfStudentActionTypes,
  SetSelectedLocationActionTypes,
  INumberOfStudents,
  ICoordinates,
  ISelectedCodeDuration,
} from "./RegisterAttendanceRequestTypes";
import {
  ISubject,
  IStudentClass,
  IModule,
} from "../RegisterAttendanceData/RegisterAttendanceDataTypes";

export const setSelectedSubject = (
  selectedSubject: ISubject
): SetSelectedSubjectActionTypes => {
  return {
    type: SET_SELECTED_SUBJECT,
    payload: selectedSubject,
  };
};

export const setSelectedStudentClasses = (
  selectedClasses: IStudentClass[]
): SetSelectedStudentClassesActionTypes => {
  return {
    type: SET_SELECTED_STUDENT_CLASSES,
    payload: selectedClasses,
  };
};

export const setSelectedModules = (
  selectedModules: IModule[]
): SetSelectedModulesActionTypes => {
  return {
    type: SET_SELECTED_MODULES,
    payload: selectedModules,
  };
};

export const setSelectedCodeDuration = (
  value: ISelectedCodeDuration
): SetSelectedCodeDurationActionTypes => {
  return {
    type: SET_SELECTED_CODE_DURATION,
    payload: value,
  };
};

export const setSelectedNumberOfStudents = (
  value: INumberOfStudents
): SetSelectedNumberOfStudentActionTypes => {
  return {
    type: SET_SELECTED_NUMBER_OF_STUDENTS,
    payload: value,
  };
};

export const setSelectedLocation = (
  value: ICoordinates
): SetSelectedLocationActionTypes => {
  return {
    type: SET_SELECTED_LOCATION,
    payload: value,
  };
};
