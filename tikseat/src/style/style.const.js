import styled from "styled-components";
import {
  colorAliceBlue,
  colorCetaceanBlue,
  colorElectricPink,
  colorIndigo,
  colorWhite,
} from "./theme";
import { AppBar, Box, FormControl, Pagination, TextField } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

//   header
export const HeaderStyle = styled(Box)`
  position: relative;
  & .header {
    &-overlay {
      position: absolute;
      background: linear-gradient(
        118.98deg,
        #ed4691d0 -2.11%,
        #5522ccbe 63.58%
      );
      height: 100%;
      width: 100%;
      top: 0;
      margin: auto;
    }
  }
`;

export const CarouselStyle = styled(Carousel)`
  overflow: hidden;
  border-radius: 30px;
  & .carousel-status {
    display: none;
  }
`;
export const TextFieldStyle = styled(TextField)`
  width: 100% !important;

  .MuiInputBase-root {
    background-color: transparent !important;
    &::before {
      border-width: 1.5px;
      border-color: #7778b0 !important;
    }
  }
  label {
    font-size: 16px !important;
    color: ${colorWhite};
    top: -20px;
    line-height: 21px;
    left: -10px;
  }
  input {
    color: ${colorWhite};
    font-size: 22px;
    width: 100%;
    padding-left: 0;
  }
`;
//

export const FormControlStyle = styled(FormControl)`
  background: ${colorAliceBlue};
  border-radius: 30px;
  width: 168px;

  & #demo-simple-select {
    border-radius: 30px;
    overflow: hidden;
    padding-left: 20px;
    font-size: 14px;
    background: ${colorAliceBlue};
    border: none;
    width: 150px;
  }
  & .MuiSelect-select {
    color: #1d275f !important;
    font-weight: 500 !important;
  }
  .MuiOutlinedInput-notchedOutline {
    display: none !important;
  }
`;

// footer style
export const FooterStyle = styled.footer`
  background: ${colorCetaceanBlue};
  padding: 50px;
`;

export const CpSendEmailStyle = styled.div`
  position: relative;
  padding: 10px;
  border-radius: 45px;
  background: ${colorWhite};
  display: flex;
  align-items: center;
  gap: 30px;
  width: 364px;
  & input {
    border: none;
    font-size: 12px;
    width: 144px;
    margin-left: 15px;
  }
  & .button_send_email {
    background: ${colorElectricPink} !important;
    font-size: 12px;
    font-weight: 400;
    border-radius: 50px;
    color: ${colorWhite};
    display: flex;
    width: 302px;
    height: 45px;
  }
`;

export const FormHeaderStyle = styled.div`
  width: 80%;
  position: absolute;
  bottom: -82px;
  background: ${colorIndigo};
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  overflow: hidden;
  padding: 50px 60px;
`;

export const AppBarStyle = styled(AppBar)`
  background: transparent;
  position: absolute;
  box-shadow: none;
  padding: 0 150px;
  top: 24px;
`;

export const ButtonLoginStyle = styled(Link)`
  padding: 10px 30px;
  border-radius: 50px;
  border: 1px solid ${colorWhite};
  color: ${colorWhite};
  line-height: 21px;
`;

export const BoxPaginationStyle = styled(Box)`
  margin: 50px auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;
