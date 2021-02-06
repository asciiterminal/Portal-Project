import "./App.css";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import MemberOfProject from "./MemberOfProject.jsx";
import Logout from "./Logout.jsx";

function Portal(props) {
  const [data, setData] = useState("");

  useEffect(() => {
    // when you render the page it can do something without refreshing the page.
    const fetchData = async () => {
      const result = await axios("/api/member-of-project");
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12} lg={6}>
        <h1> Student's Portal </h1>
        <MemberOfProject member={data} /> {/* Only thing this component does is to actually get data and show this. */}
        <Logout />
      </Grid>
    </Grid>
  );
}

export default Portal;
