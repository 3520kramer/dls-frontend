import React from 'react';
import './Student.css'

// temp. - have to create for student
import Tabs from '../Common/Tabs/Tabs';
import RegisterAttendanceStudent from './RegisterAttendanceStudent/RegisterAttendanceStudent'
// import AttendeeStatistics from '../Teacher/AttendeeStatistics/AttendeeStatistics';


export const Student = () => {
    return (
        <>
            <Tabs
                components={[
                    { component: <RegisterAttendanceStudent />, label: "Student Code" },
                    // { component: <AttendeeStatistics />, label: "View Your Attendee Statistics" }
                ]}
            />
        </>
    );
}
