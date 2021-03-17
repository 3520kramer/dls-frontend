import React, { SyntheticEvent } from 'react';

export const Header = (props: any) => {
    const count = props.count;
    const setCount = props.setCount;
    
    const handleClick = (event: SyntheticEvent) => {
        event.preventDefault();
        setCount(count+1)
    }

    return (
        <>
            <h1>Home</h1>
            <p>{props.count}</p>
            <button onClick={handleClick}>Increase number</button>
        </>
    )
}