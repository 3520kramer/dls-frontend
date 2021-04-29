import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Header } from '../Common/Header/Header';

import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';

export function Home() {
    const [count, setCount] = useState(0);

    const countProps = {count: count, setCount: setCount }

    useEffect(() => {
        console.log("Env:", process.env);
    })

    // Start Okta stuff
    const history = useHistory();
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
  
    useEffect(() => {
      if (!authState.isAuthenticated) {
        // When user isn't authenticated, forget any user info
        setUserInfo(null);
      } else {
        oktaAuth.getUser().then((info: any) => {
          setUserInfo(info);
        });
      }
    }, [authState, oktaAuth]); // Update if authState changes
  
    const login = async () => {
      history.push('/login');
    };

    if (authState.isPending) {
        return (
            <div>Loading...</div>
        );
    }
    // End Okta stuff
    
    return(
        <>  
            {/* Not logged in */}
            {!authState.isAuthenticated
            && (
                <div>
                    <h1>You are not logged in</h1>
                    <p>Please log in to continue</p>
                    <Button id="login-button" primary onClick={login}>Login</Button>
                </div>
            )}

            {/* Logged in but without user info */}
            { authState.isAuthenticated && !userInfo
            && <div>Loading user information...</div>}

            {/* Logged in and retrieved user info */}
            {authState.isAuthenticated && userInfo
            && (
            <div style={{textAlign: "center"}}>
                <h1>Components avaliable for now</h1>
                <Link to="/teacher">Teacher component</Link>
            </div>
            )}

            {/*             
            <Header
                { ...countProps }
            /> 
            */}
        </>
    )
}