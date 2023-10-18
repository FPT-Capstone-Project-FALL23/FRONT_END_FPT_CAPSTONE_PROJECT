import React, { useState } from "react";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LayersIcon from "@mui/icons-material/Layers";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useNavigate } from "react-router-dom";

const MainListItems = () => {
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
      navigate("/profileOrganizers");
    } else if (value === "Bank Account") {
      navigate("/add-payment");
    } else if (value === "Log out") {
      navigate("/logout");
    }
  };

  return (
    <React.Fragment>
      <Button style={{width:"100%", paddingLeft:"10px"}} onClick={() => handleListItemClick("Dashboard")}>
        <ListItemIcon>
          <DashboardIcon style={{ paddingLeft:"10px"}}/>
        </ListItemIcon>
        <ListItemText style={{  display:"flex", textAline:"start"}} primary="Dashboard" />
      </Button >
      <Divider sx={{ my: 1 }} />
      <Button style={{width:"100%"}} onClick={() => handleListItemClick("newEvent")}>
        <ListItemIcon>
          <AddCircleIcon style={{ paddingLeft:"10px"}}/>
        </ListItemIcon>
        <ListItemText style={{  display:"flex", textAline:"start"}} primary="New Event" />
      </Button >
      <Divider sx={{ my: 1 }} />
      <Button style={{width:"100%"}} onClick={() => handleListItemClick("EventHistory")}>
        <ListItemIcon>
          <WorkHistoryIcon style={{ paddingLeft:"10px"}}/>
        </ListItemIcon>
        <ListItemText style={{  display:"flex", textAline:"start"}} primary="Event History" />
      </Button >
      <Divider sx={{ my: 1 }} />
      <Button style={{width:"100%"}} onClick={() => handleListItemClick("Notification")}>
        <ListItemIcon>
          <NotificationsActiveIcon style={{ paddingLeft:"10px"}}/>
        </ListItemIcon>
        <ListItemText style={{  display:"flex", textAline:"start"}} primary="Notification" />
      </Button >
      <Divider sx={{ my: 1 }} />
      <Button style={{width:"100%"}} onClick={() => handleListItemClick("Integrations")}>
        <ListItemIcon>
          <LayersIcon style={{ paddingLeft:"10px"}}/>
        </ListItemIcon>
        <ListItemText style={{  display:"flex", textAline:"start"}} primary="Integrations" />
      </Button >

      <ListSubheader component="div" inset>
        Organizer Information
      </ListSubheader>
      <Button style={{width:"100%"}} onClick={() => handleListItemClick('Profile')}>
        <ListItemIcon>
          <AssignmentIndIcon style={{ paddingLeft:"10px"}}/>
        </ListItemIcon>
        <ListItemText style={{  display:"flex", textAline:"start"}} primary="Profile" />
      </Button >
      <Divider sx={{ my: 1 }} />
      <Button style={{width:"100%"}} onClick={() => handleListItemClick('Bank Account')}>
        <ListItemIcon>
          <CurrencyExchangeIcon style={{ paddingLeft:"10px"}}/>
        </ListItemIcon>
        <ListItemText style={{  display:"flex", textAline:"start"}} primary="Bank Account" />
      </Button >
      <Divider sx={{ my: 1 }} />
      <Button style={{width:"100%"}} onClick={() => handleListItemClick('Log out')}>
        <ListItemIcon>
          <LogoutIcon style={{ paddingLeft:"10px"}}/>
        </ListItemIcon>
        <ListItemText style={{  display:"flex", textAline:"start"}} primary="Log out" />
      </Button >
      <Divider sx={{ my: 1 }} />
    </React.Fragment>
  );
};

export default MainListItems;
