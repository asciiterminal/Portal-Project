import Button from "@material-ui/core/Button";
import axios from "axios";


function Download(props) {
  const handleClick = (event) => {
    axios.post("/api/download", { member: props.member._id }).then((res) => {
      setTimeout(() => {
        const response = {
          file: "http://localhost:5000/" + res.data,
        };
        window.open(response.file);
      }, 100);
    });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Download
    </Button>
  );
}

export default Download;
