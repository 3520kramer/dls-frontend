import React, { useState } from 'react';
import { Header } from './Header/Header';

export function Home() {
    
    const [count, setCount] = useState(0);

    const countProps = {count: count, setCount: setCount }
    
    return(
        <Header
            { ...countProps }
        />
        
    )
}