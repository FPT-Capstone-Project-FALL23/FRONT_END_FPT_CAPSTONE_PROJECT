import React from "react";
import { useTheme } from "@mui/material/styles";
import { useState, useRef } from "react";
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
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import ClientAvt from "../../Assets/Images/Client.png";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import ApiCommon from "../../API/Common/ApiCommon";
import { MENUPROPS } from "../../Assets/Constant/Client/constClient";
import { DATA_EVENT_TYPE } from "../../Assets/Constant/Client/dataClient";

function getStyles(name, eventType, theme) {
  return {
    fontWeight:
      eventType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ProfileOrganizers() {
  const [avatar, setAvatar] = useState(ClientAvt);
  const [eventType, setEventType] = useState([]);
  const today = new Date().toISOString().slice(0, 10);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEventType(typeof value === "string" ? [value] : value);
  };

  const theme = useTheme();

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

  const [organizerInfo, setOrganizerInfo] = useState({
    organizer_name: "",
    organizer_type: eventType,
    isctive: false,
    phone: "",
    website: "",
    founded_date: today,
    description: "",
    address: {
      city: "Quảng Nam",
      district: "Quế Sơn",
      ward: "Đông Phú",
      specific_address: "Mỹ Đông",
    },
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Sử dụng spread operator để cập nhật state mà không làm thay đổi các thuộc tính khác
    setOrganizerInfo({
      ...organizerInfo,
      [name]: value,
    });
  };

  console.log(organizerInfo);

  const handleOrganizerInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.profileOrganizer({
        _idUser: "650d53992fb0b313f9ea058e",
        organizerInfo: organizerInfo,
      });
      console.log("data:", response.data);
      if (response.status === true) {
        console.log("Thanh cong");
      } else {
        console.log("erroe!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <FormSubmit
        onSubmit={handleOrganizerInfo}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        <Grid style={{ display: "flex", justifyContent: "space-around" }}>
          <Grid style={{ width: "45%" }}>
            <Stack>
              <InputCustom
                type="text"
                id="organizer_name"
                name="organizer_name"
                value={organizerInfo.organizer_name}
                onChange={handleInputChange}
                label="Organizer Name"
                // defaultValue = ""
              />
            </Stack>

            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Stack style={{ width: "47%" }}>
                <InputCustom
                  type="text"
                  id="phone"
                  name="phone"
                  value={organizerInfo.phone}
                  onChange={handleInputChange}
                  label="Phone number"
                />
              </Stack>
              <Stack style={{ width: "47%" }}>
                <InputCustom
                  type="date"
                  id="founded_date"
                  name="founded_date"
                  value={organizerInfo.founded_date}
                  onChange={handleInputChange}
                  label="Day of birth"
                />
              </Stack>
            </Stack>
            <Stack>
              <InputCustom
                type="text"
                id="website"
                name="website"
                value={organizerInfo.website}
                onChange={handleInputChange}
                label="Website"
              />
            </Stack>
            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}>
              <Stack style={{ width: "47%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tỉnh/Thành Phố
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tỉnh/Thành Phố"
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack style={{ width: "47%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Quận/Huyện
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Quận/Huyện"
                    onChange={handleChange}>
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
              }}>
              <Stack style={{ width: "47%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Xã/Phường
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Xã/Phường"
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack style={{ width: "47%" }}>
                <InputCustom type="text" label="Số nhà" />
              </Stack>
            </Stack>
            <Stack>
              <FormControl fullWidth style={{ marginBottom: "20px" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Event Type
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  multiple
                  id="organizer_type"
                  name="organizer_type"
                  value={organizerInfo.organizer_type}
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
                  MenuProps={MENUPROPS}>
                  {DATA_EVENT_TYPE.map((name) => (
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

          <Grid
            style={{ width: "45%", display: "flex", flexDirection: "column" }}>
            <Grid
              style={{
                width: "100%",
                marginBottom: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
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
                id="description"
                name="description"
                value={organizerInfo.description}
                onChange={handleInputChange}
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
          }}>
          <div>
            <FormControlLabel
              style={{ fontSize: "14px", marginTop: "20px" }}
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

export default ProfileOrganizers;
