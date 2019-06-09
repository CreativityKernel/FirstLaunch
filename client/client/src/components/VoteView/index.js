import React, { Component } from "react";
import styled from "styled-components";
import IdeaCard from "../../system/IdeaCard";
import Button from "../../system/Button";

// Configuration
const max_votes = 5;

/**
 * DATA FORMATS
 *
 *
 * idea: {
 *  _id: // string
 *  content: {
 *    metaTags: [],
 *    title: // string
 *  }
 *  created_date: // date string
 *  prompt_id: // string
 * }
 *
 * vote: {
 *  user_id: // string
 *  position: // { x, y }
 * }
 */

const ModuleFooter = styled.div`
  position: absolute;
  padding: 20px;
  bottom: 0;
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
    } else if (selfVotes.count >= max_votes) {
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
        <div>
          {ideas.map((idea, i) => {
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
          })}
        </div>
        <ModuleFooter>
          Number of Votes: {max_votes - selfVotes.length} <Button>Done</Button>
        </ModuleFooter>
      </div>
    );
  }
}
