import React from 'react';
import Tabs from '../Common/Tabs/Tabs';
import './Teacherstyles.css'
import { RegisterAttendance } from './RegisterAttendance/RegisterAttendance'
import { AttendeeStatistics } from './AttendeeStatistics/AttendeeStatistics';

export const Teacher = () => {
    return (
        <>
            <Tabs
                components={[
                    {component: <RegisterAttendance/>, label: "Register Student Attendance"}, 
                    {component: <AttendeeStatistics/>, label: "View Attendee Statistics"}
                ]}
            />
        </>
    );
}
