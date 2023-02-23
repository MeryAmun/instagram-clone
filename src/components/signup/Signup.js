import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./styles.css";
import { TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then(() => {
        updateProfile(auth.currentUser, {
            displayName: formData.username,
        });
        window.location.reload()
    })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
   
  };


  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  return (
    <div className="signup">
      <form>
        <div className="signup__field">
          <TextField
            type="text"
            name="username"
            label="Username"
            onChange={handleChange}
            value={formData.username}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="signup__field">
          <TextField
            type="email"
            name="email"
            label="Email"
            onChange={handleChange}
            value={formData.email}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="signup__field">
          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
            value={formData.password}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="signup__button signup__field">
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 350 }}
            onClick={signUp}
            style={{ width: "200px" }}
          >
            Sign Up
          </Button>
        </div>
        <div className="signup__button signup__field">
          <span>
            <strong>{error}</strong>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
