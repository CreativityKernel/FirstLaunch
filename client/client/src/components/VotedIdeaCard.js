import React from "react";
import styled from "styled-components";
import { Route , withRouter} from 'react-router-dom';

const Sticky = styled.div`
  margin: auto;
  width: 160px;
  height: 200px;
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
  transition: all 0.1s;
  cursor: default;
  overflow:scroll;
 

  &:hover {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    margin-top: 4px;
  }
`;

const Dot = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background : #ff5964;
  color:white;
`;

class IdeaCard extends React.Component {
 

  render() {
    
    return (
      <Sticky onClick = {()=>{this.handleClick()}}>
          
    <Dot>{this.props.voteCount}</Dot>
    {this.props.text}
          
      </Sticky>
    );
  }

  handleClick(){
    
}

}



export default IdeaCard;
