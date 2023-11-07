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
  getLocalStorageUserInfo,
  setLocalStorageUserData,
  setLocalStorageUserInfo,
} from "../../Store/userStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { navItems } from "../../Assets/Constant/Common/dataCommon";
import { colorBlack, colorWhite } from "../../Assets/CSS/Style/theme";
import ApiCommon from "../../API/Common/ApiCommon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ApiClient from "../../API/Client/ApiClient";
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

const BookTickets = () => {
  const { id: idEvent } = useParams();
  const [age, setAge] = useState("");
  const [openConfrm, setOpenConfirm] = React.useState(false);

  const [dataEvents, setDataEvents] = useState("");
  const [dataEventDetail, setDataEventDetail] = useState();
  console.log("dataEventDetail: ", dataEventDetail);
  const [selectRows, setSelectRows] = useState([]);
  const [organizer, setOrganizer] = useState("");
  const navigate = useNavigate();
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();
  const [selectChair, setSelectChair] = useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [checkDay, setCheckDay] = useState(1);

  const [countDown, setCountDown] = useState(false);
  const [time, setTime] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTime(null);
    setSelectChair([]);
  };

  useEffect(() => {
    async function getAllEvents() {
      const resEventData = await ApiClient.getAllEvents();
      const filterEvent = await resEventData?.events?.filter((event) => {
        return event._id !== idEvent;
      });
      setDataEvents(filterEvent);
    }
    getAllEvents();
    if (idEvent) {
      async function getEventDetail() {
        const response = await ApiClient.geDetailEvent({ _idEvent: idEvent });
        setDataEventDetail(response.event);
        setOrganizer(response.organizer);
      }
      getEventDetail();
    }
  }, [idEvent]);
  const ManagementUser = [
    { content: `Welcome ${dataUser?.email}` },
    { url: "/createProfileClient", content: "My profile" },
    { url: "/login", content: "Log out" },
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
  const [ticketBooker, setTicketBooker] = useState({
    email: dataUser?.email,
    phone: dataInfo?.phone,
    fullname: dataInfo?.full_name,
    selected_ticket: selectChair,
    total_ticket: totalByTicket,
  });
  //call api create payment
  const handleBuyTickect = async (event) => {
    event.preventDefault();
    try {
      const listChairIds = selectChair.map((item) => item._id);
      const requestData = {
        _idEvent: dataEventDetail._id,
        chairIds: listChairIds,
        amount: totalByTicket,
      };

      const response = await ApiClient.paymentTicket(requestData);
      if (response) {
        //chuyển trang qua trang của zalo
        window.location.href = response.data.order_url;
        handleCloseConfirm();
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  useEffect(() => {
    if (selectChair.length === 0) {
      setCountDown(false);
      setTime(null);
    }
  }, [selectChair]);
  useEffect(() => {
    if (!open) {
      setSelectChair([]);
      setCountDown(false);
    } else {
      if (time === 0 && time !== null) {
        setOpen(false);
      }
    }
  }, [open, time]);

  useEffect(() => {
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

  // Đặt ngày và giờ diễn ra sự kiện
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date(dataEventDetail?.sales_date?.start_sales_date);
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

    console.log("ododod");
    return () => clearInterval(intervalId);
  }, [dataEventDetail]);
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
                    {dataEventDetail?.event_location?.specific_address}
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
          <Grid item xs={12}>
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
                <Grid container spacing={2} style={{ width: "100%" }}>
                  <Grid item xs={5}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="h4">About</Typography>
                    </Stack>
                    <Stack>{dataEventDetail?.event_description}</Stack>
                  </Grid>
                  <Grid item xs={7}>
                    <div style={{ height: "400px" }}>
                      <img
                        style={{ objectFit: "cover" }}
                        height={"100%"}
                        src={dataEventDetail?.type_layout}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Stack>
                  <Stack marginTop={"30px"} direction={"column"} gap={"20px"}>
                    {dataEventDetail?.event_date?.length > 0 &&
                      dataEventDetail?.event_date[0]?.event_areas.map(
                        (item, index) => {
                          console.log("item: ", item);
                          return (
                            <Stack
                              key={index}
                              direction={"row"}
                              justifyContent={"space-between"}
                              style={{
                                cursor: "pointer",
                                width: "100%",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                handleOpen();
                                setSelectRows(item?.rows);
                              }}
                            >
                              <Typography variant="h4">
                                {item.name_areas}
                              </Typography>
                              <Typography>
                                {item.ticket_price} <sup>vnd</sup>
                              </Typography>
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
                        <Box
                          component={"div"}
                          height={"300px"}
                          width={"80%"}
                          style={{ overflow: "auto" }}
                        >
                          <Stack direction={"column"} gap={"30px"}>
                            {selectRows?.length > 0 &&
                              selectRows?.map((selectRow) => {
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
                                    </Stack>
                                    <Stack direction={"row"} gap={"15px"}>
                                      {selectRow?.chairs?.map((item, index) => {
                                        const isCheckSelected =
                                          selectChair.find((itemc) => {
                                            return (
                                              itemc._idChairName === item._id
                                            );
                                          });
                                        return (
                                          <div
                                            onClick={() => {
                                              if (!countDown) {
                                                setTime(600);
                                                setCountDown(true);
                                              }
                                              const exists = selectChair.some(
                                                (itemC) =>
                                                  itemC.chair ===
                                                  item.chair_name
                                              );
                                              if (!item.isBuy && !exists) {
                                                setSelectChair([
                                                  ...selectChair,
                                                  {
                                                    _idChairName: item._id,
                                                    chair: item.chair_name,
                                                    price:
                                                      selectRow?.ticket_price,
                                                  },
                                                ]);
                                              }
                                              if (isCheckSelected) {
                                                setSelectChair(
                                                  selectChair.filter(
                                                    (check) =>
                                                      check._idChairName !==
                                                      item._id
                                                  )
                                                );
                                              }
                                            }}
                                            key={index}
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
                                                  ? isCheckSelected
                                                    ? "#ff15a0"
                                                    : "#6908bd"
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
                        <Stack
                          color={"white"}
                          marginTop={"10px"}
                          direction={"row"}
                          gap={"40px"}
                        >
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
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                            >
                              <div
                                style={{
                                  background: "#ff15a0",
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                              <span>Ghế bạn chọn</span>
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
                          {time > 0 && (
                            <Typography variant="h4">
                              Thời gian còn lại: {minutes < 10 ? "0" : ""}
                              {minutes}:{seconds < 10 ? "0" : ""}
                              {seconds}
                            </Typography>
                          )}
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

                                <Input
                                  defaultValue={dataInfo?.full_name}
                                  id="standard-adornment-amount"
                                />
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
                                <Input
                                  defaultValue={dataInfo?.phone}
                                  id="standard-adornment-amount"
                                />
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
                                <Input
                                  defaultValue={dataUser?.email}
                                  id="standard-adornment-amount"
                                />
                              </FormControl>
                            </Grid>
                            <Grid item sx={6} md={6}>
                              <Stack
                                direction={"column"}
                                alignSelf={"end"}
                                borderBottom={"1px solid gray"}
                              >
                                <label htmlFor="" style={{ fontSize: "12px" }}>
                                  chair name
                                </label>
                                <Stack>
                                  <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    gap={"10px"}
                                    style={{
                                      padding: "5px 10px",
                                      height: "38px",
                                    }}
                                  >
                                    {selectChair.length > 0 && (
                                      <>
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
                                      </>
                                    )}
                                  </Stack>
                                </Stack>
                              </Stack>
                            </Grid>
                          </Grid>
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
                              Tạm tính
                            </Typography>
                            <Typography variant="h6">
                              {totalByTicket}
                            </Typography>
                          </Stack>
                          <Button
                            disabled={selectChair?.length <= 0}
                            type="button"
                            style={{
                              background: `${
                                selectChair?.length <= 0 ? "gray" : "#bfad17"
                              }`,
                              color: "white",
                              fontWeight: "bold",
                              padding: "10px 20px",
                            }}
                            onClick={(event) => handleOpenConfirm()}
                          >
                            Confirm
                          </Button>
                          <Modal
                            open={openConfrm}
                            onClose={handleCloseConfirm}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                          >
                            <Box
                              sx={{
                                ...style,
                                width: 500,
                                padding: "20px",
                                borderRadius: "10px",
                              }}
                            >
                              <Stack direction={"column"}>
                                <Stack direction={"row"} padding={" 10px 0"}>
                                  <label
                                    htmlFor=""
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "18px",
                                    }}
                                  >
                                    Confirm chair name:{" "}
                                  </label>
                                  <Stack
                                    marginLeft={"10px"}
                                    direction={"row"}
                                    alignItems={"center"}
                                  >
                                    {selectChair.length > 0 && (
                                      <>
                                        <span
                                          style={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                          }}
                                        >
                                          {selectChair?.length > 0 &&
                                            selectChair
                                              .map((item) => {
                                                return String(item.chair);
                                              })
                                              .join(",")}
                                        </span>
                                      </>
                                    )}
                                  </Stack>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  padding={" 10px 0"}
                                >
                                  <label
                                    htmlFor=""
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "18px",
                                    }}
                                  >
                                    Email recieve ticket:{" "}
                                  </label>
                                  <span style={{ marginLeft: "10px" }}>
                                    {dataUser?.email}
                                  </span>
                                </Stack>
                              </Stack>
                              <Stack
                                direction={"row"}
                                spacing={2}
                                marginTop={"30px"}
                                justifyContent={"center"}
                                alignItems={"center"}
                              >
                                <Button
                                  type="button"
                                  variant="outlined"
                                  onClick={handleCloseConfirm}
                                >
                                  Close
                                </Button>
                                <Button
                                  type="button"
                                  style={{ backgroundColor: "#bfad17" }}
                                  variant="contained"
                                  onClick={(e) => handleBuyTickect(e)}
                                >
                                  Buy Ticket
                                </Button>
                              </Stack>
                            </Box>
                          </Modal>
                        </Stack>
                      </Stack>
                    </Box>
                  </ModalStyled>
                </Stack>
              </TabPanel>
            </TabContext>
          </Grid>
          <Grid item xs={12}>
            <Typography component={"div"} variant="h3">
              Events
            </Typography>

            <Stack
              direction={"row"}
              gap={"20px"}
              style={{
                marginTop: "30px",
                overflow: "auto",
                width: "100%",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {dataEvents?.length > 0 &&
                dataEvents.map((event) => {
                  return (
                    <Card
                      onClick={() => {
                        navigate(`/book-tickets/${event?._id}`);
                      }}
                      key={event._id}
                      sx={{
                        // display: "flex",
                        gap: "20px",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: 300,
                          height: 140,
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        image={
                          event.eventImage ||
                          "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
                        }
                        alt="Live from space album cover"
                      />
                      <Stack direction={"column"} style={{ padding: "20px" }}>
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
                          <Typography component="div" variant="h6">
                            {event.event_name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="gray"
                            component="div"
                          >
                            {event.type_of_event}
                          </Typography>
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
