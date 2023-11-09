import React from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "./TableList";
import { Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableBodyList({
  row,
  index,
  handleDetailClick,
  isClient,
  handleToggleStatus,
}) {
  console.log("row", row);
  //render client
  const RenderTableCellClient = ({ row, index, handleDetailClick }) => {
    return (
      <>
        <StyledTableCell key={index} align="left">
          {row?.email}
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          {row?.full_name}
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          {row?.phone}
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          {row?.age}
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          <Chip
            color={row?.gender == "Male" ? "success" : "secondary"}
            label={row?.gender}
          />
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          <IconButton
            color="primary"
            onClick={() => handleDetailClick(row?._id)}>
            <RemoveRedEyeIcon />
          </IconButton>
        </StyledTableCell>
      </>
    );
  };

  //render organizer
  const RenderTableCellOrganizer = ({ row, index, handleDetailClick }) => {
    return (
      <>
        <StyledTableCell key={index} align="left">
          {row?.email}
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          {row?.organizer_name}
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          {row?.phone}
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          {row?.founded_date}
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          {row?.website}
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          <Chip
            color={row?.isActive ? "success" : "error"}
            label={row?.isActive ? "Active" : "Inactive"}
            onClick={() => handleToggleStatus(row)}
          />
        </StyledTableCell>
        <StyledTableCell key={index} align="left">
          <IconButton
            color="primary"
            onClick={() => handleDetailClick(row?._id)}>
            <RemoveRedEyeIcon />
          </IconButton>
        </StyledTableCell>
      </>
    );
  };

  return (
    <StyledTableRow hover role="checkbox" tabIndex={-1}>
      {isClient ? (
        <RenderTableCellClient
          row={row}
          index={index}
          handleDetailClick={handleDetailClick}
        />
      ) : (
        <RenderTableCellOrganizer
          row={row}
          index={index}
          handleDetailClick={handleDetailClick}
        />
      )}
    </StyledTableRow>
  );
}

export default TableBodyList;
