import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Footer from "../../Components/Common/Footer/Footer";
import Header from "../../Components/Common/Header/Header";
import UpcomingEvents from "../../Components/Common/HomePage/UpcomingEvents";
import { checkToken } from "../Admin/Adminpage";
import { useNavigate } from "react-router-dom";
import { useOpenStore } from "../../Store/openStore";
import ApiClient from "../../API/Client/ApiClient";
import ApiEvent from "../../API/Event/ApiEvent";

function HomePage() {
  const navigate = useNavigate();
  const { setEventId } = useOpenStore();
  const [searchEvent, setSearchEvent] = useState();
  const [page, setPage] = useState(1);
  const [dataEvent, setDataEvent] = useState([]);

  async function getAllEvents() {
    const responseEvents = await ApiClient.getAllEvents({ page });
    setDataEvent(responseEvents?.events);
  }

  useEffect(() => {
    setEventId(null);
    checkToken(navigate);
    getAllEvents();
  }, []);

  async function handleSearchEvent() {
    const resDataSearchEvent = await ApiEvent.searchEvent(searchEvent);
    setDataEvent(resDataSearchEvent?.data);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header
        setSearchEvent={setSearchEvent}
        handleSearchEvent={handleSearchEvent}
      />
      <UpcomingEvents page={page} setPage={setPage} dataEvent={dataEvent} />
      <Footer></Footer>
    </Box>
  );
}

export default HomePage;
