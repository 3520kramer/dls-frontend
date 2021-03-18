import React from 'react';
import Tabs from './Tabs/Tabs';
import './Teacherstyles.css'
import { RegisterAttendance } from './RegisterAttendance/RegisterAttendance';
import { AttendeeStatistics } from './AttendeeStatistics/AttendeeStatistics';

export const Teacher = () => {
    return (
        <>
            <Tabs 
                RegisterAttendance={RegisterAttendance} 
                AttendeeStatistics={AttendeeStatistics}
            />
        </>
    );
}
