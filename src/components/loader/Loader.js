import React from "react";
import { CircularProgress } from "@mui/material";
import { loader } from "../../assets";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__imageBox">
        <img src={loader} alt="loader" className="loader__image" />
      </div>
      <center>
        <CircularProgress />
      </center>
    </div>
  );
};

export default Loader;
