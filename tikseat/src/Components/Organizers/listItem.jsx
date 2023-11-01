import React, { useState } from "react";
import {Button, Grid} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LayersIcon from "@mui/icons-material/Layers";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useNavigate } from "react-router-dom";

const style = { display: "flex", textAline: "start", color: "black" };
const styleIcon = { paddingLeft: "10px", fontSize: "40px" };
const styleNotication = {
  width: "15px",
  height: "15px",
  color: "white",
  backgroundColor: "red",
};

const MainListItems = (notifications) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  console.log(selectedItem);

  const handleListItemClick = (value) => {
    setSelectedItem(value);

    if (value === "Dashboard") {
      navigate("/dashboard");
    } else if (value === "newEvent") {
      navigate("/create-event");
    } else if (value === "EventHistory") {
      navigate("/event-history");
    } else if (value === "Notification") {
      navigate("/notification");
    } else if (value === "Integrations") {
      navigate("/integrations");
    } else if (value === "Profile") {
      navigate("/UpdateProfileOrganizers");
    } else if (value === "Bank Account") {
      navigate("/add-payment");
    } else if (value === "Log out") {
      navigate("/logout");
    }
  };


  return (
    <React.Fragment>
      <Button
        style={{ width: "100%", paddingLeft: "10px" }}
        onClick={() => handleListItemClick("Dashboard")}
      >
        <ListItemIcon>
          <DashboardIcon sx={styleIcon} />
        </ListItemIcon>
        <ListItemText sx={style} primary="Dashboard" />
      </Button>
      <Divider sx={{ my: 1 }} />
      <Button
        style={{ width: "100%" }}
        onClick={() => handleListItemClick("newEvent")}
      >
        <ListItemIcon>
          <AddCircleIcon sx={styleIcon} />
        </ListItemIcon>
        <ListItemText sx={style} primary="New Event" />
      </Button>
      <Divider sx={{ my: 1 }} />
      <Button
        style={{ width: "100%" }}
        onClick={() => handleListItemClick("EventHistory")}
      >
        <ListItemIcon>
          <WorkHistoryIcon sx={styleIcon} />
        </ListItemIcon>
        <ListItemText sx={style} primary="Event History" />
      </Button>
      <Divider sx={{ my: 1 }} />
      <Button
        style={{ width: "100%" }}
        onClick={() => handleListItemClick("Notification")}
      >
        <ListItemIcon>
          <NotificationsActiveIcon sx={styleIcon} />
        </ListItemIcon>
        <ListItemText sx={style} primary="Notification" />
        {notifications.length > 0 && (
        <Grid
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "red",
            color: "white",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            fontSize:"20px",
            marginRight:"20px"
          }}
        >
          {notifications.length}
        </Grid>
        )}
      </Button>
      <ListSubheader component="div" inset>
        Organizer Information
      </ListSubheader>
      <Button
        style={{ width: "100%" }}
        onClick={() => handleListItemClick("Profile")}
      >
        <ListItemIcon>
          <AssignmentIndIcon sx={styleIcon} />
        </ListItemIcon>
        <ListItemText sx={style} primary="Profile" />
      </Button>
      <Divider sx={{ my: 1 }} />
      <Button
        style={{ width: "100%" }}
        onClick={() => handleListItemClick("Bank Account")}
      >
        <ListItemIcon>
          <CurrencyExchangeIcon sx={styleIcon} />
        </ListItemIcon>
        <ListItemText sx={style} primary="Bank Account" />
      </Button>
      <Divider sx={{ my: 1 }} />
      <Button
        style={{ width: "100%" }}
        onClick={() => handleListItemClick("Log out")}
      >
        <ListItemIcon>
          <LogoutIcon sx={styleIcon} />
        </ListItemIcon>
        <ListItemText sx={style} primary="Log out" />
      </Button>
      <Divider sx={{ my: 1 }} />
    </React.Fragment>
  );
};

export default MainListItems;
