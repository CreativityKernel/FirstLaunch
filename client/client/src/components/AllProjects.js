import React, { Component } from 'react';
import ProjectCard from './ProjectCard'

class AllProjects extends Component {

  constructor(props) {
   super(props);

   this.state = {
     data: null,
   };
 }

 componentDidMount() {
   fetch('/projects')
     .then(response => response.json())
     .then(data => this.setState({ data }));
 }

 render() {
    if(this.state.data != null){
    return(
      <div className="AllProjects">
        <h1 className="heading">All Projects</h1>
        {this.state.data.map(function(project, i){
          return <ProjectCard data={project} key={i} />;
        })}
      </div>
    );
  }

  return null;
  }
}

export default AllProjects;
