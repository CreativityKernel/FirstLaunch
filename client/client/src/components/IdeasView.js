import React, { Component } from "react";
import "../css/main.css";
import Header from "./Header";
import LikeCard from "./LikeCard";
import WishCard from "./WishCard";
import styled from "styled-components";
import {devices} from "../devices";

const Wrapper = styled.div`
  margin: 50px auto;
  max-width: 800px;
  text-align: center;
`;

const KernelHeader = styled.div`
      position: relative;
      margin:auto;
      width:100%
      height:60px;

      //@media ${devices.mobile} {
      //}
`;

const Sticky = styled.textarea`
  margin: auto;
  width: 160px;
  height: 160px;
  border-radius: 1px;
  border: none;
  background-color: ${props =>
    props.wish ? "#d4d3ff" : props.like ? "#ffe677" : "#fffc8d"};
  resize: none;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.2px;
  color: #000000;
  padding: 10px;
  margin: 5px;
`;

const ContentContainer = styled.div`
  max-width: 690px;
  height: calc(100vh - 250px ); //footer = 100, top = 100, HMW = 50px, 0px extra for padding
  margin: auto;
  overflow: scroll;
  padding-bottom: 10px;

  @media ${devices.mobile}{
    height:auto;
  }
`;

const InputContainer = styled.div`
  width: 60%;
  margin: auto;
  padding: 1%;
`;

const Input = styled.textarea`
  margin: 2%;
  padding: 2%;
  width: 29%;
  height: 160px;
  border-radius: 1px;
  border: solid 1px #b9b9b9;
  background-color: #ffffff;
  resize: none;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.2px;
`;

const BottomWrapper = styled.div`
  width: 100%;
  height: 100px;
  margin: auto;
  position: sticky;
  bottom: 0;
  background-color: white;
  border-top: 1px solid #e3e5e9; //this is the grey line at the top of the footer

  @media ${devices.mobile}{
    position: sticky;
  }
`;

const Bottom = styled.div`
  max-width:700px;
  height: 100px;
  margin:auto;
  position:relative;
`;

const SubmitButton = styled.button`
  width: 150px;                 //this is customized
  height: 36px;
  border-radius: 4px;
  border: solid 1px #1e3888;
  background-color: #1e3888;
  position: absolute;
  top: 32px;
  right: 100px;                 //this is customized
  color: #fafafa;
  text-transform: uppercase;
`;

const Progress = styled.p`
  font-size: 30px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.5px;
  color: ${props => (props.disabled ? "#b9b9b9" : "#000000")};
  border: solid 3px ${props => (props.disabled ? "#b9b9b9" : "#ffe74c")};
  width: 75px;
  height: 75px;
  line-height: 65px;
  border-radius: 100%;
  text-align: center;
  margin: 30px;
  margin-left: 0;
  float: left;
  background-color: ${props => (props.disabled ? "#fafafa" : "white")};
`;

const BottomText = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  color: #000000;
  float: left;
  margin-top: 55px;
  margin-right: 70px;
`;

const MainWrapper = styled.div`
  margin: auto;
  margin-top: 100px; // added for navbar
`;

class IdeasView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.history.push("/project/" + this.state.data.project);
  }
  componentDidMount() {
    fetch("/prompts/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });
  }

  render() {
    if (this.state.data != null) {
      return (
        <div>
          <KernelHeader>
            <Header />
          </KernelHeader>

          <MainWrapper>
            <div height="50px">
              <h2 className="text_center">
                How might we <strong>{this.state.data.text}</strong>?
              </h2>
            </div>

            <ContentContainer>
              {this.state.data.ideas.map(function(idea, i) {
                return <Sticky>{idea.content.title}</Sticky>;
              })}
            </ContentContainer>

          </MainWrapper>

          <BottomWrapper>
            <Bottom>
              <SubmitButton onClick={this.handleSubmit}>
                Back To Project
              </SubmitButton>
            </Bottom>
          </BottomWrapper>

        </div>
      );
    }
    return null;
  }
}

export default IdeasView;
