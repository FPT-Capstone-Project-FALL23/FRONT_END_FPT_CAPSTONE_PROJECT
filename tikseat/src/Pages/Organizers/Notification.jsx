import React, { useEffect, useState } from "react";
import {
  List,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MainListItems from "../../Components/Organizers/listItem";
import {
  // getLocalStorageUserData,
  // setLocalStorageUserInfo,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import { URL_SOCKET } from "../../API/ConstAPI";
import { io } from "socket.io-client";

function Notification() {
  const socket = io(URL_SOCKET, { transports: ["websocket"] });

  // const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo();
  console.log(dataInfo._id);

  const [notifications, setNotifications] = useState([]);
  const organizerId = dataInfo._id;

  useEffect(() => {
    socket?.emit("organizerId", organizerId);
  }, [socket, organizerId]);

  useEffect(() => {
    // Đăng ký sự kiện "getNotification" khi component được mount
    socket.on("getNotification", handleNotification);
    // Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      socket.off("getNotification", handleNotification);
    };
  }, [socket]);

  const handleNotification = (data) => {
    if (
      !notifications.some(
        (notification) => notification.senderName === data.senderName
      )
    ) {
      setNotifications((prev) => [...prev, data]);
    }
  };

  console.log(notifications);

  const displayNotification = ({ senderName }) => {
    return <p className="notification">{`${senderName} Create new Event.`}</p>;
  };

  return (
    <Grid>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Grid
        style={{
          height: "100vh",
          width: "100%",
          borderRight: "2px solid #ccc",
          display: "flex",
        }}>
        <Grid
          style={{
            position: "fixed",
            top: "65px", // Đặt khoảng cách từ đỉnh của AppBar
            height: "100%",
            width: "20%",
            backgroundColor: "rgb(255 239 137)",
            overflowY: "auto", // Thêm thanh cuộn nếu cần thiết
          }}>
          <List component="nav">
            <MainListItems />
          </List>
        </Grid>
        <Grid
          style={{
            position: "absolute",
            left: "20%",
            top: "65px",
            padding: "20px 50px 0px 50px",
            width: "80%",
          }}>
          <Grid maxWidth="md">
            <h1>Danh sách thông báo</h1>
            <Grid>
              {notifications.map((n, index) => (
                <div key={index}>{displayNotification(n)}</div>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Notification;
