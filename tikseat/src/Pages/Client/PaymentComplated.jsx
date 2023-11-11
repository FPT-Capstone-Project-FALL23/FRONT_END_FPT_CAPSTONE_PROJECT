import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getLocalStorageUserData,
  setLocalStorageUserData,
  setLocalStorageUserInfo,
} from "../../Store/userStore";
import { NAME_LOGO } from "../../Assets/Constant/Common/constCommon";
import { navItems } from "../../Assets/Constant/Common/dataCommon";
import { colorBlack } from "../../Assets/CSS/Style/theme";

const PaymentComplated = () => {
  const dataUser = getLocalStorageUserData();
  const navigate = useNavigate();

  const ManagementUser = [
    { content: `Welcome ${dataUser?.email}` },
    { url: "/createProfileClient", content: "My profile" },
    { url: "/login", content: "Log out" },
  ];

  return (
    <div>
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
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
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
                  <MenuItem key={index}>
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            color: "#23abe3",
            borderRadius: "10px",
            border: "2px solid #23abe3",
            padding: "14px 50px",
            boxShadow: "2px 3px 2px 2px blue",
          }}
        >
          Completed !
        </div>
        <div style={{ width: "500px", marginTop: "20px" }}>
          <img
            src="https://i.pinimg.com/736x/5e/8e/a5/5e8ea5d2cfa1c73f2bfae63001962d82.jpg"
            alt="background completed"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Ticket have been sent to</h2>
          <span style={{ color: "#23abe3" }}>thuy@gmail.com</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "40px",
          }}
        >
          <h4>Go to the list you purchased</h4>
          <div
            style={{
              padding: "10px 40px",
              border: "1px solid #23abe3",
              borderRadius: "10px",
              fontWeight: "bold",
              color: "#23abe3",
              marginTop: "10px",
            }}
          >
            Go To List
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComplated;
