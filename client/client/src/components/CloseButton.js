import React, { Component } from 'react';
import '../css/main.css';
import styled from 'styled-components';



const Close = styled.button`
width:10px;
height:10px;
position:absolute;
top:10px;
right:10px;
font-size: 15px;
 font-weight: normal;
 font-style: normal;
 font-stretch: normal;
 line-height: 1.6;
 letter-spacing: 0.2px;
 background-color:red;


`;



class CloseButton extends Component {
  constructor(props) {
   super(props);
   this.handleClick = this.handleClick.bind(this);
 }

 handleClick(){
   this.props.history.push('/project/'+this.props.data._id);
 }

  render() {
    return (
      <Close>X</Close>
    );
  }

}



export default CloseButton;
