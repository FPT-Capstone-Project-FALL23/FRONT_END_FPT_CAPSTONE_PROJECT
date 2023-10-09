import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Avatar,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { useState, useRef } from "react";
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import ClientAvt from "../../Assets/Images/Client.png";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import ApiCommon from "../../API/Common/ApiCommon";
import { getLocalStorageUserData } from "../../Store/userStore";

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

function ProfileClient() {
  const theme = useTheme();
  const [eventType, setEventType] = useState([]);
  const today = new Date().toISOString().slice(0, 10);
  const dataUser = getLocalStorageUserData();

  const [avatar, setAvatar] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    // Kích hoạt sự kiện click trên thẻ input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    // Xử lý việc chọn tệp ở đây và cập nhật giá trị của 'avatar'
    const selectedFile = e.target.files[0];
    console.log("a", selectedFile);
    setSelectedFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      // console.log("objectUrl", objectUrl);
      setAvatar(objectUrl);
    }
  };

  const [clientInfo, setClientInfo] = useState({
    full_name: "",
    phone: "",
    birthday: today,
    gender: "",
    interest: eventType,
  });

  // Hàm xử lý khi người dùng nhập dữ liệu vào input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Cập nhật state tương ứng với input được thay đổi
    setClientInfo({
      ...clientInfo,
      [name]: value,
    });
  };

  const handleClientInfo = async (e) => {
    e.preventDefault();
    console.log("clientInfo", clientInfo, clientInfo);
    try {
      const _idUser = dataUser._id;
      console.log("_idUser", _idUser);

      if (!selectedFile) {
        callApiProfile(null, _idUser, clientInfo);
      }
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = () => {
        callApiProfile(reader.result, _idUser, clientInfo);
      };
    } catch (error) {
      console.log("error", error);
    }
  };

  const callApiProfile = async (base64EncodedImage, _idUser, clientInfo) => {
    try {
      await ApiCommon.profileClient({
        _idUser: _idUser,
        clientInfo: clientInfo,
        avatarImage: base64EncodedImage,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <FormSubmit
        onSubmit={handleClientInfo}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "20px",
        }}>
        <Grid style={{ display: "flex", justifyContent: "space-around" }}>
          <Grid style={{ width: "40%" }}>
            <Stack>
              <InputCustom
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={clientInfo.full_name}
                onChange={handleInputChange}
                label="Full Name"
              />
            </Stack>
            <Stack
              direction="row"
              spacing={12}
              style={{ marginBottom: "20px" }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  name="gender"
                  value={clientInfo.gender}
                  onChange={handleInputChange}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label">
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>

            <Stack style={{ marginBottom: "20px" }}>
              <InputCustom
                type="text"
                name="phone"
                value={clientInfo.phone}
                onChange={handleInputChange}
                label="Phone number"
              />
            </Stack>
            <Stack>
              <InputCustom
                type="date"
                name="birthday"
                value={clientInfo.birthday}
                onChange={handleInputChange}
                label="Day of birth"
              />
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
                  name="interest"
                  value={clientInfo.interest}
                  onChange={handleInputChange}
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
                  MenuProps={MenuProps}>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, eventType, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid>
            <Stack>
              <Avatar
                style={{
                  height: "350px",
                  width: "350px",
                  marginBottom: "40px",
                }}
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

        <Grid
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
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
      </FormSubmit>
    </>
  );
}

export default ProfileClient;
