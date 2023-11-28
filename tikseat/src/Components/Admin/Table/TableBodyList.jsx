import React from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "./TableList";
import { Avatar, Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StyledChip } from "../Dialog/DialogDetail";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TableBodyList({ row, index, handleClick, isIconSeen }) {
  console.log("row", row);

  const RenderAvatar = ({ keyName }) => {
    return (
      <StyledTableCell>
        <Avatar src={row[keyName]} alt="Avatar" />
      </StyledTableCell>
    );
  };
  const RenderChip = ({ index }) => {
    return (
      <StyledTableCell key={index} align="left">
        <Chip color="success" label="Active" />
      </StyledTableCell>
    );
  };

  const RenderTableCell = ({ row, index, handleClick }) => {
    return (
      <>
        {Object.keys(row).map((keyName) => {
          if (keyName !== "_id") {
            if (keyName == "avatarImage") {
              return <RenderAvatar keyName={keyName} />;
            }
            if (keyName === "isActive") {
              return <RenderChip index={index} />;
            }
            if (keyName === "organizer_type") {
              return (
                <StyledTableCell key={index} align="left">
                  {row[keyName].map((value, index) => {
                    return (
                      <StyledChip
                        label={value}
                        variant="outlined"
                        color="primary"
                      />
                    );
                  })}
                </StyledTableCell>
              );
            }
            return (
              <StyledTableCell key={index} align="left">
                {row[keyName]}
              </StyledTableCell>
            );
          }
          return null; // Loại trừ thuộc tính _id khỏi hiển thị
        })}
        {isIconSeen ? (
          <StyledTableCell key={index} align="left">
            <IconButton color="primary" onClick={() => handleClick(row?._id)}>
              <RemoveRedEyeIcon />
            </IconButton>
          </StyledTableCell>
        ) : (
          <>
            <StyledTableCell key={index} align="left">
              <IconButton color="primary" onClick={() => handleClick(row?._id)}>
                <CheckCircleIcon />
              </IconButton>
            </StyledTableCell>
          </>
        )}
      </>
    );
  };

  return (
    <StyledTableRow hover role="checkbox" tabIndex={-1}>
      <RenderTableCell row={row} index={index} handleClick={handleClick} />
    </StyledTableRow>
  );
}

export default TableBodyList;
