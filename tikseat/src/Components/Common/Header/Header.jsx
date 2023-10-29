import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import IconNext from "../../Common/Icons/IconNext";
import IconPrev from "../../Common/Icons/IconPrev";
import { Link, useNavigate } from "react-router-dom";
import imgBgHeader from "../../../Assets/Images/bgheaderhomepage.png";
import imgCarousel from "../../../Assets/Images/pngguru.png";
import { navItems } from "../../../Assets/Constant/Common/dataCommon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBarStyle,
  ButtonLoginStyle,
  CarouselStyle,
  DatePickerStyle,
  FormHeaderStyle,
  HeaderStyle,
  TextFieldStyle,
} from "../../../Assets/CSS/Style/style.const";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LoopIcon from "@mui/icons-material/Loop";
import { colorWhite } from "../../../Assets/CSS/Style/theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LOGIN, NAME_LOGO } from "../../../Assets/Constant/Common/constCommon";
import SearchIcon from "@mui/icons-material/Search";
import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
  setLocalStorageUserData,
  setLocalStorageUserInfo,
} from "../../../Store/userStore";

const Header = () => {
  const dataUser = getLocalStorageUserData();
  console.log("dataUser: ", dataUser);
  const dataInfo = getLocalStorageUserInfo();
  console.log("dataInfo: ", dataInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [selectsDistrict, setSelectsDistrict] = useState([]);
  console.log("selectsDistrict: ", selectsDistrict);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // useEffect(() => {
  //   document.addEventListener("mousedown", closeDropdown);

  //   return () => {
  //     document.removeEventListener("mousedown", closeDropdown);
  //   };
  // }, []);
  const navigate = useNavigate();
  const ManagementUser = [
    { content: `Xin chào ${dataUser?.email}` },
    { url: "/createProfileClient", content: "Quản lý hồ sơ" },
    { url: "/login", content: "Đăng xuất" },
  ];
  const dataDistrict = [
    { value: "tesst1", id: 1 },
    { value: "tesst2", id: 2 },
    { value: "tesst3", id: 3 },
    { value: "tesst4", id: 4 },
  ];
  const filterIds = selectsDistrict?.map((item) => item.id);
  const [selectedDate, setSelectedDate] = useState(null);

  const isDateInPast = (date) => {
    const currentDateTimestamp = new Date().getTime() / 1000;
    return date < currentDateTimestamp;
  };
  const dataType = [
    {
      value: "option 1",
      label: "option 1",
    },
    {
      value: "option 2",
      label: "option 2",
    },
    {
      value: "option 3",
      label: "option 3",
    },
    {
      value: "option 4",
      label: "option 4",
    },
  ];

  return (
    <>
      <HeaderStyle className="header">
        <img src={imgBgHeader} alt="" />
        <div className="header-overlay"></div>
        <div
          style={{
            position: "absolute",
            zIndex: "22",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "80%",
            width: "100%",
          }}
        >
          <CarouselStyle
            autoPlay={false}
            infiniteLoop="true"
            swipeable
            showThumbs={false}
            showArrows={true}
            showIndicators={false}
            renderArrowNext={(clickHandler, hasPrev) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0",
                    zIndex: "22",
                    color: "white",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={clickHandler}
                >
                  <IconNext />
                </div>
              );
            }}
            renderArrowPrev={(clickHandler, hasPrev) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    left: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: "22",
                    color: "white",
                  }}
                  onClick={clickHandler}
                >
                  <IconPrev />
                </div>
              );
            }}
          >
            {Array(3)
              .fill(0)
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      gap: "50px",
                      padding: "0 50px",
                    }}
                  >
                    <div
                      key={index}
                      style={{
                        overflow: "hidden",
                        borderRadius: "30px",
                        maxWidth: "600px",
                        width: "100%",
                      }}
                    >
                      <img alt="" src={imgCarousel} />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}
                    >
                      <div style={{}}>
                        <h3
                          style={{
                            fontSize: "40px",
                            fontWeight: 700,
                            color: "white",
                            textAlign: "start",
                          }}
                        >
                          SBS MTV The Kpop Show Ticket Package
                        </h3>
                        <p
                          style={{
                            fontSize: "18px",
                            color: "white",
                            textAlign: "start",
                          }}
                        >
                          Look no further! Our SBS The Show tickets are the
                          simplest way for you to experience a live Kpop
                          recording.
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "30px",
                        }}
                      >
                        <Button
                          style={{
                            background: "#F5167E",
                            fontWeight: "700",
                            fontSize: "18px",
                            borderRadius: "50px",
                            color: "white",
                            display: "flex",
                            width: "182px",
                            height: "60px",
                          }}
                        >
                          Get Tiket
                        </Button>
                        <Button
                          style={{
                            fontWeight: "700",
                            fontSize: "18px",
                            borderRadius: "50px",
                            color: "white",
                            display: "flex",
                            width: "182px",
                            height: "60px",
                            border: "1.5px solid white",
                          }}
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </CarouselStyle>
        </div>
        <FormHeaderStyle>
          <Grid container spacing={2} alignItems={"self-end"}>
            <Grid item xs={2}>
              <TextFieldStyle
                id="filled-helperText"
                label="Search Event"
                defaultValue="Konser Jazz"
                variant="filled"
                size="medium"
              />
            </Grid>
            <Grid item xs={3}>
              <div
                className="dropdown"
                style={{
                  height: "100%",
                  borderBottom: "1px solid white",
                  position: "relative",
                  zIndex: 20,
                }}
                ref={dropdownRef}
              >
                <label htmlFor="" style={{ color: "white" }}>
                  Place
                </label>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "40px",
                      color: "white",
                      fontSize: "22px",
                      background: "transparent",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      flex: 1,
                    }}
                  >
                    {selectsDistrict?.length > 0 && (
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"20px"}
                        style={{
                          fontSize: "16px",
                          padding: "4px ",
                          borderRadius: "30px",
                          background: "gray",
                          height: "30px",
                        }}
                      >
                        <span style={{ padding: "0 10px" }}>
                          {selectsDistrict[0].value}
                        </span>
                        <span
                          style={{ display: "flex" }}
                          onClick={() => {
                            const filterChange = selectsDistrict.filter(
                              (itemF) => itemF.id !== selectsDistrict[0]?.id
                            );
                            setSelectsDistrict(filterChange);
                          }}
                        >
                          <HighlightOffIcon />
                        </span>
                      </Stack>
                    )}
                    {selectsDistrict?.length > 1 && (
                      <div style={{ marginLeft: "20px" }}>. . .</div>
                    )}
                  </div>
                  <div
                    onClick={toggleDropdown}
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    {isOpen ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      background: "white",
                      zIndex: 20,
                      width: "100%",
                      padding: "20px",
                      borderRadius: "10px",
                      overflow: "auto",
                      maxHeight: "500px",
                      height: "max-content",
                      boxShadow: "1px 1px 2px 2px #bbb1b12e",
                    }}
                  >
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Tìm quận/huyện"
                        inputProps={{ "aria-label": "Tìm quận/huyện" }}
                      />
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>

                    <ul
                      style={{
                        marginTop: "20px",
                        maxHeight: "200px",
                        height: "max-content",
                      }}
                    >
                      {dataDistrict.length > 0 &&
                        dataDistrict.map((item, index) => {
                          return (
                            <li
                              key={index}
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                              onClick={() => {
                                const check = filterIds.includes(item.id);
                                if (!check) {
                                  setSelectsDistrict([
                                    ...selectsDistrict,
                                    item,
                                  ]);
                                }
                              }}
                            >
                              <span>{item.value}</span>
                              <input
                                id={`${item.value}`}
                                type="checkbox"
                                onChange={(e) => {
                                  console.log("e: ", e.target.checked);
                                  if (!e.target.checked) {
                                    const filterChange = selectsDistrict.filter(
                                      (itemF) => itemF.id !== item.id
                                    );
                                    setSelectsDistrict(filterChange);
                                    console.log("filterChange: ", filterChange);
                                  } else {
                                    const check = filterIds.includes(item.id);
                                    if (!check) {
                                      setSelectsDistrict([
                                        ...selectsDistrict,
                                        item,
                                      ]);
                                    }
                                  }
                                }}
                                checked={filterIds.includes(item.id)}
                              />
                            </li>
                          );
                        })}
                    </ul>
                    <Divider
                      sx={{ height: 0.5, width: "100%", margin: "10px 0" }}
                      orientation="horizontal"
                    />
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack
                        onClick={() => setSelectsDistrict([])}
                        direction={"row"}
                        alignItems={"center"}
                        gap={"10px"}
                        style={{ cursor: "pointer" }}
                      >
                        <LoopIcon></LoopIcon>
                        <span>dat lai</span>
                      </Stack>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => setIsOpen(false)}
                      >
                        Apply
                      </Button>
                    </Stack>
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={3}>
              <Stack
                style={{
                  height: "100%",
                  borderBottom: "1px solid white",
                  position: "relative",
                  zIndex: 20,
                }}
                ref={dropdownRef}
              >
                <label htmlFor="" style={{ color: "white" }}>
                  Time
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePickerStyle
                    value={selectedDate}
                    onChange={(newDate) => setSelectedDate(newDate)}
                    shouldDisableDate={(date) =>
                      isDateInPast(new Date(date).getTime() / 1000)
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <TextFieldStyle
                id="filled-helperText"
                select
                label="Select"
                defaultValue="option 1"
                variant="filled"
              >
                {dataType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextFieldStyle>
            </Grid>
            <Grid item xs={1}>
              <Button variant="outlined" style={{ background: "white" }}>
                Search
              </Button>
            </Grid>
          </Grid>
        </FormHeaderStyle>
      </HeaderStyle>
      <AppBarStyle
        style={{
          background: "transparent",
          position: "absolute",
          boxShadow: "none",
          padding: "0 150px",
          top: "24px",
        }}
        component="nav"
      >
        <Toolbar
          style={{ backdrop: "transparent", boxShadow: "none !important" }}
        >
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
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
                  style={{ color: `${colorWhite}`, fontWeight: "500" }}
                >
                  {item.title}
                </Link>
              ))}
            </Box>
            {dataUser?.email ? (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={dataInfo?.avatarImage} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
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
            ) : (
              <ButtonLoginStyle to={"/login"}>{LOGIN}</ButtonLoginStyle>
            )}
          </Box>
        </Toolbar>
      </AppBarStyle>
    </>
  );
};

export default Header;
