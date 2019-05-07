import React, { Component } from "react";
import ProjectCard from "./ProjectCard";

class AllProjects extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("/projects")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  handleClick() {
    this.props.history.push("/create_new_project/");
  }

  render() {
    if (this.state.data != null) {
      return (
        <div className="AllProjects">
          <div className="AllProjectsHeader">
            <h1>All Projects</h1>
            <button onClick={this.handleClick} className="NewButton">
              {" "}
              + Create New
            </button>
          </div>
          {this.state.data.map(function(project, i) {
            return <ProjectCard data={project} key={i} />;
          })}
        </div>
      );
    }

    return null;
  }
}

export default AllProjects;
