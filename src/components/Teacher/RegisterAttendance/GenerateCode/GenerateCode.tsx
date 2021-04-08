import React from 'react';

interface IProps{
    children?: React.ReactNode,
};

const GenerateCode: React.FC<IProps> = ({children}) => {
    return (
        <>
            <h1> Hey from GenerateCode component</h1>
        </>
    )
}

export default GenerateCode;
