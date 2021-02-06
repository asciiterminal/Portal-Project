import React, { useState } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";


function Upload(props) {
  const [data, setData] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Upload button gets the file and Submit sends it.
    const formData = new FormData();
    formData.append("file", data);
    formData.append("member", props.member._id);
    axios.post("/api/upload", formData, {}).then((res) => {
      console.log(res);
    });
  };

  const onFileChange = (event) => {
    setData(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button variant="contained" color="primary" component="label"
        style={{
          margin: "10px 20px 40px 5px"
        }}>
        Upload File
        <input type="file" onChange={onFileChange} hidden />
      </Button>

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        style={{
          margin: "10px 20px 40px 5px",
          backgroundColor: "#DC3522",
          color: "white",
        }}
      >
        Submit
      </Button>
    </form>
  );
}

export default Upload;
