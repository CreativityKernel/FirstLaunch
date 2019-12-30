import React, { Component } from "react";
import styled from "styled-components";
import "../css/main.css";
import GoogleLogin from "react-google-login";
import {devices} from "../devices"

const Logo = styled.a`
  position: absolute;
  left: 10px;
  top: 30px;
  border: none;
  font-family: "Work Sans", sans-serif;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  color: #000000;
  outline: none;
  text-decoration: none;

  @media ${devices.mobile}{
    font-size: 12px;
  }
`;

{/*THIS IS THE BOX UNDERNEATH THE HEADER */}
const Wrapper = styled.div `
  height: 60px;
  border-top: solid 7px #ffe74c; //this is the yellow strip at the top of the header
  position: fixed;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: auto;
  border-bottom: 1px solid #e3e5e9; //this is the grey line at the bottom of the header
  background-color: white;
  z-index: 1;

  //@media ${devices.mobile}{
  //  display:none;
  //}
`;

const KernelLogo = styled.div `
  color: #000;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  float: left;
  padding-top: 15px;
  position: relative;

  padding-top: 15px;
  padding-left: 15px;
  padding-right: 10px;
  padding-bottom: 16px;
  border-bottom: 4px solid transparent;
  text-decoration: none;
`;

class Header extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {data: null}; // PIYUM HAD THIS IN HERE
  }

  componentDidMount() {
    fetch("/all_projects")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  handleClick(event) {
    this.props.onChangeNav(event);
  }

  render() {
    var user_id = localStorage.getItem("ck_user_id");

    const whichtab = this.props.tab_number;

    if (whichtab == 1){
      return (
        <Wrapper>

          <KernelLogo>
            <strong>The Creativity Kernel</strong>
          </KernelLogo>

          <nav role="navigation" class="nav-menu"> {/*<nav role="navigation" class="nav-menu w-nav-menu">*/}
            <span onClick={() => this.handleClick(1)} class="nav-link-1 w--current ">Home</span>
            <span onClick={() => this.handleClick(2)} class="nav-link-2 ">Projects</span>
            <span onClick={() => this.handleClick(3)} class="nav-link-3 ">About</span>
          </nav>
        </Wrapper>
      );
    } else if (whichtab == 2){
      return (
        <Wrapper>
          <KernelLogo>
            <strong>The Creativity Kernel</strong>
          </KernelLogo>

          <nav role="navigation" class="nav-menu"> {/*<nav role="navigation" class="nav-menu w-nav-menu">*/}
            <span onClick={() => this.handleClick(1)} class="nav-link-1 ">Home</span>
            <span onClick={() => this.handleClick(2)} class="nav-link-2 w--current ">Projects</span>
            <span onClick={() => this.handleClick(3)} class="nav-link-3 ">About</span>
          </nav>
          {/*<span>Welcome {this.props.username}! tab_number = {this.props.tab_number}</span>*/}
        </Wrapper>
      );
    } else if (whichtab == 3){
      return (
        <Wrapper>
          <KernelLogo>
            <strong>The Creativity Kernel</strong>
          </KernelLogo>

          <nav role="navigation" class="nav-menu"> {/*<nav role="navigation" class="nav-menu w-nav-menu">*/}
            <span onClick={() => this.handleClick(1)} class="nav-link-1 ">Home</span>
            <span onClick={() => this.handleClick(2)} class="nav-link-2 ">Projects</span>
            <span onClick={() => this.handleClick(3)} class="nav-link-3 w--current ">About</span>
          </nav>
        </Wrapper>
      );
    }
  }

  googleResponse = gresponse => {
    console.log(gresponse.profileObj);
    fetch("/auth/", {
      method: "POST",
      body: JSON.stringify(gresponse.profileObj),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Mode: "CORS"
      }
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("ck_user_id", data._id);
        localStorage.setItem("ck_user_givenName", data.givenName);
        localStorage.setItem("ck_user_imageUrl", data.imageUrl);
        this.forceUpdate();
      });
  };
}

export default Header;
