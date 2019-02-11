import React, { Component } from 'react';
import '../css/main.css';

class WishCard extends Component {

  constructor(props) {
   super(props);
 }

  render() {
    return (
      <div className="wish_card">
        <p>{this.props.data}</p>
      </div>
    );
  }
}

export default WishCard;
