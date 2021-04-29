import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Home } from '../Home/Home'
import { Teacher } from '../Teacher/Teacher';
import Header from '../Common/Header/Header';

function App() {

  const [activeCodes, setActiveCodes] = useState<number>(0);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Route path="/:page" component={(props: RouteComponentProps) => <Header activeCodes={activeCodes} {...props}/> }/>
        <Route exact path="/"> <Home/> </Route>
        <Route exact path="/teacher"> <Teacher activeCodesCallback={(value: number) => setActiveCodes(value)}/> </Route>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
