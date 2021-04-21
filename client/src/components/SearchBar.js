import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { UserContext } from "./providers/UserProvider";
import { SearchWrapper, Search, Input } from "./styling/SearchBarStyles";

const SearchBar = ({ size, redirect }) => {
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

  const handleEnter = ev => {
    if (ev.key === "Enter" && searchInput.length > 1) {
      onSubmit();
    }
  };

  return (
    <SearchWrapper>
      <Input
        id="searchBar"
        onChange={handleSearch}
        type="text"
        placeholder="Seach for movie titles"
        value={searchInput}
        onKeyDown={handleEnter}
      />
      <Search onClick={toggleOnClick}>
        <BiSearch />
      </Search>
    </SearchWrapper>
  );
};

export default SearchBar;
