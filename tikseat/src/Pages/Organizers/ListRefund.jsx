import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ApiEvent from "../../API/Event/ApiEvent";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { getLocalStorageUserInfo } from "../../Store/userStore";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  TablePagination,
} from "@mui/material";
import { URL_SOCKET } from "../../API/ConstAPI";
import { io } from "socket.io-client";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    height: "70px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    height: "40px",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ListRefund() {
  const dataInfo = getLocalStorageUserInfo();
  const organizerId = dataInfo._id;
  const organizerName = dataInfo.organizer_name;
  const [refunds, setRefunds] = useState([]);
  console.log(refunds);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const socket = io(URL_SOCKET, { transports: ["websocket"] });
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Simulate a 10-second loading delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    socket?.emit("organizerId", organizerId);
  }, [socket, organizerId]);

  const handleNotificationRefund = () => {
    socket.emit("organizerToAdmin", {
      typeOfNotification: "acceptRefund",
      senderName: organizerName,
      receiverName: "65847b9a377aaf7126ac03ce",
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const listRefund = async () => {
    try {
      const response = await ApiEvent.getListRefund({
        _idOrganizer: dataInfo._id,
        page: page,
      });
      if (response.status === true) {
        setRefunds(response.data.results);
      } else {
        console.log("error!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listRefund();
  }, [page]);

  const handleAcceptRefund = async (row) => {
    console.log(row._id);
    try {
      const response = await ApiEvent.acceptRefund({
        _idRefund: row._id,
        isRefund: true,
      });
      if (response.status === true) {
        handleNotificationRefund();
        toast.success("Send notification to Admin success!", toastOptions);
        listRefund();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid sx={{ backgroundColor: "#ffffff" }}>
        <TableContainer
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          component={Paper}>
          <Table
            sx={{ borderBottom: "1px solid #ccc" }}
            aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name event</StyledTableCell>
                <StyledTableCell align="center">
                  Refund Day&nbsp;
                </StyledTableCell>
                <StyledTableCell align="center">Class ticket</StyledTableCell>
                <StyledTableCell align="center">
                  Chair name&nbsp;
                </StyledTableCell>
                <StyledTableCell align="center">Money refund</StyledTableCell>
                <StyledTableCell align="center">Refunded</StyledTableCell>
                <StyledTableCell align="center"> Action&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                refunds
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.event_name}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{width:"200px"}}>
                        {new Date(row.refund_date).toISOString().split("T")[0]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.classTicket}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.chair_name.join(", ")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.money_refund}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Grid
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            width: "100%",
                            backgroundColor:
                              row.refunded === true
                                ? "#A0E9FF"
                                : row.refunded === false
                                ? "#E49393"
                                : "#FFFD8C",
                          }}>
                          {row.refunded.toLocaleString()}
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.isRefund === false ? (
                          <Grid
                            style={{
                              backgroundColor: "#07bc0c",
                            }}>
                            <Button
                              style={{ width: "100%", color: "white" }}
                              onClick={() => handleAcceptRefund(row)}>
                              Accept
                            </Button>
                          </Grid>
                        ) : (
                          <CheckIcon style={{ color: "#07bc0c" }} />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
              )}
            </TableBody>
          </Table>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              borderTop: "1px solid #ccc",
            }}>
            <Stack spacing={2}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                component="div"
                count={refunds.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Stack>
          </Grid>
        </TableContainer>
      </Grid>
    </>
  );
}

export default ListRefund;
