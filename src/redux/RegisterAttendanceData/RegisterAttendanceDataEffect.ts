import { setRegisterAttendanceData, setStudentsClasses } from './RegisterAttendanceDataActions';
import { Dispatch } from 'redux';
import { setRegisterAttendanceDataActionTypes, setStudentsClassesActionTypes, ISubject } from './RegisterAttendanceDataTypes';
import { getInitialValues, getStudentClasses } from '../../services/RegisterAttendanceService'

export const getRegisterAttendanceData = (accessToken: string) => {
  return function (dispatch: Dispatch<setRegisterAttendanceDataActionTypes>) {
    getInitialValues(accessToken)
      .then(data => {
        console.log("data", data)
        dispatch(setRegisterAttendanceData(data));
        return data;
      });
  };
};

export const getStudentClassesData = (accessToken: string, subject: ISubject) => {
  return function (dispatch: Dispatch<setStudentsClassesActionTypes>) {
    getStudentClasses(accessToken, subject)
      .then(data => {
        console.log("data", data)
        dispatch(setStudentsClasses(data));
        return data;
      });
  };
};
// export const getPosts = () => {
//   return function (dispatch: Dispatch<PostActionTypes>) {
//     const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
//     fetch(POST_URL, {
//       method: 'GET'
//     })
//       .then(res => res.json())
//       .then(data => {
//         dispatch(getPostsAction(data));
//         return data;
//       });
//   };
// };