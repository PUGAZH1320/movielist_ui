import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC<any> = () => {
        const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");

  const handleLogin = async () => {
    if (password !== conpassword) {
      alert("password not match");
    } else {
      const formData = {
        email,
        pass:password,
      };
      try {
        await axios.post("http://localhost:4000/user/register", formData);
        alert("User created successfully");
        navigate("/login");
      } catch (error:any) {
        console.error("Error creating user:", error.response.data.message);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Grid container justifyContent="center" direction="column">
        <Grid item sx={{ p: "20px 20px 20px 20px" }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ p: "20px 20px 20px 20px" }}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ p: "20px 20px 20px 20px" }}>
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={conpassword}
            onChange={(e: any) => setConPassword(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ p: "20px 20px 20px 20px" }}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Register
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
