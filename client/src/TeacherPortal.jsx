import "./App.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import React, { useState, useEffect } from "react";

import CreateProjectDialog from "./CreateProjectDialog.jsx";
import OwnedProjects from "./OwnedProjects.jsx";
import TeacherProject from "./TeacherProject.jsx";
import DeleteProject from "./DeleteProject.jsx";
import Logout from "./Logout.jsx";

function TeacherPortal(props) {
  const [data, setData] = useState("");

  // Gets the projects from the backend server.
  useEffect(() => {
    // when you render the page it can do something without refreshing the page.
    const fetchData = async () => {
      const result = await axios("/api/open-project");
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} lg={12}>
        <h1 style={{ textAlign: "center" }}> Teacher's Portal </h1>
      </Grid>
      <Grid item xs={10} lg={6}>
        <Paper elevation={3}>
          <Grid container direction="row" justify="center" alignItems="center">
            <CreateProjectDialog /> {/* Create Project Button */}
            <DeleteProject /> {/* Delete Project Button */}
            <OwnedProjects /> {/* Lists owned projects. */}
          </Grid>
        </Paper>
        <TeacherProject project={data} />{" "}
        {/* If there's a project selected, shows it. */}
        <Logout /> {/* Obvious */}
      </Grid>
    </Grid>
  );
}

export default TeacherPortal;
