import React, { useContext } from "react";
import { Img, Wrapper, Button, ButtonWrapper } from "./styling/HomepageStyles";
import { UserContext } from "./providers/UserProvider";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "./assets/newlogo2.svg";
// require("dotenv").config();

const Homepage = () => {
  const { searchSubmitted, setSearchSubmitted, searchInput } = useContext(
    UserContext
  );
  const history = useHistory();

  const toRandomMovie = () => {
    history.push("movies/randomsearch");
  };

  const onSubmit = () => {
    setSearchSubmitted(!searchSubmitted);
    history.push(`/movies`);
  };

  const toggleOnClick = () => {
    if (searchInput.length > 1) {
      onSubmit();
    }
  };

  return (
    <Wrapper>
      <Img src={Logo} />
      <SearchBar redirect="true" size="l" />
      <ButtonWrapper>
        <Button onClick={toggleOnClick}>Search</Button>
        <Button onClick={() => toRandomMovie()}>Random Movie Picker</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Homepage;
