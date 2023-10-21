import React from "react";
import Grid from "@mui/material/Grid";
import AnalyticEcommerce from "../../Components/Cards/AnalyticEcommerce";
import Typography from "@mui/material/Typography";

function TotalRevenue() {
  return (
    <>
      <Grid>
        <Grid style={{ marginBottom: "20px" }} item xs={12} sx={{ mb: 0 }}>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid>
            <AnalyticEcommerce
              title="Total Page Views"
              count="4,42,236"
              percentage={59.3}
              extra="35,000"
            />
          </Grid>
          <Grid>
            <AnalyticEcommerce
              title="Total Users"
              count="78,250"
              percentage={70.5}
              extra="8,900"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Order"
              count="18,800"
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Sales"
              count="$35,078"
              percentage={27.4}
              isLoss
              color="warning"
              extra="$20,395"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default TotalRevenue;
