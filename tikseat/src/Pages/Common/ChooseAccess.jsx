import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Stack } from "@mui/material";
import medico from "../../Assets/Images/medico.png";
import {
  BACK_TO_LOGIN,
  CHOOSE_ACCESS,
  SELECT_ORGANIZERS,
  SELECT_USER,
  TITLE_PAGE,
} from "../../Assets/Constant/Common/constChooseAccess";
import {
  BackToPageStyle,
  ChooseItemStyle,
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/Style/style.const";
const ChooseAccess = () => {
  return (
    <>
      <BackToPageStyle to={"/login"}>
        <KeyboardArrowLeftIcon /> <span>{BACK_TO_LOGIN}</span>
      </BackToPageStyle>
      <PageNameStyle variant="h4" component={"h5"}>
        {CHOOSE_ACCESS}
      </PageNameStyle>
      <TitlePageStyle>{TITLE_PAGE}</TitlePageStyle>
      <Stack
        justifyContent={"space-evenly"}
        alignItems={"center"}
        direction={"row"}
        style={{ marginTop: "100px" }}>
        <ChooseItemStyle>
          <div>
            <img src={medico} alt="" />
          </div>
          <span>{SELECT_USER}</span>
        </ChooseItemStyle>
        <ChooseItemStyle>
          <div>
            <img src={medico} alt="" />
          </div>
          <span>{SELECT_ORGANIZERS}</span>
        </ChooseItemStyle>
      </Stack>
    </>
  );
};

export default ChooseAccess;
