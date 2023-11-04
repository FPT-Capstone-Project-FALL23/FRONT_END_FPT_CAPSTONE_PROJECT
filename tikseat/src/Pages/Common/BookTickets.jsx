import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NAME_LOGO } from "../../Assets/Constant/Common/constCommon";
import IconStar from "../../Components/Common/Icons/IconStar";
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import IconCircle from "../../Components/Common/Icons/IconCircle";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  getLocalStorageUserData,
  setLocalStorageUserData,
  setLocalStorageUserInfo,
} from "../../Store/userStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { navItems } from "../../Assets/Constant/Common/dataCommon";
import { colorBlack, colorWhite } from "../../Assets/CSS/Style/theme";
import ApiCommon from "../../API/Common/ApiCommon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  // pt: 2,
  // px: 4,
  // pb: 3,
};

// const selectRows = [
//   {
//     type: "normal",
//     chair_name: "A12",
//     id: 1,
//     price: 50000,
//   },
//   {
//     type: "normal",
//     chair_name: "A13",
//     id: 2,
//     price: 50000,
//   },
//   {
//     type: "pair",
//     chair_name: "A14",
//     id: 3,
//     price: 50000,
//   },
//   {
//     type: "pair",
//     chair_name: "H12",
//     id: 4,
//     price: 50000,
//   },
//   {
//     type: "pair",
//     chair_name: "A14",
//     id: 5,
//     price: 50000,
//   },
//   {
//     type: "pair",
//     chair_name: "H12",
//     id: 6,
//     price: 50000,
//   },
// ];

const BookTickets = () => {
  const { id: idEvent } = useParams();
  const [age, setAge] = useState("");
  const [dataEventDetail, setDataEventDetail] = useState({});
  const [selectRows, setSelectRows] = useState([]);
  console.log("selectRows: ", selectRows);
  const [organizer, setOrganizer] = useState("");
  console.log("dataEventDetail: ", dataEventDetail);
  const navigate = useNavigate();
  const dataUser = getLocalStorageUserData();
  const [selectChair, setSelectChair] = useState([]);
  console.log("selectChair: ", selectChair);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  console.log("selectChair: ", selectChair);
  const [checkDay, setCheckDay] = useState(1);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setTime(600);
  };
  const handleClose = () => {
    setOpen(false);
    setTime(0);
  };

  useEffect(() => {
    if (idEvent) {
      async function getEventDetail() {
        const response = await ApiCommon.geDetailEvent({ _idEvent: idEvent });
        setDataEventDetail(response.event);
        setOrganizer(response.organizer);
        console.log("response: ", response);
      }
      getEventDetail();
    }
  }, [idEvent]);
  const ManagementUser = [
    { content: `Xin chào ${dataUser?.email}` },
    { url: "/createProfileClient", content: "Quản lý hồ sơ" },
    { url: "/login", content: "Đăng xuất" },
  ];
  const [value, setValue] = React.useState("1");

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const totalByTicket = selectChair.reduce(
    (accumulator, seat) => accumulator + seat.price,
    0
  );

  const [time, setTime] = useState(null); // 10 phút = 600 giây
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (time === 0) {
      setOpen(false);
    }
    const intervalId = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        const min = Math.floor(time / 60);
        const sec = time % 60;
        setMinutes(min);
        setSeconds(sec);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const eventDate = new Date(dataEventDetail?.sales_date?.start_sales_date); // Đặt ngày và giờ diễn ra sự kiện
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = eventDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [eventDate]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          background: "white",
          position: "relative",
          padding: "0 150px",
          color: "black",
        }}
        component="nav"
      >
        <Toolbar style={{ width: "100%", justifyContent: "space-between" }}>
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                gap: "40px",
                alignItems: "center",
              },
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex", gap: "30px" } }}>
              {navItems?.map((item, index) => (
                <Link
                  to={item.url}
                  key={index}
                  style={{ color: `${colorBlack}`, fontWeight: "500" }}
                >
                  {item.title}
                </Link>
              ))}
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {ManagementUser?.map((item, index) => {
                if (!item?.url) {
                  return (
                    <MenuItem
                      style={{
                        cursor: "text",
                        backgroundColor: "transparent",
                      }}
                      key={index}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography
                        textAlign="center"
                        onClick={() => navigate(item?.url)}
                      >
                        {item.content}
                      </Typography>
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      style={{ color: "black" }}
                      onClick={() => {
                        if (item?.url === "/login") {
                          navigate(item?.url);
                          setLocalStorageUserData("");
                          setLocalStorageUserInfo("");
                        } else {
                          navigate(item?.url);
                        }
                      }}
                    >
                      {item.content}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <div
        style={{
          width: "100%",
          position: "relative",
          background: `url(${dataEventDetail?.type_layout}) no-repeat center `,
          height: "550px",
          backgroundSize: "cover",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "rgb(0 0 0 / 84%)",
            position: "absolute",
          }}
        ></div>
        <Stack
          direction={"row"}
          gap={"40px"}
          style={{
            margin: "0 auto",
            position: "relative",
            zIndex: "2",
            width: "80%",
            height: "100%",
          }}
        >
          <div style={{ width: "400px" }}>
            <img alt="" loading="lazy" src={dataEventDetail?.eventImage} />
          </div>
          <Stack direction={"row"} gap={"20px"} alignContent={"center"}>
            <Stack
              direction={"column"}
              flex={1}
              padding={"20px 0"}
              color={"white"}
            >
              <Chip
                color="primary"
                style={{
                  fontWeight: "700",
                  width: "max-content",
                  borderRadius: "10px",
                }}
                label="K"
              />
              <Typography variant="h3" marginTop={"20px"}>
                {dataEventDetail?.event_name}
              </Typography>

              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={"10px"}
                marginTop={"10px"}
              >
                <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                  <Typography>
                    {dataEventDetail.event_location?.specific_address}
                  </Typography>
                  -
                  <Typography>
                    {dataEventDetail?.event_location?.ward}
                  </Typography>
                  -
                  <Typography>
                    {dataEventDetail?.event_location?.district}
                  </Typography>
                  -
                  <Typography>
                    {dataEventDetail?.event_location?.city}
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                variant="h5"
                fontStyle={"italic"}
                color={"white"}
                margin={"20px 0"}
              >
                {organizer}
              </Typography>

              <Typography
                variant="h4"
                fontStyle={"italic"}
                color={"white"}
                margin={"20px 0"}
              >
                {dataEventDetail?.type_of_event}
              </Typography>
            </Stack>
            <Stack direction={"column"} gap={"20px"} style={{ margin: "auto" }}>
              <Stack direction={"row"} gap={"10px"}>
                <Stack
                  direction={"column"}
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "green",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">{timeLeft.days}</Typography>
                  <Typography variant="body2">Day</Typography>
                </Stack>
                <Stack
                  direction={"column"}
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "green",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">{timeLeft.hours}</Typography>
                  <Typography variant="body2">hours</Typography>
                </Stack>
                <Stack
                  direction={"column"}
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "green",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">{timeLeft.minutes}</Typography>
                  <Typography variant="body2">minutes</Typography>
                </Stack>
                <Stack
                  direction={"column"}
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "green",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">{timeLeft.seconds}</Typography>
                  <Typography variant="body2">seconds</Typography>
                </Stack>
              </Stack>
              <Stack
                style={{
                  padding: "20px",
                  borderRadius: "10px",
                  background: "white",
                  color: "black",
                  height: "max-content",
                  margin: "auto",
                }}
              >
                <Stack direction={"row "} gap={"10px"} gridColumn={"10px"}>
                  <span
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "100%",
                      background: "skyblue",
                      color: "green",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CalendarMonthIcon />
                  </span>
                  <Stack direction={"column"}>
                    <Typography>Time: </Typography>
                    <Stack direction={"row"} gap={"10px"}>
                      <Typography>
                        {new Date(
                          dataEventDetail?.sales_date?.start_sales_date
                        ).toLocaleDateString()}
                      </Typography>{" "}
                      -
                      <Typography>
                        {new Date(
                          dataEventDetail?.sales_date?.end_sales_date
                        ).toLocaleDateString()}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} gap={"10px"}>
                      <Typography>9:00 morning - 5:00 afternoon</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Grid
          style={{
            margin: "100px auto",
            position: "relative",
            zIndex: "2",
            width: "80%",
            height: "100%",
          }}
          container
          spacing={2}
        >
          <Grid item xs={8}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                >
                  <Tab label="About" value="1" />
                  <Tab label="Ticket infomation" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {" "}
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h4">About</Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    alignSelf={"center"}
                  >
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="medium">
                      {/* <InputLabel id="demo-select-small-label">Age</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={age || 10}
                        defaultValue={10}
                        // label="Thanh Pho"
                        onChange={handleChange}
                        // IconComponent={<LocationOnIcon />}
                      >
                        <MenuItem value={10}>Thanh pho HCM</MenuItem>
                        <MenuItem value={20}>THanh pho HN</MenuItem>
                        <MenuItem value={30}>Thanh Pho hai phong</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      startIcon={<MyLocationIcon />}
                      size="medium"
                      variant="outlined"
                      style={{ height: "max-content", padding: "15px 20px" }}
                    >
                      Gần bạn
                    </Button>
                  </Stack>
                </Stack>
                <Stack>{dataEventDetail?.event_description}</Stack>
              </TabPanel>
              <TabPanel value="2">
                <Stack>
                  <Stack marginTop={"30px"} direction={"column"} gap={"20px"}>
                    {dataEventDetail?.event_date?.length > 0 &&
                      dataEventDetail?.event_date[0]?.event_areas.map(
                        (item, index) => {
                          return (
                            <Stack
                              key={index}
                              direction={"column"}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleOpen();
                                setSelectRows(item?.rows);
                              }}
                            >
                              <Typography variant="h4">
                                {item.name_areas}
                              </Typography>
                              <Divider />
                            </Stack>
                          );
                        }
                      )}
                  </Stack>
                  <ModalStyled open={open} onClose={handleClose}>
                    <Box sx={{ ...style, width: "70%" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "60px",
                          background: "#a9a90a",
                          display: "flex",
                          fontWeight: "bold",
                          color: "white",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            left: "10px",
                            color: "white",
                            zIndex: 2,
                            display: "flex",
                            height: "30px",
                            width: "30px",
                          }}
                          onClick={handleClose}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </div>
                        <span>Buy ticket</span>
                      </div>
                      <Stack
                        direction={"column"}
                        alignItems={"center"}
                        style={{ background: "black", padding: "20px" }}
                      >
                        <Stack
                          direction={"column"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <div
                            style={{
                              width: "400px",
                              height: "10px",
                              borderRadius: "30px",
                              background: "white",
                            }}
                          ></div>
                          <Typography
                            variant="body1"
                            color={"white"}
                            marginTop={"10px"}
                            fontWeight={"700"}
                          >
                            Stage
                          </Typography>
                        </Stack>
                        <Box
                          component={"div"}
                          height={"300px"}
                          width={"80%"}
                          style={{ overflow: "auto" }}
                        >
                          <Stack direction={"column"} gap={"30px"}>
                            {selectRows?.length > 0 &&
                              selectRows?.map((selectRow) => {
                                console.log("SelectRow: ", selectRow);
                                return (
                                  <Stack
                                    direction={"row"}
                                    gap={"20px"}
                                    key={selectRow._id}
                                  >
                                    <Stack direction={"column"} gap={"10px"}>
                                      <Typography variant="h3" color={"white"}>
                                        {selectRow?.row_name}
                                      </Typography>
                                      <Typography
                                        whiteSpace={"nowrap"}
                                        variant="body2"
                                        color={"white"}
                                      >
                                        Price: {selectRow?.ticket_price}
                                      </Typography>
                                      <Typography
                                        whiteSpace={"nowrap"}
                                        variant="body2"
                                        color={"white"}
                                      >
                                        Total chair: {selectRow?.total_chair}
                                      </Typography>
                                    </Stack>
                                    <Stack
                                      direction={"row"}
                                      flexWrap="wrap"
                                      gap={"15px"}
                                    >
                                      {selectRow?.chairs?.map((item, index) => {
                                        return (
                                          <div
                                            onClick={() => {
                                              const exists = selectChair.some(
                                                (itemC) =>
                                                  itemC.chair ===
                                                  item.chair_name
                                              );
                                              if (!item.isBuy && !exists) {
                                                setSelectChair([
                                                  ...selectChair,
                                                  {
                                                    chair: item.chair_name,
                                                    price:
                                                      selectRow?.ticket_price,
                                                  },
                                                ]);
                                              }
                                            }}
                                            key={item.id}
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                              borderRadius: "5px",
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              color: "white",
                                              cursor: "pointer",
                                              backgroundColor: `${
                                                !item.isBuy
                                                  ? "#6908bd"
                                                  : "#46494c"
                                              }`,
                                            }}
                                          >
                                            {item.chair_name}
                                          </div>
                                        );
                                      })}
                                    </Stack>
                                  </Stack>
                                );
                              })}
                          </Stack>
                        </Box>
                        <Stack color={"white"} direction={"row"} gap={"40px"}>
                          <Stack direction={"row"} gap={"10px"}>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"20px"}
                            >
                              <div
                                style={{
                                  background: "#46494c",
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                              <span>Đã đặt</span>
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                            >
                              <div
                                style={{
                                  background: "#6908bd",
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                              <span>Chưa đặt</span>
                            </Stack>
                          </Stack>
                        </Stack>
                        <Typography
                          variant="body2"
                          color={"white"}
                          marginTop={"20px"}
                        >
                          Xem chi tiết hình ảnh và thông tin ghế
                        </Typography>
                      </Stack>
                      <Stack padding={"20px"}>
                        <Stack
                          direction={"row"}
                          gap={"20px"}
                          alignItems={"center"}
                        >
                          <Typography variant="h4">
                            Thời gian còn lại: {minutes < 10 ? "0" : ""}
                            {minutes}:{seconds < 10 ? "0" : ""}
                            {seconds}
                          </Typography>
                        </Stack>

                        <Stack
                          direction={"row"}
                          padding={"15px 0"}
                          style={{ color: "gray", width: "100%" }}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          flexWrap={"wrap"}
                        >
                          <Grid container spacing={3}>
                            <Grid item sx={6} md={6}>
                              <FormControl
                                fullWidth
                                sx={{ m: 1 }}
                                variant="standard"
                              >
                                <InputLabel htmlFor="standard-adornment-amount">
                                  Fullname
                                </InputLabel>
                                <Input id="standard-adornment-amount" />
                              </FormControl>
                            </Grid>
                            <Grid item sx={6} md={6}>
                              <FormControl
                                fullWidth
                                sx={{ m: 1 }}
                                variant="standard"
                              >
                                <InputLabel htmlFor="standard-adornment-amount">
                                  Phone number
                                </InputLabel>
                                <Input id="standard-adornment-amount" />
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item sx={6} md={6}>
                              <FormControl
                                fullWidth
                                sx={{ m: 1 }}
                                variant="standard"
                              >
                                <InputLabel htmlFor="standard-adornment-amount">
                                  Enter email
                                </InputLabel>
                                <Input id="standard-adornment-amount" />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Stack>

                        <Stack>
                          {selectChair.length > 0 && (
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                              style={{
                                borderRadius: "10px",
                                border: "1px solid gray",
                                padding: "5px 10px",
                              }}
                            >
                              <div>
                                {selectChair?.length > 0 &&
                                  selectChair
                                    .map((item) => {
                                      return String(item.chair);
                                    })
                                    .join(",")}
                              </div>
                              <span
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  color: "red",
                                }}
                                onClick={() => setSelectChair([])}
                              >
                                <IconCircle />
                              </span>
                            </Stack>
                          )}
                        </Stack>
                        <Divider />
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          marginTop={"15px"}
                          alignItems={"center"}
                        >
                          <Stack>
                            <Typography variant="body2" color={"gray"}>
                              Price
                            </Typography>
                            <Typography variant="h6">
                              {totalByTicket}
                            </Typography>
                          </Stack>
                          <Button
                            type="button"
                            style={{
                              background: "#bfad17",
                              color: "white",
                              fontWeight: "bold",
                              padding: "10px 20px",
                            }}
                          >
                            Buy Ticket
                          </Button>
                        </Stack>
                      </Stack>
                    </Box>
                  </ModalStyled>
                </Stack>
              </TabPanel>
            </TabContext>
          </Grid>
          <Grid item xs={4}>
            <Typography component={"div"} variant="h3">
              Events
            </Typography>

            <Stack
              direction={"column"}
              gap={"20px"}
              style={{ marginTop: "30px" }}
            >
              {Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <Card key={index} sx={{ display: "flex", gap: "20px" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 140, borderRadius: "10px" }}
                        image="https://cdn.nbtv.vn/upload/news/8_2022/2_13463624082022.jpg"
                        alt="Live from space album cover"
                      />
                      <Stack direction={"column"}>
                        <CardContent
                          sx={{ flex: "1 0 auto" }}
                          style={{ padding: 0 }}
                        >
                          <Chip
                            label="18+"
                            style={{
                              borderRadius: "4px",
                              background: "red",
                              fontWeight: "bold",
                              color: "white",
                              fontSize: "12px",
                              padding: "5px 0",
                            }}
                          />
                          <Typography component="div" variant="h5">
                            Thanh Pho ngu gat
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="gray"
                            component="div"
                          >
                            Hình sự chính kịch
                          </Typography>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            gap={"5px"}
                          >
                            <span
                              style={{
                                color: "yellow",
                                width: "20px",
                                display: "flex",
                              }}
                            >
                              <IconStar />
                            </span>
                            <Typography variant="body2" color={"gray"}>
                              8.3
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Stack>
                    </Card>
                  );
                })}
            </Stack>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

const ModalStyled = styled(Modal)`
  .MuiBox-root {
    border: none;
    overflow: hidden;
    border-radius: 10px;
  }
`;
export default BookTickets;
