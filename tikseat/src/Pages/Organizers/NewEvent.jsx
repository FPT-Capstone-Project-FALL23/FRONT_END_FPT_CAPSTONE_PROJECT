import React from "react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  TextareaAutosize,
  Button,
} from "@mui/material";
import InputCustom from "../../Components/Common/Input/InputCustom";


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

function getStyles(name, eventType, theme) {
  return {
    fontWeight:
      eventType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function NewEvent() {

  const navigate = useNavigate();

  const [eventType, setEventType] = useState([]);
  const theme = useTheme();
  const today = new Date().toISOString().slice(0, 10);

  const [eventName, setEventName] = useState("");
  const [typeOfEvent, setTypeOfEvent] = useState([]);
  const [eventDescription, setEventDescription] = useState("");
  const [startSaleDate, setStartSaleDate] = useState(today);
  const [endSaleDate, setEndSaleDate] = useState(today);

  console.log(eventName);
  console.log(typeOfEvent);
  console.log(eventDescription);
  console.log(startSaleDate);
  console.log(endSaleDate);

  const handleClientClick = () => {
    navigate("/second", {state: {eventName, typeOfEvent, eventDescription, startSaleDate, endSaleDate}})
  }

  // const [eventAddress, setEventAddress] = useState({
  //   city: "",
  //   district: "",
  //   ward: "",
  //   specific_address: "",
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventAddress((prevEventAddress) => ({
  //     ...prevEventAddress,
  //     [name]: value,
  //   }));
  // };

  return (
    <>
      <Grid fullwidth>
        <Grid style={{ display: "flex", justifyContent: "start" }}>
          <h2 style={{ marginTop: "0px" }}>New event</h2>
        </Grid>
        <Grid fullwidth>
          <Grid style={{ display: "flex", justifyContent: "space-around" }}>
            <Grid style={{ width: "100%" }}>
              <Stack
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Stack style={{ width: "48%" }}>
                  <InputCustom
                    type="text"
                    name="event_name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    label="Name event"
                  />
                </Stack>
                <Stack style={{ width: "48%" }}>
                  <FormControl fullWidth style={{ marginBottom: "20px" }}>
                    <InputLabel id="demo-multiple-chip-label">
                      Event Type
                    </InputLabel>
                    <Select
                      name="type_of_event"
                      labelId="demo-multiple-chip-label"
                      multiple
                      value={typeOfEvent}
                      onChange={(e) => setTypeOfEvent(e.target.value)}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Event Type"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
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
                          style={getStyles(name, eventType, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>

              {/* Địa chỉ */}
              {/* <Stack
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <Stack style={{ width: "48%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tỉnh/Thành Phố
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tỉnh/Thành Phố"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack style={{ width: "48%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Quận/Huyện
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Quận/Huyện"
                      onChange={handleInputChange}
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
                <Stack style={{ width: "48%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Xã/Phường
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Xã/Phường"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack style={{ width: "48%" }}>
                  <InputCustom type="text" label="Số nhà" />
                </Stack>
              </Stack> */}

              <Stack>
                <TextareaAutosize
                  fullWidth
                  minRows={6}
                  placeholder="Description"
                  name="event_description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </Stack>
              <Stack
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Stack style={{ width: "48%" }}>
                  <InputCustom
                    type="date"
                    id="start_sales_date"
                    name="start_sales_date"
                    value={startSaleDate}
                    onChange={(e) => setStartSaleDate(e.target.value)}
                    label="Start Date"
                  />
                </Stack>
                <Stack style={{ width: "48%" }}>
                  <InputCustom
                    type="date"
                    id="end_sales_date"
                    name="end_sales_date"
                    value={endSaleDate}
                    onChange={(e) => setEndSaleDate(e.target.value)}
                    label="End Date"
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <h2>Info Organizer</h2>
          <Grid>
            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Stack style={{ width: "48%" }}>
                <InputCustom
                  type="text"
                  // id="phone"
                  // name="phone"
                  // value={organizerInfo.phone}
                  // onChange={handleInputChange}
                  label="Name Organizer"
                />
              </Stack>
              <Stack style={{ width: "48%" }}>
                <InputCustom
                  type="text"
                  // id="phone"
                  // name="phone"
                  // value={organizerInfo.phone}
                  // onChange={handleInputChange}
                  label="Phone number"
                />
              </Stack>
            </Stack>
            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack style={{ width: "48%" }}>
                <InputCustom
                  type="text"
                  // id="phone"
                  // name="phone"
                  // value={organizerInfo.phone}
                  // onChange={handleInputChange}
                  label="Email"
                />
              </Stack>
              <Stack style={{ width: "48%" }}>
                <InputCustom type="text" label="WEBSITE" />
              </Stack>
            </Stack>
          </Grid>
          {/* <Link
            to={{
              pathname: "/second",
              state: {
                eventName,
                // typeOfEvent, // Sửa typeOfEvent
                // eventDescription,
                // startSaleDate,
                // endSaleDate,
              },
            }}
          >
            <p>Next</p>
          </Link> */}
          <Button onClick={() => handleClientClick()}>Next</Button>
          <Grid></Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default NewEvent;
