import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const MovieSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  console.log("searchInput", searchInput);
  const history = useHistory();

  const toRandomMovie = () => {
    history.push("movies/randomsearch");
  };

  //adds what you type as you type it.
  const handleSearch = ev => {
    setSearchInput(ev.target.value.toLowerCase());
  };

  useEffect(() => {
    const handleEnter = ev => {
      if (ev.key === "Enter" && searchInput.length > 1) {
        history.push(`/movies/movie/${searchInput}`);
        setSearchInput("");
      }
    };
    const searchInputBar = document.getElementById("searchBar");
    searchInputBar.addEventListener("keydown", handleEnter);
  });

  const toggleOnClick = () => {
    if (searchInput.length > 1) {
      history.push(`/movies/movie/${searchInput}`);
      setSearchInput("");
    }
  };

  return (
    <Wrapper>
      <Section>
        <H1>Movie Search</H1>
        <SearchWrapper>
          <Input id="searchBar" onChange={handleSearch} type="text" />
          <Search onClick={toggleOnClick}>search</Search>
        </SearchWrapper>
      </Section>
      <Section>
        <H1>
          Not sure what to watch ? <br /> We can help!
        </H1>
        <Button onClick={() => toRandomMovie()}>Random Movie Picker</Button>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Button = styled.button`
  background: #032541;
  border-radius: 15px;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;
  outline: none;
  border: none;
  width: 300px;
  height: 50px;
  color: white;
`;

const Input = styled.input`
  box-shadow: 0px 0px 13px 0.5px white;
  border-radius: 30px;
  padding: 10px 20px;
  background: white;
  font-size: 17px;
  outline: none;
  border: none;
  color: black;
  width: 330px;
`;

const SearchWrapper = styled.div`
  margin-top: 80px;
  height: 50px;
  display: flex;
`;

const Search = styled.button`
  box-shadow: 0px 0px 11px 0.5px white;
  background: #032541;
  border-radius: 30px;
  margin-left: -40px;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  color: white;
  border: none;
  width: 90px;
`;

const H1 = styled.h1`
  font-weight: 600;
`;
const Section = styled.div`
  text-align: center;
  margin: 20vh auto;
  max-width: 50%;
`;

export default MovieSearch;
