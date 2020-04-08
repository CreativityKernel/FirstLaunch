import React, { Component } from "react";
import "../css/main.css";
import styled from "styled-components";
import { devices } from "../devices";
import ValueCard, { cardSizes } from './ValueCard';
import creativityKernel from '../CKConstants'



const Wrapper = styled.div`
position:relative;
`;

const Container = styled.div`
height:${(props) => props.expand ? '60vh' : '12vw'};
min-height:12vw;
display:flex;
align-items: center;
justify-content:center;
padding:6vh 2vw;
background-color:${(props) => props.mouseEntered || props.expand ? '#ECF5FF' : 'white'};
transition: height 1s;
overflow:hidden;
margin-bottom:${(props) => props.expand ? '1vw' : '0'};
`;

const TextContainer = styled.div`
`;

const PromptHeaderText = styled.p`
  width: 25vw;
  margin-right:5vw;
  font-size: 0.9vw;
  font-style: normal;
  font-stretch: normal;
  font-weight:bold;
  line-height: 1.4;
  letter-spacing: 0.5px;
  color:#1E3888;
  text-transform:uppercase;
`;
const PromptText = styled.textarea`
  width: 25vw;
  height:${(props) => props.expand ? '8vw' : '5vw'};
  resize: none;
  font-size: 1.1vw;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: 0.5px;
  margin:0;
  padding: ${(props) => props.expand ? '1vw' : '0vw'};
  margin-right:5vw;
  outline:none;
  border:none;
  background:${(props) => props.expand ? 'white' : 'none'};
  overflow:visible;
`;


const ValueCardPlaceHolder = styled.div`
  width: ${props => props.size == 0 ? '7vw' : '3vw'};
  height: ${props => props.size == 0 ? '7vw' : '3vw'};
margin:1vw;
  background-color: #d4d3ff;
  text-align: center;
  border-radius:0.4vw;
`;

const ValueContainer = styled.div`
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  width:${(props) => props.expand ? '40vw' : '20vw'};
  max-height:${(props) => props.expand ? '53vh' : 'auto'};
  overflow:scroll;
  justify-content: flex-start;
`;

const CountContainer = styled.div`
width:15vw;
`;

const Count = styled.div`
    width: 4vw;
    height: 4vw;
    resize: none;
    font-size: 1.2vw;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0.5px;
    margin:0;
    padding-top: 1.2vw;
    border-radius:100%;
    border: 0.1vw solid #2D333A;
    box-sizing: border-box;
    text-align:center;
    color:#2D333A;
`;

const CollapseButton = styled.button`
    position:absolute;
    right:1vw;
    top:1vw;
    width:auto;
    border:none;
    background:none;
    font-weight: bold;
    outline:none;
    text-decoration: underline;
`;

const MEDIUM_LIMIT = 4;
const SMALL_LIMIT = 24;

const describeClusterText = "Describe this cluster when you’re ready!";
const addMoreToClusterText = "Add at least four likes and wishes to this cluster so you can identify an opportuniy";
const opportunityText = "THERE IS AN OPPORTUNITY TO...";


class Prompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseEntered: false,
            expand: false,
            showValueContent: false
        };
    }

    closeButtonClick(ev) {
        var id = ev.target.id;
        if (id != null) {
            var data = id.split("*");
            var promptIndex = data[0];
            var valueIndex = data[1];
            // alert(promptIndex +" "+ valueIndex);
            this.state.values.unshift(this.state.prompts[promptIndex].values[valueIndex]);
            this.state.prompts[promptIndex].values.splice(valueIndex, 1);
            this.forceUpdate();
        }
    }

    render() {
        if (!this.props.prompt) return null;
        return (

            <Wrapper>
                <Container
                    expand={this.state.expand}
                    onClick={() => { this.setState({ expand: true }); setTimeout(() => { this.setState({ showValueContent: true }) }, 800) }}
                    onMouseEnter={() => this.setState({ mouseEntered: true })}
                    onMouseLeave={() => this.setState({ mouseEntered: false })}
                    onDragOver={() => { !this.state.mouseEntered && this.setState({ mouseEntered: true }) }}
                    onDragLeave={() => this.setState({ mouseEntered: false })}
                    onDrop={() => {
                        this.setState({ mouseEntered: false });
                        this.props.onDropCallback(this.props.index);
                    }}
                    mouseEntered={this.state.mouseEntered}
                >
                    {this.state.expand && <CollapseButton onClick={(ev) => { this.setState({ expand: false, showValueContent: false }); ev.stopPropagation(); }}>Collapse</CollapseButton>}
                    <TextContainer>
                        <PromptHeaderText>{this.props.prompt.text ? opportunityText : this.props.prompt.values.length >= creativityKernel.minimumValuesToOpportunity ? this.state.expand? opportunityText : describeClusterText : addMoreToClusterText}</PromptHeaderText>
                        {((this.state.expand && this.props.prompt.values.length >= creativityKernel.minimumValuesToOpportunity) || this.props.prompt.text) &&
                            <PromptText
                                expand={this.state.expand} onChange={this.handlePromptTextChange}
                                onChange={(ev)=>this.props.onTextChange(this.props.index,ev.target.value)}
                                value = {this.props.prompt.text ? this.props.prompt.text : ""}>
                            </PromptText>}
                    </TextContainer>
                    <ValueContainer expand={this.state.expand}>
                        {this.props.prompt.values
                            .slice(0)
                            .reverse()
                            .map(function (value, i) {
                                if (this.state.expand || i < SMALL_LIMIT)
                                    return <ValueCard removable={true} onRemoveCallBack={() => this.props.onRemoveCallBack(this.props.prompt.values.length - i - 1)} showContent={this.state.showValueContent} type={value.type} data={value.text} size={this.state.expand ? cardSizes.DETAILED : this.props.prompt.values.length > MEDIUM_LIMIT ? cardSizes.SMALL : cardSizes.MEDIUM} animation={this.props.animation && i == 0}></ValueCard>
                                return null;
                            }, this)}
                    </ValueContainer>
                    {!this.state.expand && <CountContainer>
                        {this.props.prompt.values.length > SMALL_LIMIT && <Count>{"+" + (this.props.prompt.values.length - SMALL_LIMIT)}</Count>}
                    </CountContainer>}
                </Container>
            </Wrapper>)
    }
}

export default Prompt;
