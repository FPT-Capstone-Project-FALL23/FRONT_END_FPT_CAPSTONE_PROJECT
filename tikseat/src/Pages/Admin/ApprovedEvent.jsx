import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "../../Assets/CSS/Admin/PageAdmin.css";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import TableList from "../../Components/Admin/Table/TableList";
import {
  NAME_COLUMNS_APPROVED_EVENT,
  NAME_COLUMNS_APPROVED_OGANIZAER,
} from "../../Assets/Constant/Admin/dataAdmin";
import {
  NAME_LIST_APPROVED_EVENT,
  NAME_LIST_APPROVED_ORGANIZER,
} from "../../Assets/Constant/Admin/constAdmin";

function ApprovedEvent() {
  const [dataTableEvent, setDataTableEvent] = useState();
  const [selected_event, setSelected_event] = useState(null);
  const [openComfirn, setOpenComfirn] = useState(false);

  const getAllEvent = async () => {
    try {
      const respones = await ApiAdmin.getAllEventIsActiveFalse();
      setDataTableEvent(respones.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvent();
  }, []);

  const handleDetailClick = async (_idEvent) => {
    try {
      const id = { _idEvent: _idEvent };
      const respones = await ApiAdmin.getDetailEvent(id);
      console.log("respones", respones);
      if (respones) {
        console.log(respones);
        setOpenComfirn(true);
        setSelected_event(respones.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickComfirn = async (isHot) => {
    try {
      const repuest = { _idEvent: selected_event._id, isHot: isHot };
      const respones = await ApiAdmin.setAcceptEvent(repuest);
      if (respones) {
        setOpenComfirn(false);
        getAllEvent();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <TableList
            dataTable={dataTableEvent}
            nameColumns={NAME_COLUMNS_APPROVED_EVENT}
            nameList={NAME_LIST_APPROVED_EVENT}
            isClient={false}
            isDetail={false}
            handleClick={handleDetailClick}
            setDetailOpen={setOpenComfirn}
            detailOpen={openComfirn}
            selectedUser={selected_event}
            isConfirmEvent={true}
            onConfirm={handleClickComfirn}
            isMaxWith={true}
          />
        </Box>
      </Box>
    </>
  );
}

export default ApprovedEvent;