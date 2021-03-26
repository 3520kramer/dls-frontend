import React from 'react';
import VerticalStepper from '../../Common/VerticalStepper/VerticalStepper'
import CoursesAndClasses from './CoursesAndClasses/CoursesAndClasses';
import GenerateCode from './GenerateCode/GenerateCode';
import './RegisterAttendance.css'

export const RegisterAttendance = () => {
    return (
        <>
            <VerticalStepper>
                <CoursesAndClasses />
                <GenerateCode />
                {/*
                The geolocation component
                Possibly with this toggleswitch
                    <ToggleSwitch 
                        condition={hasEnabledGPS}
                        setCondition={setHasEnabledGPS}
                        names="EnableLocation"
                        label="Enable Location Services"
                    />
                */}
            </VerticalStepper>
        </>
    );
}
