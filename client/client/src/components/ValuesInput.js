import React, { Component } from 'react';
import '../css/main.css';
import LikeCard from './LikeCard'
import WishCard from './WishCard'
import styled from 'styled-components'

const Wrapper = styled.div`
 margin: 50px auto ;
 max-width:800px;
 text-align:center;
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

class ValuesInput extends Component {

  constructor(props) {
   super(props);

   this.state = {
     data: null,
     currentValue: {
       text:null,
       valueType:-1
     },
     likes:[],
     wishes:[],
     values:[]
   };

   this.handleTextChange = this.handleTextChange.bind(this);
   this.handleKeyPress = this.handleKeyPress.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleTextChange(event){
   var textValue = event.target.value;
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

       alert("Successfully Submitted!");
       this.props.history.push('/project/'+this.state.data._id);
 }

 componentDidMount() {
   console.log('/projects/'+this.props.match.params.id)
   fetch('/projects/'+this.props.match.params.id)
     .then(response => response.json())
     .then(data => this.setState({data}));
 }

  render() {

    if(this.state.data != null){
      var project = this.state.data;
      var valueType = this.state.currentValue.valueType;
    return (
      <div>
        <h2 className="text_center">What do you like and wish about <strong>{project.title}</strong>?</h2>

        <Wrapper>
          <Sticky wish={valueType == 1 ? true : false} like={valueType == 0 ? true : false}
            onChange={this.handleTextChange} onKeyPress={this.handleKeyPress} value={this.state.currentValue.text}>
          </Sticky>
        </Wrapper>

        <ValueWrapper>

          {this.state.values.slice(0).reverse().map(function(value, i){
            if(value.valueType == 0)
            return <LikeCard data={value.text} key={i} />;
            else return <WishCard data={value.text} key={i} />;
          })}

        </ValueWrapper>

        <BottomWrapper>
          <Progress>{this.state.likes.length}</Progress>
          <BottomText>Likes</BottomText>
          <Progress>{this.state.wishes.length}</Progress>
          <BottomText>Wishes</BottomText>
          <SubmitButton onClick={this.handleSubmit}>Submit</SubmitButton>
        </BottomWrapper>

      </div>
    );
  }
  return null;
  }
}

export default ValuesInput;
