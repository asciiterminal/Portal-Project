import Button from "@material-ui/core/Button";
import axios from "axios";

function Logout(props) {
  const handleClick = (event) => {
    axios.post("/api/logout", {}).then((res) => {
      window.location.reload();
    });
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleClick}>
      Logout
    </Button>
  );
}

export default Logout;
