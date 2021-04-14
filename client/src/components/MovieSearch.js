import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const MovieSearch = () => {
  const history = useHistory();

  const toRandomMovie = () => {
    history.push("movies/randomsearch");
  };

  return (
    <Wrapper>
      <Section>
        <H1>Movie Search</H1>
        <SearchWrapper>
          <Input type="text" />
          <Search>search</Search>
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
  box-shadow: 0px 0px 11px 0.5px;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 17px;
  outline: none;
  border: none;
  width: 330px;
`;

const SearchWrapper = styled.div`
  margin-top: 80px;
  height: 50px;
  display: flex;
`;

const Search = styled.button`
  box-shadow: 0px 0px 11px 0.5px;
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
