/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ApiClient from "../../API/Client/ApiClient";
import { getLocalStorageUserInfo } from "../../Store/userStore";

import { ToastContainer } from "react-toastify";
import Row from "../../Components/Common/rowTable/RowTable";

const MyTicket = () => {
  const dataInfo = getLocalStorageUserInfo();
  const [dataMyTicket, setDataMyTicket] = useState([]);
  const [checkResRefund, setCheckResRefund] = React.useState(false);

  console.log("dataOrderByClient: ", dataMyTicket);

  useEffect(() => {
    async function getDataOrderByClient() {
      const response = await ApiClient.orderByClient({
        _idClient: dataInfo?._id,
      });
      console.log("response: ", response);
      setDataMyTicket(response?.data);
      setCheckResRefund(false);
    }

    getDataOrderByClient();
  }, [dataInfo._id, checkResRefund]);

  const mappingDataMyTicket =
    dataMyTicket?.length > 0 &&
    dataMyTicket.map((item) => {
      console.log("item:oo ", item);
      return {
        eventId: item.event_id,
        eventName: item?.event_name,
        eventDate: item?.event_date,
        city: item.event_location,
        _idOrderDetail: item._idOrderDetail,
        zp_trans_id: item.zp_trans_id,
        event_location: item.event_location,
      };
    });

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell align="left">Event Date</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {mappingDataMyTicket?.length > 0 &&
              mappingDataMyTicket.map((row, index) => (
                <Row
                  key={index}
                  row={row}
                  setCheckResRefund={setCheckResRefund}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default MyTicket;
