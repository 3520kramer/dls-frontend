import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseNumber } from '../../../redux/Number/NumberEffect';
import { AppState } from '../../../redux/store';


const Counter: React.FC = () => {
    const dispatch = useDispatch();
  
    // useEffect(() => {
    //   dispatch(getChosenNumber());
    // }, [dispatch]);
    
    const chosenNumber = useSelector((state: AppState) => state.chosenNumber);

    return (
      
      <>
        <div>Number: {chosenNumber.chosenNumber}</div>
        <button onClick={() => dispatch(increaseNumber(1))}>Add 1 to number</button>
        </>
    )
}

export default Counter;