import React, { Component } from "react";
import styled from "styled-components";
import {devices} from "../devices.js"



const DotWrapper = styled.div`
  width: 15vw;
  height: 2vw;
  margin:50vh auto;
  display:flex;
  justify-content:space-around;

  @media ${devices.mobile} {
    width: 30vw;
    height: 3vw;
  }
`;

const Dot = styled.div`
  width:${props => props.selected ? 1.1 : 1}vw;
  height:${props => props.selected ? 1.1 : 1}vw;
  background-color:${props => props.selected ?  '#ffe74c' : '#DCDCDC'};
  border-radius:5vw;

  @media ${devices.mobile} {
    width:${props => props.selected ? 2.2 : 2}vw;
    height:${props => props.selected ? 2.2 : 2}vw;
  }
`;




var intervelRef;
const DOT_COUNT = 5;


export default class LoadingWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }


  componentDidMount() {
    this.setState({ index: 0 });
    intervelRef = setInterval(this.runLoadingWidgetSequence, 400)
  }
  
  runLoadingWidgetSequence = () => {
    var index = this.state.index;
    index++;
    if (index > DOT_COUNT) {
      index = 0;
    }
    this.setState({ index: index });
    //else (clearInterval(intervelRef))
  }

  render() {
    return (

        <DotWrapper>
          {this.renderLoadingWidgetDots()}
        </DotWrapper>

    )
    return null;
  }

  renderLoadingWidgetDots() {
    let dots = []
    let selected = false;
    let index = this.state.index;
    for (let i = 0; i < DOT_COUNT; i++) {
      selected = i == index;
      dots.push(<Dot selected={selected}></Dot>)
    }
    return dots;
  }
}

