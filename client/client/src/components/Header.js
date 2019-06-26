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

const Wrapper = styled.div `
  height: 60px;
  border-top: solid 7px #ffe74c;
`;

class Header extends Component {
  render() {
    var user_id = localStorage.getItem("ck_user_id");
    return (
      <Wrapper>
        <Logo href="/">The creativity kernel</Logo>
      </Wrapper>
        // {!user_id ? (
        //   <GoogleLogin
        //     clientId="747584954544-1qnj29p7cp9s9i6ind8jegnracl1tihq.apps.googleusercontent.com"
        //     onSuccess={this.googleResponse}
        //     render={renderProps => (
        //       <button className="login_button" onClick={renderProps.onClick}>
        //         Log In
        //       </button>
        //     )}
        //   />
        // ) : (
        //   <div>
        //     <p className="profileName">
        //       {localStorage.getItem("ck_user_givenName")}
        //     </p>
        //     <img
        //       alt="user profile"
        //       className="profileImage"
        //       src={localStorage.getItem("ck_user_imageUrl")}
        //     />
        //   </div>
        // )}

    );
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
