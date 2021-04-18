import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "./providers/MovieProvider";
import { UserContext } from "./providers/UserProvider";
import { useHistory } from "react-router-dom";
import FilterBar from "./FilterBar";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import {
  Div,
  BarDiv,
  CardWrapper,
  Card,
  Wrapper,
  Title,
  ReleaseDate,
  Poster
} from "./styling/MovieResultsStyles";

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

export default MovieResults;
