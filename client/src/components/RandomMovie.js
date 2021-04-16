import React from "react";
import styled from "styled-components";
import FilterBar from "./FilterBar";

const RandomMovie = () => {
  return (
    <Wrapper>
      <FilterBar />
      <div>Random Movie</div>
      <Button>Search!</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  cursor: pointer;
`;

export default RandomMovie;