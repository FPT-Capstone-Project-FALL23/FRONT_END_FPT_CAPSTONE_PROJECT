import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import TotalRevenue from "../../Components/Organizers/TotalRevenue";
import DayChart from "../../Components/Organizers/DayChart";
import MonthChart from "../../Components/Organizers/MonthChart";

function DefaultDashboard() {
  //   const theme = useTheme();

  //   const { primary, secondary } = theme.palette.text;
  //   const line = theme.palette.divider;

  const [slot, setSlot] = useState("month");

  return (
    <>
      <Grid>
        <TotalRevenue />
      </Grid>
      <Grid
        style={{
          display: "flex",
          marginTop: "30px",
          justifyContent: "space-between",
        }}
      >
        <Grid
          style={{
            height: "450px",
            width: "60%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Unique Visitor</Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={0}>
                  <Button
                    size="small"
                    onClick={() => setSlot("month")}
                    color={slot === "month" ? "primary" : "secondary"}
                    variant={slot === "month" ? "outlined" : "text"}
                  >
                    Month
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSlot("week")}
                    color={slot === "week" ? "primary" : "secondary"}
                    variant={slot === "week" ? "outlined" : "text"}
                  >
                    Week
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            style={{ border: "1px solid #ccc", borderRadius: "10px" }}
            item
            xs={12}
            md={7}
            lg={8}
          >
            <MonthChart slot={slot} />
          </Grid>
        </Grid>

        <Grid
          style={{
            height: "450px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Unique Visitor</Typography>
            </Grid>
          </Grid>
          <Grid
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              paddingBottom: "15px",
            }}
          >
            <DayChart />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DefaultDashboard;
