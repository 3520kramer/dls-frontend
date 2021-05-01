import React, { useState } from 'react';
import { Route, useHistory, Switch, RouteComponentProps } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from '../Authentication/config';
import CustomLoginComponent from '../Authentication/Login';
import Navbar from '../Common/Navbar/Navbar';
import { Home } from '../Home/Home'
import { Teacher } from '../Teacher/Teacher';
import Header from '../Common/Header/Header';
import { Student } from '../Student/Student';

const oktaAuth = new OktaAuth(config.oidc);


function App() {
  const history = useHistory(); // example from react-router

  const [activeCodes, setActiveCodes] = useState<number>(0);

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/login');
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
    >
    {/* <Navbar /> */}
        {/* <Container text style={{ marginTop: '7em' }}> */}
        <Route path="/:page" component={(props: RouteComponentProps) => <Header activeCodes={activeCodes} {...props}/> }/>
            <Switch>
                <Route path="/login/callback" component={LoginCallback} />
                <Route path="/login" component={CustomLoginComponent} />
                <Route exact path="/student" component={Student} />
                <SecureRoute exact path="/"> <Home/> </SecureRoute>
                <SecureRoute exact path="/teacher"> <Teacher activeCodesCallback={(value: number) => setActiveCodes(value)}/> </SecureRoute>
            </Switch>
        {/* </Container> */}
    </Security>
  );
}

export default App;


    // //<Security
    //   //oktaAuth={oktaAuth}
    //   //onAuthRequired={customAuthHandler}
    // //>
    //   //<Navbar />
    //   //<Container text style={{ marginTop: '7em' }}>
    //   <>
    //   <Route path="/:page" component={(props: RouteComponentProps) => <Header activeCodes={activeCodes} {...props} />} />
    //     <Switch>
    //       <Route exact path="/login/callback" component={LoginCallback} />
    //       <Route exact path="/login" component={CustomLoginComponent} />
    //       <Route exact path="/student" component={Student} />
    //       <Route exact path="/teacher"> <Teacher activeCodesCallback={(value: number) => setActiveCodes(value)} /> </Route>
    //       {/* <SecureRoute exact path="/"> <Home /> </SecureRoute>
    //       <SecureRoute exact path="/teacher"> <Teacher activeCodesCallback={(value: number) => setActiveCodes(value)} /> </SecureRoute> */}

    //     </Switch></>
    //   //</Container>
    // //</Security>