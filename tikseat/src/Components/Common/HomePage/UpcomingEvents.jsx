import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UPCOMING_EVENTS } from "../../../Assets/Constant/Common/constCommon";
import { colorIndigo } from "../../../Assets/CSS/Style/theme";
import CardItem from "./CardItem";
import { BoxPaginationStyle } from "../../../Assets/CSS/Style/style.const";
import ApiClient from "../../../API/Client/ApiClient";
import { useOpenStore } from "../../../Store/openStore";
import ApiEvent from "../../../API/Event/ApiEvent";

const UpcomingEvents = () => {
  const [page, setPage] = useState(1);
  const { searchEvent } = useOpenStore();
  const [dataEvent, setDataEvent] = useState([]);
  console.log("dataEvent: ", dataEvent);
  const itemsPerPage = 12;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (searchEvent?.event_name?.length > 0 || searchEvent !== null) {
      async function handleSearchEvent() {
        const resDataSearchEvent = await ApiEvent.searchEvent(searchEvent);
        setDataEvent(resDataSearchEvent.data);
        console.log("resDataSearchEvent.events: ", resDataSearchEvent);
      }
      handleSearchEvent();
    }
    if (searchEvent === null || searchEvent?.event_name?.length === 0) {
      async function getAllEvents() {
        const responseEvents = await ApiClient.getAllEvents({ page });
        console.log("responseEvents: ", responseEvents);
        setDataEvent(responseEvents.events);
      }
      getAllEvents();
    }
  }, [page, searchEvent]);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData =
    dataEvent?.length > 0 && dataEvent.slice(startIndex, endIndex);
  return (
    <Box style={{ margin: "150px auto", maxWidth: "80%" }}>
      <Box style={{ display: "flex", with: "100%", alignItems: "center" }}>
        <Typography
          style={{ fontSize: "40px", color: `${colorIndigo}` }}
          variant="h1"
          component="h2"
        >
          {UPCOMING_EVENTS}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* <Box sx={{ display: { xs: "none", md: "flex", gap: "30px" } }}>
          <SelectCustom></SelectCustom>
          <SelectCustom></SelectCustom>
          <SelectCustom></SelectCustom>
        </Box> */}
      </Box>
      <Box marginTop={"100px"}>
        <Grid container spacing={2}>
          {currentPageData?.length > 0 &&
            currentPageData.map((item, index) => {
              return (
                <Grid item xs={4} key={item._id}>
                  <CardItem dataEventItem={item}></CardItem>
                </Grid>
              );
            })}
        </Grid>
        <BoxPaginationStyle>
          <Pagination
            count={Math.ceil(dataEvent?.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            defaultPage={1}
            shape="rounded"
            variant="outlined"
          />
        </BoxPaginationStyle>
      </Box>
    </Box>
  );
};

export default UpcomingEvents;
