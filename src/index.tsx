import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './components/Home/Home'
import { Teacher } from './components/Teacher/Teacher';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/"> <Home/> </Route>
      <Route exact path="/teacher"> <Teacher/> </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
