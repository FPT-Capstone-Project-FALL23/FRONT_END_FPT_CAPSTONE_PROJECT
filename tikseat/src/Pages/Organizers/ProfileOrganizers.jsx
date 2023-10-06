import React from "react";
import { useTheme } from "@mui/material/styles";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  MenuItem,
  Avatar,
} from "@mui/material";
import styled from "styled-components";
// import IconGG from "../../Components/Common/Icons/IconGG";
import { Link, Outlet } from "react-router-dom";
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import ClientAvt from "../../Assets/Images/Client.png";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ProfileOrganizers() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [avatar, setAvatar] = useState(ClientAvt);
  const [birthDay, setBirthDay] = useState(getTodayDate());

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
      <form
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid style={{ display: "flex", justifyContent: "space-around" }}>
          <Grid style={{ width: "45%" }}>
            <Stack>
              <InputCustom
                type="text"
                value={fullName}
                setValue={setFullName}
                label="Full Name"
              />
            </Stack>

            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack style={{ width: "47%" }}>
                <InputCustom
                  type="text"
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                  label="Phone number"
                />
              </Stack>
              <Stack style={{ width: "47%" }}>
                <InputCustom
                  type="date"
                  value={birthDay}
                  setValue={setBirthDay}
                  label="Day of birth"
                />
              </Stack>
            </Stack>
            <Stack>
              <InputCustom
                type="text"
                value={fullName}
                setValue={setFullName}
                label="Website"
              />
            </Stack>
            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom:"20px"
              }}
            >
              <Stack style={{ width: "47%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tỉnh/Thành Phố</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tỉnh/Thành Phố"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack style={{ width: "47%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Quận/Huyện"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack style={{ width: "47%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Xã/Phường</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Xã/Phường"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack style={{ width: "47%" }}>
                <InputCustom
                  type="text"
                  label="Số nhà"
                />
              </Stack>
            </Stack>
            <Stack>
              <FormControl fullWidth style={{ marginBottom: "20px" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Event Type
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Event Type"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid
            style={{ width: "45%", display: "flex", flexDirection: "column" }}
          >
            <Grid
              style={{
                width: "100%",
                marginBottom: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                style={{ height: "300px", width: "300px" }}
                alt="Remy Sharp"
                src={avatar}
              />
              <MonochromePhotosIcon
                style={{
                  marginLeft: "185px",
                  fontSize: "60px",
                  marginTop: "-50px",
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
            </Grid>
            <Stack>
              <TextareaAutosize
                style={{ width: "100%" }}
                minRows={6}
                placeholder="Description"
              />
            </Stack>
          </Grid>
        </Grid>

        <Grid
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bottom: "10px",
          }}
        >
          <div>
            <FormControlLabel
              style={{ fontSize: "14px", marginTop: "40px" }}
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
          <Stack style={{ width: "50%" }}>
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

export default ProfileOrganizers;
