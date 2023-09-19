import React from "react";
import { ButtonCutomStyle } from "./style.const";

const ButtonCustom = ({ color = "#8DD3BB", content }) => {
  return (
    <ButtonCutomStyle
      type="submit"
      style={{
        background: `${color}`,
      }}
      variant="contained"
    >
      {content}
    </ButtonCutomStyle>
  );
};

export default ButtonCustom;
