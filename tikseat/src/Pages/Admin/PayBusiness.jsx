import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { CardTransactions } from "./PurchaseList";

function PayBusiness() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Typography
              variant="h4"
              sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              List of paid events for businesses
            </Typography>
          </div>
          <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
            <Grid item xs={4}>
              <CardTransactions
                nameSubtitle="Total number of end events"
                total={2}
              />
            </Grid>
            <Grid item xs={4}>
              <CardTransactions
                nameSubtitle="Total ticket sales for all events (VND)"
                total={100}
              />
            </Grid>
            <Grid item xs={4}>
              <CardTransactions
                nameSubtitle="Total amount paid to the organization (VND)"
                total={100}
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "10px" }}></Box>
        </Box>
      </Box>
    </>
  );
}

export default PayBusiness;
