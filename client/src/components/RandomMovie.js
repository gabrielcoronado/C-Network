import React from "react";
import FilterBar from "./FilterBar";
import { Wrapper, Button } from "./styling/RandomMovieStyles";

const RandomMovie = () => {
  return (
    <Wrapper>
      <FilterBar />
      <div>Random Movie</div>
      <Button>Search!</Button>
    </Wrapper>
  );
};

export default RandomMovie;
