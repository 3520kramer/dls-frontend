import React, { Component } from 'react';
import AttendeeStatistics from './AttendeeStatistics';
import * as userData from '../../../data/users.json';
import * as classData from '../../../data/classes.json';

interface IUserProps {
    userData: Array<any>;
    classData: Array<any>;
}

export default class AttendeeStatisticsController extends Component<IUserProps, IUserProps> {
    constructor(props: IUserProps) {
        super(props);

        this.state = {
            userData: [],
            classData: []
        }
    }

    componentDidMount() {
        this.handleData();
    }

    handleData() {
        this.setState({
            userData,
            classData
        }, () => {
            console.log('STATE:', this.state);
        });
    }

    render() {
        return (
            <AttendeeStatistics
                userData={this.state.userData}

            />
        )
    }

}