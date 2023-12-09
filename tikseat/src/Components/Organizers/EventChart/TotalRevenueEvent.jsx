import React from "react";
import Grid from "@mui/material/Grid";
import AnalyticEcommerce from "../../../Components/Cards/AnalyticEcommerce";

function TotalRevenueEvent({ eventTotalDetail }) {

  console.log(eventTotalDetail);

  return (
    <>
      <Grid>
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid sx={{width:"24%"}}>
            <AnalyticEcommerce
              title="Actual money"
              count={eventTotalDetail.totalRevenue}
              // percentage={allDataEvent.percent}
              percentage={75}
              extra="8,900"
            />
          </Grid>
          <Grid sx={{width:"24%"}}>
            <AnalyticEcommerce
              title="Total Ticket"
              count={eventTotalDetail.totalChairs}
              percentage={70.5}
              extra="8,900"
            />
          </Grid>
          <Grid sx={{width:"24%"}}>
            <AnalyticEcommerce
              title="Total Buy Ticket"
              count={eventTotalDetail.totalSoldChairs}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid sx={{width:"24%"}}>
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