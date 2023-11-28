import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import {
  CONTENT_CONFIRM_REFUND_USER,
  TITLE_CONFIRM_REFUND_USER,
  TITLE_REFUND,
  TOTAL_REFUND_AMOUNT,
  TOTAL_TRANSACTIONS,
} from "../../Assets/Constant/Admin/constAdmin";
import { CardTransactions, TableTransactions } from "./PurchaseList";
import { NAME_COLUMNS_REFUND } from "../../Assets/Constant/Admin/dataAdmin";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import DialogComponent from "../../Components/Admin/Dialog/DialogDetail";

function RefundList() {
  const [totalTransactions, setTotalTransactions] = useState();
  const [totalRefundAmount, setTotalRefundmount] = useState();
  const [dataTable, setDataTable] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openComfirn, setOpenComfirn] = useState(false);
  const [selected_id, setSelected_id] = useState();

  const getAllIsRefund = async () => {
    try {
      const reponse = await ApiAdmin.getAllIsRefund();
      if (reponse.status === true) {
        setTotalTransactions(reponse.data.count);
        setTotalRefundmount(reponse.data.totalRefundAmount);
        setDataTable(reponse.data.refunds);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllIsRefund();
    // Simulate a 10-second loading delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(delay);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickShowComfirn = async (_idRefund) => {
    const id = { _idRefund: _idRefund };
    console.log("_idRefund", _idRefund);
    setSelected_id(id);
    setOpenComfirn(true);
  };

  const handlDetailClose = () => {
    setOpenComfirn(false);
  };

  const handleConfrim = async () => {
    try {
      const respones = await ApiAdmin.refundMoney(selected_id);
      console.log("respones", respones);
      if (respones) {
        alert("oke");
        setOpenComfirn(false);
        getAllIsRefund();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}></Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Typography variant="h4" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          {TITLE_REFUND}
        </Typography>
      </div>
      {loading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
          <CircularProgress size={64} />
        </Box>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CardTransactions
                  nameSubtitle={TOTAL_TRANSACTIONS}
                  total={totalTransactions}
                />
              </Grid>
              <Grid item xs={6}>
                <CardTransactions
                  nameSubtitle={TOTAL_REFUND_AMOUNT}
                  total={totalRefundAmount}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <TableTransactions
              nameColumns={NAME_COLUMNS_REFUND}
              dataTable={dataTable}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              isAction={true}
              handClick={handleClickShowComfirn}
            />
            <DialogComponent
              open={openComfirn}
              isDetail={false}
              isClient={false}
              onClose={handlDetailClose}
              dialogTitle={TITLE_CONFIRM_REFUND_USER}
              dialogContent={CONTENT_CONFIRM_REFUND_USER}
              isConfirmEvent={false}
              onConfirm={handleConfrim}
            />
          </Box>
        </>
      )}
    </>
  );
}

export default RefundList;
