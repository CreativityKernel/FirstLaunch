import React, { Component } from "react";
import styled from "styled-components";
import IdeaCard from "../../system/IdeaCard";
import Button from "../../system/Button";

// Configuration
const max_votes = 5;

/**
 * DATA FORMATS
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
 *  idea_id: // string
 *  user_id: // string
 * }
 */

const ModuleFooter = styled.div`
  position: absolute;
  padding: 20px;
  bottom: 0;
`;

export default class VoteView extends Component {
  state = { ideas: [], votes: [] };

  componentDidMount() {
    const url = `/prompts/${this.props.match.params.id}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // this.setState({ data });
        console.log(data);
        this.processData(data);
      });
  }

  // Helper function to process the data
  processData(data) {
    const votes = {};
    // TODO process data
    const selfId = localStorage.getItem("ck_user_id");

    this.setState({
      ideas: data.ideas,
      text: data.text,
      votes: votes,
      selfVotes: []
    });
  }

  handleOnClick(idea) {
    let { selfVotes, votes } = this.state;
    let voteIndex = selfVotes.findIndex(vote => vote.idea_id === idea._id);
    const hasVoted = voteIndex >= 0;
    const selfId = localStorage.getItem("ck_user_id");

    if (!hasVoted && selfVotes.count >= max_votes) {
      // Already at max vote, do nothing
      return;
    } else if (hasVoted) {
      // Remove from self
      selfVotes.splice(voteIndex, 1);
      // Remove from object
      let ideaVotes = votes[idea._id];
      let index = ideaVotes.findIndex(vote => vote.user_id === selfId);
      ideaVotes.splice(index, 1);
      votes[idea._id] = ideaVotes;
    } else {
      const vote = {
        idea_id: idea._id,
        user_id: selfId
      };
      selfVotes.push(vote);
      if (!votes[idea._id]) {
        votes[idea._id] = [];
      }
      votes[idea._id].push(vote);
    }
    this.setState({ votes, selfVotes });

    // TODO: Update the service
  }

  render() {
    const { text = "", ideas = [], votes = {} } = this.state;
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
                onClick={() => this.handleOnClick(idea)}
                votes={ideaVotes}
              >
                {idea.content.title}
              </IdeaCard>
            );
          })}
        </div>
        <ModuleFooter>
          Number of Votes <Button>Done</Button>
        </ModuleFooter>
      </div>
    );
  }
}
