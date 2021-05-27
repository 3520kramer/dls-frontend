import {
  SET_SELECTED_SUBJECT,
  SET_SELECTED_STUDENT_CLASSES,
  SET_SELECTED_MODULES,
  // SET_SELECTED_CODE_DURATION,
  // SET_SELECTED_NUMBER_OF_STUDENTS,
  // SET_SELECTED_LOCATION,
  SetSelectedSubjectActionTypes,
  SetSelectedStudentClassesActionTypes,
  SetSelectedModulesActionTypes,
  RegisterAttendanceRequestStateType,
} from "./RegisterAttendanceRequestTypes";

const initialStateGetPosts: RegisterAttendanceRequestStateType = {
  selectedSubject: "",
  selectedStudentClasses: [],
  selectedModules: [],
};

export const RegisterAttendanceRequestReducer = (
  state = initialStateGetPosts,
  action:
    | SetSelectedSubjectActionTypes
    | SetSelectedStudentClassesActionTypes
    | SetSelectedModulesActionTypes
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
    default:
      return state;
  }
};
