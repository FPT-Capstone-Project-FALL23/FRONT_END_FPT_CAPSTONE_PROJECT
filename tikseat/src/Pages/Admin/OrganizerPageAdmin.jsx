import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Admin/Navbar";
import { Box } from "@mui/material";
import "../../Assets/CSS/Admin/PageAdmin.css";
import Sidenav from "../../Components/Admin/Sidenav";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import TableList from "../../Components/Admin/Table/TableList";
import { NAME_COLUMNS_ORGANIZAER } from "../../Assets/Constant/Admin/dataAdmin";
import {
  NAME_ORGANIZER,
  ORGANIZER,
} from "../../Assets/Constant/Admin/constAdmin";

function OrganizerPageAdmin() {
  const [dataTableOrganizer, setDataTableOrganizer] = useState();
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [organizerDetailOpen, setOrganizerDetailOpen] = useState(false);

  const getAllOrganizer = async () => {
    try {
      const respones = await ApiAdmin.getAllOrganizers();
      setDataTableOrganizer(respones.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrganizer();
  }, []);

  const handleDetailClick = async (_idUser) => {
    try {
      const id = { _idUser: _idUser };
      const respones = await ApiAdmin.getDetailOrganizer(id);
      console.log("respones", respones);
      if (respones) {
        setSelectedOrganizer(respones.data);
        setOrganizerDetailOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleStatus = (row) => {
    // Perform the logic to toggle the status (change isActive from true to false or vice versa)
    // You can use the row._id or any other identifier to update the status in your data
    console.log("Toggling status for user with ID:", row._id);
  };

  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <TableList
              dataTableClient={dataTableOrganizer}
              handleDetailClick={handleDetailClick}
              selectedDetail={selectedOrganizer}
              detailOpen={organizerDetailOpen}
              setDetailOpen={setOrganizerDetailOpen}
              nameColumns={NAME_COLUMNS_ORGANIZAER}
              isClient={false}
              nameList={NAME_ORGANIZER}
              nameTitle={ORGANIZER}
              handleToggleStatus={handleToggleStatus}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}

export default OrganizerPageAdmin;
