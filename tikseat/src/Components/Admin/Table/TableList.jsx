import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Box, Divider, IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DialogComponent, {
  StyledAvatar,
  StyledChip,
} from "../Dialog/DialogDetail";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableList({
  dataTable,
  selectedUser,
  detailOpen,
  setDetailOpen,
  nameColumns,
  isClient,
  nameTitle,
  isDetail,
  onConfirm,
  isMaxWith,
  isConfirmEvent,
  dialogTitle,
  dialogContent,
  actions,
  cellComponents,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Simulate a 10-second loading delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlClientDetailClose = () => {
    setDetailOpen(false);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {nameColumns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={
                          isMaxWith
                            ? { minWidth: column?.minWidth }
                            : { maxWidth: column?.minWidth }
                        }>
                        {column.label}
                      </StyledTableCell>
                    ))}
                    {actions && (
                      <StyledTableCell
                        align="left"
                        style={{ maxWidth: "100px" }}>
                        Actions
                      </StyledTableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTable
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((row, index) => {
                      return (
                        <StyledTableRow key={row.id}>
                          {nameColumns.map((column) => (
                            <StyledTableCell key={column.id}>
                              {cellComponents && cellComponents[column.id]
                                ? cellComponents[column.id](row[column.id])
                                : row[column.id]}
                            </StyledTableCell>
                          ))}
                          {actions && (
                            <StyledTableCell>
                              {actions.map((action) => (
                                <IconButton
                                  key={action.name}
                                  color={action.color}
                                  onClick={() => action.onClick(row)}>
                                  {action.icon}
                                </IconButton>
                              ))}
                            </StyledTableCell>
                          )}
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              component="div"
              count={dataTable?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <DialogComponent
              open={detailOpen}
              selectedUser={selectedUser}
              onClose={handlClientDetailClose}
              isClient={isClient}
              nameTitle={nameTitle}
              isDetail={isDetail}
              onConfirm={onConfirm}
              isConfirmEvent={isConfirmEvent}
              dialogTitle={dialogTitle}
              dialogContent={dialogContent}
            />
          </>
        )}
      </Paper>
    </>
  );
}
