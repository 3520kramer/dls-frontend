export const INCREASE_NUMBER = 'INCREASE_NUMBER';

export interface IncreaseNumberStateType {
  chosenNumber: number;
}

interface IncreaseNumberActionType {
  type: typeof INCREASE_NUMBER;
  payload: number;
}

//export type ChosenNumber = number;

export type IncreaseNumberActionTypes = IncreaseNumberActionType;