import styled from "styled-components";
import {devices} from "../../devices"

const Button = styled.button`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  text-align: center;
  color: ${props => (props.disabled ? "#979797" : "#fafafa")};
  width: 150px;
  height: 36px;
  border-radius: 4px;
  border: solid 1px ${props => (props.disabled ? "#b9b9b9;" : "#1e3888")};
  background-color: ${props => (props.disabled ? "#fafafa" : "#1e3888")};
  outline: none;
  cursor: pointer;

  @media ${devices.mobile}{
    width: 90px;
    height: 40px;
    font-size: 10px;
  }
`;

export default Button;
