import React, { useState } from "react";
import "./styles.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
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
    <div className="login">
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
          onClick={signIn}
          style={{ width: "200px" }}
        >
          Sign In
        </Button>
      </div>
      <div className="signup__button signup__field">
        <span>
          <strong>{error}</strong>
        </span>
      </div>
    </div>
  );
};

export default Login;
