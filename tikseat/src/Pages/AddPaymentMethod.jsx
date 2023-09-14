import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputCustom from "../Components/input/InputCustom";
import axios from "axios";
import { environment } from "../environment/environment";
import ButtonCustom from "../Components/button/ButtonCustom";

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
      const newDate = {};
      const response = await axios.post(environment.apiUrl, newDate);
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
      <span
        style={{
          marginTop: "20px",
          fontStyle: "italic",
          display: "flex",
          alignItems: "center",
        }}
      >
        <KeyboardArrowLeftIcon /> <span>Back</span>
      </span>
      <Typography
        variant="h4"
        component={"h5"}
        style={{ marginTop: "20px", fontStyle: "italic" }}
      >
        Add a payment method
      </Typography>

      <Box style={{ color: "#112211", marginTop: "20px" }}>
        Let’s get you all st up so you can access your personal account.
      </Box>
      <Box>
        <Box
          onSubmit={handleAddPayment}
          component="form"
          noValidate
          autoComplete="off"
          style={{ marginTop: "30px" }}
        >
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
              <span style={{ fontSize: "14px" }}>
                Securely save my information for 1-click checkout
              </span>
            }
          />
          <ButtonCustom content="Add payment method" color="#8DD3BB" />
        </Box>
        <div
          style={{
            padding: "20px 150px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              width: "500px",
              margin: "0 auto",
              color: "#112211",
            }}
          >
            By confirming your subscription, you allow The Outdoor Inn Crowd
            Limited to charge your card for this payment and future payments in
            accordance with their terms. You can always cancel your
            subscription.
          </p>
        </div>
      </Box>
    </div>
  );
};

export default AddPaymentMethod;
