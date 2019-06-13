import React, { Component } from "react";
import "../css/main.css";
import Button from "../system/Button";
import styled from "styled-components";
import creativityKernel from "../CKConstants";

const Wrapper = styled.div`
 margin:auto
 max-width:1100px;
`;

const MainWrapper = styled.div`
  margin: auto;
  max-width: 700px;
`;

const Title = styled.h2`
  font-family: "Work Sans", sans-serif;
  font-size: 34px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  color: #000000;
  text-transform: capitalize;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: 0.5px;
  color: #000000;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const StartedOn = styled.p`
  font-size: 15px;
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
  height: 100px;
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
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${props => (props.disabled ? "#fafafa" : "white")};
`;

const ModuleName = styled.p`
  font-size: 15px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.5px;
  color: ${props => (props.disabled ? "#979797" : "#000000")};
  position: absolute;
  top: 50%;
  left: 130px;
`;

const ModuleButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: center;
  color: ${props => (props.disabled ? "#979797" : "#fafafa")};
  position: absolute;
  top: 50%;
  right: 0;
  width: 150px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px ${props => (props.disabled ? "#b9b9b9;" : "#1e3888")};
  background-color: ${props => (props.disabled ? "#fafafa" : "#1e3888")};
  outline: none;
`;

const OpportunitiesContainer = styled.div`
  margin-left: 110px;
  margin-right: 20px;
  margin-top: 35px;
`;

const Opportunity = styled.div`
  position: relative;
  margin: 20px;
  width: 100%;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #1e3888;
  border-radius: 5px;
  min-height: 100px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const OpportunityText = styled.div`
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.5px;
  margin-left: 2%;
  margin-top: 2%;
  margin-right: 20px;
`;

const OpportunityActions = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;

  & > button {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

class SingleProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.handleClickValues = this.handleClickValues.bind(this);
    this.handleClickOpportunities = this.handleClickOpportunities.bind(this);
    this.handleCheatstormClick = this.handleCheatstormClick.bind(this);
    this.handleIdeasViewClick = this.handleIdeasViewClick.bind(this);
  }

  handleClickValues() {
    this.props.history.push("/valuesinput/" + this.state.data._id);
  }

  handleClickOpportunities() {
    this.props.history.push("/opportunitiesinput/" + this.state.data._id);
  }

  handleCheatstormClick(ev) {
    this.props.history.push("/cheatstorm/" + ev.target.id);
  }

  handleIdeasViewClick(ev) {
    this.props.history.push("/ideasview/" + ev.target.id);
  }

  handleVoteClick = id => {
    if (!id) {
      console.error("There is no Id supplied.");
      return;
    }
    this.props.history.push(`/vote/${id}`);
  };

  componentDidMount() {
    console.log("/projects/" + this.props.match.params.id);
    fetch("/projects/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    if (this.state.data != null) {
      var date = new Date(this.state.data.createdDate);
      var valueCount =
        this.state.data.wishes.length + this.state.data.likes.length;

      return (
        <Wrapper>
          <MainWrapper>
            <Title>{this.state.data.title}</Title>
            <Description>{this.state.data.description}</Description>
            <StartedOn>Started On: {date.toLocaleString()}</StartedOn>
            <SegmentHeader />
            <Module>
              <Progress>
                {this.state.data.wishes.length + this.state.data.likes.length}
              </Progress>
              <ModuleName>Likes and Wishes</ModuleName>
              <ModuleButton onClick={this.handleClickValues}>ADD</ModuleButton>
            </Module>
            <Module>
              <Progress
                disabled={
                  valueCount < creativityKernel.valuesLowerLimit ? true : false
                }
              >
                {this.state.data.prompts.length}
              </Progress>
              <ModuleName
                disabled={
                  valueCount < creativityKernel.valuesLowerLimit ? true : false
                }
              >
                Opportunities
              </ModuleName>
              <ModuleButton
                onClick={this.handleClickOpportunities}
                disabled={
                  valueCount < creativityKernel.valuesLowerLimit ? true : false
                }
              >
                Synthesize
              </ModuleButton>
            </Module>
            <OpportunitiesContainer>
              {this.state.data.prompts.map(function(prompt, i) {
                if (prompt.text != null) {
                  return (
                    <Opportunity key={prompt._id}>
                      <OpportunityText>{prompt.text}</OpportunityText>
                      <OpportunityActions>
                        <Button
                          id={prompt._id}
                          onClick={this.handleCheatstormClick}
                        >
                          Cheatstorm
                        </Button>
                        <Button
                          id={prompt._id}
                          onClick={this.handleIdeasViewClick}
                        >
                          View Ideas
                        </Button>
                        <Button
                          onClick={() => {
                            this.handleVoteClick(prompt._id);
                          }}
                        >
                          Vote
                        </Button>
                      </OpportunityActions>
                    </Opportunity>
                  );
                }
                return null;
              }, this)}
            </OpportunitiesContainer>
          </MainWrapper>
        </Wrapper>
      );
    }
    return null;
  }
}

export default SingleProject;
