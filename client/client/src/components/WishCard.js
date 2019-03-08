import React, { Component } from 'react';
import '../css/main.css';
import styled from 'styled-components'

const Wish = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 0.8px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #d4d3ff;
  font-size: 11.2px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.57;
  letter-spacing: 0.2px;
  color: #000000;

  margin: 5px;
  padding: 10px;
  display:inline-block;
  overflow:scroll;

`;

class WishCard extends Component {

  constructor(props) {
   super(props);
 }

  render() {
    return (
      <Wish>
        {this.props.data}
      </Wish>
    );
  }
}

export default WishCard;
