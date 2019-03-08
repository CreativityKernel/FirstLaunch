import React, { Component } from 'react';
import '../css/main.css';
import LikeCard from './LikeCard'
import WishCard from './WishCard'
import styled from 'styled-components'

const Wrapper = styled.div`
 margin: 50px auto;
 max-width:1200px;
`;

const ValueContainer = styled.div`
 float:Left;
 width:50%;
`;

const PromptsContainer = styled.div`
  float:Left;
  width:40%;
`;

const Prompt = styled.div `
  border-radius: 4px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding:15px;
`;

const HMW = styled.h2`
  font-size: 12px;
  text-transform:uppercase;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  color: #1e3888;
`;

const PromptText = styled.textarea`
  width:100%;
  resize:none;
`;


const ValueDrop = styled.div`
  width:100%;
  min-height:100px;
  // background-color:#f4f4f4
  text-align:center;
`;

const Draggable = styled.div`
float:left
`;


const Sticky = styled.textarea`
 margin:auto
 width: 160px;
 height: 160px;
 border-radius: 1px;
 border:none;
 background-color: ${props => props.wish? '#d4d3ff' : props.like ? '#ffe677' :'#fffc8d'};
 resize:none;
 outline:none;
 overflow:hidden;
 font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.2px;
  color: #000000;
  padding:10px;
`;

const ValueWrapper = styled.div `
  max-width:690px;
  height: 35vh;
  margin:auto;
  overflow:scroll;
`;

const BottomWrapper = styled.div`
  width:690px;
  height: 150px;
  margin:auto;
  position:relative;
`;

const SubmitButton = styled.button`
  width: 72px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px #1e3888;
  background-color: #1e3888;
  position: absolute;
  top: 50px;
  right: 0;
  color:#fafafa;
  text-transform:uppercase;
`;

const Progress = styled.p`
  font-size: 30px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.5px;
  color: ${props => props.disabled ? '#b9b9b9' : '#000000'};
  border: solid 3px ${props => props.disabled ? '#b9b9b9' : '#ffe74c'};
  width: 75px;
  height: 75px;
  line-height:65px;
  border-radius:100%;
  text-align:center;
  margin:30px;
  margin-left:0;
  float:left;
  background-color: ${props => props.disabled ? '#fafafa' : 'white'};
`;

const BottomText = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  color: #000000;
  float:left;
  margin-top: 55px;
  margin-right: 70px;


`;

class OpportunitiesInput extends Component {

  constructor(props) {
   super(props);

   this.state = {
     data: null,
     values:[],
     prompts:[]
   };

   this.handleDrop = this.handleDrop.bind(this);
   this.allowDrop = this.allowDrop.bind(this);
   this.handleDragStart = this.handleDragStart.bind(this);
 }

 handleDragStart(ev){

 }

 handleDrop(ev){
   ev.preventDefault();
   var valueIndex = parseInt(ev.dataTransfer.getData("text"));
   var promptIndex = parseInt(ev.target.id);
   if(isNaN(promptIndex)){
     promptIndex = parseInt(ev.target.parentElement.id);
   }
   this.state.prompts[promptIndex].values.push(this.state.values[valueIndex]);
   this.state.values.splice(valueIndex, 1);
   this.forceUpdate();
 }

 allowDrop(ev) {
  ev.preventDefault();
}

handleSubmit(event){
   fetch('/projects/likes/'+this.props.match.params.id,
     { method:'POST',
       body: JSON.stringify({"likes":this.state.likes,
     "createdBy":localStorage.getItem('ck_user_id')}),
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json',
         'Mode' : "CORS"
       }
     }).then(response => response.json())
     .then(data =>
       {
         console.log(data);
       }
     );

     fetch('/projects/wishes/'+this.props.match.params.id,
       { method:'POST',
         body: JSON.stringify({"wishes":this.state.wishes,
         "createdBy":localStorage.getItem('ck_user_id')}),
         headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json',
           'Mode' : "CORS"
         }
       }).then(response => response.json())
       .then(data =>
         {
           console.log(data);
         }
       );
 }

 componentDidMount() {
   console.log('/projects/'+this.props.match.params.id)
   fetch('/projects/'+this.props.match.params.id)
     .then(response => response.json())
     .then(data => {
       this.setState({data})
       var values = [];
       data.wishes.map(function(wishText, i){
         values.push({'type':1, 'text':wishText})
       });

       data.likes.map(function(likeText, i){
         values.push({'type':2, 'text':likeText})
       });
       this.setState({values});

       var prompts = [];
       data.prompts.map(function(prompt, i){
         prompts.push(prompt);
       });
       if (prompts.length < 1){
         prompts.push({
           text: '',
           author: localStorage.getItem('ck_user_id'),
           project: data._id,
           values: [],
         });
       }
       this.setState({prompts});
     }
   );
 }



  render() {
    if(this.state.data != null){
      var project = this.state.data;
    return (
      <Wrapper>
        <ValueContainer>
          {this.state.values.map(function(value, i){
            if(value.type==1)
              return <Draggable id={i} onDragStart={ev =>ev.dataTransfer.setData("text", ev.target.id)}draggable="true"><WishCard data={value.text} key={i} /></Draggable>;
            return <Draggable id={i} onDragStart={ev =>ev.dataTransfer.setData("text", ev.target.id)}draggable="true"><LikeCard data={value.text} key={i} /></Draggable>;
          })}
        </ValueContainer>

        <PromptsContainer>
          {this.state.prompts.map(function(prompt, i){
            return <Prompt>
                <HMW> How might we...</HMW>
                <PromptText></PromptText>
                <ValueDrop
                  id ={i}
                  onDrop={this.handleDrop}
                  onDragOver={ev =>{
                    ev.preventDefault();
                  }}>
                  {prompt.values.slice(0).reverse().map(function(value, i){
                    if(value.type==1)
                      return <WishCard data={value.text} key={i}/>
                    return <LikeCard data={value.text} key={i} />
                  })}
                </ValueDrop>
              </Prompt>

          },this)}

        </PromptsContainer>
      </Wrapper>
    );
  }
  return null;
  }
}

export default OpportunitiesInput;
