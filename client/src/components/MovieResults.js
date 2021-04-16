import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FilterBar from "./FilterBar";
import Loading from "./Loading";

const MovieResults = () => {
  const [movies, setMovies] = useState();
  const base_url = `https://image.tmdb.org`;
  const posterSize = `/t/p/w500`;
  const history = useHistory();
  // console.log("movies", movies);

  const { query } = useParams();

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:4000/movies/movie/${query}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(res =>
        res.json().then(data => {
          if (data.data.results) {
            // console.log("movies", data.data.results);
            setMovies(data.data.results);
          } else {
            setMovies(null);
          }
        })
      );
    }
  }, [query]);

  const singleMovieHandle = id => {
    history.push(`/movies/${id}`);
  };

  return movies ? (
    <Wrapper>
      <FilterBar />
      <CardWrapper>
        {movies.map(movie => {
          return (
            <Card key={movie.id} onClick={() => singleMovieHandle(movie.id)}>
              <Poster src={base_url + posterSize + movie.poster_path} />
              <Title>{movie.title}</Title>
              <ReleaseDate>{movie.release_date}</ReleaseDate>
            </Card>
          );
        })}
      </CardWrapper>
    </Wrapper>
  ) : (
    <Loading />
  );
};

const Wrapper = styled.div`
  display: flex;
  padding-right: 30px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 33px;
  width: 100%;
`;

const Card = styled.div`
  width: 200px;
  margin: 40px 7px 0 7px;
  border-radius: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #e3e3e3;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 15px;
  padding-left: 8px;
  margin-bottom: 0;
`;

const ReleaseDate = styled.p`
  font-size: 12px;
  margin-top: 3px;
  color: gray;
  padding-left: 8px;
`;

const Poster = styled.img`
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  height: 270px;
  width: 200px;
`;

export default MovieResults;
