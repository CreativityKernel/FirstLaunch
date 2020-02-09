// This is the full grid of all existing projects

import React, { Component } from "react";
import Header from "./Header";
import ProjectCard from "./ProjectCard";
import styled from "styled-components";
import { devices } from "../devices"


const Wrapper =styled.div`{
  max-width: 1000px;
  margin: 10px auto;
  //background-color: #bbbbbb;

  @media ${devices.mobile} {
    width:95%
  }

  h1 {
    font-size: 34px;
    //font-family: /*"Bookman Old Style",*/ "HelveticaNeue-Bold", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    color: #000000;

    @media ${devices.mobile} {
      font-size: 24px;
    }
  }
`;

const KernelHeader = styled.div`
      position: relative;
      margin:auto;
      width:100%
      height:60px;

      //@media ${devices.mobile} {
      //}
`;


const NewButton = styled.button `{
  position: absolute;

  right: 20px;
  bottom: 5px;

  width: 157px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px #1e3888;
  background-color: #fafafa;

  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  color: #1e3888;

  @media ${devices.mobile} {
    width: 120px;
    height: 36px;
    font-size: 12px;
  }

}`;



//PERHAPS THIS SHOULD BE A UNIVERSAL CSS HeaderContainer?
const ProjectHeaderContainer = styled.div`
      position: relative;
      margin:auto;
      width:100%
      margin: 1%; // this matches the margin around all the project tiles
      //background-color: #bbbbbb;

      margin-top: 60px;

      //@media ${devices.mobile} {
      //}
`;

const ProjectCardContainer = styled.div`
      margin:auto;
      width:100%

      @media ${devices.mobile} {
      }
`;

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

        <Wrapper>

          <KernelHeader>
            <Header />
          </KernelHeader>

          <ProjectHeaderContainer>
            <h1>All Projects</h1>

            <NewButton onClick={this.handleClick}>
              {" "}
              + Create New
            </NewButton>
          </ProjectHeaderContainer>

          <ProjectCardContainer>
            {this.state.data.map(function(project, i) {
              return <ProjectCard data={project} key={i} />;
            })}
          </ProjectCardContainer>
        </Wrapper>
      );
    }

    return null;
  }
}

export default AllProjects;
