export const INCREASE_NUMBER = 'INCREASE_NUMBER';

export interface IncreaseNumberStateType {
  chosenNumber: number,
  example: {
    chosenNumber1: number,
    chosenNumber2: number,
    chosenNumber3: number
  }
}

interface IncreaseNumberActionType {
  type: typeof INCREASE_NUMBER;
  payload: number;
}

//export type ChosenNumber = number;

export type IncreaseNumberActionTypes = IncreaseNumberActionType;