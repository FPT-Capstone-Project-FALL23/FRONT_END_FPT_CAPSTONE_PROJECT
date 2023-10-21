import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Button,
  List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import MainListItems from "../../Components/Organizers/listItem";
import "../../Assets/CSS/Common/LayoutSign.css";

function HomePageOrganizer() {
  return (
    <>
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
          }}
        >
          <Grid
            style={{
              position: "fixed",
              top: "65px", // Đặt khoảng cách từ đỉnh của AppBar
              height: "100%",
              width: "20%",
              backgroundColor: "pink",
              overflowY: "auto", // Thêm thanh cuộn nếu cần thiết
            }}
          >
            <List component="nav">
              <MainListItems />
            </List>
          </Grid>
          <Grid
            style={{
              position: "absolute",
              left: "20%",
              top: "65px", // Đặt khoảng cách từ đỉnh của AppBar
              padding: "20px 50px 0px 50px",
              width: "80%",
            }}
          >
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePageOrganizer;
