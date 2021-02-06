import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import React, { useState, useEffect } from "react";

import GradeStudent from "./GradeStudent.jsx";
import Download from "./Download.jsx";

function StudentProject(props) {
  const [students, setStudents] = useState("");

  useEffect(() => {
    // when you render the page it can do something without refreshing the page.
    axios.post("/api/get-students", { project: props.project }).then((res) => {
      setStudents(res.data);
      console.log(res.data);
    });
  }, [props.project]);

  function submitted(student) {
    if (student.file) return <Download member={student} />;
  }

  function ListStudents() {
    if (students === "") return null;
    else
      return students.map((student) => {
        return (
          <Paper elevation={1} style={{ marginTop: "20px" }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6} lg={4}>
                <h3>Name: {student.student.name}</h3>
                <h4>Grade: {student.grade}</h4>
                <p>Teacher's comments: {student.information}</p>
              </Grid>
              <Grid item xs={4} lg={4}>
                {submitted(student)}
                <GradeStudent project={props.project} member={student._id} />
              </Grid>
            </Grid>
          </Paper>
        );
      });
  }

  return <div>{ListStudents()}</div>;
}

export default StudentProject;
