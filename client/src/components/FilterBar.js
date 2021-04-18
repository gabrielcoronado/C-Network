import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { FilterWrapper, Genres, Button } from "./styling/FilterBarStyles";
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

export default FilterBar;
