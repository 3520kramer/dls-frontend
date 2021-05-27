export const SET_SELECTED_SUBJECT = 'SET_SELECTED_SUBJECT';
export const SET_SELECTED_STUDENT_CLASSES = 'SET_SELECTED_STUDENT_CLASSES';
export const SET_SELECTED_MODULES = 'SET_SELECTED_MODULES';
export const SET_SELECTED_CODE_DURATION = 'SET_SELECTED_CODE_DURATION';
export const SET_SELECTED_NUMBER_OF_STUDENTS = 'SET_SELECTED_NUMBER_OF_STUDENTS';
export const SET_SELECTED_LOCATION = 'SET_SELECTED_LOCATION';

export interface RegisterAttendanceStateType {
  selectedSubject: {}
  selectedStudentClasses: string[]
  selectedModules: Module[];
}

interface SetSelectedSubjectActionType {
  type: typeof SET_SELECTED_SUBJECT;
  payload: string;
}
interface SetSelectedStudentClassesActionType {
  type: typeof SET_SELECTED_STUDENT_CLASSES;
  payload: string[];
}
interface SetSelectedModulesActionType {
  type: typeof SET_SELECTED_MODULES;
  payload: Module[];
}

export interface Module{
  id: string,
  timespan: {
    start: string,
    end: string
  }
}

export type SetSelectedSubjectActionTypes = SetSelectedSubjectActionType
export type SetSelectedStudentClassesActionTypes = SetSelectedStudentClassesActionType
export type SetSelectedModulesActionTypes = SetSelectedModulesActionType
