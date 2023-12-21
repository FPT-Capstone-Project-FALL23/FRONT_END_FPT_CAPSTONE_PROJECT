import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Grid, Typography } from "@mui/material";

export default function BasicArea({ dataChart }) {
  console.log(dataChart);
  return (
    <>
      <Grid item>
        <Typography variant="h5" fontWeight={600}>
          Tickets are sold daily
        </Typography>
      </Grid>
      <LineChart
        xAxis={[{ data: dataChart?.months }]}
        series={[
          {
            data: dataChart?.totalAmounts,
            area: true,
          },
        ]}
        height={400}
        margin={{ left: 80 }}
      />
    </>
  );
}
