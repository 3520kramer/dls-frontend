import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const uuid = require('react-uuid');

interface IProps {
    displayData?: any;
    dataKeys?: any;
    children?: React.ReactNode[];
}

const renderLine: any = (dataKeys: Array<any>) => {
    if(dataKeys.length !== 0) {
        return dataKeys.map((student) => {
            return <Line key={uuid()} type="monotone" dataKey={student.userName} stroke={student.hexCode} />
        })  
    }
}

const LineGraph: React.FC<IProps> = ({displayData, dataKeys}) => {
    return (
        <div className="mixed-chart">
            <ResponsiveContainer>
                <LineChart
                    data={displayData}
                    margin={{
                        top: 5, right: 30, left: 0, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    {renderLine(dataKeys)}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineGraph;