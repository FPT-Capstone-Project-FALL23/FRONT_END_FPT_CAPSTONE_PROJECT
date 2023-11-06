import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useOpenStore } from "../../Store/openStore";
import { NAME_LOGO } from "../../Assets/Constant/Common/constCommon";
import { io } from "socket.io-client";
import { URL_SOCKET } from "../../API/ConstAPI";
import Popover from '@mui/material/Popover';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import {  removeLocalStorageUserData, getLocalStorageUserData } from "../../Store/userStore";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  
  const [notifications, setNotifications] = useState([]);
  const updateOpen = useOpenStore((state) => state.updateOpen);
  const dopen = useOpenStore((state) => state.dopen);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = React.useState(null);

  
  const socket = io(URL_SOCKET, { transports: ["websocket"] }); // Thay thế bằng URL của máy chủ Socket.io
const dataUser = getLocalStorageUserData();

console.log(dataUser._id);

const _idUser = dataUser._id;
// const email = dataUser.email;

useEffect(() => {
  socket?.emit("_idUser", _idUser);
}, [socket, _idUser]);

useEffect(() => {
  // Đăng ký sự kiện "getNotification" khi component được mount
  socket.on("adminNotification", handleNotification);
  // Hủy đăng ký sự kiện khi component bị unmount
  return () => {
    socket.off("adminNotification", handleNotification);
  };
}, [socket]);

const handleNotification = (data) => {
  if (
    !notifications.some(
      (notification) => notification.senderName === data.senderName
    )
  ) {
    setNotifications((prev) => [...prev, data]);
    console.log("New adminnotification:", data);
  }
};

console.log(notifications);

const displayNotification = ({ senderName }) => {
  return <p className="notification">{`${senderName} Create new Organizer.`}</p>;
};

  const handleProfileMenuOpen = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  
  const handleNotificationsClick = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElProfile(null);
    setAnchorElNotifications(null);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi local storage hoặc trạng thái đăng nhập của ứng dụng
    removeLocalStorageUserData(); // Đây là ví dụ, bạn cần xác định hàm xóa dữ liệu người dùng thực tế
    // Sau đó chuyển người dùng đến trang đăng nhập hoặc trang chính của ứng dụng
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationsClick}>
               <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      <Popover
        open={Boolean(anchorElProfile)}
        anchorEl={anchorElProfile}
        onClose={handleClose}
      >
        <List component="nav">
          <ListItem>
            {/* Hiển thị tên người dùng */}
            <ListItemText primary="Tên người dùng: John Doe" />
          </ListItem>
          <ListItem>
            {/* Hiển thị hình ảnh người dùng (thay thế 'your_profile_image_url' bằng URL hình ảnh) */}
            <img src="your_profile_image_url" alt="Avatar" style={{ width: 50, height: 50 }} />
          </ListItem>
          <ListItem>
            {/* Nút đăng xuất */}
            <Button onClick={handleLogout}>Đăng xuất</Button>
          </ListItem>
        </List>
      </Popover>
      <Popover
        open={Boolean(anchorElNotifications)}
        anchorEl={anchorElNotifications}
        onClose={handleClose}
        
      >
         <List component="nav">
         
         {notifications.map((notification, index) => (
            <ListItem key={index}>
                {displayNotification(notification)}
            </ListItem>)
          )}
        </List>
      </Popover>
    </Box>
  );
}
