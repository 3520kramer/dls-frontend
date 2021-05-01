import React, { useEffect } from 'react';
import Tabs from '../Common/Tabs/Tabs';
import './Teacherstyles.css'
import RegisterAttendanceTeacher from './RegisterAttendance/RegisterAttendanceTeacher'
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
                    {component: <RegisterAttendanceTeacher/>, label: "Register Student Attendance"}, 
                    {component: <AttendeeStatisticsController />, label: "View Attendee Statistics"}
                ]}
                onTabChange={() => getActiveCodes()}
            />
        </>
    );
}