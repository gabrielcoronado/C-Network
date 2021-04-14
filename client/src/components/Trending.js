import React, { useContext } from "react";
import Loading from "./Loading";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { MovieContext } from "./providers/MovieProvider";

const Trending = () => {
  const history = useHistory();
  const base_url = `https://image.tmdb.org/t/p/w500/`;
  const { dailyTrends } = useContext(MovieContext);
  console.log("dailyTrends", dailyTrends);

  const singleMovieHandle = id => {
    history.push(`/movies/${id}`);
  };

  return dailyTrends ? (
    <Wrapper>
      <div>
        <Header>Trending Movies</Header>
      </div>
      <MovieGrid>
        {dailyTrends.map(trend => {
          return (
            <Movie key={trend.id} onClick={() => singleMovieHandle(trend.id)}>
              <Poster src={base_url + trend.poster_path} />
              <Title>{trend.title}</Title>
              <Vote>{trend.vote_average}</Vote>
            </Movie>
          );
        })}
      </MovieGrid>
    </Wrapper>
  ) : (
    <Loading />
  );
};

const Wrapper = styled.div``;

const MovieGrid = styled.div`
  font-family: sans-serif;
  width: 70vw;
  display: flex;
  margin: 0 auto;
  overflow: overlay;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: auto;
  border-radius: 20px;
  margin-bottom: 20px;
  font-size: 15px;
`;

const Header = styled.p`
  margin: 15px auto;
  width: 70vw;
`;

const Movie = styled.div`
  display: flex;
  padding: 0 25px 0 0;
  text-align: center;
  flex-direction: column;
  cursor: pointer;
`;

const Title = styled.p`
  margin-bottom: 0;
`;

const Vote = styled.p``;

const Poster = styled.img`
  height: 250px;
  border-radius: 10px;
`;

export default Trending;
