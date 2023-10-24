import { Button, Container, TextField, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const NewMovie = () => {
    const navigate = useNavigate()
     const { state } = useLocation();
  const [formData, setFormData] = useState({
    movieName: "",
    rating: null,
    cast: "",
    genre: "",
    releaseDate: null,
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date:any) => {
    setFormData({ ...formData, releaseDate: date });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    try {
      const token = state;
      const headers = {
        Authorization: token,
      };

      const response = await axios.post(
        `http://localhost:4000/authlist/new`,
        formData,
        {
          headers,
        }
      );

      const result: any = response.data;
      console.log(result);
      alert(result.message);
      navigate("../login")
    } catch (error: any) {
      if (error.response) {
        console.error("Error adding list:", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error("Network error:", error.message);
        alert("Network error occurred");
      }
      navigate("../login");
    }
  };

  return (
    <>
    <Typography>Add New Movie</Typography>
    <Container maxWidth="sm" sx={{p:"50px 0px 0px 0px"}}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Movie Name"
          name="movieName"
          value={formData.movieName}
          onChange={handleInputChange}
          sx={{ p: "20px 0px 20px 0px" }}
        />
        <TextField
          fullWidth
          label="Rating"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          sx={{ p: "20px 0px 20px 0px" }}
        />
        <TextField
          fullWidth
          label="Cast"
          name="cast"
          value={formData.cast}
          onChange={handleInputChange}
          sx={{ p: "20px 0px 20px 0px" }}
        />
        <TextField
          fullWidth
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          sx={{ p: "20px 0px 20px 0px" }}
        />
        Release Date
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={formData.releaseDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </form>
    </Container>
    </>
  );
};

export default NewMovie;
