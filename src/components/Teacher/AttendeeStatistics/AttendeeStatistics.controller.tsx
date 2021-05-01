import { Component } from 'react';
import AttendeeStatistics from './AttendeeStatistics';
import { IStudentClass, ISubject, IStudent, getInitialValues } from '../../../services/RegisterAttendanceService';
import { fetchUserData } from '../../../services/AttendeeStatisticsService';
import moment from 'moment';
import { useOktaAuth } from '@okta/okta-react';


interface IState {
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

interface IProps {
    accessToken: string | null;
}

export default class AttendeeStatisticsController extends Component<IProps, IState> {
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
            overviewData: [],
        }

        this.setSubjects = this.setSubjects.bind(this);
        this.setClasses = this.setClasses.bind(this);
        this.setStudents = this.setStudents.bind(this);
    }

    componentDidMount() {
        console.log("comp did mount", this.props.accessToken)
        this.handleData();
    }

    // Set initial state
    async handleData(): Promise<void> {
        if(this.props.accessToken){
            const listData = await getInitialValues(this.props.accessToken);
            this.setState({
                subjectList: this.createList(listData.subjects),
                classList: this.createList(listData.classes),
            });
        }

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
                if(this.props.accessToken) this.getStudents(this.props.accessToken);
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
                if(this.props.accessToken) this.getStudents(this.props.accessToken);
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
    async getStudents(accessToken: string): Promise<void> {
        console.log("getstuidents")
        if(this.state.subjectsSelected.length !== 0 && this.state.classesSelected.length !== 0) {
            const userData = await fetchUserData(accessToken, this.state.subjectsSelected, this.state.classesSelected);

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

            for(let j = 0; j < selectedUsers[i].attendanceLog.length; j++) {
                classCounter++;
                if(selectedUsers[i].attendanceLog[j].attended) {
                    attendedClassCounter++;
                }

                const formattedDate = moment(selectedUsers[i].attendanceLog[j].date).format('DD-MM-YY');
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