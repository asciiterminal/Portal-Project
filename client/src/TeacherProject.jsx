import Grid from "@material-ui/core/Grid";
import AddStudentDialog from "./AddStudentDialog.jsx";
import ShowStudentProjects from "./ShowStudentProjects.jsx";

function TeacherProject(props) {
  if (props.project.name === undefined) return null;
  else
    return (
      <Grid item xs={12} lg={10}>
        <h1 style={{ textAlign: "center" }}> {props.project.name} </h1>
        <p style={{ textAlign: "center" }}> {props.project.information} </p>
        <AddStudentDialog project={props.project} />
        <ShowStudentProjects project={props.project} />
      </Grid>
    );
}

export default TeacherProject;
