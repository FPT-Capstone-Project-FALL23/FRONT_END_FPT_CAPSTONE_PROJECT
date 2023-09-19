import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const BackToPageStyle = styled(Link)`
  margin-top: 20px;
  font-style: italic;
  display: flex;
  align-items: center;
`;

export const ContentIntroductionStyle = styled.div`
  padding: 20px 150px;
  text-align: center;
  & p {
    font-size: 12px;
    width: 500px;
    margin: 0 auto;
    color: #112211;
  }
`;

export const PageNameStyle = styled(Typography)`
  margin-top: 30px !important;
  font-style: italic;
`;

export const TitlePageStyle = styled.p`
  color: #112211;
  margin-top: 20px;
`;

export const ChooseItemStyle = styled.div`
  box-shadow: 2px 4px 12px 8px #8fbffc;
  padding: 20px;
  border-radius: 50px;
  text-align: center;
`;

export const OrtherSignUpMethodStyle = styled.div`
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #f5bd19;
  text-align: center;
  flex: 1;
`;

export const SignUpLineOrtherStyle = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background: gray;

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background: white;
    padding: 0 10px;
    color: #112211;
    font-size: 14px;
  }
`;

export const AnotherChoiceStyle = styled.div`
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid #8dd3bb;
  text-align: center;
  flex: 1;
`;
