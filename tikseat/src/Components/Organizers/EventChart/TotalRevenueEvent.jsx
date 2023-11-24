import React from "react";
import Grid from "@mui/material/Grid";
import AnalyticEcommerce from "../../../Components/Cards/AnalyticEcommerce";
import Typography from "@mui/material/Typography";

function TotalRevenueEvent({ eventTotalDetail }) {

  console.log(eventTotalDetail);

  return (
    <>
      <Grid>
        <Grid style={{ marginBottom: "20px" }} item xs={12} sx={{ mb: 0 }}>
          <Typography variant="h4">Total Statistics</Typography>
        </Grid>
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid>
            <AnalyticEcommerce
              title="Actual money"
              count={eventTotalDetail.totalRevenue}
              // percentage={allDataEvent.percent}
              percentage={75}
              extra="8,900"
            />
          </Grid>
          <Grid>
            <AnalyticEcommerce
              title="Total Ticket"
              count={eventTotalDetail.totalChairs}
              percentage={70.5}
              extra="8,900"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Buy Ticket"
              count={eventTotalDetail.totalSoldChairs}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Check in"
              count={eventTotalDetail.totalCheckedInChairs}
              percentage={27.4}
              isLoss
              color="warning"
              extra="$20,395"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default TotalRevenueEvent