import React, { Component } from 'react';
import AttendeeStatistics from './AttendeeStatistics';
import { IStudentClass, ISubject, IStudent } from '../../../services/RegisterAttendanceService';


interface IProps {
    subjectList: ISubject[];
    classList: IStudentClass[];
    studentList: IStudent[];
    children?: React.ReactNode[];
}

export default class AttendeeStatisticsController extends Component<IProps, IProps> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            subjectList: [],
            classList: [],
            studentList: []
        }
    }

    componentDidMount() {
        this.handleData();
    }

    // Fetch the subject and class data, this should probably be passed down from parent component
    async fetchListData() {
        const mockUrl = "https://run.mocky.io/v3/92a13aaf-4136-4c3d-ad7b-e120bc08fdd6";
        const response = await fetch(mockUrl).then((async res => {
            const data = await res.json();
            return data;
        }));

        console.log('List response:', response)
        return response;
    }

    // Fetch user data belonging to selected class and subject
    async fetchUserData() {
        // Endpoint required: Must handle multiple subjects and classes
        // const userUrl = `https://backend.herokuapp.com/api/users?subject=development_of_large_systems,test&class=SD21W1,SD21W2`

        const mockUrl = "https://run.mocky.io/v3/c22ac8f2-0973-4e93-b779-9c25d87351e0";
        const response = await fetch(mockUrl).then((async res => {
            const data = await res.json();
            return data;
        }));

        console.log('User response:', response);
        return response;
    }

    // Set state
    async handleData(): Promise<void> {
        const listData = await this.fetchListData();
        const userData = await this.fetchUserData();

        this.setState({
            subjectList: this.createList(listData.subjects),
            classList: this.createList(listData.classes),
            studentList: this.createList(this.extractUserNames(userData))
        });
    }

    // Create the list with the correct format to be passed as a prop
    createList(list: Array<any>): Array<any> {
        const listObjects: Array<any> = [];

        list.forEach((title: string, idx: number) => {
            listObjects.push({id: idx, title: title})
        })

        return listObjects;
    }

    // Create an array of user names extracted from the user objects
    extractUserNames(userData: Array<object>): Array<string> {
        let userList: Array<string> = [];

        userData.forEach((user: any) => {
            userList.push(`${user.firstName} ${user.lastName}`)
        })

        console.log('NAMES:', userList);

        return userList;
    }

    render() {
            return (
                <AttendeeStatistics
                    subjectList={this.state.subjectList}
                    classList={this.state.classList}
                    studentList={this.state.studentList}
                />
            )
        }
}