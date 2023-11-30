import {
  Box,
  Divider,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import {
  TITLE_TRANSACTIONS,
  TOTAL_TRANSACTIONS,
  TOTAL_TRANSACTION_AMOUNT,
} from "../../Assets/Constant/Admin/constAdmin";
import { NAME_COLUMNS_TRANSACTION } from "../../Assets/Constant/Admin/dataAdmin";
import TableList from "../../Components/Admin/Table/TableList";

export const CardTransactions = ({ nameSubtitle, total }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{nameSubtitle}</Typography>
        <Typography variant="h5">{total}</Typography>
      </CardContent>
    </Card>
  );
};

export default function PurchaseList() {
  const [totalTransactions, setTotalTransactions] = useState();
  const [totalTransactionAmount, setTotalTransactionAmount] = useState();
  const [dataTable, setDataTable] = useState();

  const getAllOder = async () => {
    try {
      const reponse = await ApiAdmin.getAllOrders();
      if (reponse.status === true) {
        setTotalTransactions(reponse.data.count);
        setTotalTransactionAmount(reponse.data.totalTransactionAmount);
        setDataTable(reponse.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOder();
  }, []);

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
              {TITLE_TRANSACTIONS}
            </Typography>
          </div>
          <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
            <Grid item xs={6}>
              <CardTransactions
                nameSubtitle={TOTAL_TRANSACTIONS}
                total={totalTransactions}
              />
            </Grid>
            <Grid item xs={6}>
              <CardTransactions
                nameSubtitle={TOTAL_TRANSACTION_AMOUNT}
                total={totalTransactionAmount}
              />
            </Grid>
          </Grid>
          <TableList
            dataTable={dataTable}
            nameColumns={NAME_COLUMNS_TRANSACTION}
          />
        </Box>
      </Box>
    </>
  );
}
