import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import VotingDots from "./VotingDots";

const Sticky = styled.div`
  margin: auto;
  width: 160px;
  height: 160px;
  border-radius: 1px;
  border: none;
  background-color: ${props =>
    props.wish ? "#d4d3ff" : props.like ? "#ffe677" : "#fffc8d"};
  resize: none;
  outline: none;
  overflow: visible;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.2px;
  color: #000000;
  padding: 10px;
  margin: 5px;
  position: relative;
  flex: 0 160px;
  transition: all 0.1s;
  cursor: default;
  user-select: none;

  &:hover {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    margin-top: 4px;
  }
`;

class IdeaCard extends React.Component {
  static propTypes = {
    votes: PropTypes.array.isRequired
  };

  render() {
    const { children, votes, ...props } = this.props;
    return (
      <Sticky {...props}>
        {votes.map((vote, i) => (
          <VotingDots key={i} userId={vote.user_id} position={vote.position} />
        ))}
        {children}
      </Sticky>
    );
  }
}

export default IdeaCard;
