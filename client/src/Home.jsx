import "./App.css";
import Grid from "@material-ui/core/Grid";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import axios from "axios";
import React, { useState, useEffect } from 'react';

import TeacherPortal from "./TeacherPortal.jsx";
import StudentPortal from "./StudentPortal.jsx";

function Home() {
  const [data, setData] = useState("");

// We're getting the user data at the begining. If there is no user data, that means the person is not logged in.
// If there's a user data, we will get the details of it.
  useEffect(() => { // when you render the page it can do something without refreshing the page.
      const fetchData = async () => {
        const result = await axios('/api/current_user');
          setData(result.data);
      };

      fetchData();
    }, []);



// If user data suggests that the person is a teacher, shows the teacher portal.
// If isTeacher is false, that means the person is a student. Shows the student portal.
// If there is no user data, shows the register and login screen.
      if (data.isTeacher) return <TeacherPortal user = {data}/>
      else if (data !== "" && !data.isTeacher) return <StudentPortal user = {data}/>;
      else return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} lg={12}>
          <h1 style={{textAlign: "center"}}> Project Assesment Portal </h1>

      </Grid>
      <Grid item xs={12} lg={4}>
        <Register />
      </Grid>
      <Grid item xs={12} lg={4}>
          <Login />
      </Grid>
    </Grid>
  );
}

export default Home;
