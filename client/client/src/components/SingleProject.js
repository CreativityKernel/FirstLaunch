import React, { Component } from 'react';
import '../css/main.css';
import ProjectPanel from './ProjectPanel';
import ValuesView from './ValuesView';
import ProgressCircle from './ProgressCircle';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import creativityKernel from '../CKConstants';

const Wrapper = styled.div`
 margin:auto
 max-width:1100px;
`;

const MainWrapper = styled.div`
 margin-left:40%
`;

const Title = styled.h2`
font-family: "Work Sans", sans-serif;
font-size: 34px;
font-weight: normal;
font-style: normal;
font-stretch: normal;
line-height: normal;
letter-spacing: 0.3px;
color: #000000;
text-transform:capitalize;

`;

const Description = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: 0.5px;
  color: #000000;

`;

const StartedOn = styled.p`
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  color: #5e6165;

`;

const SegmentHeader = styled.p`
    border-bottom: solid 1px #1e3888;
    /* padding:5px; */
    /* margin:10px; */
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.1px;
    color: #1e3888;

`;

const Module = styled.div`
  position: relative;
  height:100px;
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
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${props => props.disabled ? '#fafafa' : 'white'};
`;

const ModuleName = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.5px;
  color: ${props => props.disabled ? '#979797' : '#000000'};
  position: absolute;
  top: 50%;
  left: 130px;
`;

const ModuleButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  text-transform:uppercase;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: center;
  color: ${props => props.disabled ? '#979797' : '#fafafa'};
  position: absolute;
  top: 50%;
  right: 0;
  width: 150px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px ${props => props.disabled ? '#b9b9b9;' : '#1e3888'};
  background-color: ${props => props.disabled ? '#fafafa' : '#1e3888'};
  outline:none;

`;

const LeftWrapper = styled.div`
  float:left;
  width:40%;
  padding:10px;
`;

const ActivityHeader = styled.h2`
font-size: 20px;
font-weight: 500;
font-style: normal;
font-stretch: normal;
line-height: normal;
letter-spacing: 0.2px;
color: #000000;
`;

const Activity = styled.div`

margin-bottom:5px;
position:relative;
/* background:yellow; */
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius:100%;
  display:inline;
  position:absolute;
  top:10px;
`;

const UserName = styled.p`
  display:inline;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: 0.5px;
  color: #1e3888;
  padding-left:40px;
`;

const Action = styled.p`
display:inline;
font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  color: #5e6165;
  text-transform:lowercase;
`;

const OpportunitiesContainer = styled.div`
margin-left:100px;
marging-right:20px;
margin-top:30px;

`;

const Opportunity = styled.div`
position:relative;
margin:20px;
width:100%
box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
border: solid 1px #1e3888;
border-radius:5px;
min-height:100px;
padding:10px;
`;

const CheatstormButton = styled.button`

font-size: 14px;
font-weight: 500;
text-transform:uppercase;
font-style: normal;
font-stretch: normal;
line-height: normal;
letter-spacing: 0.8px;
text-align: center;
color: ${props => props.disabled ? '#979797' : '#fafafa'};
position: absolute;
top: 10%;
right: 15px;
width: 150px;
height: 36px;
border-radius: 4px;
border: solid 1px ${props => props.disabled ? '#b9b9b9;' : '#1e3888'};
background-color: ${props => props.disabled ? '#fafafa' : '#1e3888'};
outline:none;
`;

const ViewButton = styled.button`

font-size: 14px;
font-weight: 500;
text-transform:uppercase;
font-style: normal;
font-stretch: normal;
line-height: normal;
letter-spacing: 0.8px;
text-align: center;
color: ${props => props.disabled ? '#979797' : '#fafafa'};
position: absolute;
bottom: 10%;
right: 15px;
width: 150px;
height: 36px;
border-radius: 4px;
border: solid 1px ${props => props.disabled ? '#b9b9b9;' : '#1e3888'};
background-color: ${props => props.disabled ? '#fafafa' : '#1e3888'};
outline:none;
`;


class SingleProject extends Component {

 constructor(props) {
  super(props);

  this.state = {
    data: null,
  };

  this.handleClickValues = this.handleClickValues.bind(this);
  this.handleClickOpportunities = this.handleClickOpportunities.bind(this);
  this.handleCheatstormClick =  this.handleCheatstormClick.bind(this);
}

handleClickValues(){
  this.props.history.push('/valuesinput/'+this.state.data._id);
}

handleClickOpportunities(){
  this.props.history.push('/opportunitiesinput/'+this.state.data._id);
}


handleCheatstormClick(ev){
  this.props.history.push('/cheatstorm/'+ev.target.id);
}


componentDidMount() {
  console.log('/projects/'+this.props.match.params.id)
  fetch('/projects/'+this.props.match.params.id)
    .then(response => response.json())
    .then(data => this.setState({data}));
}

  render() {
    console.log(creativityKernel.valuesLowerLimit);
  if(this.state.data != null){
    var date = new Date(this.state.data.createdDate);
    var valueCount = this.state.data.wishes.length + this.state.data.likes.length;
    var promptCount = this.state.data.prompts.length;

    return (
      <Wrapper>
        <LeftWrapper>
          <ActivityHeader>
            Activity
          </ActivityHeader>

          {this.state.data.activities.map(function(activity, i){

              return <Activity>
                <UserImage src={activity.user != null ? activity.user.imageUrl:"https://cdn2.iconfinder.com/data/icons/web-kit-2/64/web_user-512.png"}/>
                <UserName> {activity.user != null ? activity.user.name:"Anonymous Guest"} </UserName>
                <Action>{activity.task}</Action>
              </Activity>;

            })}
        </LeftWrapper>
        <MainWrapper>
          <Title>
            {this.state.data.title}
          </Title>
          <Description>
            {this.state.data.description}
          </Description>
          <StartedOn>
            Started On: {date.toLocaleString()}
          </StartedOn>
          <SegmentHeader>
            Needfinding
          </SegmentHeader>
          <Module>
            <Progress>
              {this.state.data.wishes.length + this.state.data.likes.length}
            </Progress>
            <ModuleName>
              Likes and Wishes
            </ModuleName>
            <ModuleButton onClick = {this.handleClickValues}>
                ADD
            </ModuleButton>
          </Module>
          <Module>
            <Progress disabled = {valueCount < creativityKernel.valuesLowerLimit?true:false}>
                    {this.state.data.prompts.length}
            </Progress>
            <ModuleName disabled = {valueCount < creativityKernel.valuesLowerLimit?true:false}>
              Opportunities
            </ModuleName>
            <ModuleButton onClick = {this.handleClickOpportunities} disabled = {valueCount < creativityKernel.valuesLowerLimit?true:false}>
                Synthesize
            </ModuleButton>
          </Module>
          <OpportunitiesContainer >
            {this.state.data.prompts.map(function(prompt, i){
              if(prompt.text != null){
                return <Opportunity>{prompt.text}
                  <CheatstormButton id={prompt._id}  onClick={this.handleCheatstormClick}>Cheatstorm</CheatstormButton>
                  <ViewButton>View Ideas</ViewButton>
                </Opportunity>
              }
            },this)
          }

          </OpportunitiesContainer>
        </MainWrapper>
      </Wrapper>
    );
  }
  return null;
  }
}

export default SingleProject;
