import React, { Component } from "react";
import "../css/main.css";
import styled from "styled-components";
import {devices} from "../devices"
const Like = styled.div`
  width: 128px;
  height: ${props => (props.flexHeight ? "auto":"128px")};
  border-radius: 0.8px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffe677;
  font-size: 11.2px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.57;
  letter-spacing: 0.2px;
  color: #000000;

  margin: 5px;
  padding: 10px;
  display: inline-block;
  overflow: scroll;

  @media ${devices.mobile}{
    float: left;
    width: 31.3%;
    margin:1%;
    height: 100px;
  }
`;

class LikeCard extends Component {
  render() {
    return <Like>{this.props.data}</Like>;
  }
}

export default LikeCard;
