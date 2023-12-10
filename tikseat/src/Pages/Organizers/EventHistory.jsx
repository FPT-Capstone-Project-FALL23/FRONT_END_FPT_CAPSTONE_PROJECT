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
import RequestPageIcon from "@mui/icons-material/RequestPage";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import ApiEvent from "../../API/Event/ApiEvent";
import {
  // getLocalStorageUserData,
  // setLocalStorageUserInfo,
  getLocalStorageUserInfo,
} from "../../Store/userStore";
import { Button, Grid, Pagination, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";

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

export const ButtonAction = ({
  nameButton,
  icon,
  handleClick,
  row,
  nameHandle,
}) => {
  return (
    <Button
      style={{
        border: "solid 1px",
        width: "90%",
        height: "100%",
      }}
      onClick={
        nameButton == "Request payment"
          ? () => handleClick()
          : () => handleClick(row, nameHandle)
      }>
      <span
        style={{
          fontSize: "16px",
          marginRight: "5px",
          paddingTop: "8px",
        }}>
        {nameButton}
      </span>
      {icon}
    </Button>
  );
};

function EventHistory({ onEventDetail }) {
  const dataInfo = getLocalStorageUserInfo();
  const [eventHistory, setEventHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const dataEventHistory = async () => {
      try {
        const response = await ApiEvent.eventHistory({
          _idOrganizer: dataInfo._id,
          page: page,
        });
        if (response.status === true) {
          setEventHistory(response.data);
          setTotalPage(response.totalPages);
        } else {
          console.log("error!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    dataEventHistory();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleEventDetail = (row, actionType) => {
    setSelectedEvent(row);
    onEventDetail(row, actionType);
  };

  return (
    <>
      <TableContainer
        sx={{
          height: "89vh",
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
              <StyledTableCell>TotalRating</StyledTableCell>
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
            {eventHistory
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.eventName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Rating
                      name="customized-empty"
                      value={row.totalRating}
                      precision={0.5}
                      readOnly
                    />
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
                        height: "100%",
                        fontSize: "15px",
                      }}>
                      <Grid
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                          margin: "0px 10% 0px 10%",
                          fontWeight: "500",
                          backgroundColor:
                            row.eventStatus === "UPCOMING"
                              ? "#A0E9FF"
                              : row.eventStatus === "FINISHED"
                              ? "#E49393"
                              : "#FFFD8C",
                        }}>
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
                        height: "100%",
                        fontWeight: "500",
                        width: "100%",
                        backgroundColor: row.isActive ? "#A0E9FF" : "#E49393",
                      }}>
                      {row.isActive ? "approved" : "waiting"}
                    </Grid>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      padding: "12px",
                    }}>
                    <Grid sx={{ width: "48%" }}>
                      <ButtonAction
                        nameButton="Statistics"
                        icon={<LeaderboardIcon />}
                        row={row}
                        handleClick={handleEventDetail}
                        nameHandle="statistics"
                      />
                    </Grid>
                    <Grid sx={{ width: "48%" }}>
                      {row.eventStatus == "FINISHED" ? (
                        <ButtonAction
                          nameButton="Request payment"
                          icon={<RequestPageIcon />}
                        />
                      ) : (
                        <ButtonAction
                          nameButton="Update"
                          icon={<EditIcon />}
                          row={row}
                          handleEventDetail={handleEventDetail}
                          nameHandle="update"
                        />
                      )}
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "11px",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #ccc",
            position: "flxed",
            bottom: "11px",
            width: "100%",
          }}>
          <Stack spacing={2}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              component="div"
              count={totalPage}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Grid>
      </TableContainer>
    </>
  );
}

export default EventHistory;
