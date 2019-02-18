import React, { Component } from 'react';

class CreateNewProject extends Component {

  constructor(props) {
   super(props);

   this.state = {
     data: null,
   };
 }


 handleClick(){
   this.props.history.push('/create_new_project/');
 }

 render() {
    return(
      <div className="CreateNewProject">
        <div className="Header">
          <h1>Create A New Project</h1>
        </div>
        <div className="Content">
          <h2>Title</h2>
          <input type="text"></input>
          <h2>Description</h2>
          <input type="text"></input>
          <button>Create</button>
        </div>
      </div>
    );
  }
}

export default CreateNewProject;
