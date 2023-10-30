import React, { useEffect } from "react";
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
  Autocomplete,
  TextField,
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
import ApiCity from "../../API/City/ApiCity";
import {
  getLocalStorageUserData,
  setLocalStorageUserInfo,
} from "../../Store/userStore";
import { handleFileInputChange } from "../Client/ProfileClient";
// import { Api } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function getStyles(name, eventType, theme) {
  return {
    fontWeight:
      eventType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

/*======CALL API SET QUẬN HUYỆN KHI CHỌN THÀNH PHỐ=====*/
export const handleChangeCity = async (
  event,
  newValue,
  setSelectCity,
  setAllDistrictsOfCity,
  setAllWardsOfDistricts,
  setSelectDistrict,
  setSelectWard
) => {
  setSelectCity(newValue);
  if (newValue) {
    const codeCity = newValue.code;
    const response = await ApiCity.getDistrict(codeCity);
    setAllDistrictsOfCity(response.districts);
  } else {
    setAllDistrictsOfCity([]);
    setAllWardsOfDistricts([]);
    setSelectDistrict({
      code: "",
      name: "",
      division_type: "",
      codename: "",
      province_code: "",
      wards: [],
    });
    setSelectWard({
      code: "",
      codename: "",
      district_code: "",
      division_type: "",
      name: "",
    });
  }
};

/*======CALL API SET PHƯỜNG XÃ KHI CHỌN QUẬN HUYỆN=====*/
export const handleChangeDistrict = async (
  event,
  newValue,
  setSelectDistrict,
  setAllWardsOfDistricts,
  setSelectWard
) => {
  setSelectDistrict(newValue);
  if (newValue) {
    const codeDistrict = newValue.code;
    const respones = await ApiCity.getWards(codeDistrict);
    setAllWardsOfDistricts(respones.wards);
  } else {
    setAllWardsOfDistricts([]);
    setSelectWard({
      code: "",
      codename: "",
      district_code: "",
      division_type: "",
      name: "",
    });
  }
};

/*======SET QUẬN HUYỆN=====*/
export const handleChangeWard = (event, newValue, setSelectWard) => {
  setSelectWard(newValue);
};

/*======CALL API SET THÀNH PHỐ=====*/
export const getAPICity = async (setAllCity) => {
  const response = await ApiCity.getCity();
  setAllCity(response);
};

function ProfileOrganizers() {
  const dataUser = getLocalStorageUserData();
  const [avatar, setAvatar] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [eventType, setEventType] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [allDistrictsOfCity, setAllDistrictsOfCity] = useState([]);
  const [allWardsOfDistricts, setAllWardsOfDistricts] = useState([]);
  const today = new Date().toISOString().slice(0, 10);

  const [selectCity, setSelectCity] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [selectWard, setSelectWard] = useState(null);

  const [organizerInfo, setOrganizerInfo] = useState({
    organizer_name: "",
    organizer_type: eventType,
    isctive: false,
    phone: "",
    website: "",
    founded_date: today,
    description: "",
    address: {
      city: selectCity?.name,
      district: selectDistrict?.name,
      ward: selectWard?.name,
      specific_address: "",
    },
  });

  console.log(organizerInfo);

  const theme = useTheme();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleIconClick = () => {
    // Kích hoạt sự kiện click trên thẻ input
    fileInputRef.current.click();
  };

  //call api khi mở trang để lấy thành phố
  useEffect(() => {
    getAPICity(setAllCity);
  }, []);

  //thêm thành phố, quận huyện, phường xã khi có thay đổi của nớ
  useEffect(() => {
    setOrganizerInfo((prevOrganizerInfo) => ({
      ...prevOrganizerInfo,
      address: {
        city: selectCity?.name,
        district: selectDistrict?.name,
        ward: selectWard?.name,
        specific_address: null,
      },
    }));
  }, [selectCity, selectDistrict, selectWard]);

  const handleInputChange = (name, value) => {
    // const { name, value } = event.target;
    // Sử dụng spread operator để cập nhật state mà không làm thay đổi các thuộc tính khác
    setOrganizerInfo({
      ...organizerInfo,
      [name]: value,
    });
  };

  const handleSpecificAddressChange = (value) => {
    setOrganizerInfo({
      ...organizerInfo,
      address: {
        ...organizerInfo.address,
        specific_address: value,
      },
    });
  };

  const handleOrganizerInfo = async (e) => {
    e.preventDefault();
    try {
      const _idUser = dataUser._idUser;
      if (!selectedFile) {
        callApiProfileOrganizers(null, _idUser, organizerInfo);
      }
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = () => {
        callApiProfileOrganizers(reader.result, _idUser, organizerInfo);
      };
    } catch (error) {
      console.log("error", error);
    }
  };

  const callApiProfileOrganizers = async (
    base64EncodedImage,
    _idUser,
    organizerInfo
  ) => {
    try {
      const respone = await ApiCommon.profileOrganizer({
        _idUser: _idUser,
        organizerInfo: organizerInfo,
        avatarImage: base64EncodedImage,
      });
      setLocalStorageUserInfo(respone.data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid style={{ display: "flex", justifyContent: "center" }}>
        <h1>Profile Organizer</h1>
      </Grid>
      <FormSubmit
        onSubmit={handleOrganizerInfo}
        style={{
          width: "100%",
          height: "90%",
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
                id="organizer_name"
                name="organizer_name"
                value={organizerInfo.organizer_name}
                setValue={(value) => handleInputChange("organizer_name", value)}
                label="Organizer Name"
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
                  id="phone"
                  name="phone"
                  value={organizerInfo.phone}
                  setValue={(value) => handleInputChange("phone", value)}
                  label="Phone number"
                />
              </Stack>
              <Stack style={{ width: "47%" }}>
                <InputCustom
                  type="date"
                  id="founded_date"
                  name="founded_date"
                  value={organizerInfo.founded_date}
                  setValue={(value) => handleInputChange("founded_date", value)}
                  label="Founded Date"
                />
              </Stack>
            </Stack>
            <Stack>
              <InputCustom
                type="text"
                id="website"
                name="website"
                value={organizerInfo.website}
                setValue={(value) => handleInputChange("website", value)}
                label="Website"
              />
            </Stack>
            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Stack style={{ width: "47%" }}>
                <FormControl fullWidth>
                  <Autocomplete
                    freeSolo
                    id="select-city"
                    options={allCity}
                    value={selectCity}
                    onChange={(event, newValue) =>
                      handleChangeCity(
                        event,
                        newValue,
                        setSelectCity,
                        setAllDistrictsOfCity,
                        setAllWardsOfDistricts,
                        setSelectDistrict,
                        setSelectWard
                      )
                    }
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} required label="City" />
                    )}
                  />
                </FormControl>
              </Stack>
              <Stack style={{ width: "47%" }}>
                <FormControl fullWidth>
                  <Autocomplete
                    freeSolo
                    id="select-districts"
                    options={allDistrictsOfCity}
                    value={selectDistrict}
                    onChange={(event, newValue) =>
                      handleChangeDistrict(
                        event,
                        newValue,
                        setSelectDistrict,
                        setAllWardsOfDistricts,
                        setSelectWard
                      )
                    }
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} required label="Districts" />
                    )}
                  />
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
                  <Autocomplete
                    freeSolo
                    id="select-wards"
                    value={selectWard}
                    onChange={(event, newValue) =>
                      handleChangeWard(event, newValue, setSelectWard)
                    }
                    getOptionLabel={(option) => option.name}
                    options={allWardsOfDistricts}
                    renderInput={(params) => (
                      <TextField {...params} required label="Wards" />
                    )}
                  />
                </FormControl>
              </Stack>
              <Stack style={{ width: "47%" }}>
                <InputCustom
                  type="text"
                  name="specific_address"
                  value={organizerInfo.address.specific_address}
                  setValue={(value) => handleSpecificAddressChange(value)}
                  label="Specific address"
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
                  multiple
                  id="organizer_type"
                  name="organizer_type"
                  value={organizerInfo.organizer_type}
                  onChange={(e) =>
                    setOrganizerInfo({
                      ...organizerInfo,
                      organizer_type: e.target.value,
                    })
                  }
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
                  MenuProps={MENUPROPS}
                >
                  {DATA_EVENT_TYPE.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, eventType, theme)}
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
                onChange={(e) =>
                  handleFileInputChange(e, setSelectedFile, setAvatar)
                }
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
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
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
            bottom: "10px",
          }}
        >
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
