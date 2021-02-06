import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {
    // when you render the page it can do something without refreshing the page.
    const fetchData = async () => {
      const result = await axios("/api/owned-project");
      setData(result.data);
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("/api/open-project", { project: project }).then((res) => {
      window.location = "/";
    });
  };

  const handleClick = (value, event) => {
    setProject(value);
  };

  // Map is like a for loop and "data" is an array of JSON.
  // Basically goes over every object in the array and list them.
  // In this case, they list the buttons of owned projects.
  function Projects() {
    if (data === "") return null;
    else
      return data.map((project) => {
        return (
          <Button
            type="submit"
            onClick={handleClick.bind(null, project._id)}
            style={{
              backgroundColor: "#DC3522",
              color: "white",
              borderRadius: "10px",
              margin: "15px 15px 0 0",
            }}
          >
            {project.name}
          </Button>
        );
      });
  }

  return (
    <Grid item xs={12} lg={10}>
      <Paper elevation={0}>
        <form onSubmit={handleSubmit}>{Projects()}</form>
      </Paper>
    </Grid>
  );
}

export default Home;
