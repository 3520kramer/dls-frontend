import { ROOT_URL, requestHeader } from "../api-endpoints/endpoints";

export const fetchUserData = async (accessToken: string, subjectsSelected: Array<object>, classesSelected: Array<object>) => {
    const subjectQueryArray = subjectsSelected.map((subject: any) => {
        const str = subject.title.replaceAll(' ', '%20');
        return `subject=${str}`;
    });

    const classQueryArray = classesSelected.map((cls: any) => {
        const str = cls.title.replaceAll(' ', '%20');
        return `class=${str}`;
    });

    const studentsUrl = `${ROOT_URL}/api/statistics?${subjectQueryArray.toString()}&${classQueryArray.toString()}`;
    const response = await fetch(studentsUrl, {
        method: 'GET',
        headers: requestHeader(accessToken, 'GET')
        }).then((async res => {
            const data = await res.json();
            return data;
        })
    );

    return response;
} 