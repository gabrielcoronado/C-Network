import React, { useEffect, useState, useContext } from "react";
import {
  Wrapper,
  SearchButton,
  MovieResult,
  Div,
  H1
} from "./styling/RandomMovieStyles";
import {
  LoadingMoviePoster,
  LoadingMovieTitle,
  LoadingMovieLine,
  MovieDiv
} from "./styling/LoadingStyled";
import { MovieWrapper, Button } from "./styling/MovieStyles";
import { UserContext } from "./providers/UserProvider";
import { ImBlocked } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import FilterBar from "./FilterBar";
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
        {random ? (
          <Movie hideReview size="small" movieData={random} />
        ) : (
          <MovieWrapper>
            <LoadingMoviePoster></LoadingMoviePoster>
            <MovieDiv>
              <LoadingMovieTitle></LoadingMovieTitle>
              <LoadingMovieLine></LoadingMovieLine>
              <div>
                <Button>
                  <FaHeart size={20} color="gray" />
                </Button>
                <Button>
                  <ImBlocked size={20} color="gray" />
                </Button>
              </div>
            </MovieDiv>
          </MovieWrapper>
        )}
        <Div>
          <SearchButton onClick={() => setGenerateRandom(true)}>
            Reroll!
          </SearchButton>
        </Div>
      </MovieResult>
    </Wrapper>
  );
};

export default RandomMovie;
