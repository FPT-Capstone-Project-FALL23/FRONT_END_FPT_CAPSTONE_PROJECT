import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ApiEvent from "../../API/Event/ApiEvent";
import {
  // getLocalStorageUserData,
  // setLocalStorageUserInfo,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import { Button, Grid } from "@mui/material";

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

function EventHistory({ onEventDetail }) {
  const dataInfo = getLocalStorageUserInfo();
  const [eventHistory, setEventHistory] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const dataEventHistory = async () => {
      try {
        const response = await ApiEvent.eventHistory({
          _idOrganizer: dataInfo._id,
          page: page,
        });
        console.log("data: ", response);
        if (response.status === true) {
          console.log(response.data);
          setEventHistory(response.data);
        } else {
          console.log("error!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    dataEventHistory();
  }, []);

  console.log(eventHistory);

  const handleEventDetail = (row) => {
    // const eventId = row._idEvent;
    console.log(row);
    onEventDetail(row);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name event</StyledTableCell>
              <StyledTableCell align="center">Start Day&nbsp;</StyledTableCell>
              <StyledTableCell align="center">
                Total Estimated&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">
                Total Actual&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">
                Event Status&nbsp;
              </StyledTableCell>
              <StyledTableCell align="center">isActive&nbsp;</StyledTableCell>
              <StyledTableCell align="center">
                Detail Statistics
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventHistory.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.eventName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row.startDay).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.totalEstimated}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.totalActual}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Grid
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      height: "80%",
                    }}
                  >
                    <Grid
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height:"100%",
                        width: "70%",
                        borderRadius: "5px",
                        margin: "0px 10% 0px 10%",
                        backgroundColor:
                          row.eventStatus === "UPCOMING"
                            ? "#A0E9FF"
                            : row.eventStatus === "FINISHED"
                            ? "#E49393"
                            : "#FFFD8C",
                        boxShadow:
                          row.eventStatus === "UPCOMING"
                            ? "0px 0px 7px 5px #A0E9FF"
                            : row.eventStatus === "FINISHED"
                            ? "0px 0px 7px 5px #E49393"
                            : "0px 0px 7px 5px #FFFD8C",
                      }}
                    >
                      {row.eventStatus}
                    </Grid>
                  </Grid>
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
                      backgroundColor: row.isActive ? "#A0E9FF" : "#E49393",
                      boxShadow: row.isActive
                        ? "0px 0px 7px 5px #A0E9FF"
                        : "0px 0px 7px 5px #E49393",
                    }}
                  >
                    {row.isActive ? "approved" : "waiting"}
                  </Grid>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    style={{ border: "solid 1px" }}
                    onClick={() => handleEventDetail(row)}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        marginRight: "5px",
                        paddingTop: "8px",
                      }}
                    >
                      Statistics
                    </span>
                    <LeaderboardIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EventHistory;
