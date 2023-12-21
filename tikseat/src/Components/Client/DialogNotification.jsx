import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogNotification({
  isDialogOpen,
  setIsDialogOpen,
  isEnd,
}) {
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle>
        Ticket Sales {isEnd ? "Ended" : "Haven't Started Selling Yet"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isEnd
            ? "Ticket sales for this event have ended"
            : "Ticket sales for this event have not yet opened"}
          . Thank you for your interest!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
