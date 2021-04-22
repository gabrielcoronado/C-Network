import React from "react";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  Wrapper,
  TitleWrapper,
  MovieGrid,
  Poster,
  Header,
  Info,
  Movie,
  Title
} from "./styling/TrendingStyling";

const Trending = ({ trends }) => {
  const history = useHistory();
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
                <div>
                  <FaStar size={14} /> {trend.vote_average}
                </div>
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

export default Trending;
