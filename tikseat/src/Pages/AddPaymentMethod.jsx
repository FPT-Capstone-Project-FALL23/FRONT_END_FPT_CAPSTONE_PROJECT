import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import InputCustom from "Components/input/InputCustom";
import { environment } from "environment/environment";
import ButtonCustom from "Components/button/ButtonCustom";
import {
  ADD_PAYMENT_METHOD,
  BACK,
  CONTENT_INTRODUCTION,
  SECURELY_SAVE_MY_INFO,
  TITLE_PAGE,
} from "Assets/Constant/constAddPayment";
import ApiCommon from "API/ApiCommon";
import {
  BackToPageStyle,
  ContentIntroductionStyle,
  PageNameStyle,
  TitlePageStyle,
} from "style/style.const";
import FormSubmit from "Components/formCustom/FormSubmit";

const currencies = [];
const AddPaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [CVCard, setCVCard] = useState(null);
  const [nameCard, setNameCard] = useState(null);
  const [date, setDate] = useState(new Date().toLocaleString());
  const formatCardNumber = (input) => {
    const digitsOnly = input.replace(/\D/g, "");

    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  };
  const handleCardNumberChange = (event) => {
    const input = event.target.value;
    const format = formatCardNumber(input);
    console.log("format: ", format);
    setCardNumber(format);
  };
  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const newData = {};
      const response = await ApiCommon.addPayment(newData);
      console.log("environment: ", environment);
      if (response.status === 200) {
      } else {
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div>
      <BackToPageStyle to={"/"}>
        <KeyboardArrowLeftIcon /> <span>{BACK}</span>
      </BackToPageStyle>
      <PageNameStyle variant="h4" component={"h5"}>
        {ADD_PAYMENT_METHOD}
      </PageNameStyle>

      <TitlePageStyle>{TITLE_PAGE}</TitlePageStyle>
      <Box>
        <FormSubmit onSubmit={handleAddPayment} style={{ marginTop: "30px" }}>
          <InputCustom
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            type="text"
            setValue={handleCardNumberChange}
            label="Card Number"
          />

          <Stack direction="row" spacing={6}>
            <InputCustom
              type="date"
              setValue={setDate}
              label="Exp. Date"
              defaultValue={date}
            />
            <InputCustom type="text" setValue={setCVCard} label="CVC" />
          </Stack>
          <InputCustom
            type="text"
            setValue={setNameCard}
            label="Name on Card"
          />

          <TextField
            id="outlined-select-currency"
            select
            label="Country or Region"
            defaultValue="EUR"
            helperText="Please select your currency"
            style={{ width: "100%" }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            style={{ fontSize: "14px", display: "block" }}
            control={<Checkbox />}
            label={
              <span style={{ fontSize: "14px" }}>{SECURELY_SAVE_MY_INFO}</span>
            }
          />
          <ButtonCustom content="Add payment method" color="#8DD3BB" />
        </FormSubmit>
        <ContentIntroductionStyle>
          <p>{CONTENT_INTRODUCTION}</p>
        </ContentIntroductionStyle>
      </Box>
    </div>
  );
};

export default AddPaymentMethod;
