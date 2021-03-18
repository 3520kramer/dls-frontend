import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import ToggleSwitch from '../../Common/Switch/Switch';
import './RegisterAttendance.css'

export const RegisterAttendance = () => {
    const [hasEnabledGPS, setHasEnabledGPS] = useState<boolean>(false);

    return (
        <>
            <ToggleSwitch 
                condition={hasEnabledGPS}
                setCondition={setHasEnabledGPS}
                names="EnableLocation"
                label="Enable Location Services"
                />
            <div style={{height: '250px', marginTop: '10px'}}></div>
        </>
    );
}
