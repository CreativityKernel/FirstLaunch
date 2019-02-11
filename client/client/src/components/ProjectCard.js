import React, { Component } from 'react';
import '../css/main.css';
import {withRouter} from 'react-router-dom'

class ProjectCard extends Component {

  constructor(props) {
   super(props);

   this.handleClick = this.handleClick.bind(this);
 }

 handleClick(){
   this.props.history.push('/project/'+this.props.data._id);
 }


  render() {
    return (
      <div onClick={this.handleClick} className="ProjectCard" >
        <h2>{this.props.data.Title}</h2>
        <p>{this.props.data.Description}</p>
        <p>{this.props.data.Participants.length} People is working on it</p>
      </div>
    );
  }

}



export default withRouter(ProjectCard);
