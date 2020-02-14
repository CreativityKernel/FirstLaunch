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
  background-color: "#fffc8d";
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

const ValueWrapper = styled.div `
  max-width:690px;
  height:35vh;
  margin:auto;
  overflow:scroll;
`;


const Help = styled.div `
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
  padding-right: 15px;

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

  @media ${devices.mobile}{
    bottom:30px;
  }
`;

const Subject = styled.div`
  text-transform: lowercase;
  font-weight: bold;
  display: inline;
`;

class AllIdeas extends Component {

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

  handleSubmit(event) {
    this.props.history.push("/project/" + this.state.data.project);
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

          <Help>
            <HelpInstructions>
              <ul>
                <li>Xxxxx xx x x.</li>
              </ul>
            </HelpInstructions>
          </Help>

          <HelpTitle>
            All of the ideas for "What do you like and wish about <Subject>{project.title}</Subject>":
          </HelpTitle>

          <Wrapper>

            <ContentContainer>
              {//this.state.data.ideas.map(function(idea, i) {
                //return <Sticky>{idea.content.title}</Sticky>;
              //})
              }

            </ContentContainer>

          </Wrapper>

          <BottomWrapper>
            <SubmitButton onClick={this.handleSubmit}>Back To Project</SubmitButton>
          </BottomWrapper>

        </div>
      );
    }
    return null;
  }
}

export default AllIdeas;
