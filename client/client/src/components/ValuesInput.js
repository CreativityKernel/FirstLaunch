import React, { Component } from 'react';
import '../css/main.css';
import Header from "./Header";
import LikeCard from './LikeCard'
import WishCard from './WishCard'
import CloseButton from './CloseButton'
import styled from 'styled-components'
import {devices} from "../devices"

const Wrapper = styled.div`
 margin: 10px auto ;
 padding-top: 30px;
 max-width:800px;
 text-align:center;
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
 margin:auto
 width: ${props =>
   props.input ? "160px" : "100px"};
 height: ${props =>
     props.input ? "160px" : "100px"};
 border-radius: 1px;
 border:none;
 background-color: ${props => props.wish? '#d4d3ff' : props.like ? '#ffe677' :'#fffc8d'};
 resize:none;
 outline:none;
 overflow:hidden;
 font-size: ${props =>
   props.input ? "15px" : "10px"};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.2px;
  color: #000000;
  padding:5px;
`;

const ValueWrapper = styled.div `
  max-width:690px;
  height:35vh;
  margin:auto;
  overflow:scroll;
`;

const Help = styled.div `
  display: none;
  padding-top: 10px;
  padding-bottom: 15px;
  background-color:#ffe74c;

  text-align:left;
  color:black;
  font-family: "Work Sans", sans-serif;
`;

const HelpTitle = styled.div `
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

const HelpInstructions = styled.div `
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

const BottomWrapper = styled.span`
  width: 100%;
  height: 100px;
  margin: auto;
  position: absolute;
  bottom: 0;
  background-color: white;
  border-top: 1px solid #e3e5e9; //this is the grey line at the top of the footer

  //this is the only BottomWrapper that uses the following 4 lines of padding code:
  //padding: 30px 30px 40px;
  //bottom: 0;
  //left: 0;
  //right: 0;

  //removed for now; @media needs updating to accomodate this footer
  //@media ${devices.mobile}{
  //  position: sticky;
  //}
`;

const Subject = styled.div`
  text-transform: lowercase;
  font-weight: bold;
  display: inline;
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
  color:#fafafa;
  text-transform:uppercase
  cursor: pointer;

  @media ${devices.mobile}{
    bottom:30px;
  }
`;

const Progress = styled.p`
  font-size: 30px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.5px;
  color: ${props => props.disabled ? '#b9b9b9' : '#000000'};
  border: solid 3px ${props => props.disabled ? '#b9b9b9' : '#ffe74c'};
  width: 75px;
  height: 75px;
  line-height:65px;
  border-radius:100%;
  text-align:center;
  margin-right: 30px;
  margin-left: 20px;
  margin-top: 12px;
  float: left;
  background-color: ${props => (props.disabled ? "#fafafa" : "white")}; //this is inside the circle

  //This @media css is unique to this module, allowing the circles to collapse. We should unify styles if possible.
  @media ${devices.mobile}{
    font-size: 15px;
    width: 50px;
    height: 50px;
    line-height:45px;
    border-radius:100%;
    text-align:center;
    margin-right:10px;
    margin-top: 25px;
  }
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
  margin-top: 40px; //was 55px when footer was 100px
  margin-right: 70px;

  //This @media css is unique to this module... we should unify styles if possible.
  @media ${devices.mobile}{
    margin-top: 42px;
    margin-right: 20px;
  }

`;

class ValuesInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      currentValue: {
        text:null,
        valueType:-1
      },
      likes:[],
      wishes:[],
      values:[]
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(event){
    var textValue = event.target.value;
    if(textValue.trim().length<1){
      event.target.focus();
      event.target.setSelectionRange(0,0);
    }

    if(textValue.toLowerCase().startsWith('i like')){
      this.setState({currentValue: { text:textValue, valueType:0}});
    }
    else if(textValue.toLowerCase().startsWith('i wish')){
      this.setState({currentValue: { text:textValue, valueType:1}});
    }
    else this.setState({currentValue: { text:textValue, valueType:-1}});
  }

  handleKeyPress(event){
    if(event.key == 'Enter'){
      this.storeCurrentValue();
      this.setState({currentValue: {
        text:"",
        valueType:-1
      }});
    }
  }

  storeCurrentValue(){
    if(this.state.currentValue.valueType == 1){
      this.state.wishes.push(this.state.currentValue.text); //todo:check for react immutibitlity
      this.state.values.push(this.state.currentValue);

    }else if(this.state.currentValue.valueType == 0){
      this.state.likes.push(this.state.currentValue.text);
      this.state.values.push(this.state.currentValue);
    }
  }

  handleSubmit(event){
    fetch('/projects/likes/'+this.props.match.params.id,
      { method:'POST',
        body: JSON.stringify({"likes":this.state.likes,
      "createdBy":localStorage.getItem('ck_user_id')}),
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

    fetch('/projects/wishes/'+this.props.match.params.id,
    { method:'POST',
        body: JSON.stringify({"wishes":this.state.wishes,
      "createdBy":localStorage.getItem('ck_user_id')}),
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
    this.props.history.push('/project/'+this.state.data._id);
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
    console.log('/projects/'+this.props.match.params.id)
    fetch('/projects/'+this.props.match.params.id)
    .then(response => response.json())
    .then(data => this.setState({data}));
  }

  render() {
    if(this.state.data != null){
      var project = this.state.data;
      var valueType = this.state.currentValue.valueType;
      return (
        <div>
          <KernelHeader>
            <Header />
          </KernelHeader>

          <Help id="helpZone">
            <HelpInstructions>
              <ul>
                <li>In response to the question below, generate sentences that begin with <strong>I like...</strong> or <strong>I wish...</strong>, then hit <strong>return</strong>.</li>
                <li>When you are finished, press <strong>submit</strong>.</li>
              </ul>
            </HelpInstructions>
          </Help>

          <HelpTitle>
            <HelpButton onClick={this.helpToggle}>?</HelpButton>
            What do you like and wish about <Subject>{project.title}</Subject>?
          </HelpTitle>

          <Wrapper>
            <Sticky input={true} wish={valueType == 1 ? true : false} like={valueType == 0 ? true : false}
              onChange={this.handleTextChange} onKeyPress={this.handleKeyPress} value={this.state.currentValue.text}>
            </Sticky>
          </Wrapper>

          <ValueWrapper>
            {this.state.values.slice(0).reverse().map(function(value, i){
              if(value.valueType == 0)
              return <LikeCard data={value.text} key={i} ></LikeCard>;
              else return <WishCard data={value.text} key={i} />;
            })}
          </ValueWrapper>

          <BottomWrapper>
            {/*<Bottom>*/}
              <Progress>{this.state.likes.length}</Progress>
              <BottomText>Likes</BottomText>
              <Progress>{this.state.wishes.length}</Progress>
              <BottomText>Wishes</BottomText>
              <SubmitButton onClick={this.handleSubmit}>Submit</SubmitButton>
            {/*</Bottom>*/}
          </BottomWrapper>

        </div>
      );
    }
    return null;
  }
}

export default ValuesInput;
