import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Grid, Typography } from "@mui/material";

function DayChart({ dataAllEventDetail }) {
  return (
    <>
      <Grid item>
        <Typography variant="h5" fontWeight={600}>
          Total Buy Ticket
        </Typography>
      </Grid>
      <PieChart
        colors={["#337CCF", "#FF8551"]}
        series={[
          {
            data: [
              {
                id: 0,
                value: dataAllEventDetail.totalSoldChairs,
                label: "series A",
              },
              {
                id: 1,
                value:
                  dataAllEventDetail.totalChairs -
                  dataAllEventDetail.totalSoldChairs,
                label: "series B",
              },
            ],
          },
        ]}
        height={175}
        sx={{ width: "100%" }}
      />
    </>
  );
}

export default DayChart;
