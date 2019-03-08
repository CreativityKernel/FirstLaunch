import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import AllProjects from './components/AllProjects'
import SingleProject from './components/SingleProject'
import CreateNewProject from './components/CreateNewProject'
import Header from './components/Header'
import ValuesInput from './components/ValuesInput'
import OpportunitiesInput from './components/OpportunitiesInput'

class App extends Component {

  constructor() {
    super();
  }
  // 747584954544-1qnj29p7cp9s9i6ind8jegnracl1tihq.apps.googleusercontent.com

  // 7vE0EjS8fgqb-97KJonFQqCF
  render() {
    return (<div>
      <Header/>
      <Switch>
        <Route exact="exact" path='/' component={AllProjects}/>
        <Route path='/create_new_project/' component={CreateNewProject}/>
        <Route path='/project/:id' component={SingleProject}/>
        <Route path='/valuesinput/:id' component={ValuesInput}/>
        <Route path='/opportunitiesinput/:id' component={OpportunitiesInput}/>
      </Switch>
    </div>);
  }

  googleResponse = (response) => {
    console.log(response);
  };

}

export default App;
