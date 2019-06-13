import React, { Component } from "react";
import styled from "styled-components";
import IdeaCard from "../../system/IdeaCard";
import Button from "../../system/Button";

// Configuration
const max_votes = 5;

/**
 * DATA FORMATS
 * vote: {
 *  user_id: // string
 *  position: // { x, y }
 * }
 */

const ContentContainer = styled.div`
  padding-bottom: 110px;
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

const ModuleFooter = styled.div`
  position: absolute;
  padding: 30px 30px 40px;
  bottom: 0;
  left: 0;
  right: 0;
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

// TODO: refactor this out into a separate utility class
function getCursorPosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return { x, y };
}

export default class VoteView extends Component {
  state = { prompt: {}, selfVotes: [] };

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
    // TODO process data
    const selfId = localStorage.getItem("ck_user_id");
    if (!prompt.votes) {
      prompt.votes = {};
    }
    for (const ideaId in prompt.votes) {
      let ideaVotes = prompt.votes[ideaId];
      for (const vote of ideaVotes) {
        if (vote.user_id === selfId) {
          selfVotes.push(ideaId);
        }
      }
    }

    this.setState({
      prompt,
      selfVotes
    });
  }

  renderIdeas(ideas, votes) {
    if (ideas.length === 0) {
      return <Placeholder>There are no ideas</Placeholder>;
    }
    return ideas.map((idea, i) => {
      let ideaVotes = votes[idea._id] || [];
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
    const selfId = localStorage.getItem("ck_user_id");
    const cursor = getCursorPosition(e.currentTarget, e);

    let { selfVotes, prompt = {} } = this.state;
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
          this.processData(data);
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
          this.processData(data);
        });
    }
    this.setState({ prompt, selfVotes });
  }

  render() {
    const { selfVotes } = this.state;
    const { text = "", ideas = [], votes = {} } = this.state.prompt;
    return (
      <div>
        <h2 className="text_center">
          How might we <strong>{text}</strong>
        </h2>
        <ContentContainer>
          <VoteCanvas>{this.renderIdeas(ideas, votes)}</VoteCanvas>
        </ContentContainer>
        <ModuleFooter>
          <FooterContent>
            <FooterMetadata>
              Votes left: {max_votes - selfVotes.length}
            </FooterMetadata>
            <FooterAction>
              <Button>Done</Button>
            </FooterAction>
          </FooterContent>
        </ModuleFooter>
      </div>
    );
  }
}
