import React from 'react';

interface IProps{
    children?: React.ReactNode,
};

const CoursesAndClasses: React.FC<IProps> = ({children}) => {
    return (
        <>
            <h1> Hey from CoursesAndClasses component </h1>
        </>
    )
}

CoursesAndClasses.displayName = "CoursesAndClasses"
export default CoursesAndClasses;