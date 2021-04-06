export interface IStudentClass{
    id: number,
    title: string,
}

export const getStudentClasses = async (teacher_id: Number, course_id: Number) => {
    const myUrlWithParams = new URL("https://40b178a7-4403-4dfc-9eee-d206dfd6f922.mock.pstmn.io/student-classes");
    
    myUrlWithParams.searchParams.append("teacher_id", teacher_id.toString())
    myUrlWithParams.searchParams.append("course_id", course_id.toString())
    
    let response = await fetch(myUrlWithParams.href);

    return await response.json();
}

export interface ICourse{
    id: number,
    title: string
}

export const getCoursesByTeacherId = async (teacher_id: number) => {
    let url = `https://40b178a7-4403-4dfc-9eee-d206dfd6f922.mock.pstmn.io/courses?teacher_id=${teacher_id}` // postman mock api endpoint
    
    let response = await fetch(url) //.then(res => res.json())

    // Need to improve error handling as this API call is essential for registering attendance
    if(!response.ok){
        let course: ICourse = {id: -1, title: "Error"}
        return [course]
    }

    return await response.json();
}