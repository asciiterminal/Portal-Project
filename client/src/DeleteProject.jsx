import React, { useState } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Input from "./Input.jsx";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("/api/delete-project", { name: name }).then((res) => {
      window.location = "/";
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Delete a Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Delete a Project"}
        </DialogTitle>
        <DialogContent>
          <Input type="text" onChange={handleNameChange} label="Project Name" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Delete Project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
