import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function ListMenu({
  setMenuData,
  menuData,
  open,
  nameMenu,
  titleMenu,
  icon,
  isCollapse,
}) {
  return (
    <ListItem
      disablePadding
      sx={{ display: "block", border: "none" }}
      onClick={() => setMenuData(nameMenu)}>
      <ListItemButton
        sx={{
          minHeight: 50,
          justifyContent: open ? "initial" : "center",
          backgroundColor: menuData === nameMenu ? "#E0F4FF" : "transparent",
          borderRadius: "10px",
          margin: "5px 10px 5px 10px",
          px: 2.5,
          pl: isCollapse ? 4 : "null",
        }}>
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 1.5,
            justifyContent: "center",
          }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          sx={{ display: open ? "block" : "none" }}
          primary={titleMenu}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default ListMenu;
