import React, { useEffect } from 'react';
import Tabs from '../Common/Tabs/Tabs';
import './Teacherstyles.css'
import { RegisterAttendance } from './RegisterAttendance/RegisterAttendance'
import { AttendeeStatistics } from './AttendeeStatistics/AttendeeStatistics';

interface IProbs{
    activeCodesCallback: Function;
}
export const Teacher = (props: IProbs) => {
    
    useEffect(() => {
        console.log("teacher");
        getActiveCodes();
    },[])

    const getActiveCodes = () => {
        console.log("HEEHEHEH");
        props.activeCodesCallback(2);
    } 
    return (
        <>
            <Tabs
                components={[
                    {component: <RegisterAttendance/>, label: "Register Student Attendance"}, 
                    {component: <AttendeeStatistics/>, label: "View Attendee Statistics"}
                ]}
                onTabChange={() => getActiveCodes()}
            />
        </>
    );
}