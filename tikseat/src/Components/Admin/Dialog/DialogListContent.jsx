import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import {
  LIST_NAME_CONTENT_DAILOG_CLIENT,
  LIST_NAME_CONTENT_DAILOG_ORGANIZER,
} from "../../../Assets/Constant/Admin/constAdmin";
import { Tab, Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import { Avatar, Typography } from "@mui/material";
import DialogContentClinet from "./DialogContentClinet";
import DialogContentOrganization from "./DialogContentOrganization";
import TableListEventOfOrganization from "../Table/TableListEventOfOrganization";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  flex: "none",
  width: theme.spacing(8),
  height: theme.spacing(8),
  marginRight: theme.spacing(2),
}));

const StyledName = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const StyledOtherText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

function DialogListContent({ selectedDetail, isClient, selectedDataEvent }) {
  const RenderCardOrganizer = ({ selectedDetail }) => {
    const [activeTab, setActiveTab] = useState("1");

    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };

    return (
      <>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <StyledAvatar src={selectedDetail?.avatarImage} />
          <StyledName variant="h6" gutterBottom>
            {selectedDetail?.organizer_name}
          </StyledName>
          <Box sx={{ flex: 1, overflowY: "auto", paddingRight: "16px" }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example">
                  <Tab label="Organizational Information" value="1" />
                  <Tab label="All organizational events" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <DialogContentOrganization
                  LIST_NAME_CONTENT_DAILOG_ORGANIZER={
                    LIST_NAME_CONTENT_DAILOG_ORGANIZER
                  }
                  selectedDetail={selectedDetail}
                />
              </TabPanel>
              <TabPanel value="2">
                <TableListEventOfOrganization
                  selectedDataEvent={selectedDataEvent}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <CardContent>
      {isClient ? (
        <DialogContentClinet
          selectedDetail={selectedDetail}
          LIST_NAME_CONTENT_DAILOG_CLIENT={LIST_NAME_CONTENT_DAILOG_CLIENT}
        />
      ) : (
        <RenderCardOrganizer selectedDetail={selectedDetail} />
      )}
    </CardContent>
  );
}

export default DialogListContent;
