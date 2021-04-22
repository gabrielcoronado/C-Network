import React, { useEffect, useState, useContext } from "react";
import {
  Wrapper,
  Button,
  MovieResult,
  Div,
  H1
} from "./styling/RandomMovieStyles";
import { UserContext } from "./providers/UserProvider";
import FilterBar from "./FilterBar";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import Movie from "./Movie";

const RandomMovie = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [generateRandom, setGenerateRandom] = useState(true);
  const { currentUser } = useContext(UserContext);
  const [random, setRandom] = useState(null);

  const handleSelect = id => {
    setSelectedGenres([...selectedGenres, id]);
  };

  const handleUnselect = id => {
    const newGenreArray = selectedGenres.filter(genreId => genreId !== id);
    setSelectedGenres(newGenreArray);
  };

  useEffect(() => {
    if (currentUser && generateRandom) {
      const query = selectedGenres.length
        ? `?genre=${selectedGenres.join(",")}`
        : "";
      fetch(`/movies/random${query}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "current-user-id": currentUser._id
        }
      }).then(res =>
        res.json().then(data => {
          setRandom(data.data);
          setGenerateRandom(false);
        })
      );
    }
  }, [currentUser, generateRandom]);

  return (
    <Wrapper>
      <Div>
        <H1>Random Movie Picker</H1>
        <FilterBar
          handleSelect={handleSelect}
          handleUnselect={handleUnselect}
          selectedGenres={selectedGenres}
        />
      </Div>
      <MovieResult>
        {random ? <Movie size="small" movieData={random} /> : <Loading />}
        <Div>
          <Button onClick={() => setGenerateRandom(true)}>Reroll!</Button>
        </Div>
      </MovieResult>
    </Wrapper>
  );
};

export default RandomMovie;
