import React, { Component } from "react";
import "../css/main.css";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../devices"


const SquareCard = styled.div`
      float: left;
      width: 31.3%;
      margin: 1%; //this is outside the squares
      padding: 10px; //this is inside the squares
      height: 320px; //350px;
      //box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
      border: solid 0.5px #979797;
      position: relative;
      overflow:scroll;
      //background-color: #eeeeee; // this is inside the square

      h2{
        //font-family: "HelveticaNeue-Bold", Helvetica, Arial, "Lucida Grande", sans-serif;
        font-size: 18px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.2;
        letter-spacing: 0.2px;
        color: black; //color: #1e3888;
        padding-left: 10px
        text-transform: capitalize;
      }

      p{
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.6;
        letter-spacing: 0.4px;
        padding-left: 10px
        padding-bottom: 10px;
      }

      @media ${devices.mobile} {
        width:100%
          margin:0%;
          margin-bottom:10px;
      }

      &:hover {
        //box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
        //transform: scale(1.01);
        background-color: #eeeeee;
        //box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
        cursor: pointer;
      }
`;

const ListCard = styled.div`
      float: left;
      width: 100%;
      height: 60px; //350px;
      position: relative;

      h2{
        //font-family: "HelveticaNeue-Bold", Helvetica, Arial, "Lucida Grande", sans-serif;
        font-size: 18px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.2;
        letter-spacing: 0.2px;
        color: black; //color: #1e3888;
        padding-left: 10px
        text-transform: capitalize;
      }

      p{
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        //line-height: 1.6;
        letter-spacing: 0.4px;
        padding-left: 10px
        //padding-bottom: 10px;
      }

      @media ${devices.mobile} {
        width:100%
          margin:0%;
          margin-bottom:10px;
      }

      &:hover {
        //box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
        //transform: scale(1.01);
        background-color: #eeeeee;
        //box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.3);
        cursor: pointer;
      }
`;

const MetadataDisplay_SquareCard = styled.div`
  width: 90%;
  bottom: 15px;
  padding-left: 10px;
  position: absolute;

  p {
    display: inline-block;
  }

  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  color: #5e6165;
  display: inline;

  @media ${devices.mobile}{
    font-size: 12px;
    line-height: 1.5;
  }
`;

const MetadataDisplay_ListCard = styled.div`
  width: 30%;
  //bottom: 15px;
  padding-left: 10px;
  position: absolute;

  p {
    display: inline-block;
  }

  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  color: #5e6165;
  display: inline;

  @media ${devices.mobile}{
    font-size: 12px;
    line-height: 1.5;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  float: left;
  padding: 5px;
`;

const ProfileImage = styled.img`
  width: 15%;
  background-color: gray;
  border-radius: 100px;
`;

const TextWrapper = styled.div`
  marging-left: 40%;
  padding: 10px;
`;

class ProjectCard extends Component {
  constructor(props) {
    super(props);

    //haakon added
    this.state = {
      data: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push("/project/" + this.props.data._id);
  }

  time_elapsed_string(datetime) {
    var full = false;
    var now = new Date();
    var ago = new Date(datetime);
    var diff = now => diff(ago);

    var w;
    var d;

    //diff => w = floor(diff=>d / 7);
    //diff => d -= diff => w * 7;

    /*
    var string = array(
        'y' => 'year',
        'm' => 'month',
        'w' => 'week',
        'd' => 'day',
        'h' => 'hour',
        'i' => 'minute',
        's' => 'second',
    );

    foreach (string as $k => &$v) {
        if (diff => k) {
            var v = diff => k . ' ' . v . (diff => k > 1 ? 's' : '');
        } else {
            unset($string[k]);
        }
    }

    */
    this.props.data.nowDate = "monkey";

    //if (!full) string.slice(0, 1);
    //return now; //? implode(', ', $string) . ' ago' : 'just now';

    return (Date());
  }

  formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
  }

  render() {
    var date;
    if (this.state.data != null) {
      //date = new Date(this.state.data.createdDate);
    }
    return (
      <SquareCard onClick={this.handleClick}>
        <h2>{this.props.data.title}</h2>
        <p>{this.props.data.description}</p>

        <MetadataDisplay_SquareCard>
          Created {this.formatDate(this.props.data.createdDate)}
        </MetadataDisplay_SquareCard>

      </SquareCard>
    );
  }
}

export default withRouter(ProjectCard);
