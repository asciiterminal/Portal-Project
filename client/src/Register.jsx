import React, { useState } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Input from "./Input.jsx";

function Register() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = React.useState({
    checked: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      // creates user object for its cerdentials
      name: name,
      username: userName,
      password: password,
      isTeacher: state.checked,
    };

    console.log(user);

    axios.post("/api/register", { user }).then((res) => {
      window.location = "/";
    });
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(state.checked);
  };

  return (
    <Paper elevation={4} className="smoothbackground">
      <Grid container direction="row" justify="center" alignItems="center">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="row">
            <Input type="text" onChange={handleNameChange} label="Name" />
            <Input type="email" onChange={handleUserNameChange} label="Email" />
            <Input
              type="password"
              onChange={handlePassChange}
              label="Password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checked}
                  name="checked"
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Are you a teacher?"
            />{" "}
            <br />
            <Button
              variant="contained"
              size="large"
              color="white"
              type="submit"
              style={{
                marginLeft: "10px",
                backgroundColor: "#D9CB9E",
                color: "white",
                borderRadius: "10px",
              }}
            >
              Register
            </Button>
          </div>
        </form>
      </Grid>
    </Paper>
  );
}

export default Register;
