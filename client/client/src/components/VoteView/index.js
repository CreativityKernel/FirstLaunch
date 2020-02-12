import React, { Component } from "react";
import Header from "./../Header";
import styled from "styled-components";
import IdeaCard from "../../system/IdeaCard";
import Button from "../../system/Button";
import {devices} from "../../devices";

// Configuration
const max_votes = 5;

/**
 * DATA FORMATS
 * vote: {
 *  user_id: // string
 *  position: // { x, y }
 * }
 */

//const ContentContainer = styled.div`
//
//`;

const KernelHeader = styled.div`
      position: relative;
      margin:auto;
      width:100%
      height:60px;

      //@media ${devices.mobile} {
      //}
`;

const ContentContainer = styled.div`
  max-width: 690px;
  height: calc(100vh - 250px ); //footer = 100, top = 100, Help = 50px, HMW = 50px, 0px extra for padding
  margin: auto;
  overflow: scroll;
  padding-bottom: 50px;

  @media ${devices.mobile}{
    height:auto;
  }
`;

const VoteCanvas = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Placeholder = styled.div`
  justify-content: center;
  margin-top: 100px;
  color: #9b9b9b;
`;

const BottomWrapper = styled.div`  //This used to be "ModuleFooter"; I made it BottomWrapper to be consistent w/ all the other components
  width: 100%;
  height: 100px;
  margin: auto;
  position: sticky;
  bottom: 0;
  background-color: white;
  border-top: 1px solid #e3e5e9; //this is the grey line at the top of the footer

  //this pads the button
  padding: 30px 30px 40px;
  bottom: 0;
  left: 0;
  right: 0;

  @media ${devices.mobile}{
    position: sticky;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const FooterMetadata = styled.div`
  display: flex;
  flex: 1 0;
  justify-content: flex-end;
  margin-right: 30px;
`;

const FooterAction = styled.div`
  margin-right: 10px;
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

// TODO: refactor this out into a separate utility class
function getCursorPosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return { x, y };
}

export default class VoteView extends Component {
  state = { prompt: {}, selfVotes: [] , demoVotes: []};

  componentDidMount() {
    const url = `/prompts/${this.props.match.params.id}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.processData(data);
      });
  }

  // Helper function to process the data
  processData(prompt) {
    let selfVotes = [];
    let demoVotes = [];
    const selfId = localStorage.getItem("ck_user_id");
    if (!prompt.votes) {
      prompt.votes = {};
    }
    for (const ideaId in prompt.votes) {
      let ideaVotes = prompt.votes[ideaId];
      for (const vote of ideaVotes) {
        if (vote.user_id === selfId) {
          //selfVotes.push(ideaId);
        }
      }
    }

    this.setState({
      prompt,
      selfVotes,
      demoVotes
    });
  }

  renderIdeas(ideas, votes) {
    if (ideas.length === 0) {
      return <Placeholder>There are no ideas</Placeholder>;
    }
    return ideas.map((idea, i) => {
      let ideaVotes = [];
      let index = this.state.selfVotes.indexOf(idea._id);
      //alert(JSON.stringify(index));
      if(index > -1){
        ideaVotes.push(votes[index]);
      }
      return (
        <IdeaCard
          key={i}
          onClick={e => this.handleOnClick(e, idea)}
          votes={ideaVotes}
        >
          {idea.content.title}
        </IdeaCard>
      );
    });
  }

  handleOnClick(e, idea) {
    e.preventDefault();
    let selfId = localStorage.getItem("ck_user_id");
    if (!selfId) {
      selfId = "anonymous_user";
    }
    const cursor = getCursorPosition(e.currentTarget, e);

    let { selfVotes, prompt = {} , demoVotes } = this.state;
    let voteIndex = selfVotes.indexOf(idea._id);
    const hasVoted = voteIndex >= 0;

    if (hasVoted) {
      // Remove from self
      selfVotes.splice(voteIndex, 1);

      // Remove from object
      let ideaVotes = prompt.votes[idea._id];
      let index = ideaVotes.findIndex(vote => vote.user_id === selfId);
      ideaVotes.splice(index, 1);
      prompt.votes[idea._id] = ideaVotes;
      fetch(`/prompts/${prompt._id}/ideas/${idea._id}/vote`, {
        method: "DELETE",
        body: JSON.stringify({
          user_id: selfId
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Mode: "CORS"
        }
      })
        .then(response => response.json())
        .then(data => {
          //this.processData(data);
        });
    } else if (selfVotes.length >= max_votes) {
      // Already at max vote, do nothing
      return;
    } else {
      // otherwise just add the vote
      const vote = {
        user_id: selfId,
        position: cursor
      };
      selfVotes.push(idea._id);
      demoVotes.push(vote);
      if (!prompt.votes[idea._id]) {
        prompt.votes[idea._id] = [];
      }
      prompt.votes[idea._id].push(vote);

      fetch(`/prompts/${prompt._id}/ideas/${idea._id}/vote`, {
        method: "PUT",
        body: JSON.stringify(vote),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Mode: "CORS"
        }
      })
        .then(response => response.json())
        .then(data => {
           //this.processData(data);
        });
    }
    this.setState({ prompt, selfVotes, demoVotes });
  }

  handleBack = () => {
    this.props.history.push(`/project/${this.state.prompt.project}`);
  };

  render() {
    const { selfVotes } = this.state;
    const { text = "", ideas = [], votes = {} } = this.state.prompt;
    const demoVotes = this.state.demoVotes;
    return (
      <div>
        <KernelHeader>
          <Header />
        </KernelHeader>

        <Help>
          <HelpInstructions>
            <ul>
              <li>Which ideas best answer the “How might we...” question below?</li>
              <li><strong>Click</strong> on your favorite ideas to cast votes. <strong>Click again</strong> to un-vote.</li>
              <li>When you are finished, press <strong>submit</strong>.</li>
            </ul>
          </HelpInstructions>
        </Help>

        <HelpTitle>
          How might we <strong>{text+"?"}</strong>
        </HelpTitle>

        <ContentContainer>
          <VoteCanvas>{this.renderIdeas(ideas, demoVotes)}</VoteCanvas>
        </ContentContainer>

        <BottomWrapper>
          <FooterContent>
            <FooterMetadata>
              Votes left: {max_votes - selfVotes.length}
            </FooterMetadata>
            <FooterAction>
              <Button onClick={this.handleBack}>Submit</Button>
            </FooterAction>
          </FooterContent>
        </BottomWrapper>

      </div>
    );
  }
}
