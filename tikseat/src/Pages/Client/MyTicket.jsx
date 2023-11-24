import {
  Box,
  Button,
  Collapse,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ApiClient from "../../API/Client/ApiClient";
import { getLocalStorageUserInfo } from "../../Store/userStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const MyTicket = () => {
  const dataInfo = getLocalStorageUserInfo();
  const [dataMyTicket, setDataMyTicket] = useState([]);
  console.log("dataOrderByClient: ", dataMyTicket);

  useEffect(() => {
    async function getDataOrderByClient() {
      const response = await ApiClient.orderByClient({
        _idClient: dataInfo?._id,
      });
      setDataMyTicket(response?.orders);
    }

    getDataOrderByClient();
  }, [dataInfo._id]);

  const mappingDataMyTicket =
    dataMyTicket?.length > 0 &&
    dataMyTicket.map((item) => {
      return {
        eventName: item.event_name,
        eventDate: item.event_date,
        city: item.event_location,
        ViewDetail: item.tickets,
      };
    });

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [openViewDetail, setOpenViewDetail] = React.useState(false);
    const [viewDetail, setViewDetail] = React.useState("");
    const handleOpen = () => setOpenViewDetail(true);
    const handleClose = () => setOpenViewDetail(false);
    const handleDownload = async () => {
      const response = await fetch(viewDetail);
      const blob = await response.blob();

      const imageUrlObject = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = imageUrlObject;
      link.download = "downloaded_image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row.eventName}
          </TableCell>
          <TableCell align="left">{row.eventDate}</TableCell>
          <TableCell align="left">{row.city}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setOpen(!open)}
            >
              {open ? "collapse" : "Show more"}
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell width={"5%"}></TableCell>
                      <TableCell width={"35%"}></TableCell>
                      <TableCell width={"20%"}></TableCell>
                      <TableCell width={"40%"} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.ViewDetail.map((ViewDetailRow, index) => (
                      <TableRow key={ViewDetailRow._id}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          Class ticket: {ViewDetailRow.classTicket}
                        </TableCell>
                        <TableCell align="left">
                          Chair: {ViewDetailRow.ChairName}
                        </TableCell>
                        <TableCell align="left" style={{ cursor: "pointer" }}>
                          <Stack direction={"row"} gap={"10px"}>
                            <Button
                              onClick={() => {
                                handleOpen();
                                setViewDetail(ViewDetailRow.ticket);
                              }}
                              size="large"
                              variant="contained"
                              color="success"
                            >
                              View detail
                            </Button>
                            <Button variant="contained" size="large">
                              Return ticket
                            </Button>
                          </Stack>
                          <Modal
                            open={openViewDetail}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <img
                                id="downloadImage"
                                src={viewDetail}
                                alt="image ticket"
                              />
                              <Button
                                onClick={handleDownload}
                                variant="contained"
                                size="large"
                                color="primary"
                              >
                                Download
                              </Button>
                            </Box>
                          </Modal>
                        </TableCell>
                      </TableRow>
                    ))}
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
              <Row key={index} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTicket;
