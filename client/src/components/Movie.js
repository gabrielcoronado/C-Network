import React, { useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import { GoPrimitiveDot } from "react-icons/go";
import { useHistory } from "react-router-dom";
import { GiRoundStar } from "react-icons/gi";
import { ImBlocked } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import logo from "./assets/error.svg";
import {
  Poster,
  MovieWrapper,
  H1,
  Tagline,
  Button,
  Lang,
  Details,
  Overview,
  MovieInfo,
  Genre,
  Runtime,
  Error
} from "./styling/MovieStyles";

const Movie = ({ movieData, setHidden, hidden, hideReview }) => {
  const { currentUser, setUpdateCurrentUser } = useContext(UserContext);
  const history = useHistory();
  const base_url = `https://image.tmdb.org`;
  const posterSize = `/t/p/w500`;

  const activeStyle = {
    color: "rgb(253, 36, 29)"
  };

  const isFavorite = id => {
    return currentUser && currentUser.seen.includes(`${id}`);
  };

  const isBlacklisted = id => {
    const blacklist = currentUser && currentUser.blacklist.includes(`${id}`);
    return blacklist;
  };

  const time_converter = num => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return hours + "h " + minutes + "m";
  };

  const singleMovieHandle = id => {
    history.push(`/movies/${id}`);
  };

  const handleBlacklist = async (movieId, isBlacklistActive) => {
    const action = isBlacklistActive ? "whitelist" : "blacklist";
    const res = await fetch(`/movies/${movieId}/${action}`, {
      method: "PUT",
      body: JSON.stringify({
        currentUser
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await res.json();
    setUpdateCurrentUser(true);
  };

  const handleSeen = async (movieId, isSeen) => {
    const action = isSeen ? "unsee" : "seen";
    const res = await fetch(`/movies/${movieId}/${action}`, {
      method: "PUT",
      body: JSON.stringify({
        currentUser
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await res.json();
    setUpdateCurrentUser(true);
  };

  return movieData ? (
    <MovieWrapper>
      <ReactTooltip place="bottom" backgroundColor="white" textColor="black" />
      {movieData && movieData.poster_path ? (
        <Poster
          onClick={() => singleMovieHandle(movieData.id)}
          src={base_url + posterSize + movieData.poster_path}
        />
      ) : (
        <Poster
          onClick={() => singleMovieHandle(movieData.id)}
          src={logo}
          style={{ height: "400px", width: "266px", opacity: "0.5" }}
        />
      )}
      <MovieInfo>
        <H1 onClick={() => singleMovieHandle(movieData.id)}>
          {movieData.title}
        </H1>
        <Details>
          <div>{movieData.release_date || ""}</div>
          <Lang>
            {movieData.original_language &&
              `(${movieData.original_language.toUpperCase()})`}
          </Lang>
          <GoPrimitiveDot size={11} />
          {movieData.genres &&
            movieData.genres.map(genre => {
              return (
                <Genre key={genre.id}>
                  {" "}
                  <strong>{genre.name}</strong>
                </Genre>
              );
            })}
          <GoPrimitiveDot size={11} />
          <Runtime>
            {movieData.runtime ? time_converter(movieData.runtime) : ""}
          </Runtime>
        </Details>
        {hideReview ? null : (
          <Button
            data-tip="Create a review!"
            onClick={() => setHidden && setHidden(!hidden)}
          >
            <GiRoundStar size={20} />
          </Button>
        )}
        {movieData.id ? (
          <>
            <Button
              data-tip="Mark as favorite"
              onClick={() =>
                handleSeen && handleSeen(movieData.id, isFavorite(movieData.id))
              }
              style={isFavorite(movieData.id) ? activeStyle : {}}
            >
              <FaHeart size={20} />
            </Button>
            <Button
              data-tip="Add to blacklist"
              onClick={() =>
                handleBlacklist &&
                handleBlacklist(movieData.id, isBlacklisted(movieData.id))
              }
              style={isBlacklisted(movieData.id) ? activeStyle : {}}
            >
              <ImBlocked size={20} />
            </Button>
            <Tagline>
              <i>{movieData.tagline}</i>
            </Tagline>
            <h3>Overview:</h3>
            <Overview>{movieData.overview}</Overview>
          </>
        ) : (
          <Error>
            <h1>Uh oh! There were no movies found.</h1>
            <h2>Try another filter. 🥸</h2>
          </Error>
        )}
      </MovieInfo>
    </MovieWrapper>
  ) : null;
};

export default Movie;
