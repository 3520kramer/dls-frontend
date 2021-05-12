import {
    INCREASE_NUMBER,
    IncreaseNumberStateType,
    IncreaseNumberActionTypes
  } from './NumberTypes';
  
  const initialStateGetPosts: IncreaseNumberStateType = {
    chosenNumber: 0
  };
  
  export const chosenNumberReducer = (
    state = initialStateGetPosts,
    action: IncreaseNumberActionTypes
  ): IncreaseNumberStateType => {
    switch (action.type) {
      case INCREASE_NUMBER:
        return {
          ...state,
          chosenNumber: state.chosenNumber + action.payload
        };
      default:
        return state;
    }
  };