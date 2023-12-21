import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function DialogErrBuyTick({isDialogOpen, message, onReload }) {
      return (
        <Dialog open={isDialogOpen}>
          <DialogTitle>Tickets have been purchased</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onReload}>Reload</Button>
          </DialogActions>
        </Dialog>
      );
}

export default DialogErrBuyTick