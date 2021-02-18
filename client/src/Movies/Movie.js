import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {
    push(`/update-movie/${params.id}`);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const handleDelete = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res) => {
      console.log('handleDelete: Res: ', res)
      setMovieList(movieList.filter((mov)=> res.data !== mov.id))
      push('/')
    })
    .catch((err) => console.log(`unable to delete movie: `, err))
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="update-button" onClick={updateMovie} >
        Update
      </div>

      <div className="delete-button" onClick={handleDelete} >
        Delete
      </div>
    </div>
  );
}

export default Movie;
