import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
 margin:auto
 background-color: #f4f4f4;;
 height:100vh;
 margin-top: 60px // for navbar
`;

const Title = styled.h1`
 font-size: 24px;
 margin-left:10%;
 padding-top:30px;
`;

const Form = styled.div`
  margin-left:10%;
  padding:20px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  border: solid 0.5px #979797;
  background-color: #ffffff;
  position:relative;
  width:55%;
  overflow:hidden;

  h2{
    padding:0;
    marging:0;
    width: 37px;
    height: 23px;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    color: #000000;
  }

  textarea{
    border-radius: 4px;
    border: solid 1px #e0e0e0;
    background-color: #ffffff
    line-height: 1.57;
    outline:none;
    width:100%;
    resize:none;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.3px;
    padding:5px;
    margin-top:0;
  }
`;

const Button = styled.button`
  width: 76px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px #1e3888;
  background-color: #1e3888
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: right;
  text-transform:uppercase;
  color: #fafafa;
  margin-top:20px;
  float:right;

`;

class CreateNewProject extends Component {
  constructor(props) {
   super(props);
   this.state = {
     title: null,
     description: null
   };

   this.handleTitleChange = this.handleTitleChange.bind(this);
   this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
   this.handleClick = this.handleClick.bind(this);
 }

 handleClick(){
   fetch('/projects/',
     { method:'POST',
       body: JSON.stringify({
         "createdBy":localStorage.getItem('ck_user_id'),
         "title": this.state.title,
         "description":this.state.description,
         "participants":[localStorage.getItem('ck_user_id')]
       }),
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json',
         'Mode' : "CORS"
       }
     }).then(response => response.json())
     .then(data =>
       {
         console.log(data);
       }
     );

     alert("Successfully Created!");
     this.props.history.push('/');
 }

 handleTitleChange(event) {
    this.setState({title: event.target.value});
     //alert(this.state.title);
  }

handleDescriptionChange(event) {
     this.setState({description: event.target.value});
   }

 render() {
    return(
      <Wrapper>
        <Title>
          Create A New Project!!!
        </Title>
        <Form>
          <h2>Title</h2>
          <textarea value={this.state.title} onChange={this.handleTitleChange}rows="1" type="text"></textarea>
          <h2>Description</h2>
          <textarea value={this.state.description} onChange={this.handleDescriptionChange} rows="3" type="text"></textarea>
          <Button onClick={this.handleClick}>Create</Button>
        </Form>
      </Wrapper>
    );
  }
}

export default CreateNewProject;
