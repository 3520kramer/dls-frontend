import { combineReducers } from 'redux';
import { getPostsReducer } from './Posts/PostReducer';
import { chosenNumberReducer } from './Number/NumberReducer';

const rootReducer = combineReducers({
  posts: getPostsReducer,
  chosenNumber: chosenNumberReducer
});

export default rootReducer;