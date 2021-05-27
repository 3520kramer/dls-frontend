import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseNumber } from '../../../redux/Number/NumberEffect';
import { AppState } from '../../../redux/store';
import { setSelectedModules } from '../../../redux/RegisterAttendanceRequest/RegisterAttendanceRequestActions'

const Counter: React.FC = () => {
    const dispatch = useDispatch();
  
    // useEffect(() => {
    //   dispatch(getChosenNumber());
    // }, [dispatch]);
    
    const chosenNumber = useSelector((state: AppState) => state.chosenNumber);
    const { chosenNumber1, chosenNumber2, chosenNumber3 } = useSelector((state: AppState) => state.chosenNumber.example);
    
    return (
      
      <>
        <div>Number: {chosenNumber.chosenNumber}</div>
        <button onClick={() => dispatch(increaseNumber(1))}>Add 1 to number</button>

        <div>Number: {chosenNumber1}</div>
        <div>Number: {chosenNumber2}</div>
        <div>Number: {chosenNumber3}</div>
        <button onClick={() => dispatch(setSelectedModules([{id: "200", timespan:{start: "10", end: "20"}}]))}>Set module</button>
        </>
    )
}

export default Counter;