import React from 'react';
import './AttendeeStatistics.css';
import List from '../../Common/List/List';
import CheckedListView from '../RegisterAttendance/CheckedListView/CheckedListView';

const testFunc = () => {
    console.log('TEST')
    return 'test';
}

interface IProps {
    userData: Array<any>;
}

const AttendeeStatistics: React.FC<IProps> = ({userData}) => {
    console.log('TEST 2:', userData)
    return (
        <div className="attendee-statistics">
            <div className="row">
                <div className="col-md-6 ">
                    <div className="attendee-graph">
                        graph
                    </div>
                    <div className="attendee-statistics-data">
                        Statistics
                    </div>
                </div>
                <div className="col-md-2">
                    <CheckedListView listData={[{id: 1, title: 'test'}]} onChange={() => {testFunc()}} />
                </div>
                <div className="col-md-4">
                    <CheckedListView listData={[{id: 1, title: 'test'}]} onChange={() => {testFunc()}} />
                </div>
            </div>
        </div>
    );
}

export default AttendeeStatistics;