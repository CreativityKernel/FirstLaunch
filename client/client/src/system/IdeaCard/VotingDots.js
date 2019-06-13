import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Dot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  background: ${props => stringToColor(props.userId)};
`;

const colors = ["#2FBC8F", "#17195B", "#84138B", "#A03381", "#F3B1EB"];

function hashCode(str) {
  return str
    .split("")
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    );
}

function stringToColor(hash) {
  const number = hashCode(hash);
  const index = Math.abs(number % colors.length);
  return colors[index];
}

class VotingDots extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  };

  render() {
    const { userId, position } = this.props;
    return (
      <Dot style={{ top: position.y, left: position.x }} userId={userId} />
    );
  }
}

export default VotingDots;
