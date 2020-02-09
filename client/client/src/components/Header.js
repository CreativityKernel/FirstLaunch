import React, { Component } from "react";
import "../css/main.css";
import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import { devices } from "../devices"

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

  /*
  componentDidMount() {
    fetch("/projects")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  */

  //handleClick(event) {
  //  this.props.onChangeNav(event); // this is not a function
  //}

  handleClick(e) {
    //OLD
    //this.setState({nav_location: e})
    //this.state.nav_location = e;

    //ALL THAT SHOULD BE NEEDED
    //this.props.history.push("/" + this.props.data.); //push("/project/" + this.props.data._id);

    //WITH BRANCH
    if (e==1) return(this.props.history.push("/"));
    else if (e==2) this.props.history.push("/all_projects");
    else if (e==3) this.props.history.push("/about/");
  }



  render() {
    var user_id = localStorage.getItem("ck_user_id");

    if (this.props.location.pathname == "/"){
      return (
        <Wrapper>

          <KernelLogo>
            <span onClick={() => this.handleClick(1)} class="go-home "><strong>The Creativity Kernel</strong></span>
          </KernelLogo>

          <nav role="navigation" class="nav-menu">
            <span onClick={() => this.handleClick(1)} class="nav-link-1 w--current ">Home</span>
            <span onClick={() => this.handleClick(2)} class="nav-link-2 ">Projects</span>
            <span onClick={() => this.handleClick(3)} class="nav-link-3 ">About</span>
          </nav>

        </Wrapper>
      );
    } else if (this.props.location.pathname == "/about/"){
      return (
        <Wrapper>
          <KernelLogo>
            <span onClick={() => this.handleClick(1)} class="go-home "><strong>The Creativity Kernel</strong></span>
          </KernelLogo>

          <nav role="navigation" class="nav-menu">
            <span onClick={() => this.handleClick(1)} class="nav-link-1 ">Home</span>
            <span onClick={() => this.handleClick(2)} class="nav-link-2 ">Projects</span>
            <span onClick={() => this.handleClick(3)} class="nav-link-3 w--current ">About</span>
          </nav>
        </Wrapper>
      );

      //I'm putting everything on ELSE!
    } else{
      return (
        <Wrapper>
          <KernelLogo>
            <span onClick={() => this.handleClick(1)} class="go-home "><strong>The Creativity Kernel</strong></span>
          </KernelLogo>

          <nav role="navigation" class="nav-menu">
            <span onClick={() => this.handleClick(1)} class="nav-link-1 ">Home</span>
            <span onClick={() => this.handleClick(2)} class="nav-link-2 w--current ">Projects</span>
            <span onClick={() => this.handleClick(3)} class="nav-link-3 ">About</span>
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

//export default Header;   //original. Below is new.
export default withRouter(Header);

