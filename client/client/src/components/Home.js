// This is the full grid of all existing projects

import React, { Component } from "react";
import styled from "styled-components";
import { devices } from "../devices"


const Wrapper =styled.div`{
  //max-width: 1000px;
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
    color: #000000;       //this affects the color of the text
    @media ${devices.mobile} {
      font-size: 24px;
    }
  }
`;

const InWrapper =styled.div`{
  max-width: 1000px;
  margin: 10px auto;
  //background-color: #dddddd;
}
`;



//PERHAPS THIS SHOULD BE A UNIVERSAL CSS HeaderContainer
const HomeHeaderContainer = styled.div`
  position: relative;
  margin:auto;
  width:100%
  margin: 1%; // this matches the margin around all the project tiles
  //background-color: #bbbbbb;

  margin-top: 60px;

  //@media ${devices.mobile} {
  //}
`;


const HomeIntroContainer = styled.div`
  position: relative;
  margin:auto;
  width:100%
  margin: 1%; // this matches the margin around all the project tiles
  //background-color: #bbbbbb;

  margin-top: 60px;

  max-width: 531px;
  //padding-top: 96px;
  //padding-bottom: 96px;
}


  //@media ${devices.mobile} {
  //}
`;

const HeroSection = styled.div`
  margin-top: 0px;
  padding-top: 68px;
  padding-right: 24px;
  padding-left: 24px;
  //background-image: url("https://assets.website-files.com/5d6eb1364491086a348f75d3/5d6ff9681919dc8e44fc0c09_Hero-BG.png"), -webkit-gradient(linear, left top, left bottom, from(#eefff6), to(#e3f8ff));
  background-image: url("http://www.haakonfaste.com/creativitykernel/ck_overview.jpg"); //, linear-gradient(180deg, #eefff6, #e3f8ff);
  //background-size: 20%;
  background-position: 100% 50%, 0px 0px;
  background-size: auto 300px, auto; //auto
  background-repeat: no-repeat, repeat;
  background-attachment: scroll, scroll;

  //background-color: #eee;


  .w-container{
    margin-left:auto;
    margin-right:auto;
    max-width:940px
  }

`;

const AboutSection = styled.div`
  padding-top: 30px; //this just adds a bit of vertical separation
  //padding-right: 24px;
  //padding-left: 24px;
  margin: 1%; // this matches the margin around all the project tiles
`;




class Home extends Component {
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
        <InWrapper>


          {/*
          <HomeHeaderContainer>
            <h1>Home</h1>
          </HomeHeaderContainer>
          */}


          <HeroSection>
            <div class="w-container">
              <div class="header-div">

                <HomeIntroContainer>
                  <h2 class="h2-to-h1">Welcome to the <br />CREATIVITY KERNEL</h2>
                  <p class="intro">The Creativity Kernel is an open design platform. We are open sourcing design thinking so that anyone can use it to make the world better.</p>
                </HomeIntroContainer>

              </div>
            </div>
          </HeroSection>

          <section class="about-section">
            <div class="about-container w-container">

              <div class="w-row">
                <div class="w-col w-col-3">
                </div>
                <div class="w-col w-col-9">
                  <h3 class="preheading">How it works</h3>
                </div>
              </div>

              <div class="columns-about w-row">
                <div class="w-col w-col-3">
                  <img src="http://www.haakonfaste.com/creativitykernel/icon_output.jpg" width="83" alt="" class="about-images"/>
                </div>
                <div class="w-col w-col-9">
                  <h2 class="h2-to-h1">Open Design Projects</h2>
                  <p class="copy">
                    The Creativity Kernel provides tools that allow designers to complete modularized tasks, each based on a design method, as part of larger projects. Design projects are similar to Wikipedia articles: anyone can start a project, and anyone can contribute to it and use the results. By combining methods together and encouraging crowd participation, users of the kernel collectively identify needs, generate and share ideas, and design new solutions to problems large and small.
                    {/*The Creativity Kernel is a flexible platform that facilitates the completion of design method modules. Based on their interests, members of the crowd create projects and work on them while learning about the design tools provided in each module. Participants offer and receive advice with one another, creating a networked design practice community working on projects.*/}
                  </p>

                </div>
              </div>

              <div class="columns-about w-row">
                <div class="w-col w-col-3">
                  <img src="http://www.haakonfaste.com/creativitykernel/icon_camera.jpg" width="83" alt="" class="about-images"/>
                </div>
                <div class="w-col w-col-9">
                  <h2 class="h2-to-h1">Method Modules</h2>
                  <p class="copy">
                  When working on projects, designers commonly use a range of methods such as interviewing people, mind mapping, brainstorming, and so on. In the Creativity Kernel, design methods can be strung together like Lego blocks as designers work on projects. Each time a method is used, project-related data is updated (brainstorming creates new ideas in response to an opportunity, for example). And because the kernel is open source, the community can create new methods over time to meet its needs.
                  </p>
                </div>
              </div>

              <div class="columns-about w-row">
                <div class="w-col w-col-3">
                  <img src="http://www.haakonfaste.com/creativitykernel/icon_lightbulb.jpg" width="83" alt="" class="about-images"/>
                </div>
                <div class="w-col w-col-9">
                  <h2 class="h2-to-h1">Idea Pools and Data Standards</h2>
                  <p class="copy">
                  A lot of thinking goes into design projects that eventually gets lost, but it doesn’t need to be that way. We’re empowering an online community where everyone builds on each others’ ideas by drawing ideas and insights from one project to address problems in another. The Creativity Kernel pools ideas from previous projects and suggests them to new ones. It also establishes a design thinking data standard, allowing designers to collaborate across platforms and share what they know.
                  </p>
                </div>
              </div>





            </div>
          </section>


{/*}
          <div class="partner-section">
            <div class="w-container">
              <h3 class="preheading" align="center">Key Principles</h3>
              <div class="partner-div">



                <div class="w-col w-col-4">
                  <p class="copysmall">
                      <b>Open Source</b><br/>
                      The tools we are building are designed and developed by the crowd. The code for the kernel is open source, and the content we generate is creative commons.
                  </p>
                </div>

                <div class="w-col w-col-4">
                  <p class="copysmall">
                      <b>Co-Design</b><br/>
                      And we invite anyone to participate, because good design is open design and everything is better when we work together.
                  </p>
                </div>

                <div class="w-col w-col-4">
                  <p class="copysmall">
                      <b>Good Design</b><br/>
                      Our tools are designed to be personally useful, and are powered by crowds.
                  </p>
                </div>

                <img width = "100%" src= "http://www.haakonfaste.com/creativitykernel/ck_diagram.jpg" />

                <div class="w-col w-col-4">
                  <p class="copy">We are empowering collective action on social issues where public opinions may differ, existing resources are limited and creative solutions are required.</p>
                </div>
                <div class="w-col w-col-4">
                  <p class="copy">The tools we are building are designed and developed by the crowd. The code for the kernel is open source, and the content we generate lives in the creative commons.</p>
                </div>
                <div class="w-col w-col-4">

                </div>
              </div>
            </div>
          </div>



          <section class="support-section">
            <div class="w-container">

              <h3 class="preheading">Why it matters</h3>

              <div class="w-row">
                <div class="w-col w-col-6">

                  <h2 class="h2-to-h3">The Creativity Kernel is a free and open space for design.</h2>
                  <p class="copy">

                    The tools we are building are designed and developed by the crowd. The code for the kernel is open source, and the content we generate is creative commons.
                    <br/>
                    <br/>
                    By situating design as a public good, we are empowering collective action on social issues where public opinions may differ, existing resources are limited and creative solutions are required.

                  </p>
                </div>
                <div class="w-col w-col-6">
                  <img src="http://www.haakonfaste.com/creativitykernel/ck_venn.jpg" width="333" alt="Hands holding world with internet" class="image-centered"/>
                </div>
              </div>
            </div>
          </section>
*/}

          <section class="section-basic">
            <div class="w-container">

              <br/><br/>
              <hr />
              <br/><br/>

              <h3 class="preheading">Why it Matters</h3>

              <div class="w-row">

                <div>
                  <h2 class="h2-to-h2"></h2>
                </div>

                <div class="w-col w-col-6">

                  <p class="copy">
                  The Creativity Kernel is a prototype for a new kind of participatory and democratic innovation.
                  <br/>
                  <br/>
                  We are empowering collective action on social issues where public opinions may differ, existing resources are limited and creative solutions are required.
                  <br/>
                  <br/>

                  The tools we are building are designed and developed by the crowd. The code for the kernel is open source, and the content we generate lives in the creative commons.

                  </p>
                </div>
                <div class="w-col w-col-6">
                  <br/>
                  <br/>
                  <img src="http://www.haakonfaste.com/thesis/images/ambithink_venn.gif" width="333" class="image-centered"/>
                </div>
              </div>

              <br/><br/>
              <br/><br/>
              <br/><br/>

            </div>
          </section>

{/*
          <section class="section-basic">
            <div class="wws-container w-container">
            <h3 class="preheading">the Method Modules</h3>

              <div class="wws-div">
                <div class="div-block-5">
                  <p class="copy">
                    So far the Kernel consists of four method modules, roughly corresponding to the popular “<a href="https://www.designcouncil.org.uk/news-opinion/what-framework-innovation-design-councils-evolved-double-diamond" target="newwin">double-diamond</a>” design process.
                  </p>
                </div>
              </div>


              <div class="wws-div">
                <div class="div-block-5">
                  <h2 class="h2-to-h2">Module 1: Likes and Wishes</h2>
                  <p class="copysmall">Express what you like and wish about the topic of a given project.</p>
                </div>
                <img src="http://www.haakonfaste.com/creativitykernel/icon_camera.jpg" width="83" alt="" class="image-centered"/>

              </div>

              <div class="wws-div">
                <div class="div-block-5">
                  <h2 class="h2-to-h2">Module 2: Opportunities</h2>
                  <p class="copysmall">Synthesize your likes and wishes to identify potential opportunities for the project to address.</p>
                </div>
                <img src="http://www.haakonfaste.com/creativitykernel/icon_lightbulb.jpg" width="83" alt="" class="image-centered"/>
              </div>
              <div class="wws-div">
                <div class="div-block-5">
                  <h2 class="h2-to-h2">Module 3: Cheatstorming</h2>
                  <p class="copysmall">Generate new ideas inspired by ideas from previous projects.</p>
                </div>
                <img src="http://www.haakonfaste.com/creativitykernel/icon_output.jpg" width="83" alt="" class="image-centered"/>
              </div>
              <div class="wws-div">
                <div class="div-block-5">
                  <h2 class="h2-to-h2">Module 4: Voting</h2>
                  <p class="copysmall">Vote for your favorite ideas and start new projects to explore them further!</p>
                </div>
                <img src="http://www.haakonfaste.com/creativitykernel/icon_lightbulb.jpg" width="83" alt="" class="image-centered"/>
              </div>
            </div>
          </section>
          <img width = "100%" src= "http://www.haakonfaste.com/creativitykernel/ck_diagram.jpg" />


          {/*}
          <section class="support-section">
            <div class="w-container">
              <img width = "100%" src= "http://www.haakonfaste.com/creativitykernel/ck_diagram.jpg" />
            </div>
          </section>

          <div class="signup-section signup-section-cm">
            <div class="w-container">
              <div class="signup-columns w-row">
                <div class="column w-col w-col-6 w-col-small-small-stack w-col-tiny-tiny-stack">
                  <div>
                    <h1 class="signup-heading">How to apply</h1>
                    <p class="signup-paragraph">Sign up for email updates and join the <a href="https://forum.grantfortheweb.org/" target="_blank" class="signup-link">Community Forum</a> to ask questions and learn more.</p>
                  </div>
                </div>
                <div class="form-column w-col w-col-6 w-col-small-small-stack w-col-tiny-tiny-stack">
                  <h1 class="preheading white">Sign up for updates</h1>
                  <div class="form-div">
                    <div class="html-embed w-embed w-script">
                      <form id="subForm" class="js-cm-form form-div" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="2BE4EF332AA2E32596E38B640E905619E02EB8D9117A36E9AA24A10578CEECDD52957FFE299AE7379445ED55B7BDE6D67778BC7456ED1D0E1F46AB5B6B289438">
                        <input id="fieldEmail" name="cm-skyjlk-skyjlk" type="email" class="js-cm-email-input text-field w-input" placeholder="Enter your email" maxlength="256" required/>
                        <button id="subButton" class="js-cm-submit-button submit-button w-button" type="submit">Sign Up</button>
                      </form>



                      <script type="text/javascript" src="https://js.createsend1.com/javascript/copypastesubscribeformlogic.js"></script>
                      <script type="text/javascript">
                        document.addEventListener("DOMContentLoaded", function(event) {
                            //do work
                            const signupButton = document.getElementById('subButton')
                          signupButton.onclick = e => {
                            const emailValue = document.getElementById('fieldEmail').value
                            try {
                              localStorage.setItem('gftwEmail', emailValue)
                            } catch (err) {
                              console.error('No local storage', err)
                            }
                          }
                        })
                      </script>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          */}

        </InWrapper>
        </Wrapper>
      );
    }

    return null;
  }
}

export default Home;
