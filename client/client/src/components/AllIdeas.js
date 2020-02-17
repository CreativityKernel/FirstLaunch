import React, { Component } from 'react';
import '../css/main.css';
import Header from "./Header";
import VotedIdeaCard from "./VotedIdeaCard"; 
import LoadingWidget from "./LoadingWidget"
import styled from 'styled-components'
import { devices } from "../devices"

const Wrapper = styled.div`
 margin: 10px auto ;
 padding-top: 30px;
 max-width:800px;
 text-align:center;
`;

const ContentContainer = styled.div`
  max-width: 690px;
  height: calc(100vh - 250px ); //footer = 100, top = 100, HMW = 50px, 0px extra for padding
  margin: auto;
  overflow: scroll;
  padding-bottom: 10px;

  @media ${devices.mobile}{
    height:auto;
  }
`;

const KernelHeader = styled.div`
      position: relative;
      margin:auto;
      width:100%
      height:60px;

      //@media ${devices.mobile} {
      //}
`;

const Sticky = styled.textarea`
  margin: auto;
  width: 160px;
  height: 160px;
  border-radius: 1px;
  border: none;
  background-color: "#fffc8d";
  resize: none;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.2px;
  color: #000000;
  padding: 10px;
  margin: 5px;
`;

const ValueWrapper = styled.div`
  max-width:690px;
  height:35vh;
  margin:auto;
  overflow:scroll;
`;

const IdeasCanvas = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Help = styled.div`
  display: none;
  padding-top: 10px;
  padding-bottom: 15px;
  background-color:#ffe74c;

  text-align:left;
  color:black;
  font-family: "Work Sans", sans-serif;
`;

const HelpTitle = styled.div`
  text-align:center;
  margin: auto;
  padding-top: 25px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 50px;

  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.2px;

  @media ${devices.mobile}{
    //font-size: 16px;
    text-align:center;
  }
`;

const HelpInstructions = styled.div`
  margin: auto;
  padding-top: 15px;

  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
`;

const HelpButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  border: none;
  background-color: #ffe74c;

  position: fixed;
  right: 20px;
  color:black;

  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.2px;

  cursor: pointer;
`;

const BottomWrapper = styled.span`
  width: 100%;
  height: 100px;
  margin: auto;
  position: absolute;
  bottom: 0;
  background-color: white;
  border-top: 1px solid #e3e5e9; //this is the grey line at the top of the footer

  //this is the only BottomWrapper that uses the following 4 lines of padding code:
  //padding: 30px 30px 40px;
  //bottom: 0;
  //left: 0;
  //right: 0;

  //removed for now; @media needs updating to accomodate this footer
  //@media ${devices.mobile}{
  //  position: sticky;
  //}
`;

const SubmitButton = styled.button`
  width: 72px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px #1e3888;
  background-color: #1e3888;
  position: absolute;
  top: 32px;
  right: 20px;
  color:#fafafa;
  text-transform:uppercase

  @media ${devices.mobile}{
    bottom:30px;
  }
`;

const Subject = styled.div`
  text-transform: lowercase;
  font-weight: bold;
  display: inline;
`;

const Bottom = styled.div`
  max-width:1200px; //this is custom
  height: 100px;
  margin:auto;
  position:relative;
`;

const Placeholder = styled.div`
  justify-content: center;
  margin-top: 100px;
  color: #9b9b9b;
`;

export default class AllIdeas extends Component {
  //class AllIdeas extends Component {

  constructor(props) {
    super(props);

    //this.state = { prompt: {}, selfVotes: [] , demoVotes: []};
    this.state = {
      data: null,
      prompt: {},
      selfVotes: [],
      demoVotes: [],
      all_ideas: [],
      count: -1
    };

    //this.handleTextChange = this.handleTextChange.bind(this);
    //this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.history.push("/project/" + this.props.match.params.id);
  }

  helpToggle(event) {
    var x = document.getElementById("helpZone");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }


  /*
  handleTextChange(event){
    var textValue = event.target.value;
    if(textValue.trim().length<1){
      event.target.focus();
      event.target.setSelectionRange(0,0);
    }

    if(textValue.toLowerCase().startsWith('i like')){
      this.setState({currentValue: { text:textValue, valueType:0}});
    }
    else if(textValue.toLowerCase().startsWith('i wish')){
      this.setState({currentValue: { text:textValue, valueType:1}});
    }
    else this.setState({currentValue: { text:textValue, valueType:-1}});
  }

  handleKeyPress(event){
    if(event.key == 'Enter'){
      this.storeCurrentValue();
      this.setState({currentValue: {
        text:"",
        valueType:-1
      }});
    }
  }


  storeCurrentValue(){
    if(this.state.currentValue.valueType == 1){
      this.state.wishes.push(this.state.currentValue.text); //todo:check for react immutibitlity
      this.state.values.push(this.state.currentValue);

    }else if(this.state.currentValue.valueType == 0){
      this.state.likes.push(this.state.currentValue.text);
      this.state.values.push(this.state.currentValue);
    }
  }
  */



  componentDidMount() {

    //fetch(`/prompts/${prompt._id}/ideas/${idea._id}/vote`, {

    /*
    fetch("/ideas/")
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });

    fetch("/prompts/" + this.props.match.params.id)
       .then(response => response.json())
       .then(data => {
         this.setState({ data });
       });
      */


    const url = `/projects/${this.props.match.params.id}/`;
    console.log(url)

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let allIdeas = [];
        data.prompts.map((prompt, i) => {
          if (prompt.votes) {
            prompt.ideas.map((idea, j) => {
              if (prompt.votes[idea] && prompt.votes[idea].length > 0) {
                allIdeas.push([idea, prompt.votes[idea].length]);
              }
            });
          }
          //return null;
        }, this)
        this.setState({ data:data, count: allIdeas.length })

        let allDetailedIdeas = []
        allIdeas.map((idea, j) => {
          const url = "/ideas/"+idea[0];
          fetch(url)
            .then(response => response.json())
            .then(data => {
              allDetailedIdeas.push([data,idea[1]])
              if(allDetailedIdeas.length >= this.state.count){
                allDetailedIdeas.sort((a, b) => {
                  return b[1] - a[1]
                });
                this.setState({allIdeas:allDetailedIdeas})
              }
            });
        });
      });
  }

  render() {
    if (this.state.data != null && this.state.allIdeas) {
      var project = this.state.data;
      var valueType = 1; //this.state.currentValue.valueType;         *************
      return (
        <div>
          <KernelHeader>
            <Header />
          </KernelHeader>

          <Help id="helpZone">
            <HelpInstructions>
              <ul>
                <li>The list below contains <strong>all</strong> of the ideas that have been generated for this project.</li>
                <li>To transform your favorite idea into a new project, <strong>click it</strong>!</li>
              </ul>
            </HelpInstructions>
          </Help>

          <HelpTitle>
            <HelpButton onClick={this.helpToggle}>?</HelpButton>
            Here are all of the ideas for <Subject>{project.title}</Subject>:
          </HelpTitle>

          <Wrapper>

            <ContentContainer>
              <IdeasCanvas>
                {this.renderVotedIdeas()}
              </IdeasCanvas>

              {
                //this.renderIdeas(ideas, demoVotes)
              }
            </ContentContainer>

          </Wrapper>

          <BottomWrapper>
            <Bottom>
              <SubmitButton onClick={this.handleSubmit}>Done</SubmitButton>
            </Bottom>
          </BottomWrapper>

        </div>
      );
    }
    return <LoadingWidget></LoadingWidget>;
  }

  renderVotedIdeas(){
   return this.state.allIdeas.map((idea, i) => { 
      return (
        <div onClick={()=>{this.props.history.push("../../create_new_project/"+idea[0].content.title)}}>
        <VotedIdeaCard
        voteCount = {idea[1]}
        text = {idea[0].content.title}
        ></VotedIdeaCard></div>
      );
    });

  }
}

//export default AllIdeas;
