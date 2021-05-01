export const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const MODULE_ROUTE = `${ROOT_URL}/api/modules`;

export const CLASSES_ROUTE = `${ROOT_URL}/api/rollcall/classes`;

export const COURSES_ROUTE = "";

export const INITIAL_INFO_ROUTE = `${ROOT_URL}/api/rollcall/initialinfo`;

export const REQUEST_CODE_ROUTE = `${ROOT_URL}/api/rollcall/requestcode`;

export const REQUEST_STUDENT_ROUTE = `${ROOT_URL}/api/rollcall/registerattendance`;

export const requestHeader = (type: string, accessToken: string) => {
    return {
        'Access-Control-Request-Method': type,
        "Origins": window.location.origin,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }
}