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
  const [grade, setGrade] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("/api/grade-student", { grade: grade,
    info: info, member: props.member }).then((res) => {
      window.location = "/";
    });
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
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
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Grade
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please Grade Student"}</DialogTitle>
        <DialogContent>

        <Input
          type="text"
          onChange={handleGradeChange}
          label="Grade" />

          <Input
            type="text"
            onChange={handleInfoChange}
            label="Make Comment" />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
