import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "./providers/MovieProvider";
import { UserContext } from "./providers/UserProvider";
import { useHistory } from "react-router-dom";
import logo from "./assets/newlogo2.svg";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import {
  Card,
  Title,
  ReleaseDate,
  Poster,
  Div,
  BarDiv,
  CardWrapper,
  Wrapper
} from "./styling/MovieResultsStyles";

const MovieResults = () => {
  const [movies, setMovies] = useState();
  const { dailyTrends } = useContext(MovieContext);
  const [isShowingTrends, setIsShowingTrends] = useState(false);
  const { searchInput, searchSubmitted, setSearchSubmitted } = useContext(
    UserContext
  );
  const history = useHistory();
  const base_url = `https://image.tmdb.org`;
  const posterSize = `/t/p/w500`;

  const singleMovieHandle = id => {
    if (!isShowingTrends) {
      // To show again the previous search result when going back
      setSearchSubmitted(true);
    }
    history.push(`/movies/${id}`);
  };

  useEffect(() => {
    if (searchInput && searchSubmitted) {
      fetch(`/movies/movie/${searchInput}`, {
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

  useEffect(() => {
    if (!searchInput && !searchSubmitted) {
      setIsShowingTrends(true);
      setMovies(dailyTrends);
    }
  }, [dailyTrends]);

  return movies ? (
    <Wrapper>
      <BarDiv>
        <SearchBar redirect={false} size="l" />
      </BarDiv>
      <Div>
        <CardWrapper>
          {movies.map(movie => {
            return (
              <Card key={movie.id} onClick={() => singleMovieHandle(movie.id)}>
                {movie && movie.poster_path ? (
                  <Poster src={base_url + posterSize + movie.poster_path} />
                ) : (
                  <Poster
                    src={logo}
                    style={{
                      height: "280px",
                      width: "190px",
                      marginLeft: "3px"
                    }}
                  />
                )}{" "}
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
