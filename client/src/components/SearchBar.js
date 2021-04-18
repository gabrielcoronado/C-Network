import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";
import { UserContext } from "./providers/UserProvider";

const SearchBar = ({ redirect }) => {
  //   console.log("search bar redirect", redirect);
  const history = useHistory();
  const {
    setSearchInput,
    searchSubmitted,
    searchInput,
    setSearchSubmitted
  } = useContext(UserContext);

  const handleSearch = ev => {
    setSearchInput(ev.target.value.toLowerCase());
  };

  const onSubmit = () => {
    setSearchSubmitted(!searchSubmitted);

    if (redirect) {
      history.push(`/movies`);
    }
  };

  const toggleOnClick = () => {
    if (searchInput.length > 1) {
      onSubmit();
    }
  };

  useEffect(() => {
    const handleEnter = ev => {
      if (ev.key === "Enter" && searchInput.length > 1) {
        onSubmit();
      }
    };
    const searchInputBar = document.getElementById("searchBar");
    searchInputBar.addEventListener("keydown", handleEnter);
  });

  return (
    <SearchWrapper>
      <Input
        id="searchBar"
        onChange={handleSearch}
        type="text"
        placeholder="Seach for movie titles"
        value={searchInput}
      />
      <Search onClick={toggleOnClick}>
        <BiSearch />
      </Search>
    </SearchWrapper>
  );
};

const Input = styled.input`
  background: transparent;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 17px;
  outline: none;
  width: 450px;
  border: none;
  color: gray;
`;

const SearchWrapper = styled.div`
  border-radius: 15px;
  height: 50px;
  display: flex;
  position: relative;
  border: 1px solid gray;
`;

const Search = styled.button`
  background: transparent;
  position: absolute;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  color: white;
  border: none;
  height: 50px;
  width: 50px;
  left: 441px;
  color: gray;
`;

export default SearchBar;
