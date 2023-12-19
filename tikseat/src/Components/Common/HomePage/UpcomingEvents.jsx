import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UPCOMING_EVENTS } from "../../../Assets/Constant/Common/constCommon";
import { colorIndigo } from "../../../Assets/CSS/Style/theme";
import CardItem from "./CardItem";
import { BoxPaginationStyle } from "../../../Assets/CSS/Style/style.const";
import ApiClient from "../../../API/Client/ApiClient";
import { useOpenStore } from "../../../Store/openStore";
import ApiEvent from "../../../API/Event/ApiEvent";

const UpcomingEvents = ({ page, setPage, dataEvent }) => {
  // const [page, setPage] = useState(1);
  // const { searchEvent } = useOpenStore();
  // const [dataEvent, setDataEvent] = useState([]);
  const itemsPerPage = 12;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData =
    dataEvent?.length > 0 && dataEvent?.slice(startIndex, endIndex);
  return (
    <Box style={{ margin: "150px auto", maxWidth: "80%" }}>
      <Box style={{ display: "flex", with: "100%", alignItems: "center" }}>
        <Typography
          style={{ fontSize: "40px", color: `${colorIndigo}` }}
          variant="h1"
          component="h2">
          {UPCOMING_EVENTS}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <Box marginTop={"50px"}>
        <Grid container spacing={2}>
          {currentPageData?.length > 0 &&
            currentPageData?.map((item, index) => {
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
