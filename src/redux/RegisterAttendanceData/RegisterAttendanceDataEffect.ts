import { toast } from "react-toastify";
import {
  setRegisterAttendanceData,
  setStudentsClasses,
} from "./RegisterAttendanceDataActions";
import { Dispatch } from "redux";
import {
  setRegisterAttendanceDataActionTypes,
  setStudentsClassesActionTypes,
  ISubject,
} from "./RegisterAttendanceDataTypes";
import {
  getInitialValues,
  getStudentClasses,
} from "../../services/RegisterAttendanceService";

export const getRegisterAttendanceData = (accessToken: string) => {
  return function (dispatch: Dispatch<setRegisterAttendanceDataActionTypes>) {
    getInitialValues(accessToken)
      .then((data) => {
        dispatch(setRegisterAttendanceData(data));
        return data;
      })
      .catch((error) => {
        toast.error("Unable to fetch data", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
        });
      });
  };
};

export const getStudentClassesData = (
  accessToken: string,
  subject: ISubject
) => {
  return function (dispatch: Dispatch<setStudentsClassesActionTypes>) {
    getStudentClasses(accessToken, subject)
      .then((data) => {
        dispatch(setStudentsClasses(data));
        return data;
      })
      .catch((error) => {
        toast.error("Unable to fetch data", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
        });
      });
  };
};
