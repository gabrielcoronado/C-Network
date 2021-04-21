import React, { useState, useEffect, useContext } from "react";
import Loading from "./Loading";
import { FilterWrapper, Genres, Button } from "./styling/FilterBarStyles";
import { MovieContext } from "./providers/MovieProvider";

const FilterBar = ({ handleSelect, handleUnselect, selectedGenres }) => {
  const { genres, setGenres } = useContext(MovieContext);
  // const [genres, setGenres] = useState();
  //test test test for the button to stay active
  // const [active, setActive] = useState();
  const activeStyle = {
    background:
      "linear-gradient(90deg,rgb(253, 36, 29) 5%,rgb(255, 128, 55) 100%)"
  };
  const toggleActive = id => {
    if (isActive(id)) {
      handleUnselect(id);
    } else {
      handleSelect(id);
    }
  };

  const isActive = genreId => {
    return selectedGenres && selectedGenres.includes(genreId);
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
            <Button
              key={genre.id}
              onClick={() => toggleActive(genre.id)}
              style={isActive(genre.id) ? activeStyle : {}}
            >
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
