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
  Module } from './RegisterAttendanceRequestTypes';

export const setSelectedSubject = (selectedSubject: string): SetSelectedSubjectActionTypes => {
  return {
    type: SET_SELECTED_SUBJECT,
    payload: selectedSubject
  };
};

export const setSelectedStudentClasses = (selectedClasses: string[]): SetSelectedStudentClassesActionTypes => {
  return {
    type: SET_SELECTED_STUDENT_CLASSES,
    payload: selectedClasses
  };
};

export const setSelectedModules = (selectedModules: Module[]): SetSelectedModulesActionTypes => {
  return {
    type: SET_SELECTED_MODULES,
    payload: selectedModules
  };
};

// export const setSelectedCodeDuration = (value: number): IncreaseNumberActionTypes => {
//   return {
//     type: INCREASE_NUMBER,
//     payload: value
//   };
// };

// export const setSelectedNumberOfStudents = (value: number): IncreaseNumberActionTypes => {
//   return {
//     type: INCREASE_NUMBER,
//     payload: value
//   };
// };

// export const setSelectedLocation = (value: number): IncreaseNumberActionTypes => {
//   return {
//     type: INCREASE_NUMBER,
//     payload: value
//   };
// };