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
import { useState, useRef, useEffect  } from "react";
// import IconGG from "../../Components/Common/Icons/IconGG";
import { Link, Outlet } from "react-router-dom";
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import ClientAvt from "../../Assets/Images/Client.png";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";

function ProfileClient() {


  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [gender, setGender] = useState("F");
  const [birthDay, setBirthDay] = useState(getTodayDate())
  const [avatar, setAvatar] = useState(ClientAvt);

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    // Kích hoạt sự kiện click trên thẻ input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    // Xử lý việc chọn tệp ở đây và cập nhật giá trị của 'avatar'
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setAvatar(objectUrl);
    }
  };

  useEffect(() => {
    // Sử dụng useEffect để cập nhật giá trị mặc định của birthDay khi trang được tải
    setBirthDay(getTodayDate());
  }, []);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }   

  return (
    <>
      <form style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center"}}>
        <Grid style={{display:"flex", justifyContent:"space-around"}}>
          <Grid style={{width:"40%"}}>
            <Stack>
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

            <Stack style={{ marginBottom: "20px" }}>
              <InputCustom
                type="text"
                value={phoneNumber}
                setValue={setPhoneNumber}
                label="Phone number"
              />
            </Stack>  
            <Stack>
              <InputCustom
                type="date"
                value={birthDay}
                setValue={setBirthDay}
                label="Day of birth"
              />
            </Stack>        
          </Grid>
          {/* style={{display:"flex", flexDirection:"column", alignItems:"center"}} */}
          <Grid>
            <Stack>
              <Avatar
                style={{ height: "350px", width: "350px", marginBottom: "40px" }}
                alt="Remy Sharp"
                src={avatar}
              />
              <MonochromePhotosIcon
                style={{
                  marginLeft: "210px",
                  fontSize: "60px",
                  marginTop: "-80px",
                  position: "relative",
                }}
                onClick={handleIconClick}
              />
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
            </Stack>  
          </Grid>
        </Grid>

        <Grid style={{width:"100%", display:"flex", flexDirection:"column" ,alignItems:"center"}}>
          <div>
            <FormControlLabel
              style={{ fontSize: "14px", marginTop:"40px" }}
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
          <Stack style={{width:"50%"}}>
            <ButtonCustom
              color="black"
              content="Create account"
              backgroundcolor="#F5BD19"
            />
          </Stack>
        </Grid>
      </form>
    </>
  );
}

export default ProfileClient;
