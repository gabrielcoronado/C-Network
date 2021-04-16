import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "./Loading";

const FilterBar = () => {
  const [genres, setGenres] = useState();
  //test test test for the button to stay active
  const [active, setActive] = useState();

  const toggleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/genres`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        // console.log("genres", data.data.genres);
        setGenres(data.data.genres);
      })
    );
  }, []);

  return genres ? (
    <FilterWrapper>
      <h2>Filters</h2>
      <Genres>
        <h3>Genres</h3>
        {genres.map(genre => {
          return (
            <Button key={genre.id} onClick={() => toggleActive()}>
              {genre.name}
            </Button>
          );
        })}
      </Genres>
    </FilterWrapper>
  ) : (
    <Loading />
  );
};

const FilterWrapper = styled.div`
  margin: 0 40px;
  width: 300px;
`;

const Genres = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 2px solid white;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 15px;
  margin: 5px;
  border: 2px solid white;
  list-style-type: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;

  :hover,
  :active {
    background: cyan;
    color: black;
    border: 2px solid cyan;
  }
`;

export default FilterBar;
