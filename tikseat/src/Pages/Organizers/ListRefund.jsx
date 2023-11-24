import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ApiEvent from "../../API/Event/ApiEvent";
import CheckIcon from "@mui/icons-material/Check";
import {
  // getLocalStorageUserData,
  // setLocalStorageUserInfo,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import { Button, Grid } from "@mui/material";
import axios from "axios";

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
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    const listRefund = async () => {
      try {
        const response = await ApiEvent.getListRefund({
          _idOrganizer: dataInfo._id,
        });
        if (response.status === true) {
          setRefunds(response.refund);
        } else {
          console.log("error!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    listRefund();
  }, []);

  const handleAcceptRefund = async (row) => {
    console.log(row._id);
    try {
      const response = await ApiEvent.acceptRefund({
        _idRefund: row._id,
        isRefund: true,
      });
      if (response.status === true) {
        console.log("aaa");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name event</StyledTableCell>
              <StyledTableCell align="center">Refund Day&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Class ticket</StyledTableCell>
              <StyledTableCell align="center">Chair name&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Money refund</StyledTableCell>
              <StyledTableCell align="center">Refunded</StyledTableCell>
              <StyledTableCell align="center"> Action&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {refunds.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.event_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.refund_date).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.tickets[0].classTicket}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.tickets.map((ticket) => ticket.chairName).join(", ")}
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
                      height: "80%",
                      width: "100%",
                      borderRadius: "5px",
                      backgroundColor:
                        row.refunded === true
                          ? "#A0E9FF"
                          : row.refunded === false
                          ? "#E49393"
                          : "#FFFD8C",
                      boxShadow:
                        row.refunded === true
                          ? "0px 0px 7px 5px #A0E9FF"
                          : row.refunded === false
                          ? "0px 0px 7px 5px #E49393"
                          : "0px 0px 7px 5px #FFFD8C",
                    }}
                  >
                    {row.refunded.toLocaleString()}
                  </Grid>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.isRefund === false ? (
                    <Grid
                      style={{
                        backgroundColor: "#07bc0c",
                      }}
                    >
                      <Button
                        style={{ width: "100%", color: "white" }}
                        onClick={() => handleAcceptRefund(row)}
                      >
                        Accept
                      </Button>
                    </Grid>
                  ) : (
                    <CheckIcon style={{color:"#07bc0c"}} />
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListRefund;
