import React from "react";
import { ButtonCutomStyle } from "./style.const";

const ButtonCustom = ({ none = "0px" , backgroundcolor = "#8DD3BB", content, color }) => {
  return (
    <ButtonCutomStyle
      type="submit"
      style={{
        borderRadius:`${none}`,
        background: `${backgroundcolor}`,
        color: `${color}`
      }}
      variant="contained"
    >
      {content}
    </ButtonCutomStyle>
  );
};

export default ButtonCustom;
