import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Grid, Typography } from "@mui/material";

export default function BasicArea({ statisticalEvent }) {
  console.log(statisticalEvent);

  return (
    <>
    <Grid item>
        <Typography variant="h5" fontWeight={600}>
          Tickets are sold daily
        </Typography>
      </Grid>
    <LineChart
      xAxis={[{ data: statisticalEvent?.dates }]}
      series={[
        {
          data: statisticalEvent?.totalAmounts,
          area: true,
        },
      ]}
      height={400}
      margin={{ left: 80 }}
    />
    </>
  );
}