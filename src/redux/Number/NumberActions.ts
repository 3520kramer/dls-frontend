import { INCREASE_NUMBER, IncreaseNumberActionTypes } from './NumberTypes';

export const increaseNumberAction = (value: number): IncreaseNumberActionTypes => {
  return {
    type: INCREASE_NUMBER,
    payload: value
  };
};