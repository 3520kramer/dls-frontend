import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { IUserInfo } from './../Authentication/AuthInterfaces'

export function Home() {
  useEffect(() => {
    console.log("Env:", process.env);
  })

  // Start Okta stuff
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {

      // redirect from the OKTA redirect to home when the 
      // user logs in and looks if the userRole is teacher
      if (authState.accessToken?.claims.userRole === 'teacher') {
        history.push("/teacher")
      } else {
        history.push("/student")
      }

      oktaAuth.getUser().then((info: any) => {
        console.log("info", info)
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
  return (
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
      {authState.isAuthenticated && userInfo &&
        //userInfo.role === "teacher" ? history.push("/teacher") : history.push("/student")
        (
          <div style={{ textAlign: "center" }}>
            <h1>Components avaliable for now</h1>
            <Link to="/teacher">Teacher component</Link><br></br>
            <Link to="/student">Student component</Link>
          </div>
        )}
    </>
  )
}