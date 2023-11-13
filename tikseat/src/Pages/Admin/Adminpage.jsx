import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Grid, Button } from "@mui/material";
import Box from "@mui/material/Box";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
import Badge from "@mui/material/Badge";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

import { NAME_LOGO } from "../../Assets/Constant/Common/constCommon";

import HomePageAdmin from "./HomePageAdmin";
import ClientManage from "./ClientPageAdmin";
import OrganigerManage from "./OrganizerPageAdmin";

import "../../Assets/CSS/Organizer/Sidebar.css";

import {
  getLocalStorageUserData,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import { URL_SOCKET } from "../../API/ConstAPI";
import { io } from "socket.io-client";

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

export default function MiniDrawer() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(URL_SOCKET, { transports: ["websocket"] });
    setSocket(newSocket);

    return () => {
      // Ngắt kết nối socket khi component bị unmounted hoặc socket thay đổi
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const dataUser = getLocalStorageUserData();
  const adminId = dataUser?._id;

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState("homeAdmin");

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [notifications, setNotifications] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    if (socket && adminId) {
      socket.emit("organizerId", adminId);

      return () => {
        if (socket.off) {
          socket.off("organizerId");
        }
      };
    }
  }, [socket, adminId]);

  useEffect(() => {
    const handleNotification = (data) => {
      if (
        !notifications.some(
          (notification) => notification.senderName === data.senderName
        )
      ) {
        setNotifications((prev) => [...prev, data]);
      }
    };

    if (socket) {
      if (socket.on) {
        socket.on("getNotification", handleNotification);

        return () => {
          if (socket.off) {
            socket.off("getNotification", handleNotification);
          }
        };
      }
    }
  }, [socket, notifications]);

  const displayNotification = ({ senderName }) => {
    return (
      <span
        style={{
          backgroundColor: "#E0F4FF",
          padding: "10px",
          margin: "5px",
          borderRadius: "10px",
        }}
      >{`${senderName} đã tạo một sự kiện mới.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpenNotification(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="appbar"
        position="fixed"
        elevation={4}
        sx={{ backgroundColor: "#ffffff", color: "black" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setOpen(!open);
              }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" className="logo" component="h4">
              {NAME_LOGO}
            </Typography>
          </Grid>
          <Grid
            className="welcome"
            sx={{ marginRight: "50px", display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6" noWrap component="div">
              Welcome Back <span style={{ color: "yellow" }}>Admin</span>
            </Typography>
            <Grid>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={() => setOpenNotification(!openNotification)}
                >
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
              }}
            >
              <Avatar
                sx={{ width: "100%", height: "100%" }}
                alt="Remy Sharp"
                src=""
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
              }}
            >
              {notifications.map((n) => displayNotification(n))}
              <Button onClick={handleRead}> Read</Button>
            </Grid>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        className="drawer"
        variant="permanent"
        open={open}
        sx={{ backgroundColor: "#87C4FF" }}
      >
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
            onClick={() => setMenuData("homeAdmin")}
          >
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "homeAdmin" ? "#E0F4FF" : "transparent",
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
                <DashboardIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Admin"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block", border: "none" }}
            onClick={() => setMenuData("clientManage")}
          >
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "clientManage" ? "#E0F4FF" : "transparent",
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
                <DashboardIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Client Manager"
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block", border: "none" }}
            onClick={() => setMenuData("organizerManage")}
          >
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "organizerManage" ? "#E0F4FF" : "transparent",
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
                <DashboardIcon sx={styleIcon} />
              </ListItemIcon>
              <ListItemText
                sx={{ display: open ? "block" : "none" }}
                primary="Organizer Manager"
              />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => setMenuData("logOut")}
          >
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? "initial" : "center",
                backgroundColor:
                  menuData === "logOut" ? "#E0F4FF" : "transparent",
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
        sx={{ height: "100vh", width: "100%", backgroundColor: "#E0F4FF" }}
      >
        <Box
          style={{
            height: "auto",
            padding: "100px 40px 40px 40px",
            backgroundColor: "#E0F4FF",
          }}
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          {menuData === "homeAdmin" && <HomePageAdmin />}
          {menuData === "clientManage" && <ClientManage />}
          {menuData === "organizerManage" && <OrganigerManage />}
        </Box>
      </Grid>
    </Box>
  );
}