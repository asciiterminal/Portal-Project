import React, { useState } from "react";
import axios from "axios";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from "./Input.jsx";

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const addStudent = {
      email: email,
      project: props.project._id,
    };

    axios.post("/api/add-student-to-project", { addStudent }).then((res) => {
      window.location = "/";
    });
  };

  const handleNameChange = (event) => {
    setEmail(event.target.value);
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
        Add Student
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please Add a Student"}</DialogTitle>
        <DialogContent>

        <Input
          type="text"
          onChange={handleNameChange}
          label="Student's Email" />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Add Student
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
