/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Box,
  Button,
  Chip,
  Collapse,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ApiClient from "../../API/Client/ApiClient";
import { getLocalStorageUserInfo } from "../../Store/userStore";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DialogSendMail from "../../Components/Client/DialogSendMail";

const RefundableTickets = () => {
  const dataInfo = getLocalStorageUserInfo();
  const [dataMyTicket, setDataMyTicket] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  
  function handleOponeDialog(){
    setOpenDialog(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getPaginatedData = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return dataMyTicket?.slice(startIndex, endIndex);
  };
  useEffect(() => {
    async function getDataOrderByClient() {
      const response = await ApiClient.getOrdersRefundTicket({
        _idClient: dataInfo?._id,
      });
      const uniqueEvents = await response?.data?.filter(
        (event, index, self) =>
          index ===
          self.findIndex(
            (e) =>
              e.event_name === event.event_name &&
              e.chair_name.join() === event.chair_name.join()
          )
      );
      setDataMyTicket(() => uniqueEvents);
    }

    getDataOrderByClient();
  }, [dataInfo._id]);

  const mappingDataMyTicket =
    getPaginatedData()?.length > 0 &&
    getPaginatedData().map((item) => {
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
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [dataMyTicket, setDataMyTicket] = useState([]);
    useEffect(() => {
      if (open) {
        async function getMyTicket() {
          const res = await ApiClient.getMyTicket({
            _idOrderDetail: row._idOrderDetail,
          });
          console.log("res", res.data);
          setDataMyTicket(res?.data[0]?.Orders[0]?.tickets);
        }
        getMyTicket();
      }
    }, [row._idOrderDetail, open]);
    console.log("dataMyTicket", dataMyTicket);
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row?.eventName}
          </TableCell>
          <TableCell align="left">{row.eventDate}</TableCell>
          <TableCell align="left">{row.city}</TableCell>
          <TableCell>
            <Stack direction={"row"} gap={"10px"}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {open ? "collapse" : "Show more"}
              </Button>{" "}
            </Stack>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell width={"5%"} />
                      <TableCell width={"25%"} />
                      <TableCell width={"20%"} />
                      <TableCell width={"20%"} />
                      <TableCell width={"20%"}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataMyTicket?.length > 0 &&
                      dataMyTicket?.map((ViewDetailRow, index) => {
                        if (!ViewDetailRow?.isRefund) {
                          return null;
                        }
                        return (
                          <TableRow checkboxSelection key={ViewDetailRow._id}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              Class ticket: {ViewDetailRow.classTicket}
                            </TableCell>
                            <TableCell align="left">
                              Chair: {ViewDetailRow.chairName}
                            </TableCell>
                            <TableCell align="left">
                              Price: {ViewDetailRow.ticket_price}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{ cursor: "pointer" }}
                            >
                              <Chip
                                label={
                                  ViewDetailRow.refunded
                                    ? "Refunded"
                                    : "No refund yet"
                                }
                              />
                              {!ViewDetailRow.refunded &&
                                <IconButton color="error" onClick={handleOponeDialog} >
                                  <PriorityHighIcon/>
                                </IconButton>
                              }
                              <DialogSendMail isDialogOpen={openDialog} setIsDialogOpen={setOpenDialog} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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
              {mappingDataMyTicket?.length > 0 &&
                mappingDataMyTicket.map((row, index) => (
                  <Row key={index} row={row} />
                ))}
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
    </div>
  );
};

export default RefundableTickets;
