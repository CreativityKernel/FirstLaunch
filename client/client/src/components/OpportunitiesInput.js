import React, { Component } from "react";
import "../css/main.css";
import Header from "./Header";
import LikeCard from "./LikeCard";
import WishCard from "./WishCard";
import Prompt from "./Prompt";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { devices } from "../devices";
import ValueCard, { cardSizes } from './ValueCard';
import HelpZone from './HelpZone';



const Wrapper = styled.div`
  margin: 10px auto;
  width: 100%;
  padding: 2%;
  display:flex;
`;

const KernelHeader = styled.div`
      position: relative;
      margin:auto;
      width:100%
      height:60px;

      //@media ${devices.mobile} {
      //}
`;

const SubHeader = styled.div`
      position: relative;
      margin:auto;
      width:100%
      height:8vh;
`;

const ValueContainer = styled.div`
  width: 35%;
  overflow: scroll;
`;

const PromptsContainer = styled.div`

  width: 80vw;
  height: 70vh;
  overflow: scroll;
  // background:yellow;
  // background: rgba(127, 127, 127, 0.5);
  // background-image: radial-gradient(black 5%, transparent 5%);
  background-size: 20px 20px;
  position: relative;
`;

const HMW = styled.h2`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  color: #1e3888;
`;

const PromptText = styled.textarea`
  width: 100%;
  resize: none;
  padding: 15px;
  border-radius: 10px;
  border: solid 1px #b9b9b9;
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: 0.5px;
`;

const ValueDrop = styled.div`
  width: 100%;
  min-height: 100px;
  //background-color:#f4f4f4
  text-align: center;
`;

const Closable = styled.div`
position:relative;
padding:0;
margin:0;
`;

const CloseButton = styled.button`
  position:absolute;
  top:10;
  right:25px;
  width:25px;
  height:25px;
  border-radius:100%;
`;

const Draggable = styled.div`
  margin:auto;
  width:10vw;
`;

const Sticky = styled.textarea`
 margin:auto
 width: 160px;
 height: 160px;
 border-radius: 1px;
 border:none;
 background-color: ${props =>
    props.wish ? "#d4d3ff" : props.like ? "#ffe677" : "#fffc8d"};
 resize:none;
 outline:none;
 overflow:hidden;
 font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.2px;
  color: #000000;
  padding:10px;
`;

const ValueWrapper = styled.div`
  max-width: 690px;
  height: 35vh;
  margin: auto;
  overflow: scroll;
`;

const BottomWrapper = styled.div`
  width: 100%;
  height: 4vw;
  margin: auto;
  position: absolute;
  bottom: 0;
  background-color: white;

  border-top: 1px solid #e3e5e9; //this is the grey line at the top of the footer

  //commented out for now; @media needs updating to accommodate this module
  //@media ${devices.mobile}{
  //  position: relative;
  //}
`;


/*
const BottomWrapper = styled.div`

  width: 100%;
  height: 100px;
  margin: auto;
  position: absolute;
  bottom: 0;
  background-color: white;
  border-top: 1px solid #e3e5e9; //this is the grey line at the top of the footer

  padding: 30px 30px 40px;
  bottom: 0;
  left: 0;
  right: 0;

  @media ${devices.mobile}{
    position:relative;
  }
`;
*/

const Bottom = styled.div`
  max-width:1200px; //this is custom
  height: 100px;
  margin:auto;
  position:relative;
`;

const SubmitButton = styled.button`
  min-width: 6vw;
  height: 2vw;
  border-radius: 4px;
  border: solid 1px #1e3888;
  background-color: #1e3888;
  position: absolute;
  top: 1vw;
  right: 20px;
  color: #fafafa;
  text-transform: uppercase;
`;

const RefreshButton = styled.button`
  min-width: 6vw;
  height: 2vw;
  border-radius: 4px;
  border: solid 1px #1e3888;
  border:none;
  color: #1e3888;
  display:block;
  margin:auto;
  outline:none;

  &:hover{
    font-weight:bold;
  }
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

const Help = styled.div`
  display: none;
  padding-top: 10px;
  padding-bottom: 15px;
  background-color:#ffe74c;

  text-align:left;
  color:black;
  font-family: "Work Sans", sans-serif;
`;

const HelpTitle = styled.div`
  text-align:center;
  margin: auto;
  padding-top: 25px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 50px;

  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.2px;

  @media ${devices.mobile}{
    //font-size: 16px;
    text-align:center;
  }
`;

const HelpInstructions = styled.div`
  margin: auto;
  padding-top: 15px;

  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
`;

const HelpButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  border: none;
  background-color: #ffe74c;

  position: fixed;
  right: 20px;
  color:black;

  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.2px;

  cursor: pointer;
`;

const AddNewPrompt = styled.div`
height:12vw;
min-height:12vw;
display:flex;
align-items: center;
justify-content:flex-start;
padding:6vh 2vw;
background-color:${(props) => props.mouseEntered || props.expand ? '#ECF5FF' : 'white'};
overflow:hidden;
`;

const NewClusterText = styled.p`
font-family: Work Sans;
font-style: normal;
font-weight: 500;
font-size: 2vw;
display: flex;
align-items: center;
color: #1E3888;
opacity: 0.7;
margin:auto 0vw;
width:30vw;
`;

const NewClusterPlus = styled.p`
font-family: Work Sans;
font-style: normal;
font-weight: 500;
font-size: 5vw;
display: flex;
align-items: center;
color: #1E3888;
opacity: 0.7;
margin:auto 0vw;
`;

class OpportunitiesInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      values: [],
      prompts: [],
      recentlyUpdatedPrompt: -1,
      newClusterMouseEntered: false
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropOnContainer = this.handleDropOnContainer.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.handlePromptTextChange = this.handlePromptTextChange.bind(this);
    this.closeButtonClick = this.closeButtonClick.bind(this);
  }

  closeButtonClick(ev) {
    var id = ev.target.id;
    if (id != null) {
      var data = id.split("*");
      var promptIndex = data[0];
      var valueIndex = data[1];
      // alert(promptIndex +" "+ valueIndex);
      this.state.values.unshift(this.state.prompts[promptIndex].values[valueIndex]);
      this.state.prompts[promptIndex].values.splice(valueIndex, 1);
      this.forceUpdate();
    }
  }



  onSubmitClick(ev) { }

  handleDragStart(ev) { }

  handlePromptTextChange(ev) {
    var promptIndex = parseInt(ev.target.id);
    this.state.prompts[promptIndex].text = ev.target.value;
  }

  handleDropOnContainer(ev) {
    ev.preventDefault();

    var valueIndex = parseInt(ev.dataTransfer.getData("text"));
    var promptIndex = parseInt(ev.target.id);
    if (promptIndex < 0) {
      promptIndex =
        this.state.prompts.push({
          text: "",
          author: localStorage.getItem("ck_user_id"),
          project: this.state.data._id,
          values: []
        }) - 1;

      this.state.prompts[promptIndex].values.push(
        this.state.values[valueIndex]
      );
      this.state.values.splice(valueIndex, 1);
      this.forceUpdate();
    }
  }

  handleDrop(ev) {
    ev.preventDefault();
    var valueIndex = parseInt(ev.dataTransfer.getData("text"));
    var promptIndex = parseInt(ev.target.id);
    if (isNaN(promptIndex)) {
      promptIndex = parseInt(ev.target.parentElement.id);
      if (isNaN(promptIndex)) {
        promptIndex = parseInt(ev.target.parentElement.parentElement.id);
      }
    }
    if (promptIndex > -1) {
      this.state.prompts[promptIndex].values.push(
        this.state.values[valueIndex]
      );
      this.state.values.splice(valueIndex, 1);
      this.forceUpdate();
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  onSubmitClick(event) {
    var project_id = this.state.data._id;
    var values = this.state.values;
    this.state.prompts.map(function (prompt, i) {
      fetch("/prompts", {
        method: "POST",
        body: JSON.stringify(prompt),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Mode: "CORS"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);

          // fetch('/projects:'+project_id,
          //   { method:'PUT',
          //     body: JSON.stringify({"values":values}),
          //     headers: {
          //       'Accept': 'application/json, text/plain, */*',
          //       'Content-Type': 'application/json',
          //       'Mode' : "CORS"
          //     }
          //   });
        });
    });

    alert("Successfully Saved");
    this.props.history.push("/project/" + this.state.data._id);
  }

  helpToggle(event) {
    var x = document.getElementById("helpZone");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  componentDidMount() {
    console.log("/projects/" + this.props.match.params.id);
    fetch("/projects/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
        var values = [];
        data.wishes.map(function (wishText, i) {
          values.push({ type: 1, text: wishText });
        });

        data.likes.map(function (likeText, i) {
          values.push({ type: 2, text: likeText });
        });

        var prompts = [];
        data.prompts.map(function (prompt, i) {
          prompts.push(prompt);

          prompt.values.map(function (value, j) {
            values.map(function (localValue, k) {
              if (localValue.text === value.text) {
                values.splice(k, 1);
              }
            });
          });
        });
        // if (prompts.length < 1){
        //   prompts.push({
        //     text: '',
        //     author: localStorage.getItem('ck_user_id'),
        //     project: data._id,
        //     values: [],
        //   });
        // }

        values = this.shuffle(values);
        this.setState({ values });
        this.setState({ prompts });
      });
  }

  //TODO:move to utils
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  render() {
    if (this.state.data != null) {
      var project = this.state.data;
      return (
        <div>
          <KernelHeader>
            <Header />
          </KernelHeader>

          {/* <Help id="helpZone">
            <HelpInstructions>
              <ul>
                <li>Drag all of the likes and wishes from the left column into groups on the right.</li>
                <li>Sort the groups until they look good, then summarize each group with an opportunity statement that is clear, grounded, insightful, and inspiring.</li>
                <li>When you are finished, press <strong>save</strong>.</li>
              </ul>
            </HelpInstructions>
          </Help>

          <HelpTitle>
            <HelpButton onClick={this.helpToggle}>?</HelpButton>
            Synthesize the Likes and Wishes to identify opportunities!
          </HelpTitle> */}

          <SubHeader>
            <HelpZone></HelpZone>
          </SubHeader>



          <Wrapper>
            <ValueContainer>
              <Draggable draggable="true">
                {this.state.values.length > 0 && <ValueCard showContent={true} type={this.state.values[this.state.values.length - 1].type} data={this.state.values[this.state.values.length - 1].text} size={0}></ValueCard>}
              </Draggable>
              <RefreshButton onClick={() => this.refreshValue()}>Skip</RefreshButton>
            </ValueContainer>

            <PromptsContainer
              id={-1}
              onDrop={this.handleDropOnContainer}
              onDragOver={ev => {
                ev.preventDefault();
              }}
            >
              {this.state.prompts.map(function (prompt, j) {
                return (
                  <Prompt onTextChange={(index, value) => this.handlePromptTextChange(index, value)} onRemoveCallBack={(i) => this.onRemove(j, i)} animation={this.state.recentlyUpdatedPrompt == j} index={j} prompt={prompt} onDropCallback={(index) => this.handleDropOnAPrompt(index)}>
                  </Prompt>
                );
              }, this)}
              <AddNewPrompt
                onMouseEnter={() => this.setState({ newClusterMouseEntered: true })}
                onMouseLeave={() => this.setState({ newClusterMouseEntered: false })}
                onDragOver={() => { !this.state.newClusterMouseEntered && this.setState({ newClusterMouseEntered: true }) }}
                onDragLeave={() => this.setState({ newClusterMouseEntered: false })}
                onDrop={() => {
                  this.setState({ newClusterMouseEntered: false });
                  this.handleDropOnNewPrompt();
                }}
                mouseEntered={this.state.newClusterMouseEntered}
              >
                <NewClusterText>New Cluster</NewClusterText>
                <NewClusterPlus>+</NewClusterPlus>

              </AddNewPrompt>
            </PromptsContainer>
          </Wrapper>

          <BottomWrapper>
            <Bottom>
              <SubmitButton onClick={this.onSubmitClick}>Save</SubmitButton>
            </Bottom>
          </BottomWrapper>
        </div>
      );
    }
    return null;
  }

  refreshValue() {
    var values = this.state.values;
    values.unshift(values.pop());
    this.setState({ values: values });
  }

  handlePromptTextChange(index, value) {
    var prompts = this.state.prompts;
    prompts[index].text = value
    this.setState({ prompts: prompts});
  }

  onRemove(promptIndex, valueIndex) {
    var prompts = this.state.prompts;
    var values = this.state.values;
    values.push(prompts[promptIndex].values[valueIndex]);
    prompts[promptIndex].values.splice(valueIndex, 1);
    this.setState({ prompts: prompts, values: values });
  }

  handleDropOnAPrompt(index) {
    var prompts = this.state.prompts;
    var values = this.state.values;
    prompts[index].values.push(values.pop());
    this.setState({ prompts: prompts, values: values, recentlyUpdatedPrompt: index });
  }


  handleDropOnNewPrompt() {
    var prompts = this.state.prompts;
    var values = this.state.values;
    var newPrompt = this.createNewPrompt();
    newPrompt.values.push(values.pop());
    prompts.push(newPrompt)
    this.setState({ prompts: prompts, values: values, recentlyUpdatedPrompt: prompts.length - 1 });
  }

  createNewPrompt() {
    return {
      text: "",
      author: localStorage.getItem("ck_user_id"),
      project: this.state.data._id,
      values: []
    }
  }

}

export default OpportunitiesInput;
