/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import ApiClient from "../../API/Client/ApiClient";
import { getLocalStorageUserInfo } from "../../Store/userStore";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import Row from "../../Components/Common/rowTable/RowTable";
import { useOpenStore } from "../../Store/openStore";

const MyTicket = () => {
  const dataInfo = getLocalStorageUserInfo();
  const [dataMyTicket, setDataMyTicket] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true); // Add a loading state

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    // Simulate a 10-second loading delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);
  // Function to slice the data for the current page

  console.log("dataMyTicket: ", dataMyTicket);
  const { checkRefund, setCheckRefund } = useOpenStore();

  async function getAllOrdersAvailableTickets() {
    try {
      const response = await ApiClient.getOrdersAvailableTickets({
        _idClient: dataInfo?._id,
      });

      if (!response || !response.data) {
        return;
      }

      const uniqueEvents = response.data.reduce((acc, event) => {
        const existingEvent = acc.find(
          (e) =>
            e.event_name === event.event_name &&
            e.chair_name.join() === event.chair_name.join()
        );

        if (!existingEvent) {
          acc.push(event);
        }

        return acc;
      }, []);

      const sortedEvents = uniqueEvents.sort(
        (a, b) => new Date(b.event_date) - new Date(a.event_date)
      );

      setDataMyTicket(sortedEvents);
      setCheckRefund(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  const getPaginatedData = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return dataMyTicket?.slice(startIndex, endIndex);
  };
  console.log("getPaginatedData: ", getPaginatedData());
  useEffect(() => {
    if (checkRefund) {
      getAllOrdersAvailableTickets();
      console.log("loading render complete");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkRefund]);

  useEffect(() => {
    getAllOrdersAvailableTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInfo._id]);

  const mappingDataMyTicket =
    getPaginatedData()?.length > 0 &&
    getPaginatedData().map((item) => {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack direction={"column"} margin={"0 auto"}>
        <Typography variant="h4" marginTop={"20px"} textAlign={"center"}>
          Ticket list
        </Typography>
      </Stack>
      <Paper style={{ marginTop: "20px", width: "80%", overflow: "hidden" }}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead style={{ background: "#e3e3e3" }}>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell align="left">Event Date</TableCell>
                <TableCell align="left">City</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                mappingDataMyTicket?.length > 0 &&
                mappingDataMyTicket.map((row, index) => (
                  <Row
                    key={index}
                    row={row}
                    onRefetch={getAllOrdersAvailableTickets}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={dataMyTicket.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
    </div>
  );
};

export default MyTicket;
