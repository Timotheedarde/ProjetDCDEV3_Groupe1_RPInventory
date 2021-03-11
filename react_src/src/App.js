import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Header from './components/Header';
import Page from './components/Page';
import TodoList from './components/TodoList';

import './App.css';

function App() {

  const[color, setColor] = useState();

  return (
    <Router>
        <Header appName="Ma todo liste" color={color}/>
        <label>
            Choisir la couleur du Header
            <input onChange={(e) => setColor(e.target.value)}/>
        </label>
        <TodoList/>
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
