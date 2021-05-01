import React, { useEffect } from 'react';
import Tabs from '../Common/Tabs/Tabs';
import './Teacherstyles.css'
import { RegisterAttendance } from './RegisterAttendance/RegisterAttendance'
import AttendeeStatisticsController from './AttendeeStatistics/AttendeeStatistics.controller';

interface IProbs{
    activeCodesCallback: Function;
}
export const Teacher = (props: IProbs) => {
    
    useEffect(() => {
        console.log("teacher");
        getActiveCodes();
    },[])

    const getActiveCodes = () => {
        props.activeCodesCallback(2);
    } 
    return (
        <>
            <Tabs
                components={[
                    {component: <RegisterAttendance/>, label: "Register Student Attendance"}, 
                    {component: <AttendeeStatisticsController />, label: "View Attendee Statistics"}
                ]}
                onTabChange={() => getActiveCodes()}
            />
        </>
    );
}