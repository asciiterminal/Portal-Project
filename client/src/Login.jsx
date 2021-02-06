import React, { useState } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Input from "./Input.jsx";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/login", { username: userName, password: password })
      .then((res) => {
        window.location = "/";
      });
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Paper elevation={4} className="smoothbackground">
      <Grid container direction="row" justify="center" alignItems="center">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="row">
            <Input type="email" onChange={handleUserNameChange} label="Email" />

            <Input
              type="password"
              onChange={handlePassChange}
              label="Password"
            />

            <Button
              variant="contained"
              size="large"
              color="white"
              type="submit"
              style={{
                marginLeft: "10px",
                backgroundColor: "#DC3522",
                color: "white",
                borderRadius: "10px",
              }}
            >
              Login
            </Button>
          </div>
        </form>
      </Grid>
    </Paper>
  );
}

export default Login;
