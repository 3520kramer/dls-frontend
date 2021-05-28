import {
  RegisterAttendanceDataStateType,
  SET_REGISTER_ATTENDANCE_DATA,
  SET_STUDENT_CLASSES,
  setRegisterAttendanceDataActionTypes,
  setStudentsClassesActionTypes,
} from "./RegisterAttendanceDataTypes";

const initialStateRegisterAttendanceData: RegisterAttendanceDataStateType = {
  subjects: [],
  classes: [],
  modules: [],
};

export const RegisterAttendanceDataReducer = (
  state = initialStateRegisterAttendanceData,
  action: setRegisterAttendanceDataActionTypes | setStudentsClassesActionTypes
): RegisterAttendanceDataStateType => {
  switch (action.type) {
    case SET_REGISTER_ATTENDANCE_DATA:
      return {
        ...state,
        subjects: action.payload.subjects,
        classes: action.payload.classes,
        modules: action.payload.modules
      };
    case SET_STUDENT_CLASSES:
      return {
        ...state,
        classes: action.payload
      };
    default:
      return state;
  }
};
