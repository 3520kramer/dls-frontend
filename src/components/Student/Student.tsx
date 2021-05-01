import React from 'react';
import './Student.css'
import { useEffect, useState } from 'react';

// temp. - have to create for student
import Tabs from '../Common/Tabs/Tabs';
import RegisterAttendanceStudent from './RegisterAttendanceStudent/RegisterAttendanceStudent'


export const Student = () => {

    useEffect(() => {
        console.log("studentpage");
    }, []);

    return (
        <>
            <Tabs
                components={[
                    { component: <RegisterAttendanceStudent />, label: "Student Code" },
                    { component: <RegisterAttendanceStudent />, label: "Student Code" }
                ]}
            />
        </>
    );
}
