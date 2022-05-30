import * as React from "react";
import Logo from "../images/AdmitKard-Logo.jpeg";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            border: "2px solid #4fc2f8",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src={Logo}
            alt="Admitkard-logo"
            style={{ position: "relative" }}
          ></img>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("/add");
              }}
            >
              Add User
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/search");
              }}
            >
              Search User
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
