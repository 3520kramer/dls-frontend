import { ROOT_URL } from "../api-endpoints/endpoints";

export const fetchUserData = async (subjectsSelected: Array<object>, classesSelected: Array<object>) => {
    const subjectQueryArray = subjectsSelected.map((subject: any) => {
        const str = subject.title.replaceAll(' ', '%20');
        return `subject=${str}`;
    });

    const classQueryArray = classesSelected.map((cls: any) => {
        const str = cls.title.replaceAll(' ', '%20');
        return `class=${str}`;
    });

    const studentsUrl = `${ROOT_URL}/api/statistics?${subjectQueryArray.toString()}&${classQueryArray.toString()}`;
    const response = await fetch(studentsUrl).then((async res => {
        const data = await res.json();
        return data;
    }));

    return response;
} 