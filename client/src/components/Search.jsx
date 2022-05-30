import React from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

function Search() {
  const [email, setEmail] = React.useState("");
  const [userData, setUserData] = React.useState(null);

  const API_URL = "http://localhost:5000";
  const handleSubmit = async () => {
    const resp = await axios.get(`${API_URL}/search/?email=${email}`);
    if (resp.status === 200) {
      setUserData(resp.data.user[0]);
      console.log(userData);
    } else {
      alert("No matching email in DB");
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <TextField
          id="standard-basic"
          label="type email to search"
          variant="standard"
          sx={{ width: "80%", marginTop: "2rem" }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Search
        </Button>
        {userData == null ? (
          <div>No data</div>
        ) : (
          <div>
            <div>
              <div>name: {userData.name}</div>
              <div>email: {userData.email}</div>
              <div>Course: {userData.courseLevel}</div>
              <div>Country: {userData.country}</div>
              <div>Phone No: {userData.phoneNo}</div>
              <div>DDB: {userData.dob}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
