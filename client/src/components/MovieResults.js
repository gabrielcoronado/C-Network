import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import { MovieContext } from "./providers/MovieProvider";
import { useHistory } from "react-router-dom";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import FilterBar from "./FilterBar";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

const MovieResults = () => {
  const [isShowingTrends, setIsShowingTrends] = useState(false);
  const { searchInput, searchSubmitted, setSearchSubmitted } = useContext(
    UserContext
  );
  // console.log("searchSubmitted", searchSubmitted);
  const { dailyTrends } = useContext(MovieContext);

  const [movies, setMovies] = useState();
  const base_url = `https://image.tmdb.org`;
  const posterSize = `/t/p/w500`;
  const history = useHistory();

  useEffect(() => {
    if (searchInput && searchSubmitted) {
      console.log("IF");
      fetch(`http://localhost:4000/movies/movie/${searchInput}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(res =>
        res.json().then(data => {
          setIsShowingTrends(false);

          if (data.data.results) {
            setMovies(data.data.results);
            setSearchSubmitted(false);
          } else {
            setMovies(null);
            setSearchSubmitted(false);
          }
        })
      );
    }
  }, [searchSubmitted]);

  const singleMovieHandle = id => {
    if (!isShowingTrends) {
      // To show again the previous search result when going back
      setSearchSubmitted(true);
    }
    history.push(`/movies/${id}`);
  };

  useEffect(() => {
    console.log("Movie DailyTrends OUTSIDE IF");

    if (!searchInput && !searchSubmitted) {
      console.log("Movie DailyTrends INSIDE IF");
      setIsShowingTrends(true);
      setMovies(dailyTrends);
    }
  }, [dailyTrends]);

  return movies ? (
    <Wrapper>
      <BarDiv>
        <SearchBar redirect={false} />
      </BarDiv>
      <FilterBar />
      <Div>
        <CardWrapper>
          {movies.map(movie => {
            return (
              <Card key={movie.id} onClick={() => singleMovieHandle(movie.id)}>
                <Poster src={base_url + posterSize + movie.poster_path} />
                <Title>{movie.title}</Title>
                <ReleaseDate>{movie.release_date}</ReleaseDate>
              </Card>
            );
          })}
        </CardWrapper>
      </Div>
    </Wrapper>
  ) : (
    <Loading />
  );
};

const Wrapper = styled.div``;

const Div = styled.div`
  display: flex;
  padding-right: 30px;
`;

const BarDiv = styled.div`
  margin: 0 auto;
  width: 490px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const Card = styled.div`
  width: 200px;
  margin: 0px 7px 40px 7px;
  border-radius: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid gray;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 15px;
  padding-left: 8px;
  margin-bottom: 0;
`;

const ReleaseDate = styled.p`
  font-size: 12px;
  margin-top: 3px;
  color: gray;
  padding-left: 8px;
`;

const Poster = styled.img`
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  height: 270px;
  width: 200px;
`;

export default MovieResults;
