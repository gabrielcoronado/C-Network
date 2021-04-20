import React, { useContext } from "react";
import Loading from "./Loading";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { MovieContext } from "./providers/MovieProvider";
import { FaStar } from "react-icons/fa";

const Trending = ({ trends }) => {
  const { genres } = useContext(MovieContext);
  const history = useHistory();
  // const base_url = `https://image.tmdb.org/t/p/w500/`;
  // const { dailyTrends } = useContext(MovieContext);
  // console.log("dailyTrends", dailyTrends);
  const base_url = `https://image.tmdb.org`;
  const posterSize = `/t/p/w500`;

  const singleMovieHandle = id => {
    history.push(`/movies/${id}`);
  };

  return trends ? (
    <Wrapper>
      <TitleWrapper>
        <Header>Trending Movies</Header>
      </TitleWrapper>
      <MovieGrid>
        {trends.map(trend => {
          return (
            <Movie key={trend.id} onClick={() => singleMovieHandle(trend.id)}>
              <Poster src={base_url + posterSize + trend.poster_path} />
              <Info>
                <Title>{trend.title}</Title>
                {/* {genres.map(genre => {
                  return <div>{genre.name}</div>;
                })} */}
                <Vote>
                  <FaStar size={14} /> {trend.vote_average}
                </Vote>
              </Info>
            </Movie>
          );
        })}
      </MovieGrid>
    </Wrapper>
  ) : (
    <Loading />
  );
};

const Wrapper = styled.div`
  text-align: center;
  width: 280px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  background: gray;
  border: 1px solid gray;
  width: 280px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const MovieGrid = styled.div`
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  font-family: sans-serif;
  border: 1px solid gray;
  flex-direction: row;
  margin-bottom: 20px;
  overflow: overlay;
  overflow-x: auto;
  overflow-y: auto;
  font-size: 15px;
  width: 280px;
  /* display: flex; */
`;

const Poster = styled.img`
  height: 100px;
  border-radius: 10px;
`;

const Header = styled.p`
  margin: 15px auto;
  /* width: 70vw; */
`;

const Info = styled.div`
  padding-left: 15px;
  text-align: left;
`;

const Movie = styled.div`
  border-bottom: 1px solid gray;
  padding: 25px 15px;
  display: flex;
  cursor: pointer;
`;

const Title = styled.p`
  margin-bottom: 0;
`;

const Vote = styled.p`
  /* padding-left: 20px; */
`;

export default Trending;
