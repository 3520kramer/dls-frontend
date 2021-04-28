import React from 'react';
import './Overview.css';
const uuid = require('react-uuid');

interface IProps {
    displayData: any;
}

const Overview: React.FC<IProps> = ({displayData}) => {
    console.log('Overview data:', displayData)
    return displayData.map((student: any) => {
        return (
            <div key={uuid()} className="overview">
                <div className="row">
                    <div className="col-md-4">
                        {student.userName}
                    </div>
                    <div className="col-md-8">
                        {student.email}
                    </div>
                </div>
                <ul>
                    <li>Total classes: <span>{student.classCounter}</span></li>
                    <li>Attended classes: <span>{student.attendedClassCounter}</span></li>
                    <li>Attendance: <span>{student.attendancePercent}%</span></li>
                </ul>
            </div>
        );
    });
}

export default Overview;