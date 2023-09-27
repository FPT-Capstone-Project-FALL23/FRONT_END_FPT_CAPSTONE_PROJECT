import React from "react";
import {
  Box,
  Paper,
  Grid,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Avatar,
} from "@mui/material";
import styled from "styled-components";
import { useState, useRef } from "react";
import IconGG from "../Components/Icons/IconGG";
import { Link, Outlet } from "react-router-dom";
import InputCustom from "../Components/input/InputCustom";
import ButtonCustom from "../Components/button/ButtonCustom";

function ProfileClient() {

    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [gender, setGender] = useState("F");
    const [birthDay, setBirthDay] = useState("");
    // const [avatar, setAvatar] = useState(ClientAvt);

    // const fileInputRef = useRef(null);

    // const handleIconClick = () => {
    //     // Kích hoạt sự kiện click trên thẻ input
    //     fileInputRef.current.click();
    // };
    
    // const handleFileInputChange = (e) => {
    //     // Xử lý việc chọn tệp ở đây và cập nhật giá trị của 'avatar'
    //     const selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //     const objectUrl = URL.createObjectURL(selectedFile);
    //     setAvatar(objectUrl);
    //     }
    // };

  return (
    <>
      <form>
        <Stack direction="row" spacing={12}>
          <InputCustom
            type="text"
            value={fullName}
            setValue={setFullName}
            label="Full Name"
          />
        </Stack>
        <Stack direction="row" spacing={12} style={{ marginBottom: "20px" }}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="O" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={6}>
          <InputCustom
            type="text"
            value={phoneNumber}
            setValue={setPhoneNumber}
            label="Phone number"
          />
          <InputCustom
            type="date"
            value={birthDay}
            setValue={setBirthDay}
            label="Day of birth"
          />
        </Stack>
        <div>
          <FormControlLabel
            style={{ fontSize: "14px" }}
            control={<Checkbox />}
            label={
              <span>
                I agree to all the{" "}
                <span style={{ color: "#F5BD19" }}>Terms</span> and
                <span style={{ color: "#F5BD19" }}> Privacy Policies</span>
              </span>
            }
          />
        </div>
        <ButtonCustom
          color="black"
          content="Create account"
          backgroundcolor="#F5BD19"
        />
      </form>
    </>
  );
}

export default ProfileClient;
