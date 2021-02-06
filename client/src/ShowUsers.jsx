import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Input from "./Input.jsx";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
//  const [name, setName] = useState("");
//  const [info, setInfo] = useState("");

//  const handleSubmit = (event) => {
  //  event.preventDefault();

  //  const project = {
  //    name: name,
    //  info: info,
  //  };
const handleList = (event) => {
  event.preventDefault();
};
    console.log(project)

    axios.post("/api/show-users", { users }).then((res) => {
      window.location = "/";
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
 };

//  const handleInfoChange = (event) => {
//    setInfo(event.target.value);
//  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Show Users
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User List"}</DialogTitle>
        <DialogContent>

        <Input
         type="text"
         onChange={handleNameChange}
         label="Name" />

        //    <Input
        //    type="text"
        //    onChange={handleInfoChange}
        //    label="Project information" />
      //  <Input type="text" onChange={handleList} label="List" />


       </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleList} color="primary" autoFocus>
            List
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
