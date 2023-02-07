import React, { useState } from "react";
import Button from '@mui/material/Button';
import "./styles.css";
import { TextField } from "@mui/material";
const initialState = {
  username: "",
  email: "",
  password: "",
};
const Signup = () => {
  const [formData, setFormData] = useState(initialState);

  const signUp = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  return (
    <div className="signup">
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
          onClick={() => {}}
          style={{ width: "200px" }}
        >
         Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Signup;
