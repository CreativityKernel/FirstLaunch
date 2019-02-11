import React, { Component } from 'react';
import '../css/main.css';

class LikeCard extends Component {

  constructor(props) {
   super(props);
 }

  render() {
    return (
      <div draggable="true" className="like_card">
        <p>{this.props.data}</p>
      </div>
    );
  }
}

export default LikeCard;
