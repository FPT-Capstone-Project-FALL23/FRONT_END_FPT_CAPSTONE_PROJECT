import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Box,
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
  TextField,
} from "@mui/material";
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import ApiCommon from "../../API/Common/ApiCommon";
import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
  setLocalStorageUserInfo,
} from "../../Store/userStore";
import { DATA_EVENT_TYPE } from "../../Assets/Constant/Client/dataClient";
import { MENUPROPS } from "../../Assets/Constant/Client/constClient";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const handleFileInputChange = (e, setSelectedFile, setAvatar) => {
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

function ProfileClient() {
  const theme = useTheme();
  const [eventType, setEventType] = useState([]);
  const today = new Date().toISOString().slice(0, 10);
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();
  console.log("dataInfo: ", dataInfo);
  const [avatar, setAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("selectedFile: ", selectedFile);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleIconClick = () => {
    // Kích hoạt sự kiện click trên thẻ input
    fileInputRef.current.click();
  };

  const [clientInfo, setClientInfo] = useState({
    email: dataUser.email,
    full_name: dataInfo?.full_name,
    phone: dataInfo?.phone,
    birthday: today,
    gender: dataInfo?.gender,
    favorit_enres: dataInfo?.favorit_enres,
  });
  console.log("clientInfo: ", clientInfo);

  console.log(clientInfo);

  // Hàm xử lý khi người dùng nhập dữ liệu vào input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name: ", name);
    // Cập nhật state tương ứng với input được thay đổi
    setClientInfo((clientInfo) => ({
      ...clientInfo,
      [name]: value,
    }));
  };
  const callApiProfile = async (base64EncodedImage, _idUser, clientInfo) => {
    try {
      const respone = await ApiCommon.profileClient({
        _idUser: _idUser,
        clientInfo: clientInfo,
        avatarImage: base64EncodedImage,
      });
      await setLocalStorageUserInfo(respone.data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClientInfo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatarImage", selectedFile);
    try {
      const _idUser = dataUser._id;
      const dataUpdate = {
        avatarImage: avatar || "",
        _idClient: dataInfo?._id,
        clientInfo: {
          full_name: clientInfo?.full_name || "",
          phone: clientInfo?.phone || "",
          birthday: clientInfo.birthday || "",
          gender: clientInfo.gender || "",
          favorit_enres: clientInfo.favorit_enres || "",
        },
      };
      const response = await ApiCommon.updateProfileClient(dataUpdate);
      if (response?.status) {
        setLocalStorageUserInfo(response.data);
      }
      console.log("response: ", response);
      if (!selectedFile) {
        callApiProfile(null, _idUser, clientInfo);
      }
      // const reader = new FileReader();
      // reader.readAsDataURL(selectedFile);

      // reader.onloadend = () => {
      //   callApiProfile(reader.result, _idUser, clientInfo);
      // };
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Grid style={{ display: "flex", justifyContent: "center" }}>
        <h1>Profile Client</h1>
      </Grid>
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
                disabled={true}
                type="text"
                name="email"
                placeholder="email"
                value={clientInfo.email}
                onChange={handleInputChange}
                label="Email"
              />
            </Stack>
            <Stack>
              <InputCustom
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={clientInfo?.full_name}
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
              <TextField
                type="text"
                name="phone"
                value={clientInfo.phone}
                onChange={handleInputChange}
                label="Phone number"
              />
            </Stack>
            <Stack>
              <TextField
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
                  name="favorit_enres"
                  value={clientInfo?.favorit_enres}
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
              </FormControl>{" "}
              <ButtonCustom
                type="button"
                onClick={() => navigate("/change-password")}
                color="black"
                content="Update password"
                backgroundcolor="#F5BD19"
              />
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
                onChange={(e) =>
                  handleFileInputChange(e, setSelectedFile, setAvatar)
                }
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
          {/* <div>
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
          </div> */}

          <Stack style={{ width: "50%", marginTop: "20px" }}>
            <ButtonCustom
              color="black"
              content="Update Information"
              backgroundcolor="#F5BD19"
            />
          </Stack>
        </Grid>
      </FormSubmit>
    </>
  );
}

export default ProfileClient;
