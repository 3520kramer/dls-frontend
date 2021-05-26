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
  RegisterAttendanceStateType,
} from "./RegisterAttendanceTypes";

const initialStateGetPosts: RegisterAttendanceStateType = {
  selectedSubject: {},
  selectedStudentClasses: [],
  selectedModules: [],
};

export const registerAttendanceReducer = (
  state = initialStateGetPosts,
  action:
    | SetSelectedSubjectActionTypes
    | SetSelectedStudentClassesActionTypes
    | SetSelectedModulesActionTypes
): RegisterAttendanceStateType => {
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
