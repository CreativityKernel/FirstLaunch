import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import AllProjects from './components/AllProjects'
import SingleProject from './components/SingleProject'

class App extends Component {
  render() {
    return (

      <Switch>
      <Route exact path='/' component={AllProjects}/>
      <Route path='/project/:id' component={SingleProject}/>
    </Switch>

    );
  }
}

export default App;
