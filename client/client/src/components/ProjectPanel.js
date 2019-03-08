import React, { Component } from 'react';
import '../css/main.css';

class ProjectPanel extends Component {

  constructor(props) {
   super(props);
 }

  render() {
    return (
      <div>
        <h2>{this.props.project_data.title}</h2>
        <p>{this.props.project_data.description}</p>
      </div>
    );
  }
}

export default ProjectPanel;
