export const getStudentClasses = async () => {
    const url = "https://40b178a7-4403-4dfc-9eee-d206dfd6f922.mock.pstmn.io/student-classes" // postman mock api endpoint
    
    return await fetch(url).then(res => res.json()).catch(error => console.log(error));
}

export const getCourses = async () => {
    const url = "https://40b178a7-4403-4dfc-9eee-d206dfd6f922.mock.pstmn.io/mock" // postman mock api endpoint
    
    return await fetch(url).then(res => res.json()).catch(error => console.log(error));
}