import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogSendMail({ isDialogOpen, setIsDialogOpen, handleSendMail }) {
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle>Send email to return tickets</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have not received your ticket payment yet. Click send email so we can send a response email to the event organizer. Thank you
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={closeDialog}>Close</Button>
        <Button color="primary" onClick={handleSendMail}>Send Mail</Button>
      </DialogActions>
    </Dialog>
  );
}
