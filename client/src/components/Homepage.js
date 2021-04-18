import { UserContext } from "./providers/UserProvider";
import { useHistory } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
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

const Img = styled.img`
  width: 200px;
  margin-bottom: 35px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 80px auto;
`;

const Button = styled.button`
  background-image: linear-gradient(
    90deg,
    rgb(253, 36, 29) 5%,
    rgb(255, 128, 55) 100%
  );
  border-radius: 10px;
  margin-top: 30px;
  font-size: 15px;
  cursor: pointer;
  outline: none;
  border: none;
  width: 250px;
  height: 50px;
  color: white;
`;

export default Homepage;
