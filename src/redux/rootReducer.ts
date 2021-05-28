import { combineReducers } from "redux";
import { RegisterAttendanceRequestReducer } from "./RegisterAttendanceRequest/RegisterAttendanceRequestReducer";
import { RegisterAttendanceDataReducer } from "./RegisterAttendanceData/RegisterAttendanceDataReducer";

const rootReducer = combineReducers({
  registerAttendanceRequest: RegisterAttendanceRequestReducer,
  registerAttendanceData: RegisterAttendanceDataReducer,
});

export default rootReducer;
