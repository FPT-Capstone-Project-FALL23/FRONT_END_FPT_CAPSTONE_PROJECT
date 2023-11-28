import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Admin/Navbar";
import { Box } from "@mui/material";
import "../../Assets/CSS/Admin/PageAdmin.css";
import Sidenav from "../../Components/Admin/Sidenav";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import TableList from "../../Components/Admin/Table/TableList";
import { NAME_COLUMNS_CLIENT } from "../../Assets/Constant/Admin/dataAdmin";
import { CLIENT, NAME_CLIENT } from "../../Assets/Constant/Admin/constAdmin";

function ClientPageAdmin() {
  const [dataTableClient, setDataTableClient] = useState();
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDetailOpen, setClientDetailOpen] = useState(false);

  const getAllClient = async () => {
    try {
      const respones = await ApiAdmin.getAllClients();
      setDataTableClient(respones.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClient();
  }, []);

  const handleDetailClick = async (_idUser) => {
    const id = { _idUser: _idUser };
    const respones = await ApiAdmin.getDetailClient(id);
    console.log("respones", respones);
    if (respones) {
      setSelectedClient(respones.data);
      setClientDetailOpen(true);
    }
  };

  return (
    <>
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <TableList
            dataTableClient={dataTableClient}
            handleDetailClick={handleDetailClick}
            selectedDetail={selectedClient}
            detailOpen={clientDetailOpen}
            setDetailOpen={setClientDetailOpen}
            nameColumns={NAME_COLUMNS_CLIENT}
            isClient={true}
            nameList={NAME_CLIENT}
            nameTitle={CLIENT}
          />
        </Box>
      </Box>
    </>
  );
}

export default ClientPageAdmin;
