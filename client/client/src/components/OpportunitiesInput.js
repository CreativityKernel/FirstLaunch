import React, { Component } from "react";
import "../css/main.css";
import Header from "./Header";
import LikeCard from "./LikeCard";
import WishCard from "./WishCard";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {devices} from "../devices"

const Wrapper = styled.div`
  margin: 10px auto;
  width: 100%;
  padding: 2%;
`;

const KernelHeader = styled.div`
      position: relative;
      margin:auto;
      width:100%
      height:60px;

      //@media ${devices.mobile} {
      //}
`;

const ValueContainer = styled.div`
  float: Left;
  width: 25%;
  height: calc(100vh - 250px ); //footer = 100, top = 100, HMW = 50px, 0px extra for padding

  overflow: scroll;
`;

const PromptsContainer = styled.div`
  float: Left;
  width: 74%;
  height: 70vh;
  overflow: scroll;
  // background:yellow;
  // background: rgba(127, 127, 127, 0.5);
  background-image: radial-gradient(black 5%, transparent 5%);
  background-size: 20px 20px;
  position: relative;
`;

const Prompt = styled.div`
  border-radius: 4px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 15px;
  max-width: 45%;
  margin: 5px;
  float: left;
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
  float: left;
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
  height: 100px;
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
  width: 72px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px #1e3888;
  background-color: #1e3888;
  position: absolute;
  top: 32px;
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

const Help = styled.div `
  padding-top: 20px;
  padding-bottom: 20px;
  background-color:#ffe74c;

  text-align:left;
  color:black;
  font-family: "Work Sans", sans-serif;
`;

const HelpTitle = styled.div `
  max-width: 700px;
  margin: auto;
  padding-left: 10px;

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

const HelpInstructions = styled.div `
  max-width: 700px;
  margin: auto;
  padding-top: 15px;

  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
`;


class OpportunitiesInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      values: [],
      prompts: []
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropOnContainer = this.handleDropOnContainer.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.handlePromptTextChange = this.handlePromptTextChange.bind(this);
    this.closeButtonClick = this.closeButtonClick.bind(this);
  }

  closeButtonClick(ev){
    var id = ev.target.id;
    if(id != null){
     var data = id.split("*");
     var promptIndex  = data[0];
     var valueIndex  = data[1];
     // alert(promptIndex +" "+ valueIndex);
     this.state.values.unshift(this.state.prompts[promptIndex].values[valueIndex]);
     this.state.prompts[promptIndex].values.splice(valueIndex, 1);
     this.forceUpdate();
    }
  }



  onSubmitClick(ev) {}

  handleDragStart(ev) {}

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
    this.state.prompts.map(function(prompt, i) {
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

  componentDidMount() {
    console.log("/projects/" + this.props.match.params.id);
    fetch("/projects/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
        var values = [];
        data.wishes.map(function(wishText, i) {
          values.push({ type: 1, text: wishText });
        });

        data.likes.map(function(likeText, i) {
          values.push({ type: 2, text: likeText });
        });

        var prompts = [];
        data.prompts.map(function(prompt, i) {
          prompts.push(prompt);

          prompt.values.map(function(value,j){
            values.map(function(localValue,k){
              if(localValue.text === value.text){
                values.splice(k,1);
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
        this.setState({values});
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

          <Help>
            <HelpTitle>
              Synthesize Likes and Wishes to Identify Opportunities
            </HelpTitle>
          </Help>

          <HelpInstructions>
            <ul>
              <li>Drag all of the likes and wishes from the left column into groups on the right.</li>
              <li>Sort the groups until they look good, then summarize each group with an opportunity statement that is clear, grounded, insightful, and inspiring.</li>
              <li>When you are finished, press <strong>save</strong>.</li>
            </ul>
          </HelpInstructions>

          <Wrapper>
            <ValueContainer>
              {this.state.values.map(function(value, i) {
                if (value.type == 1)
                  return (
                    <Draggable
                      id={i}
                      onDragStart={ev =>
                        ev.dataTransfer.setData("text", ev.target.id)
                      }
                      draggable="true"
                    >
                      <WishCard a={true} data={value.text} key={i} />
                    </Draggable>
                  );
                return (
                  <Draggable
                    id={i}
                    onDragStart={ev =>
                      ev.dataTransfer.setData("text", ev.target.id)
                    }
                    draggable="true"
                  >
                    <LikeCard data={value.text} key={i} />
                  </Draggable>
                );
              })}
            </ValueContainer>

            <PromptsContainer
              id={-1}
              onDrop={this.handleDropOnContainer}
              onDragOver={ev => {
                ev.preventDefault();
              }}
            >
              {this.state.prompts.map(function(prompt, j) {
                return (
                  <Prompt
                    id={j}
                    onDrop={this.handleDrop}
                    onDragOver={ev => {
                      ev.preventDefault();
                    }}
                  >
                    <HMW> THERE IS AN OPPORTUNITY TO...</HMW>
                    <PromptText id={j} onChange={this.handlePromptTextChange}>
                      {prompt.text}
                    </PromptText>
                    <ValueDrop>
                      {prompt.values
                        .slice(0)
                        .reverse()
                        .map(function(value, i) {
                          if (value.type == 1)
                            return <Closable><CloseButton id={j+"*"+(prompt.values.length-i-1)}
                              onClick={this.closeButtonClick}>X</CloseButton><WishCard flexHeight={true} data={value.text} key={i}></WishCard></Closable>;

                          return <Closable><CloseButton id={j+"*"+(prompt.values.length-i-1)}
                            onClick={this.closeButtonClick}>X</CloseButton><LikeCard flexHeight={true} data={value.text} key={i}></LikeCard></Closable>;
                        },this)}
                    </ValueDrop>
                  </Prompt>
                );
              }, this)}
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
}

export default OpportunitiesInput;
