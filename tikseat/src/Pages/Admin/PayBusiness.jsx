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
              OKE
            </Typography>
          </div>
          <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
            <Grid item xs={4}>
              <CardTransactions nameSubtitle="aaaaaaa" total={100} />
            </Grid>
            <Grid item xs={4}>
              <CardTransactions nameSubtitle="aaaaaaa" total={100} />
            </Grid>
            <Grid item xs={4}>
              <CardTransactions nameSubtitle="aaaaaaa" total={100} />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "10px" }}></Box>
        </Box>
      </Box>
    </>
  );
}

export default PayBusiness;
