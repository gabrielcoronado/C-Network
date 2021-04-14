import React from "react";
// import Trending from "./Trending";
import styled from "styled-components";
import MovieSearch from "./MovieSearch";

require("dotenv").config();

const Homepage = () => {
  return (
    <Wrapper>
      <MovieSearch />
      {/* <Trending /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Homepage;
