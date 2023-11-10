import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import { NAME_LOGO } from "../../Assets/Constant/Common/constCommon";
import { navItems } from "../../Assets/Constant/Common/dataCommon";
import { Link, useNavigate } from "react-router-dom";
import { colorBlack } from "../../Assets/CSS/Style/theme";
import {
  getLocalStorageUserData,
  setLocalStorageUserData,
  setLocalStorageUserInfo,
} from "../../Store/userStore";
import styled from "styled-components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "18px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ededed",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#ededed",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};
const HistoryPayment = () => {
  const dataUser = getLocalStorageUserData();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ManagementUser = [
    { content: `Welcome ${dataUser?.email}` },
    { url: "/createProfileClient", content: "My profile" },
    { url: "/login", content: "Log out" },
  ];

  const rows = [
    {
      event_name: "tesst",
      transaction_date: new Date().toLocaleString(),
      price: "2222222",
    },
    {
      event_name: "tesst2",
      transaction_date: new Date().toLocaleString(),
      price: "2222222",
    },
    {
      event_name: "tesst3",
      transaction_date: new Date().toLocaleString(),
      price: "2222222",
    },
    {
      event_name: "tesst4",
      transaction_date: new Date().toLocaleString(),
      price: "2222222",
    },
  ];
  return (
    <div>
      {" "}
      <AppBar
        style={{
          background: "white",
          position: "relative",
          padding: "0 150px",
          color: "black",
        }}
        component="nav"
      >
        <Toolbar style={{ width: "100%", justifyContent: "space-between" }}>
          <Typography variant="h3" className="logo" component="h4">
            {NAME_LOGO}
          </Typography>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                gap: "40px",
                alignItems: "center",
              },
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex", gap: "30px" } }}>
              {navItems?.map((item, index) => (
                <Link
                  to={item.url}
                  key={index}
                  style={{ color: `${colorBlack}`, fontWeight: "500" }}
                >
                  {item.title}
                </Link>
              ))}
            </Box>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {ManagementUser?.map((item, index) => {
                if (!item?.url) {
                  return (
                    <MenuItem
                      style={{
                        cursor: "text",
                        backgroundColor: "transparent",
                      }}
                      key={index}
                    >
                      <Typography
                        textAlign="center"
                        onClick={() => navigate(item?.url)}
                      >
                        {item.content}
                      </Typography>
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem key={index}>
                    <Typography
                      textAlign="center"
                      style={{ color: "black" }}
                      onClick={() => {
                        if (item?.url === "/login") {
                          navigate(item?.url);
                          setLocalStorageUserData("");
                          setLocalStorageUserInfo("");
                        } else {
                          navigate(item?.url);
                        }
                      }}
                    >
                      {item.content}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box width={"100%"} display={"flex"} marginTop={"20px"}>
        <Stack direction={"column"} margin={"0 auto"}>
          <Typography variant="h2" textAlign={"center"}>
            Transaction history
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: "50px" }}>
            <Table
              sx={{ minWidth: 1050 }}
              size="medium"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell size="medium" align="center" colSpan={4}>
                    Transaction list
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="left">Event Name</StyledTableCell>

                  <StyledTableCell align="left">
                    Transaction date
                  </StyledTableCell>

                  <StyledTableCell align="left">Price</StyledTableCell>

                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.event_name}
                    </TableCell>
                    <TableCell align="left">{row.transaction_date}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={handleOpen}
                        size="large"
                        variant="contained"
                      >
                        Detail
                      </Button>
                      <Modal open={open} onClose={handleClose}>
                        <Box sx={style}>
                          <TableContainer component={Paper}>
                            <Table size="medium" aria-label="a dense table">
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                    }}
                                    size="medium"
                                    align="center"
                                    colSpan={2}
                                  >
                                    View detail history payment
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Event name</TableCell>
                                  <TableCell>AbC</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Event date</TableCell>
                                  <TableCell>
                                    {new Date().toLocaleString()}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Class ticket</TableCell>
                                  <TableCell>Vip</TableCell>
                                </TableRow>
                                <TableCell>Chair name</TableCell>
                                <TableCell>b1, b2, b3</TableCell>
                                <TableRow>
                                  <TableCell>Total price</TableCell>
                                  <TableCell>150.000 VND</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Transaction date</TableCell>
                                  <TableCell>
                                    {new Date().toLocaleString()}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Modal>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </div>
  );
};

export default HistoryPayment;
