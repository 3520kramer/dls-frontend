import { combineReducers } from 'redux';
import { getPostsReducer } from './Posts/PostReducer';
import { chosenNumberReducer } from './Number/NumberReducer';
import { registerAttendanceReducer } from './RegisterAttendance/RegisterAttendanceReducer';

const rootReducer = combineReducers({
  posts: getPostsReducer,
  chosenNumber: chosenNumberReducer,
  registerAttendance: registerAttendanceReducer,
});

export default rootReducer;