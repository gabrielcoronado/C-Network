import React, { useEffect, useState, useContext } from "react";
import { Wrapper, Button } from "./styling/RandomMovieStyles";
import { UserContext } from "./providers/UserProvider";
import FilterBar from "./FilterBar";
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
          console.log("random", data.data);
          setRandom(data.data);
          setGenerateRandom(false);
        })
      );
    }
  }, [currentUser, generateRandom]);

  return (
    <Wrapper>
      <FilterBar
        handleSelect={handleSelect}
        handleUnselect={handleUnselect}
        selectedGenres={selectedGenres}
      />
      <div>Random Movie</div>
      {random ? <Movie movieData={random} /> : <Loading />}
      <Button onClick={() => setGenerateRandom(true)}>Search!</Button>
    </Wrapper>
  );
};

export default RandomMovie;
