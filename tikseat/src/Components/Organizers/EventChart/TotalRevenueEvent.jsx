import React from "react";
import Grid from "@mui/material/Grid";
import AnalyticEcommerce from "../../../Components/Cards/AnalyticEcommerce";

function TotalRevenueEvent({ eventTotalDetail }) {
  console.log(eventTotalDetail);

  return (
    <>
      <Grid container spacing={2} style={{ display: "flex" }}>
        <Grid item xs={4} style={{ flexGrow: 1 }}>
          <AnalyticEcommerce
            bgColor="linear-gradient(to right, #b10000, pink)"
            title="Actual money VNĐ"
            count={eventTotalDetail.totalRevenue?.toLocaleString()}
            // percentage={allDataEvent.percent}
            percentage={75}
            extra="8,900"
          />
        </Grid>
        <Grid item xs={4} style={{ flexGrow: 1 }}>
          <AnalyticEcommerce
            bgColor="linear-gradient(to right, #001b9f, #2ee1fd)"
            title="Ticket refund VNĐ"
            count={eventTotalDetail.totalRefundAmount?.toLocaleString()}
            percentage={27.4}
            isLoss
            color="warning"
            extra="$20,395"
          />
        </Grid>
        <Grid item xs={4} style={{ flexGrow: 1 }}>
          <AnalyticEcommerce
            bgColor="linear-gradient(to right, #eb9c39, #fff3c8)"
            title="Amount paid by the system VNĐ"
            count={eventTotalDetail.totalEventAmount?.toLocaleString()}
            percentage={27.4}
            isLoss
            color="warning"
            extra="$20,395"
          />
        </Grid>
        <Grid item xs={4} style={{ flexGrow: 1 }}>
          <AnalyticEcommerce
            bgColor="linear-gradient(to right, #209b40, #a5ff9f)"
            title="Total Ticket"
            count={eventTotalDetail.totalChairs}
            percentage={70.5}
            extra="8,900"
          />
        </Grid>
        <Grid item xs={4} style={{ flexGrow: 1 }}>
          <AnalyticEcommerce
            bgColor="linear-gradient(to right, #F875AA, #FFDFDF)"
            title="Total Buy Ticket"
            count={eventTotalDetail.totalSoldChairs}
            percentage={27.4}
            isLoss
            color="warning"
            extra="1,943"
          />
        </Grid>
        <Grid item xs={4} style={{ flexGrow: 1 }}>
          <AnalyticEcommerce
            bgColor="linear-gradient(to right, #363062, #818FB4)"
            title="Total Check in"
            count={eventTotalDetail.totalCheckedInChairs}
            percentage={27.4}
            isLoss
            color="warning"
            extra="$20,395"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default TotalRevenueEvent;
