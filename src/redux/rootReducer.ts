import { combineReducers } from "redux";
import { getPostsReducer } from "./Posts/PostReducer";
import { chosenNumberReducer } from "./Number/NumberReducer";
import { RegisterAttendanceRequestReducer } from "./RegisterAttendanceRequest/RegisterAttendanceRequestReducer";
import { RegisterAttendanceDataReducer } from "./RegisterAttendanceData/RegisterAttendanceDataReducer";

const rootReducer = combineReducers({
  posts: getPostsReducer,
  chosenNumber: chosenNumberReducer,
  registerAttendanceRequest: RegisterAttendanceRequestReducer,
  registerAttendanceData: RegisterAttendanceDataReducer,
});

export default rootReducer;
