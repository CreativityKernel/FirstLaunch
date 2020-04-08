import React, { Component } from "react";
import "../css/main.css";
import styled, { keyframes } from "styled-components";
import { devices } from "../devices"


const fade = keyframes`
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
`;

const slide = keyframes`
  from {
      opacity: 0;
      trasform: scale(2)
  }
  to {
      opacity: 1;
      trasform: scale(1)
      
  }
`;

const Wrapper = styled.div`
  position:relative;
`;

const Container = styled.div`
  width: ${props => props.size == cardSizes.DETAILED ? '10vw' : props.size == cardSizes.MEDIUM ? '3.4vw' : '1.5vw'};
  height: ${props => props.size == cardSizes.DETAILED ? '10vw' : props.size == cardSizes.MEDIUM ? '3.4vw' : '1.5vw'};
  border-radius: ${props => props.size == cardSizes.DETAILED ? '0.2vw' : props.size == cardSizes.MEDIUM ? '0.4vw' : '0.2vw'};
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => props.type == types.WISH ? '#d4d3ff' : props.type == types.LIKE ? '#ffe677' : '#fffc8d'} ;
  animation: ${slide} 1s ease;
  animation:${props => props.animation ? '' : 'none'};
  margin: ${props => props.size == cardSizes.DETAILED ? '0.5vw' : props.size == cardSizes.MEDIUM ? '0.7vw' : '0.4vw'};
  padding: ${props => props.size == cardSizes.DETAILED ? '1vw' : props.size == cardSizes.MEDIUM ? '0vw' : '0vw'};
  overflow: scroll;

  @media ${devices.mobile}{
    float: left;
    width: 31.3%;
    margin:1%;
    height: ${props => props.flexHeight ? 'auto' : '100px'};
  }
`;

const CloseButton = styled.button`
  width:2vw;
  height:2vw;
  border-radius:5vw;
  border:none;
  outline:none;
  position:absolute;
  top:0.2vw;
  right:0.2vw;
  background:white;
  color:#FF5964;
  font-size: 1vw;
  font-weight: bold;
  z-index:100;
  animation:${fade} 0.5s;


`;

const Text = styled.p`
font-size: 0.9vw;
font-weight: normal;
font-style: normal;
font-stretch: normal;
line-height: 1.4;
letter-spacing: 0.2px;
color: #2D333A;
text-align:left;
margin:auto;
animation:${fade} 0.5s;
`;

export const cardSizes = { DETAILED: 0, MEDIUM: 1, SMALL: 2 };
export const types = { DEFAULT: 0, WISH: 1, LIKE: 2 };

class ValueCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showClose: false
    };
  }
  render() {
    if (this.props.type < 1) alert(this.props.type);
    return <Wrapper
      onMouseEnter={() => { this.setState({ showClose: true }) }}
      onMouseLeave={() => { this.setState({ showClose: false }) }}>
      {this.props.removable == true && this.props.size == cardSizes.DETAILED && this.props.showContent && this.state.showClose && <CloseButton onClick={() => this.props.onRemoveCallBack()}>X</CloseButton>}
      <Container animation={this.props.animation} type={this.props.type} size={this.props.size}>
        {this.props.size == cardSizes.DETAILED && this.props.showContent && <Text>{this.props.data}</Text>}
      </Container></Wrapper>;
  }
}

export default ValueCard;
