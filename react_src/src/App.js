import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Page_Login from './pages/auth/login';
import Page_Register from './pages/auth/register';

import './App.css';

function App() {

  return (
    <Router>
        <Switch>
            <Route exact path="/register">
                <Page_Register/>
            </Route>
            <Route exact path="/">
                <Page_Login/>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
