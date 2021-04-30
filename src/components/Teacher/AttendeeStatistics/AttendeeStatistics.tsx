import React from 'react';
import './AttendeeStatistics.css';
import CheckedListView from '../RegisterAttendance/CheckedListView/CheckedListView';
import { IStudentClass, ISubject, IStudent } from '../../../services/RegisterAttendanceService';
import GraphLine from './Graph/GraphLine';
import Overview from './Overview/Overview';

interface IProps {
    subjectList: ISubject[];
    classList: IStudentClass[];
    studentList: IStudent[];
    children?: React.ReactNode[];
    onSubjectsChange: Function;
    onClassesChange: Function;
    onStudentsChange: Function;
    graphData: Array<object>;
    overviewData: any;
}

const AttendeeStatistics: React.FC<IProps> = ({subjectList, classList, studentList, onSubjectsChange, onClassesChange, onStudentsChange, graphData, overviewData}) => {
    console.log('Overview data:', overviewData)
    return (
        <div className="attendee-statistics">
            <div className="row">
                <div className="col-md-6 ">
                    <div className="attendee-graph">
                        <GraphLine
                            dataKeys={overviewData}
                            displayData={graphData}
                        />
                    </div>
                    <h6>Overview</h6>
                    <Overview displayData={overviewData} />
                </div>
                <div className="col-md-2">
                    <h6>Subject</h6>
                    <CheckedListView listData={subjectList} onChange={onSubjectsChange} />
                </div>
                <div className="col-md-2">
                    <h6>Class</h6>
                    <CheckedListView listData={classList} onChange={onClassesChange} />
                </div>
                <div className="col-md-2">
                    <h6>Student</h6>
                    <CheckedListView listData={studentList} onChange={onStudentsChange} />
                </div>
            </div>
        </div>
    );
}

export default AttendeeStatistics;