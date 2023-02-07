import React, { useState } from 'react';
import './styles.css'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";


const initialState = {
    email: "",
    password: "",
  };
const Login = () => {
    const [formData, setFormData] = useState(initialState);

    const signUp = (e) => {
      e.preventDefault();
    };
    const handleChange = (e) => {
      const value = e.target.value;
      setFormData({ ...formData, [e.target.name]: value });
    };
  return (
    <div className='login'>
      <div className="login__field">
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
      <div className="login__field">
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
      <div className="signup__button login__field">
        <Button
          type="submit"
          variant="contained"
          sx={{ width: 350 }}
          onClick={() => {}}
          style={{ width: "200px" }}
        >
         Sign In
        </Button>
      </div>
    </div>
  )
}

export default Login