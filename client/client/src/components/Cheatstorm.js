import React, { Component } from "react";
import "../css/main.css";
import LikeCard from "./LikeCard";
import WishCard from "./WishCard";
import styled from "styled-components";
import {devices} from "../devices"

const Wrapper = styled.div`
  margin: 10px auto;
  max-width: 800px;
  text-align: center;
`;

const Sticky = styled.textarea`
  margin: auto;
  width: ${props =>
    props.input ? "160px" : "100px"};
  height: ${props =>
      props.input ? "160px" : "100px"};
  border-radius: 1px;
  border: none;
  background-color: ${props =>
    props.wish ? "#d4d3ff" : props.like ? "#ffe677" : "#fffc8d"};
  resize: none;
  outline: none;
  overflow: hidden;

  font-size: ${props =>
    props.input ? "15px" : "10px"};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.2px;
  color: #000000;
  padding: 10px;
  margin: 5px;
`;

const ValueWrapper = styled.div`
  max-width: 690px;
  width:100%
  height: 35vh;
  margin: auto;
  overflow: scroll;
`;

const InputContainer = styled.div`
  width: 60%;
  margin: auto;
  padding: 1%;

  @media ${devices.mobile}{
    width:100%
  }
`;

const Input = styled.textarea`
  width: 31.3%;
  margin:1%;
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
  letter-spacing: 0.2px

  @media ${devices.mobile}{
    font-size: 10px;
    height: 100px;
    line-height: 1.3;
    letter-spacing: 0.1px
  }
`;

const BottomWrapper = styled.div`
  max-width: 690px;
  width:100%;
  height: 150px;
  margin:auto;

`;

const SubmitButton = styled.button`
  width: 72px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px #1e3888;
  background-color: #1e3888;
  position: absolute;
  top: 50px;
  right: 20px;
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
  margin-left: 20px;
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

const Bottom = styled.div`
  max-width:700px;
  height: 100px;
  margin:auto;
  position:relative;


`;

const Help = styled.div `
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  padding: 8px
  text-align:center;
  color:white;
  background-color:#41cc86;
  margin:20px 0;

  @media ${devices.mobile}{
    font-size: 14px;
    text-align:left;
  }
`;

class Cheatstorm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      ideas: [],
      inputs: [],
      currentInputs: []
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
  }

  handleInputClick(ev) {
    this.setState({
      currentIdeaText: this.state.currentInputs[parseInt(ev.target.id)].content
        .title
    });
  }

  handleTextChange(event) {
    var textValue = event.target.value;
    this.setState({ currentIdeaText: textValue });
    if (textValue.trim().length < 1) {
      event.target.focus();
      event.target.setSelectionRange(0, 0);
    }
  }

  handleKeyPress(event) {
    if (event.key == "Enter") {
      this.storeCurrentValue();
      this.setState({ currentIdeaText: "" });
      this.refreshIdeationInputs();
    }
  }

  storeCurrentValue() {
    this.state.ideas.push({
      prompt_id: this.props.match.params.id,
      content: {
        title: this.state.currentIdeaText
      }
    });
  }

  handleSubmit(event) {
    this.state.ideas.map(function(idea, i) {
      fetch("/ideas", {
        method: "POST",
        body: JSON.stringify(idea),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Mode: "CORS"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
    });

    this.props.history.push("/project/" + this.state.data.project);
  }

  componentDidMount() {
    fetch("/prompts/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ data });

        fetch("/ideas/random")
          .then(response => response.json())
          .then(inputs => {
            try {
              this.setState({ inputs });
              this.setState({
                currentInputs: [
                  this.state.inputs.pop(),
                  this.state.inputs.pop(),
                  this.state.inputs.pop()
                ]
              });
            } catch (e) {}
          })
          .catch(function() {
            console.log("error");
          });
      });
  }

  refreshIdeationInputs() {
    if (this.state.inputs.length > 3) {
      this.setState({
        currentInputs: [
          this.state.inputs.pop(),
          this.state.inputs.pop(),
          this.state.inputs.pop()
        ]
      });
      this.forceUpdate();
    }
    if (this.state.inputs.length < 4) {
      fetch("/ideas/random")
        .then(response => response.json())
        .then(inputs => {
          try {
            this.setState({ inputs });
          } catch (e) {}
        })
        .catch(function() {
          console.log("error");
        });
    }
  }

  render() {
    if (this.state.data != null) {
      var prompt = this.state.data;
      return (
        <div>
          <Help>Generate new ideas in response to the brainstorm question below.
Click one of the three idea-starters for inspiration, then edit the text.
Wild ideas are encouraged, and try to express new ideas concretely as nouns.</Help>

          <h2 className="text_center">
            How might we <strong>{prompt.text}</strong>?
          </h2>
          <InputContainer>
            {this.state.currentInputs.map(function(idea, i) {
              return (
                <Input
                  readOnly="readonly"
                  onClick={this.handleInputClick}
                  id={i}
                  value={idea.content.title}
                />
              );
            }, this)}
          </InputContainer>
          <Wrapper>
            <Sticky
              input={true}
              onChange={this.handleTextChange}
              onKeyPress={this.handleKeyPress}
              value={this.state.currentIdeaText}
            />
          </Wrapper>
          <ValueWrapper>
            {this.state.ideas.map(function(idea, i) {
              return <Sticky input={false}>{idea.content.title}</Sticky>;
            })}
          </ValueWrapper>

          <BottomWrapper>
            <Bottom>
            <Progress>{this.state.ideas.length}</Progress>
            <BottomText>Ideas</BottomText>
            <SubmitButton onClick={this.handleSubmit}>Submit</SubmitButton>
            </Bottom>
          </BottomWrapper>
        </div>
      );
    }
    return null;
  }
}

export default Cheatstorm;
