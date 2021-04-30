import React from 'react';
import Tabs from '../Common/Tabs/Tabs';
import './Teacherstyles.css'
import { RegisterAttendance } from './RegisterAttendance/RegisterAttendance'
import AttendeeStatisticsController from './AttendeeStatistics/AttendeeStatistics.controller';

export const Teacher = () => {
    return (
        <>
            <Tabs
                components={[
                    {component: <RegisterAttendance/>, label: "Register Student Attendance"}, 
                    {component: <AttendeeStatisticsController />, label: "View Attendee Statistics"}
                ]}
            />
        </>
    );
}
