import { Dispatch } from 'redux';
import { increaseNumberAction } from './NumberActions';
import { IncreaseNumberActionTypes } from './NumberTypes';

export const increaseNumber = (number: number) => {
  return function (dispatch: Dispatch<IncreaseNumberActionTypes>) {
      dispatch(increaseNumberAction(number));
  };
};