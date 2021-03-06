
import React, { Component } from "react";
import Header from "./Header";
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

const phase1 = require('../images/phase1.jpg');
const phase2 = require('../images/phase2.jpg');
const phase3 = require('../images/phase3.jpg');
const phase4 = require('../images/phase4.jpg');
const diagram = require('../images/ck_diagram_full.jpg');

const KernelHeader = styled.div`
      position: relative;
      margin:auto;
      width:100%
      height:60px;

      //@media ${devices.mobile} {
      //}
`;


class About extends Component {
  constructor(props) {
    super(props);
    //this.handleRefresh = this.handleRefresh.bind(this);

    this.state = {
      data: null
    };

    //NAVbar code to make sure the reload is correct
    /*
    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.handleRefresh(3);
        //alert( "This page is reloaded" );

      } else {
        //alert( "This page is not reloaded");
      }
    }
    */
  }

  componentDidMount() {
    fetch("/projects")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

/*
  handleRefresh(event) {
    alert('Page re-loaded and re-directing Nav to (' + event + ').');
    //this.props.onChangeNav(event);   // event.target.value

    //this.props.history.push("/home/");
  }
*/

  render() {
    if (this.state.data != null) {
      return (
        <Wrapper>

          <KernelHeader>
            <Header />
          </KernelHeader>

          <section class="section-basic">
            <div class="modules-container w-container">
            <h3 class="preheading">the Method Modules</h3>

              <div class="modules-div">
                <div class="about-block">
                  <p class="copy">
                    So far the Kernel consists of four design methods, roughly corresponding to the popular “<a href="https://www.designcouncil.org.uk/news-opinion/what-framework-innovation-design-councils-evolved-double-diamond" target="newwin">double-diamond</a>” design process. We will continue to add new design modules in the future as more developers join our community.
                  </p>
                </div>
              </div>

              <div class="modules-div">
                <div class="about-block">
                  <h2 class="h2-to-h2">Module 1: Likes and Wishes</h2>
                  <p class="copysmall">This module lets users express what they like and wish about a given topic. For now this is an easy way to get projects started. In the future we will allow users to provide likes and wishes in response to other objects (e.g. ideas), and also add new modules so that they can use different kinds of design research data.</p>
                </div>
                <img src={phase1} width="300" alt="" class="phase-image"/>
              </div>
              <div class="modules-div">
                <div class="about-block">
                  <h2 class="h2-to-h2">Module 2: Opportunities</h2>
                  <p class="copysmall">This module lets users synthesize their likes and wishes to identify potential opportunities for the project to address. Synthesis is a complex process, and in the future we will add modules that simplify it by breaking it down into smaller, more intuitive steps.</p>
                </div>
                <img src={phase2} width="300" alt="" class="phase-image"/>
              </div>
              <div class="modules-div">
                <div class="about-block">
                  <h2 class="h2-to-h2">Module 3: Cheatstorming</h2>
                  <p class="copysmall">This module lets users generate new ideas in response to a brainstorming prompt. We call it cheatstorming because, unlike conventional brainstorming, it involves "stealing" ideas from other projects as a source of creative inspiration.</p>
                </div>
                <img src={phase3} width="300" alt="" class="phase-image"/>
              </div>
              <div class="modules-div">
                <div class="about-block">
                  <h2 class="h2-to-h2">Module 4: Voting</h2>
                  <p class="copysmall">This module lets users vote for their favorite ideas. For now, they can vote on their five favorite ideas each time they vote. Users can then see all of the most popular ideas, start new projects in the Kernel to explore them further, or build them in real life.</p>
                </div>
                <img src={phase4} width="300" alt="" class="phase-image"/>
              </div>
            </div>
          </section>

          <div class="modules-illustration">
            <img width = "100%" src= {diagram} />
          </div>

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
