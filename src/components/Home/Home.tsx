import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Common/Header/Header';

export function Home() {
    
    const [count, setCount] = useState(0);

    const countProps = {count: count, setCount: setCount }
    
    return(
        <>
            <div style={{textAlign: "center"}}>
                <h1>Components avaliable for now</h1>
                <Link to="/teacher">Teacher component</Link>
            </div>

            {/*             
            <Header
                { ...countProps }
            /> 
            */}
        </>
    )
}