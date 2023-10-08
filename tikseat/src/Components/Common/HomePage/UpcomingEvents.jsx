import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import { UPCOMING_EVENTS } from "../../../Assets/Constant/Common/constHome";
import { colorIndigo } from "../../../Assets/CSS/Style/theme";
import CardItem from "./CardItem";
import SelectCustom from "../HomePage/SelectCustom";
import { BoxPaginationStyle } from "../../../Assets/CSS/Style/style.const";

const UpcomingEvents = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const dataEvent = Array(29).fill(0);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = dataEvent.slice(startIndex, endIndex);
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
        <Box sx={{ display: { xs: "none", md: "flex", gap: "30px" } }}>
          <SelectCustom></SelectCustom>
          <SelectCustom></SelectCustom>
          <SelectCustom></SelectCustom>
        </Box>
      </Box>
      <Box marginTop={"100px"}>
        <Grid container spacing={2}>
          {currentPageData.map((item, index) => {
            return (
              <Grid item xs={2.4} key={index}>
                <CardItem></CardItem>
              </Grid>
            );
          })}
        </Grid>
        <BoxPaginationStyle>
          <Pagination
            count={Math.ceil(dataEvent.length / itemsPerPage)}
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
