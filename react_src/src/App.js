import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Header from './components/Header';
import Page from './components/Page';

import './App.css';

function App() {

  return (
    <Router>
        <Header appName="RP Inventory"/>
        <Switch>
            <Route path="/page_1">
                <Page title="Page 1" nextPage="/page_2" />
            </Route>
            <Route path="/page_2">
                <Page title="Page 2" nextPage="/page_3" />
            </Route>
            <Route path="/page_3">
                <Page title="Page 3" nextPage="/" />
            </Route>
            <Route path="/">
                <Page title="Accueil" nextPage="/page_1" />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
