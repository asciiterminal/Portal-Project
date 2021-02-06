import Paper from "@material-ui/core/Paper";

import Upload from "./Upload.jsx";

function MemberOfProject(props) {
  function submitted(member) {
    if (member.file) return <p>Submitted</p>;
  }

  // Maps every project a student has. (Map = For Loop)
  // props means, the data is being taken from a parent component. In this case Student Portal.
  if (props.member[0] === undefined) return null;
  else
    return props.member.map((member) => {
      return (
        <Paper elevation={3}>
          <h3>Project: {member.project.name}</h3>
          <p>Description: {member.project.information}</p>
          <p>Grade: {member.grade}</p>
          <p>Teacher's comments: {member.information}</p>
          {submitted(member)}
          <Upload member={member} />
        </Paper>
      );
    });
}

export default MemberOfProject;
