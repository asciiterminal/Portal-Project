import React, { useState } from "react";
import axios from "axios";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from "./Input.jsx";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const project = {
      name: name,
      info: info,
    };
    // When button pressed, get the data from the inputs and send it over to the backend.
    axios.post("/api/create-project", { project }).then((res) => {
      window.location = "/";
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleInfoChange = (event) => {
    setInfo(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create a Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please Create a Project"}</DialogTitle>
        <DialogContent>

        <Input
          type="text"
          onChange={handleNameChange}
          label="Project Name" />

          <Input
            type="text"
            onChange={handleInfoChange}
            label="Project information" />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            CreateProject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
