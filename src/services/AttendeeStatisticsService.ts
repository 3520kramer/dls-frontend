import { STATISTICS_ROUTE, requestHeader } from "../api-endpoints/endpoints";

export const fetchUserData = async (accessToken: string, subjectsSelected: Array<object>, classesSelected: Array<object>) => {

    let url = new URL(STATISTICS_ROUTE);

    // add the subjects as search params
    subjectsSelected.forEach((subject: any) => {
        url.searchParams.append("subject", subject.title)
    });
    
    // add the classes as search params
    classesSelected.forEach((oneClass: any) => {
        url.searchParams.append("class", oneClass.title)
    });
    
    const response = await fetch(url.href, {
        method: 'GET',
        headers: requestHeader('GET', accessToken)
        }).then((async res => {
            const data = await res.json();
            return data;
        })
    );
    return response;
} 