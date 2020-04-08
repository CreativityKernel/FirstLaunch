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

const Container = styled.div`
  width: ${props => props.expand ? '68vw' : '2.5vw'};
  height: ${props => props.expand ? '4.6vw' : '2.5vw'};
  border-radius: ${props => props.expand ? '0.6vw' : '1.5vw'};
//   box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffe74c;
  cursor: pointer;
  position:absolute;
  right:2vw;
  top:2vh;
  z-index:100;
  transition: width 0.7s 0.2s, height 0.3s;
  display:flex;
  justify-content:space-around;
`;

const Text = styled.p`
font-size: 1.2vw;
font-weight: normal;
font-style: normal;
font-stretch: normal;
letter-spacing: 0.2px;
color: #2D333A;
text-align:left;
min-width:50vw;
padding:0;
margin:auto 0;
animation: ${fade} 0.5s;
`;

const HelpButton = styled.button`
    width:auto;
    border:none;
    background:none;
    font-size: 1.2vw;
    font-weight: bold;
    outline:none;
    animation: ${fade} 0.5s;
`;

const CollapseButton = styled.button`
    width:auto;
    border:none;
    background:none;
    font-size: 1vw;
    font-weight: bold;
    outline:none;
    text-decoration: underline;
    animation: ${fade} 0.5s;
`;

export const cardSizes = { DETAILED: 0, MEDIUM: 1, SMALL: 2 };

export const types = { DEFAULT: 0, WISH: 1, LIKE: 2 };


class HelpZone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: true,
            expandContent: true
        };
    }

    render() {
        return <Container
            expand={this.state.expand}>
            {!this.state.expand && !this.state.expandContent && <HelpButton onClick={() =>{this.setState({ expand:true }); setTimeout(()=>{this.setState({ expandContent:true })},1000)}}>?</HelpButton>}
            {this.state.expand && this.state.expandContent &&<Text>Drag the note into the group where it seems to belong. Click a group to edit it.</Text>}
            {this.state.expand &&this.state.expandContent && <CollapseButton onClick={(ev) => { this.setState({ expand: false}); setTimeout(()=>{this.setState({ expandContent:false })},1000)}}>Dismiss</CollapseButton>}

        </Container>;
    }
}

export default HelpZone;
