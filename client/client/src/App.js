import React, { Component } from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import AllProjects from "./components/AllProjects";
import SingleProject from "./components/SingleProject";
import CreateNewProject from "./components/CreateNewProject";
import Header from "./components/Header";
import ValuesInput from "./components/ValuesInput";
import OpportunitiesInput from "./components/OpportunitiesInput";
import Cheatstorm from "./components/Cheatstorm";
import IdeasView from "./components/IdeasView";
import VoteView from "./components/VoteView";
import Home from "./components/Home";
import About from "./components/About";

class App extends Component {

  constructor(props) {
    super(props);
    this.handleNav = this.handleNav.bind(this);
    this.state = {nav_location: 1};   //This is the initial nav_location when the site re-loads. We'll re-set it later.
  }

  handleNav(e) {
    this.setState({nav_location: e})
    this.state.nav_location = e;

    if (e==1) return(this.props.history.push("/"));
    else if (e==2) this.props.history.push("/projects");
    else if (e==3) this.props.history.push("/about/");
  }

  // 747584954544-1qnj29p7cp9s9i6ind8jegnracl1tihq.apps.googleusercontent.com
  // 7vE0EjS8fgqb-97KJonFQqCF

  render() {

    const nav_location = this.state.nav_location;

    return (
      <div>
        <Header tab_number={nav_location} onChangeNav={this.handleNav} />

        <Switch>

          <Route exact path="/" component={Home} />

          <Route path="/projects/" component={AllProjects} />
          <Route path="/create_new_project/" component={CreateNewProject} />
          <Route path="/project/:id" component={SingleProject} />
          <Route path="/valuesinput/:id" component={ValuesInput} />
          <Route
            path="/opportunitiesinput/:id"
            component={OpportunitiesInput}
          />
          <Route path="/cheatstorm/:id" component={Cheatstorm} />
          <Route path="/ideasview/:id" component={IdeasView} />
          <Route path="/vote/:id" component={VoteView} />

          <Route path="/home/" component={Home} />
          <Route path="/about/" component={About} />

        </Switch>
      </div>
    );
  }

  googleResponse = response => {
    console.log(response);
  };
}


export default withRouter(App);
//export default App;
