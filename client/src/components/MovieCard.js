import React, { useEffect, useState } from "react";
import { Card, Title, ReleaseDate, Poster } from "./styling/MovieResultsStyles";
import { useHistory } from "react-router-dom";

const MovieCard = ({ movieid }) => {
  const history = useHistory();
  const [movie, setMovie] = useState();
  const base_url = `https://image.tmdb.org`;
  const posterSize = `/t/p/w500`;

  useEffect(() => {
    fetch(`/movies/${movieid}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        setMovie(data.data);
      })
    );
  }, []);

  const singleMovieHandle = id => {
    history.push(`/movies/${id}`);
  };

  return movie ? (
    <Card key={movie.id} onClick={() => singleMovieHandle(movie.id)}>
      <Poster src={base_url + posterSize + movie.poster_path} />
      <Title>{movie.title}</Title>
      <ReleaseDate>{movie.release_date}</ReleaseDate>
    </Card>
  ) : null;
};

export default MovieCard;
