import React, { useState, useEffect } from 'react';
import Tabs from '../Common/Tabs/Tabs';
import './Teacherstyles.css'
import RegisterAttendanceTeacher from './RegisterAttendance/RegisterAttendanceTeacher'
import AttendeeStatisticsController from './AttendeeStatistics/AttendeeStatistics.controller';
import { useOktaAuth } from '@okta/okta-react';
import Posts from './PostsTest/Posts';

interface IProbs{
    activeCodesCallback: Function;
}
export const Teacher = (props: IProbs) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { authState, oktaAuth } = useOktaAuth();

    useEffect(() => {
        if(authState.isAuthenticated && authState.accessToken){
            console.log("tEST", authState.accessToken?.accessToken)

            setAccessToken(authState.accessToken?.accessToken);
        }
    }, [authState])

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
                    {component:  <AttendeeStatisticsController accessToken={accessToken}/>, label: "View Attendee Statistics"},
                    {component: <Posts/>, label: "TEST"}
                ]}
                onTabChange={() => getActiveCodes()}
            />
        </>
    );
}