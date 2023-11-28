import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import "../../Assets/CSS/Admin/PageAdmin.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  TOTAL_ADMIN_EARNINGS,
  TOTAL_ADMIN_EAR_REFUND,
  TOTAL_AMOUNT_SOLD,
  TOTAL_MONEY_REFUND,
} from "../../Assets/Constant/Admin/constAdmin";
import ApiAdmin from "../../API/Admin/ApiAdmin";

function HomePageAdmin() {
  const [totalAmountSold, setTotalAmountSold] = useState(0);
  const [totalAdminEarnings, setTotalAdminEarnings] = useState(0);
  const [totalMoneyRefund, setTotalMoneyRefund] = useState(0);
  const [totalAdminEarRefund, setTotalAdminEarRefund] = useState(0);

  const CardAmount = ({ icon, amount, nameAmount, className }) => {
    return (
      <Card sx={{ minWidth: 49 + "%", height: 150 }} className={className}>
        <CardContent>
          <div style={{ color: "aliceblue" }}>{icon}</div>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "#ffffff" }}>
            {amount} VND
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{ color: "#ccd1d1" }}>
            {nameAmount}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const CardRefund = ({ icon, amount, nameAmount, className }) => {
    return (
      <Card sx={{ minWidth: 345 }} className={className}>
        <Stack spacing={2} direction="row">
          <div className="iconstyle">{icon}</div>
          <div className="paddingall">
            <span className="pricetitle">{amount} VND</span>
            <br />
            <span className="privesubtitle">{nameAmount}</span>
          </div>
        </Stack>
      </Card>
    );
  };

  const getAmoutAndEarings = async () => {
    try {
      const request = {
        startDate: "2023-11-23",
        endDate: "2023-11-29",
      };
      const reponse = await ApiAdmin.getTotalAmountSoldAllEventAndAdminEarnings(
        request
      );
      if (reponse) {
        setTotalAmountSold(reponse.data.totalAmountSold);
        setTotalAdminEarnings(reponse.data.totalAdminEarnings);
        setTotalMoneyRefund(reponse.data.totalMoneyRefund);
        setTotalAdminEarRefund(reponse.data.totalAdminEarRefund);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAmoutAndEarings();
  }, []);

  return (
    <>
      <div className="bgcolor">
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack spacing={2} direction="row">
                <CardAmount
                  icon={<CreditCardIcon />}
                  amount={totalAmountSold}
                  nameAmount={TOTAL_AMOUNT_SOLD}
                  className="gradient"
                />
                <CardAmount
                  icon={<CreditCardIcon />}
                  amount={totalAdminEarnings}
                  nameAmount={TOTAL_ADMIN_EARNINGS}
                  className="gradientlight"
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <CardRefund
                  icon={<StorefrontIcon />}
                  amount={totalMoneyRefund}
                  nameAmount={TOTAL_MONEY_REFUND}
                  className="gradientlight"
                />
                <CardRefund
                  icon={<StorefrontIcon />}
                  amount={totalAdminEarRefund}
                  nameAmount={TOTAL_ADMIN_EAR_REFUND}
                />
              </Stack>
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card sx={{ height: 56 + "vh" }}>
                <CardContent></CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ height: 56 + "vh" }}>
                <CardContent></CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* </Box> */}
        </Box>
      </div>
    </>
  );
}

export default HomePageAdmin;
