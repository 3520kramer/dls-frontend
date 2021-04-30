import { Component } from 'react';
import AttendeeStatistics from './AttendeeStatistics';
import { IStudentClass, ISubject, IStudent } from '../../../services/RegisterAttendanceService';
import moment from 'moment';

interface IProps {
    userData: Array<object>, 
    subjectList: ISubject[], 
    classList: IStudentClass[], 
    studentList: IStudent[],
    subjectsSelected: Array<object>;
    classesSelected: Array<object>;
    studentsSelected: Array<object>;
    graphData: Array<object>;
    overviewData: object;
}

export default class AttendeeStatisticsController extends Component<{}, IProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            userData: [],
            subjectList: [],
            classList: [],
            studentList: [],
            subjectsSelected: [],
            classesSelected: [],
            studentsSelected: [],
            graphData: [],
            overviewData: []
        }

        this.setSubjects = this.setSubjects.bind(this);
        this.setClasses = this.setClasses.bind(this);
        this.setStudents = this.setStudents.bind(this);
    }

    componentDidMount() {
        this.handleData();
    }

    // Fetch the subject and class data, this should probably be passed down from parent component
    async fetchListData() {
        const classesSubjectsUrl = "https://run.mocky.io/v3/92a13aaf-4136-4c3d-ad7b-e120bc08fdd6";
        // const classesSubjectsUrl = "https://roll-call-backend-staging.herokuapp.com/api/rollcall/initialinfo?teacherid=606df774ed3b07d2f921be10";
        const response = await fetch(classesSubjectsUrl).then((async res => {
            const data = await res.json();
            return data;
        }));

        console.log('List response:', response)
        return response;
    }

    // Fetch user data belonging to selected class and subject
    async fetchUserData() {
        const subjectQueryArray = this.state.subjectsSelected.map((subject: any) => {
            console.log('Subject:', subject)
            const str = subject.title.replaceAll(' ', '%20');
            return `subject=${str}`;
        });

        const classQueryArray = this.state.classesSelected.map((cls: any) => {
            const str = cls.title.replaceAll(' ', '%20');
            return `class=${str}`;
        });
        const studentsUrl = "https://run.mocky.io/v3/8718e80f-3f3d-41b9-a5ce-c1bb9f936f05";
        // const studentsUrl = `https://roll-call-backend-staging.herokuapp.com/api/statistics?${subjectQueryArray.toString()}&${classQueryArray.toString()}`;
        const response = await fetch(studentsUrl).then((async res => {
            const data = await res.json();
            return data;
        }));

        console.log('User response:', response);
        return response;
    } 

    // Set initial state
    async handleData(): Promise<void> {
        const listData = await this.fetchListData();

        this.setState({
            subjectList: this.createList(listData.subjects),
            classList: this.createList(listData.classes),
        });
    }

    // Create the list with the correct format to be passed as a prop
    createList(list: Array<any>): Array<any> {
        const listObjects: Array<object> = [];

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

        return userList;
    }

    // Save state of selected subjects
    setSubjects(ids: any): void {
        if(ids) {
            const selection = ids.map((id: number) => this.state.subjectList[id])
            this.setState({
                subjectsSelected: selection
            }, () => {
                this.getStudents();
            });
        }
    }

    // Save state of selected classes
    setClasses(ids: any): void {
        if(ids) {
            const selection = ids.map((id: number) => this.state.classList[id])
            this.setState({
                classesSelected: selection
            }, () => {
                this.getStudents();
            });
        }
    }

    // Save state of selected students
    setStudents(ids: any): void {
        if(ids) {
            const selection = ids.map((id: number) => this.state.studentList[id])
            this.setState({
                studentsSelected: selection
            }, () => {
                this.handleDisplayData();
            });
        }
    }

    // Populate initial student list
    async getStudents(): Promise<void> {
        if(this.state.subjectsSelected.length !== 0 && this.state.classesSelected.length !== 0) {
            const userData = await this.fetchUserData();

            this.setState({
                userData,
                studentList: this.createList(this.extractUserNames(userData))
            });
        }
    }

    // Create a random hexadecimal color code for the graph lines
    randomHexCode(): string {
        const hexNumbers: Array<number> = [...Array(10).keys()];
        const hexLetters: Array<number | string> = ['a', 'b', 'c', 'd', 'e', 'f'];
        const hexOptions: Array<any> = hexLetters.concat(hexNumbers);
        let hexColor: string = '#';
    
        for(let i = 0; i <= 5; i++) {
            const idx = Math.round(Math.random() * (hexOptions.length - 1));
            const conc = hexColor.concat(hexOptions[idx]);
            hexColor = conc;
        }
    
        return hexColor;
    }

    // Transform data into the correct format for the graph
    handleDisplayData() {
        const graphData: Array<any> = [];
        const overviewData: Array<any> = [];
        const selectedUsers: Array<any> = this.state.studentsSelected.map((user: any) => {
            return this.state.userData[user.id]
        });
    
        for(let i = 0; i < selectedUsers.length; i++) {
            let userName: string = `${selectedUsers[i].firstName} ${selectedUsers[i].lastName}`;
            let email: string = selectedUsers[i].email;
            let classCounter: number = 0;
            let attendedClassCounter: number = 0;
            let attendancePercent: number = 0;

            for(let j = 0; j < selectedUsers[i].attendance.length; j++) {
                classCounter++;
                if(selectedUsers[i].attendance[j].attended) {
                    attendedClassCounter++;
                }

                const formattedDate = moment(selectedUsers[i].attendance[j].date).format('DD-MM-YY');
                const percentDiff: number = ((attendedClassCounter - classCounter)/classCounter)*100;
                attendancePercent = Math.round(100 - Math.abs(percentDiff));

                let foundDatapoint: boolean = false;
                if(graphData.length !== 0) {
                    // eslint-disable-next-line no-loop-func
                    graphData.forEach((datapoint) => {
                        if(datapoint.date === formattedDate) {
                            datapoint[userName] = attendancePercent;
                            foundDatapoint = true;
                        }
                    });
                }
                
                if(foundDatapoint === false) {
                    graphData.push({
                        [userName]: attendancePercent,
                        date: formattedDate
                    });
                }
            }

            overviewData.push({
                userName,
                email,
                classCounter,
                attendedClassCounter,
                attendancePercent,
                hexCode: this.randomHexCode()
            });
        }
        console.log('State:', this.state)
        this.setState({
            graphData,
            overviewData
        });
    }

    render() {
        return (
            <AttendeeStatistics
                onSubjectsChange={this.setSubjects}
                onClassesChange={this.setClasses}
                onStudentsChange={this.setStudents}
                subjectList={this.state.subjectList}
                classList={this.state.classList}
                studentList={this.state.studentList}
                graphData={this.state.graphData}
                overviewData={this.state.overviewData}
            />
        )
    }
}