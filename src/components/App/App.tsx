import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from '../Authentication/config';
import CustomLoginComponent from '../Authentication/Login';
import Navbar from '../Common/Navbar/Navbar';
import { Home } from '../Home/Home'
import { Teacher } from '../Teacher/Teacher';

const oktaAuth = new OktaAuth(config.oidc);

function App() {
    const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/login');
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
    >
    <Navbar />
        <Container text style={{ marginTop: '7em' }}>
            <Switch>
                <Route path="/login/callback" component={LoginCallback} />
                <Route path="/login" component={CustomLoginComponent} />
                <SecureRoute exact path="/"> <Home/> </SecureRoute>
                <SecureRoute exact path="/teacher"> <Teacher/> </SecureRoute>
            </Switch>
        </Container>
    </Security>
  );
}

export default App;
