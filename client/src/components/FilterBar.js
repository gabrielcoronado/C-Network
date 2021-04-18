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
      <Genres>
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
  /* width: 300px; */
  width: 95vw;
  display: flex;
  margin: 40px auto 0 auto;
  overflow: overlay;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: auto;
  border-radius: 20px;
  margin-bottom: 20px;
  font-size: 15px;
`;

const Genres = styled.div`
  padding: 10px;
  display: flex;
`;

const Button = styled.span`
  padding: 5px 9px;
  border-radius: 30px;
  align-self: center;
  white-space: nowrap;
  font-size: 15px;
  color: grey;

  margin: 5px;
  border: 0.5px solid grey;
  list-style-type: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;

  :hover,
  :active {
    background: linear-gradient(
      90deg,
      rgb(253, 36, 29) 5%,
      rgb(255, 128, 55) 100%
    );
    color: whitesmoke;
    outline: 0.5px solid
      linear-gradient(90deg, rgb(253, 36, 29) 5%, rgb(255, 128, 55) 100%);
  }
`;

export default FilterBar;
