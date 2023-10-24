import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Login: React.FC<any> = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    const formData = {
      email,
      pass:password,
    };
    try {
      const response = await axios.post("http://localhost:4000/user/login", formData);
      const result:any = response.data
      const token:any = response.data.accesstoken
      console.log(result.message)
        // alert(result.message)

      navigate("/movielist", {state:token});
    } catch (error:any) {
        console.error("Error creating user:", error.response.data.message);
        alert(error.response.data.message);
         navigate("/login");
    }
  };

  const reg = () =>{
    navigate("/register")
  }

  return (
    <div>
      <h2>Login</h2>
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
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Grid>
        <Grid item sx={{ p: "20px 20px 20px 20px" }}>
          <Button variant="contained" color="primary" onClick={reg}>
            Register
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
