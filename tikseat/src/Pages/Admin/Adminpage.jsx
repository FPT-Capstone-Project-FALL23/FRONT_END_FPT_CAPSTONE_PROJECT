import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Grid, Button, Collapse } from "@mui/material";
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
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { NAME_LOGO, ROLE } from "../../Assets/Constant/Common/constCommon";

import HomePageAdmin from "./HomePageAdmin";
import ClientManage from "./ClientPageAdmin";
import OrganigerManage from "./OrganizerPageAdmin";

import "../../Assets/CSS/Organizer/Sidebar.css";

import { getLocalStorageUserData } from "../../Store/userStore";
import { URL_SOCKET } from "../../API/ConstAPI";
import { io } from "socket.io-client";
import {
  LIST_HOME_ADMIN,
  LIST_NAME_MENU,
} from "../../Assets/Constant/Admin/dataAdmin";
import ApprovedOrganizer from "./ApprovedOrganizer";
import ApprovedEvent from "./ApprovedEvent";
import PurchaseList from "./PurchaseList";
import RefundList from "./RefundList";
import { handleLogOut } from "../Organizers/Sidebar";
import { useNavigate } from "react-router-dom";
import BlockOrganizerList from "./BlockOrganizerList";
import PayBusiness from "./PayBusiness";
import { getLocalStorageToken } from "../../Store/authStore";
import jwtDecode from "jwt-decode";

const drawerWidth = 300;
export const styleIcon = { paddingLeft: "10px", fontSize: "40px" };

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

export const checkToken = (navigate) => {
  const token = getLocalStorageToken();
  if (!token) {
    navigate("/");
  } else {
    const roleNavigate = jwtDecode(token).role;
    if (roleNavigate == ROLE[0]) {
      navigate("/");
    } else if (roleNavigate == ROLE[1]) {
      navigate("/dashboard");
    } else {
      navigate("/homepageAdmin");
    }
  }
};

export default function MiniDrawer() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(URL_SOCKET, { transports: ["websocket"] });
    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const dataUser = getLocalStorageUserData();
  const adminId = dataUser?._id;

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState("homeAdmin");
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [notificationsOrganizer, setNotificationsOrganizer] = useState([]);
  const [notificationsEvent, setNotificationsEvent] = useState([]);
  const [notificationsRefundTicket, setNotificationsRefundTicket] = useState([]);
  const [notificationsPayBusiness, setNotificationsPayBusiness] = useState([]);

  const allNotificationLists = [
    notificationsOrganizer.length,
    notificationsEvent.length,
    notificationsRefundTicket.length,
    notificationsPayBusiness.length,
  ];

  const ListMenu = ({
    setMenuData,
    nameMenu,
    menuData,
    open,
    titleMenu,
    icon,
    isCollapse,
    notificationLength,
  }) => {
    const handleSetDataNotification = (aaa) => {
      if (aaa === "approvedOrganizer") {
        setNotificationsOrganizer([]);
      } else if (aaa === "approvedEvent") {
        setNotificationsEvent([]);
      } else if (aaa === "refundList") {
        setNotificationsRefundTicket([]);
      } else if (aaa === "payBusiness") {
        setNotificationsPayBusiness([]);
      }
    };
    const handleSetMenuData = (nameMenu) => {
      handleSetDataNotification(nameMenu)
      setMenuData(nameMenu);
    };

    return (
      
      <ListItem
        disablePadding
        sx={{ display: "block", border: "none" }}
        onClick={() => handleSetMenuData(nameMenu)}
      >
        <ListItemButton
          sx={{
            minHeight: 50,
            justifyContent: open ? "initial" : "center",
            backgroundColor:
              menuData === nameMenu ? "#ffc50099" : "transparent",
            borderRadius: "10px",
            margin: "5px 10px 5px 10px",
            px: 2.5,
            pl: isCollapse ? 4 : "null",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 1.5,
              justifyContent: "center",
            }}
          >
            {notificationLength > 0 && (
              <Badge
                sx={{
                  position: "absolute",
                  marginTop: open ? "4%" : "5%",
                  marginLeft: open ? "150%" : "50%",
                }}
                badgeContent={notificationLength}
                color="error"
              />
            )}
            {icon}
          </ListItemIcon>
          <ListItemText
            sx={{ display: open ? "block" : "none" }}
            primary={titleMenu}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const NestedListItem = ({
    LIST_COLLAPSE,
    menuData,
    setMenuData,
    nameCollapse,
    IconCollapse,
    open,
    notificationAll,
  }) => {
    const [openCollapse, setOpenCollapse] = useState(false);
    const handleClick = () => {
      setOpenCollapse(!openCollapse);
    };
    return (
      <>
        <ListItem
          disablePadding
          sx={{
            display: "block",
            border: "none",
          }}
          onClick={handleClick}
        >
          <ListItemButton
            sx={{
              minHeight: 50,
              justifyContent: open ? "initial" : "center",
              backgroundColor:
                menuData === setMenuData ? "#E0F4FF" : "transparent",
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
              {notificationAll > 0 && (
                <Badge
                  sx={{
                    position: "absolute",
                    marginTop: open ? "5%" : "5%",
                    marginLeft: open ? "130%" : "50%",
                  }}
                  badgeContent={notificationAll}
                  color="error"
                />
              )}
              {IconCollapse}
            </ListItemIcon>

            <ListItemText
              sx={{ display: open ? "block" : "none" }}
              primary={nameCollapse}
            />
            {open ? (
              <>{openCollapse ? <ExpandLess /> : <ExpandMore />}</>
            ) : (
              <></>
            )}
          </ListItemButton>
          <Collapse in={openCollapse} timeout="auto">
            {LIST_COLLAPSE.map((value, index) => {
              let noti;
              if (value.nameMenu === "approvedOrganizer") {
                noti = allNotificationLists[0];
              } else if (value.nameMenu === "approvedEvent") {
                noti = allNotificationLists[1];
              } else if (value.nameMenu === "refundList") {
                noti = allNotificationLists[2];
              } else if (value.nameMenu === "payBusiness") {
                noti = allNotificationLists[3];
              }
              return (
                <ListMenu
                  key={index}
                  setMenuData={setMenuData}
                  menuData={menuData}
                  open={open}
                  nameMenu={value.nameMenu}
                  titleMenu={value.titleMenu}
                  icon={value.icon}
                  isCollapse={true}
                  notificationLength={noti}
                />
              );
            })}
          </Collapse>
        </ListItem>
      </>
    );
  };

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
      if (data.typeOfNotification === "acceptEvent") {
        setNotificationsEvent((prev) => [...prev, data]);
      }else if (data.typeOfNotification === "acceptOrganizer") {
        setNotificationsOrganizer((prev) => [...prev, data]);
      }else if (data.typeOfNotification === "acceptRefund") {
        setNotificationsRefundTicket((prev) => [...prev, data]);
      } else if (data.typeOfNotification === "acceptPayBusiness") {
        setNotificationsPayBusiness((prev) => [...prev, data]);
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
  }, [socket, notificationsEvent]);

  useEffect(() => {
    checkToken(navigate);
  }, []);

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
          <Grid sx={{ display: "flex", alignItems: "center", marginLeft: "150px"}}>
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
            sx={{ marginRight: "50px", display: "flex", alignItems: "center", marginRight: "150px" }}
          >
            <Typography variant="h6" noWrap component="div">
              Welcome Back <span style={{ color: "yellow" }}>Admin</span>
            </Typography>
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
          {LIST_NAME_MENU.map((value) => {
            return (
              <>
                <ListMenu
                  setMenuData={setMenuData}
                  menuData={menuData}
                  open={open}
                  nameMenu={value.nameMenu}
                  titleMenu={value.titleMenu}
                  icon={value.icon}
                  isCollapse={false}
                />
                <Divider />
              </>
            );
          })}
          {LIST_HOME_ADMIN.map((value) => {
            let notification;
            if (value.LIST_COLLAPSE[0].nameMenu === "approvedOrganizer") {
              notification = allNotificationLists[0] + allNotificationLists[1];
            } else if (value.LIST_COLLAPSE[0].nameMenu === "purchaseList") {
              notification = allNotificationLists[2] + allNotificationLists[3];
            }
            return (
              <>
                <NestedListItem
                  LIST_COLLAPSE={value.LIST_COLLAPSE}
                  menuData={menuData}
                  setMenuData={setMenuData}
                  nameCollapse={value.nameCollapse}
                  IconCollapse={value.icon}
                  open={open}
                  notificationAll={notification}
                />
                <Divider />
              </>
            );
          })}
          <Divider />
          <ListItem
            disablePadding
            sx={{
              display: "block",
            }}
            onClick={() => handleLogOut(navigate)}
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
        sx={{ height: "100vh", width: "100%", backgroundColor: "#e7e8ec" }}
      >
        <Box
          style={{
            padding: "80px 20px 20px 20px",
          }}
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          {menuData === "homeAdmin" && <HomePageAdmin />}
          {menuData === "clientManage" && <ClientManage />}
          {menuData === "organizerManage" && <OrganigerManage />}
          {menuData === "blockOrganizerList" && <BlockOrganizerList />}
          {menuData === "approvedOrganizer" && <ApprovedOrganizer />}
          {menuData === "approvedEvent" && <ApprovedEvent />}
          {menuData === "purchaseList" && <PurchaseList />}
          {menuData === "refundList" && <RefundList />}
          {menuData === "payBusiness" && <PayBusiness />}
        </Box>
      </Grid>
    </Box>
  );
}
