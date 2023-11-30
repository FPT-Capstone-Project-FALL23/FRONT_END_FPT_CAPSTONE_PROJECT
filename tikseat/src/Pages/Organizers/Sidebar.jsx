import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Badge, Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import ListEventToday from "./ListEventToday";

import DefaultDashboard from "./DefaultDashboard";
import EventHistory from "./EventHistory";
import NewEvent from "./NewEvent";
import Notification from "./Notification";
import ProfileOrganizers from "./ProfileOrganizers";
import AddPaymentMethod from "../Common/AddPaymentMethod";
import CreateTicket from "./CreateTicket";
import CheckinTicket from "./CheckinTicket";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../Common/ChangePassword";
import NotificationsIcon from "@mui/icons-material/Notifications";

import "../../Assets/CSS/Organizer/Sidebar.css";

import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import EventDetail from "./EventDetail";
import ListRefund from "./ListRefund";

const drawerWidth = 300;
const styleIcon = { paddingLeft: "10px", fontSize: "40px" };

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 20px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 20px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const handleLogOut = (navigate) => {
  window.localStorage.clear();
  navigate("/login");
};

export default function MiniDrawer() {
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState("dashboard");
  const [ticketData, setTicketData] = useState(null);
  const [eventDetail, setEventDetail] = useState(null);
  const [eventCheckin, setEventCheckin] = useState(null);

  const [notifications, setNotifications] = useState([1, 2]);
  const [notificationRefund, setNotificationRefund] = useState([1, 2]);
  const [openNotification, setOpenNotification] = useState(false);

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRead = () => {
    setNotifications([]);
    setOpenNotification(false);
  };

  const handleClickRefund = () => {
    setMenuData("listRefund");
    setNotificationRefund([]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="appbar"
        position="fixed"
        elevation={4}
        sx={{ backgroundColor: "#ffffff", color: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setOpen(!open);
              }}
              edge="start">
              <MenuIcon />
            </IconButton>
            <Typography
              className="typrography"
              variant="h6"
              noWrap
              component="div">
              DASHBOARD
            </Typography>
          </Grid>
          <Grid
            className="welcome"
            sx={{ marginRight: "50px", display: "flex", alignItems: "center" }}>
            <Typography variant="h6" noWrap component="div">
              Welcome Back{" "}
              <span style={{ color: "yellow" }}>{dataInfo.organizer_name}</span>
            </Typography>
            <Grid>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={() => setOpenNotification(!openNotification)}>
                  {notifications.length > 0 && (
                    <Badge
                      sx={{
                        position: "absolute",
                        marginBottom: "20px",
                        marginLeft: "20px",
                      }}
                      badgeContent={notifications.length}
                      color="error"
                    />
                  )}
                  <NotificationsIcon sx={{ width: "35px", height: "35px" }} />
                </IconButton>
              </Box>
            </Grid>
            <Grid
              sx={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                marginLeft: "20px",
              }}>
              <Avatar
                sx={{ width: "100%", height: "100%" }}
                alt="Remy Sharp"
                src={dataInfo?.avatarImage}
              />
            </Grid>
          </Grid>
          {openNotification && (
            <Grid
              style={{
                position: "absolute",
                width: "400px",
                top: "64px",
                right: "0",
                backgroundColor: "white",
                color: "black",
                fontWeight: "300",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}>
              {/* {notifications.map((n) => displayNotification(n))} */}
              aaaaaaa
              <Button onClick={handleRead}> Read</Button>
            </Grid>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        className="drawer"
        variant="permanent"
        open={open}
        sx={{ backgroundColor: "#87C4FF" }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List style={{ border: "none" }}>
          <ListItem
            disablePadding
            sx={{ display: "block", border: "none" }}
            onClick={() => setMenuData("dashboard")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "dashboard" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <DashboardIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Dashboard"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("newEvent")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "newEvent" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <AddCircleIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="New Event"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("eventHistory")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "eventHistory" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <WorkHistoryIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Event History"
              />
            </ListItemButton>
          </ListItem>
          {/* <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("notification")}
          >
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "notification" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}
              >
                <NotificationsActiveIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Notification"
              />
            </ListItemButton>
          </ListItem> */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("checkin")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "checkin" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <QrCodeScannerIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Check in"
              />
            </ListItemButton>
          </ListItem>

          <Divider />
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("profile")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "profile" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <AssignmentIndIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Profile"
              />
            </ListItemButton>
          </ListItem>
          {/* <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("bankAccount")}
          >
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "bankAccount" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}
              >
                <CurrencyExchangeIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Bank Account"
              />
            </ListItemButton>
          </ListItem> */}
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => handleClickRefund()}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "listRefund" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                {notificationRefund.length > 0 && (
                  <Badge
                    sx={{
                      position: "absolute",
                      marginTop: "5px",
                      marginLeft: "40px",
                    }}
                    badgeContent={notificationRefund.length}
                    color="error"
                  />
                )}
                <CurrencyExchangeIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="List Refund"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("changePass")}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "bankAccount" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <VpnKeyIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Change password"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => handleLogOut(navigate)}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "logOut" ? "#E0F4FF" : "transparent",
                borderRadius: "10px",
                margin: "5px 10px 5px 10px",
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 1.5,
                  justifyContent: "center",
                }}>
                <LogoutIcon sx={styleIcon} />
              </ListItemIcon>

              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Log Out"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Grid
        className="box"
        sx={{ height: "100vh", width: "100%", backgroundColor: "#E0F4FF" }}>
        <Box
          style={{
            padding: "100px 40px 40px 40px",
            backgroundColor: "#E0F4FF",
          }}
          component="main"
          sx={{ flexGrow: 1, p: 3 }}>
          {menuData === "dashboard" && <DefaultDashboard />}
          {menuData === "newEvent" && (
            <NewEvent
              onContinueClick={(data) => {
                setTicketData(data);
                setMenuData("create-ticket");
              }}
            />
          )}

          {menuData === "create-ticket" && (
            <CreateTicket ticketData={ticketData} />
          )}

          {menuData === "eventHistory" && (
            <EventHistory
              onEventDetail={(data) => {
                setEventDetail(data);
                setMenuData("eventDetail");
              }}
            />
          )}
          {menuData === "eventDetail" && (
            <EventDetail eventDetail={eventDetail} />
          )}
          {menuData === "checkinTicket" && (
            <CheckinTicket CheckingTicket={eventCheckin} />
          )}
          {menuData === "checkin" && (
            <ListEventToday
              onClickCheckin={(data) => {
                setEventCheckin(data);
                setMenuData("checkinTicket");
              }}
            />
          )}
          {menuData === "profile" && <ProfileOrganizers />}
          {menuData === "changePass" && <ChangePassword />}
          {menuData === "bankAccount" && <AddPaymentMethod />}
          {menuData === "listRefund" && <ListRefund />}
          {menuData === "logOut" && <DefaultDashboard />}
        </Box>
      </Grid>
    </Box>
  );
}
