import React from 'react';
import './AttendeeStatistics.css';
import CheckedListView from '../RegisterAttendance/CheckedListView/CheckedListView';
import { IStudentClass, ISubject, IStudent } from '../../../services/RegisterAttendanceService';
import GraphLine from './Graph/GraphLine';

const tempFunc = () => {
    return;
}

interface IProps {
    subjectList: ISubject[];
    classList: IStudentClass[];
    studentList: IStudent[];
}

const AttendeeStatistics: React.FC<IProps> = ({subjectList, classList, studentList}) => {
    return (
        <div className="attendee-statistics">
            <div className="row">
                <div className="col-md-6 ">
                    <div className="attendee-graph">
                        <GraphLine/>
                    </div>
                    <div className="attendee-statistics-data">
                        Statistics
                    </div>
                </div>
                <div className="col-md-2">
                    <h6>Subject</h6>
                    <CheckedListView listData={subjectList} onChange={() => {tempFunc()}} />
                </div>
                <div className="col-md-2">
                    <h6>Class</h6>
                    <CheckedListView listData={classList} onChange={() => {tempFunc()}} />
                </div>
                <div className="col-md-2">
                    <h6>Student</h6>
                    <CheckedListView listData={studentList} onChange={() => {tempFunc()}} />
                </div>
            </div>
        </div>
    );
}

export default AttendeeStatistics;