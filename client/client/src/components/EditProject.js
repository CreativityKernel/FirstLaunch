import React, { Component } from 'react';
import Header from "./Header";
import styled from 'styled-components';
import { devices } from "../devices"

const Wrapper = styled.div`
 margin:auto;
 background-color: #f4f4f4;
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
  text-align: center;
  text-transform:uppercase;
  color: #fafafa;
  margin-top:20px;
  float:right;
`;

const KernelHeader = styled.div`
      position: relative;
      margin:auto;
      width:100%
      height:60px;

      //@media ${devices.mobile} {
      //}
`;

class EditProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //title: project.title,//null,
      //description: this.props.match.params.id //null
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleSaveClick(){

    var project = this.state.data;

    fetch(`/projects/${project._id}`,
      { method:'PUT',
        body: JSON.stringify({
          //"createdBy":localStorage.getItem('ck_user_id'),        // note sure if we want this
          "title": this.state.title,
          "description":this.state.description,
          //"participants":[localStorage.getItem('ck_user_id')]    // note sure if we want this
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

    this.props.history.push("/project/" + project._id);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
     //alert(this.state.title);
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  componentDidMount() {
    //console.log('/projects/'+this.props.match.params.id)
    fetch('/projects/'+this.props.match.params.id)
    .then(response => response.json())
    .then(data => this.setState({data}));
  }

  render() {

    console.log(this.state.data);

    if(this.state.data != null){
      var project = this.state.data;
      //var valueType = this.state.currentValue.valueType;

      return(
        <Wrapper>

            <KernelHeader>
              <Header />
            </KernelHeader>

          <Title>
            Edit Project
          </Title>
          <Form>
            <h2>Title</h2>
            <textarea value={this.state.title} onChange={this.handleTitleChange}rows="1" type="text">{project.title}</textarea>
            <h2>Description</h2>
            <textarea value={this.state.description} onChange={this.handleDescriptionChange} rows="3" type="text">{project.description}</textarea>
            <Button onClick={this.handleSaveClick}>Save</Button>
          </Form>
        </Wrapper>
      );
    }
    return null;
  }
}

export default EditProject;
