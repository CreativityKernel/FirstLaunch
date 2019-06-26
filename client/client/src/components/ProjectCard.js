import React, { Component } from "react";
import "../css/main.css";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../devices"


const Card = styled.div`
      float: left;
      width: 31.3%;
      margin:1%;
      padding: 10px;
      height: 350px;
      box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
      border: solid 0.5px #979797;
      position: relative;
      overflow:scroll;

      h2{
        font-size: 18px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.7;
        letter-spacing: 0.2px;
        color: #1e3888;
        padding-left: 10px
      }

      p{
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.6;
        letter-spacing: 0.4px;
        padding-left: 10px
        padding-bottom: 10px;
      }

      @media ${devices.mobile} {
        width:100%
          margin:0%;
          margin-bottom:10px;
      }
`;

const ParticipantList = styled.div`
  width: 90%;
  border-top: solid 0.5px #979797;
  bottom: 0px;
  left: 5%;
  position: absolute;

  p {
    display: inline-block;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  float: left;
  padding: 5px;
`;

const ProfileImage = styled.img`
  width: 15%;
  background-color: gray;
  border-radius: 100px;
`;

const TextWrapper = styled.div`
  marging-left: 40%;
  padding: 10px;
`;

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push("/project/" + this.props.data._id);
  }

  render() {
    return (
      <Card onClick={this.handleClick}>
        <h2>{this.props.data.title}</h2>
        <p>{this.props.data.description}</p>
        <ParticipantList />
      </Card>
    );
  }
}

export default withRouter(ProjectCard);
