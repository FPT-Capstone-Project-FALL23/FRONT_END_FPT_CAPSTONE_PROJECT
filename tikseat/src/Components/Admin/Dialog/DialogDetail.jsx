// UserDetailDialog.js
import React from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import { Avatar, Typography } from "@mui/material";
import DialogListContent from "./DialogListContent";
import DialogConfirm from "./DialogConfirm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: "400px", // Adjust the desired width
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: theme.spacing(1),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "120px",
  height: "120px",
}));

export const StyledName = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
}));

export const StyledOtherText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  marginBottom: theme.spacing(1),
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: "16px",
  marginBottom: theme.spacing(2),
}));

const DialogComponent = ({
  open,
  selectedUser,
  onClose,
  isClient,
  nameTitle,
  isDetail,
  onConfirm,
  isConfirmEvent,
}) => {
  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      aria-labelledby="customized-dialog-title">
      {isDetail ? (
        <>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Detail Profile {nameTitle}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <StyledCard>
              <DialogListContent
                selectedDetail={selectedUser}
                isClient={isClient}
              />
            </StyledCard>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogConfirm
            onClose={onClose}
            onConfirm={onConfirm}
            isConfirmEvent={isConfirmEvent}
            event={selectedUser}
          />
        </>
      )}
    </BootstrapDialog>
  );
};

export default DialogComponent;
