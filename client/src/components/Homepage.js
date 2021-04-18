import React, { useContext, useEffect } from "react";
import { Img, Wrapper, Button } from "./styling/HomepageStyles";
import { UserContext } from "./providers/UserProvider";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "../newlogo2.svg";
// require("dotenv").config();

const Homepage = () => {
  const { setSearchSubmitted } = useContext(UserContext);
  const history = useHistory();

  const toRandomMovie = () => {
    history.push("movies/randomsearch");
  };

  useEffect(() => {
    setSearchSubmitted(false);
  }, []);

  return (
    <Wrapper>
      <Img src={Logo} />
      <SearchBar redirect="true" />
      <Button onClick={() => toRandomMovie()}>Random Movie Picker</Button>
    </Wrapper>
  );
};

export default Homepage;
