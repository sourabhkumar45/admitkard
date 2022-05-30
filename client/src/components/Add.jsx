import React from "react";
import axios from "axios";
import {
  FormControl,
  TextField,
  Grid,
  Box,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const API_URL = "http://localhost:5000";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  color: theme.palette.text.secondary,
  height: 560,
  width: 900,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

const contries = [
  "USA",
  "Australia",
  "New-Zealand",
  "Canada",
  "UK",
  "Ireland",
  "Germany",
];
function Add() {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    courseLevel: "",
    country: "",
    dob: "",
    phoneNo: "",
  });
  const [disable, setDisable] = React.useState(true);
  const handleChange = (key, value) => {
    data[key] = value;
    setData(data);
    for (let key in data) {
      if (key === "name" && data[key].length === 0) {
        return;
      } else if (key === "email") {
        const r = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if (r.test(data[key]) === false) {
          return;
        }
      } else if (key === "phoneNo") {
        const r = new RegExp(/^[0-9]*$/);
        if (r.test(data[key]) === false) {
          return;
        }
      } else if (key === "courseLevel" && data[key].length === 0) {
        return;
      } else if (key === "country" && data[key].length === 0) {
        return;
      }
    }
    setDisable(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/add`, data);
      alert("Data submitted successfully!!");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid sx={{ marginTop: "3rem" }}>
          <Grid item xs={6}>
            <ThemeProvider theme={lightTheme}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "background.default",
                  display: "grid",
                  gridTemplateColumns: { md: "1fr 1fr" },
                  gap: 2,
                  width: 900,
                }}
              >
                <Item elevation={6}>
                  <Box component="form" sx={{ mt: 1, width: 400 }}>
                    <Typography component="h1" variant="h5">
                      Fill Details (* required fields)
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      onChange={(e) => {
                        handleChange("name", e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      label="email"
                      type="email"
                      id="email"
                      onChange={(e) => {
                        handleChange("email", e.target.value);
                      }}
                    />
                    <PhoneInput
                      country={"in"}
                      value={""}
                      onChange={(phone) => {
                        handleChange("phoneNo", phone);
                      }}
                      inputStyle={{
                        height: "3.4rem",
                        width: "100%",
                        marginTop: "3rem !important",
                      }}
                    />
                    <FormControl varient="standard" sx={{ marginTop: "1rem" }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Course Level*
                      </InputLabel>
                      <Select
                        sx={{ width: 400 }}
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        placeholder="Course Level"
                        label="Course Level"
                        required
                        onChange={(e) => {
                          handleChange("courseLevel", e.target.value);
                        }}
                      >
                        <MenuItem value={"UG"}>UG</MenuItem>
                        <MenuItem value={"PG"}>PG</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl varient="standard" sx={{ marginTop: "1rem" }}>
                      <InputLabel id="country-label">Country*</InputLabel>
                      <Select
                        sx={{ width: 400 }}
                        labelId="country-label"
                        id="country-label"
                        label="Country"
                        required
                        onChange={(e) => {
                          handleChange("country", e.target.value);
                        }}
                      >
                        {contries.map((c, i) => {
                          return (
                            <MenuItem value={c} key={i}>
                              {c}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Date of Birth"
                      label="Date of Birth"
                      onFocus={(e) => {
                        e.target.type = "date";
                      }}
                      onBlur={(e) => {
                        e.target.type = "text";
                      }}
                      id="dob"
                      onChange={(e) => {
                        handleChange("dob", e.target.value);
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={disable}
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Box>
                </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Add;
