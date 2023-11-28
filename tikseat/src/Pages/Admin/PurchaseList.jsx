import {
  Box,
  Divider,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import Grid from "@mui/material/Grid";
import ApiAdmin from "../../API/Admin/ApiAdmin";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TITLE_TRANSACTIONS,
  TOTAL_TRANSACTIONS,
  TOTAL_TRANSACTION_AMOUNT,
} from "../../Assets/Constant/Admin/constAdmin";
import { NAME_COLUMNS_TRANSACTION } from "../../Assets/Constant/Admin/dataAdmin";
import { StyledTableCell } from "../../Components/Admin/Table/TableList";
import Button from "@mui/material/Button";
import { StyledTableRow } from "../../Components/Admin/Table/TableBodyList";

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

export const TableTransactions = ({
  nameColumns,
  dataTable,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  isAction,
  handClick,
}) => {
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {nameColumns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column?.minWidth }}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTable
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <StyledTableRow hover role="checkbox" tabIndex={-1}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>
                      {isAction ? row.refund_date : row.transaction_date}
                    </StyledTableCell>
                    <StyledTableCell>{row.zp_trans_id}</StyledTableCell>
                    <StyledTableCell>{row.event_name}</StyledTableCell>
                    {isAction ? (
                      <></>
                    ) : (
                      <StyledTableCell>{row.event_date}</StyledTableCell>
                    )}
                    <StyledTableCell>{row.client_email}</StyledTableCell>
                    <StyledTableCell>{row.client_name}</StyledTableCell>
                    <StyledTableCell>{row.numberOfTickets}</StyledTableCell>
                    <StyledTableCell>
                      {isAction ? row.money_refund : row.totalAmount}
                    </StyledTableCell>
                    {isAction ? (
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handClick(row._id)}>
                          Refund
                        </Button>
                      </StyledTableCell>
                    ) : (
                      <></>
                    )}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataTable?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default function PurchaseList() {
  const [totalTransactions, setTotalTransactions] = useState();
  const [totalTransactionAmount, setTotalTransactionAmount] = useState();
  const [dataTable, setDataTable] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  return (
    <>
      <Box height={20} />
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
          <Divider />
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
              <div>
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
                <TableTransactions
                  nameColumns={NAME_COLUMNS_TRANSACTION}
                  dataTable={dataTable}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  isAction={false}
                />
              </div>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
