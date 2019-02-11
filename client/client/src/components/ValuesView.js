import React, { Component } from 'react';
import '../css/main.css';
import LikeCard from './LikeCard'
import WishCard from './WishCard'

class ValuesView extends Component {

  constructor(props) {
   super(props);
 }

  render() {
    return (
      <div>
        <h2 className="text_center">What do you like and wish about the <strong>{this.props.project_data.Title}</strong>?</h2>

      <div className="value_container">
        {this.props.project_data.Likes.map(function(like, i){
          return <LikeCard data={like} key={i} />;
        })}

        {this.props.project_data.Wishes.map(function(wish, i){
          return <WishCard data={wish} key={i} />;
        })}

      </div>
      </div>
    );
  }
}

export default ValuesView;
