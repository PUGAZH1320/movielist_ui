import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation , useNavigate} from "react-router-dom";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const MovieList = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [movies, setMovies] = useState<any>();
  const [editMovie, setEditMovie] = useState<any>(null);
  const [newMovie, setNewMovie] = useState<any>({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = state;
        const headers = {
          Authorization: token,
        };

        const response = await axios.get("http://localhost:4000/authlist/all", {
          headers,
        });

        const result: any = response.data;
        console.log(result);
        setMovies(result);
      } catch (error: any) {
        if (error.response) {
          console.error("Error creating user:", error.response.data.message);
          alert(error.response.data.message);
        } else {
          console.error("Network error:", error.message);
          alert("Network error occurred");
        }
      }
    };

    if (state) {
      fetchMovies();
    }
  }, [state]);

  const handleEdit = (id: any) => {
    setEditMovie(id);
    console.log(id);
  };
    const handleInputChange = (e: any, id: any) => {
      setNewMovie({
        ...newMovie,
        [e.target.name]: e.target.value,
      });
    };

  const handleSave = async (id: any) => {
    try {
    const updatedMovies = movies.map((movie:any) =>
      movie.id === id ? { ...movie, ...newMovie } : movie
    );
      console.log(updatedMovies)
      setMovies(updatedMovies);

      const headers = {
        Authorization: state,
      };

      const response = await axios.patch(
        `http://localhost:4000/authlist/update/${id}`,
        newMovie,
        { headers }
      );
      const result = response.data;
      console.log(result);
      alert(result.message);
    } catch (error: any) {
      if (error.response) {
        console.error("Error updating movie:", error.response.data.message);
      } else {
        console.error("Network error:", error.message);
        alert("Network error occurred");
      }
    }
    setEditMovie(null);
    setNewMovie({});
  };

  const handleDelete = async (id: any) => {
    const updatedMovies = movies.filter((movie: any) => movie.id !== id);
    setMovies(updatedMovies);
    try {
      const token = state;
      const headers = {
        Authorization: token,
      };

      const response = await axios.delete(
        `http://localhost:4000/authlist/delete/${id}`,
        {
          headers,
        }
      );

      const result: any = response.data;
      console.log(result);
      alert(result.message);
    } catch (error: any) {
      if (error.response) {
        console.error("Error creating user:", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error("Network error:", error.message);
        alert("Network error occurred");
      }
    }
  };



  return (
    <div>
      <Grid>
        <Typography sx={{ fontSize: "40px" }}>Movie List</Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("../logout")}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("../addmovie", { state: state })}
        >
          Add Movie
        </Button>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Movie Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Cast</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies &&
              movies.map((movie: any) => (
                <TableRow key={movie.id}>
                  {editMovie === movie.id ? (
                    <>
                      <TableCell>
                        <TextField
                          name="movieName"
                          value={newMovie.movieName || movie.movieName}
                          onChange={(e) => handleInputChange(e, movie.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="rating"
                          value={newMovie.rating || movie.rating}
                          onChange={(e) => handleInputChange(e, movie.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="cast"
                          value={newMovie.cast || movie.cast}
                          onChange={(e) => handleInputChange(e, movie.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="genre"
                          value={newMovie.genre || movie.genre}
                          onChange={(e) => handleInputChange(e, movie.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          name="releaseDate"
                          value={newMovie.releaseDate || movie.releaseDate}
                          onChange={(e) => handleInputChange(e, movie.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleSave(movie.id)}>
                          Save
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{movie.movieName}</TableCell>
                      <TableCell>{movie.rating}</TableCell>
                      <TableCell>
                        {Array.isArray(movie.cast)
                          ? movie.cast.join(",")
                          : movie.cast}
                      </TableCell>

                      <TableCell>{movie.genre}</TableCell>
                      <TableCell>{movie.releaseDate}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleEdit(movie.id)}
                          variant="contained"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(movie.id)}
                          variant="contained"
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MovieList;
