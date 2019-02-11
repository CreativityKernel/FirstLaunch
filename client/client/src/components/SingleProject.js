import React, { Component } from 'react';
import '../css/main.css';
import ProjectPanel from './ProjectPanel';
import ValuesView from './ValuesView';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SingleProject extends Component {


 constructor(props) {
  super(props);

  this.state = {
    data: null,
  };
}

componentDidMount() {
  console.log('/projects/'+this.props.match.params.id)
  fetch('/projects/'+this.props.match.params.id)
    .then(response => response.json())
    .then(data => this.setState({data}));
}

  render() {

  if(this.state.data != null){
    return (
      <div className="SingleProject">

        <div>
        <ValuesView project_data={this.state.data}/>
        </div>
    </div>
    );
  }
  return null;
  }
}

export default SingleProject;
