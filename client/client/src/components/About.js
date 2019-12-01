// This is the full grid of all existing projects

import React, { Component } from "react";
import styled from "styled-components";
import { devices } from "../devices"


const Wrapper =styled.div`{
  max-width: 1000px;
  margin: 10px auto;
  //background-color: #bbbbbb;

  @media ${devices.mobile} {
    width:95%
  }
    h1 {
      font-size: 34px;
      //font-family: /*"Bookman Old Style",*/ "HelveticaNeue-Bold", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.3px;
      color: #000000;

      @media ${devices.mobile} {
        font-size: 24px;
      }
    }
`;

//PERHAPS THIS SHOULD BE A UNIVERSAL CSS HeaderContainer
const AboutHeaderContainer = styled.div`
      position: relative;
      margin:auto;
      width:100%
      margin: 1%; // this matches the margin around all the project tiles
      //background-color: #bbbbbb;

      margin-top: 60px;

      //@media ${devices.mobile} {
      //}
`;



class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("/projects")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }



  render() {
    if (this.state.data != null) {
      return (
        <Wrapper>

          {/*
          <AboutHeaderContainer>
            <h1>About</h1>
          </AboutHeaderContainer>
          */}


          <section class="section-basic">
            <div class="wws-container w-container">
            <h3 class="preheading">the Method Modules</h3>

              <div class="wws-div">
                <div class="div-block-5">
                  <p class="copy">
                    So far the Kernel consists of four design methods, roughly corresponding to the popular “<a href="https://www.designcouncil.org.uk/news-opinion/what-framework-innovation-design-councils-evolved-double-diamond" target="newwin">double-diamond</a>” design process. As more people get involved developing new design modules in the future we will continue to add them.
                  </p>
                </div>
              </div>


              <div class="wws-div">
                <div class="div-block-5">
                  <h2 class="h2-to-h2">Module 1: Likes and Wishes</h2>
                  <p class="copysmall">This module lets users express what they like and wish about a given topic. For now this is an easy way to get projects started. In the future we will allow users to add likes and wishes in response to other objects (e.g. ideas), and also add new modules allowing users to capture and import other kinds of design research data.</p>
                </div>
                <img src="http://www.haakonfaste.com/creativitykernel/phase1.jpg" width="300" alt="" class="image-centered"/>

              </div>

              <div class="wws-div">
                <div class="div-block-5">
                  <h2 class="h2-to-h2">Module 2: Opportunities</h2>
                  <p class="copysmall">This module lets users synthesize their likes and wishes to identify potential opportunities for the project to address. Synthesis is a complex process, and in the future we will add modules that simplify it by breaking it down into smaller intuitive steps.</p>
                </div>
                <img src="http://www.haakonfaste.com/creativitykernel/phase2.jpg" width="300" alt="" class="image-centered"/>
              </div>
              <div class="wws-div">
                <div class="div-block-5">
                  <h2 class="h2-to-h2">Module 3: Cheatstorming</h2>
                  <p class="copysmall">This module lets users generate new ideas in response to a brainstorming prompt. We call it cheatstorming because, unlike conventional brainstorming, it involves "stealing" ideas from from previous projects as a source of inspiration to get started.</p>
                </div>
                <img src="http://www.haakonfaste.com/creativitykernel/phase3.jpg" width="300" alt="" class="image-centered"/>
              </div>
              <div class="wws-div">
                <div class="div-block-5">
                  <h2 class="h2-to-h2">Module 4: Voting</h2>
                  <p class="copysmall">This module lets users vote for their favorite ideas. For now, they can vote on their five favorite ideas each time they vote. Users can then see all of the most popular ideas, start new projects in the kernel explore them further, or implement them in real life.</p>
                </div>
                <img src="http://www.haakonfaste.com/creativitykernel/phase4.jpg" width="300" alt="" class="image-centered"/>
              </div>
            </div>
          </section>
          <img width = "100%" src= "http://www.haakonfaste.com/creativitykernel/ck_diagram_full.jpg" />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

        </Wrapper>
      );
    }

    return null;
  }
}

export default About;
