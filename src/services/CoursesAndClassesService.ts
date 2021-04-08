export interface IStudentClass{
    id: number,
    title: string,
}

export const getStudentClasses = async (teacher_id: Number, course_id: Number) => {
    // mocked url
    let url;
    if(course_id === 1){
        url = new URL("https://run.mocky.io/v3/1dd15620-f16e-410a-aff4-16b3a835b9b5");
    }else{
        url = new URL("https://run.mocky.io/v3/ca9efd80-eb38-4f31-a4a9-38cb463ff810");
    }
    
    url.searchParams.append("teacher_id", teacher_id.toString())
    url.searchParams.append("course_id", course_id.toString())
    
    let response = await fetch(url.href);

    return await response.json();
}

export interface ICourse{
    id: number,
    title: string
}

export const getCoursesByTeacherId = async (teacher_id: number) => {
    let url = new URL("https://run.mocky.io/v3/3f8459f4-b181-4d9c-8a06-916eb831ea21");
    
    url.searchParams.append("teacher_id", teacher_id.toString())
    
    let response = await fetch(url.href);
    
    // Need to improve error handling as this API call is essential for registering attendance
    if(!response.ok){
        let course: ICourse = {id: -1, title: "Error"}
        return [course]
    }

    return await response.json();
}