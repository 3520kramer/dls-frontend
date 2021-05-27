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
  RegisterAttendanceRequestStateType,
} from "./RegisterAttendanceRequestTypes";

const initialStateGetPosts: RegisterAttendanceRequestStateType = {
  selectedSubject: "",
  selectedStudentClasses: [],
  selectedModules: [],
  selectedCodeDuration: 5,
  selectedNumberOfStudents: 1,
  selectedLocation: {latitude: 0, longitude: 0, accuracy: 100}
};

export const RegisterAttendanceRequestReducer = (
  state = initialStateGetPosts,
  action:
    | SetSelectedSubjectActionTypes
    | SetSelectedStudentClassesActionTypes
    | SetSelectedModulesActionTypes
    | SetSelectedCodeDurationActionTypes
    | SetSelectedNumberOfStudentActionTypes
    | SetSelectedLocationActionTypes
): RegisterAttendanceRequestStateType => {
  switch (action.type) {
    case SET_SELECTED_SUBJECT:
      return {
        ...state,
        selectedSubject: action.payload,
      };
    case SET_SELECTED_STUDENT_CLASSES:
      return {
        ...state,
        selectedStudentClasses: action.payload,
      };
    case SET_SELECTED_MODULES:
      return {
        ...state,
        selectedModules: action.payload,
      };
    case SET_SELECTED_CODE_DURATION:
      return {
        ...state,
        selectedCodeDuration: action.payload,
      };
    case SET_SELECTED_NUMBER_OF_STUDENTS:
      return {
        ...state,
        selectedNumberOfStudents: action.payload,
      };
    case SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    default:
      return state;
  }
};
