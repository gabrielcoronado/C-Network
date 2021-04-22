import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { GiRoundStar } from "react-icons/gi";
import { ImBlocked } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import logo from "./assets/newlogo2.svg";
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
  Runtime
} from "./styling/MovieStyles";

const Movie = ({
  size,
  movieData,
  setHidden,
  handleSeen,
  handleBlacklist,
  hidden
}) => {
  const base_url = `https://image.tmdb.org`;
  // const backdropSize = `/t/p/original`;
  const posterSize = `/t/p/w500`;

  const time_converter = num => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return hours + "h " + minutes + "m";
  };

  return movieData ? (
    <MovieWrapper>
      <ReactTooltip place="bottom" backgroundColor="white" textColor="black" />
      {movieData && movieData.poster_path ? (
        <Poster src={base_url + posterSize + movieData.poster_path} />
      ) : (
        <Poster src={logo} style={{ height: "400px", width: "266px" }} />
      )}
      <MovieInfo>
        <H1>{movieData.title}</H1>
        {/* //DETAILS - THIS CAN GO IN 1 COMPONENT */}
        <Details>
          <div>{movieData.release_date}</div>
          <Lang>
            (
            {movieData.original_language &&
              movieData.original_language.toUpperCase()}
            )
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
          <Runtime>{time_converter(movieData.runtime)}</Runtime>
        </Details>
        {/* UP UNTIL HERE */}
        <Button
          data-tip="Create a review!"
          onClick={() => setHidden && setHidden(!hidden)}
        >
          <GiRoundStar size={20} />
        </Button>
        <Button
          data-tip="Mark as favorite"
          onClick={() => handleSeen && handleSeen()}
        >
          <FaHeart size={20} />
        </Button>
        <Button
          data-tip="Add to blacklist"
          onClick={() => handleBlacklist && handleBlacklist()}
        >
          <ImBlocked size={20} />
        </Button>
        <Tagline>
          <i>{movieData.tagline}</i>
        </Tagline>
        <h3>Overview:</h3>
        <Overview>{movieData.overview}</Overview>
      </MovieInfo>
    </MovieWrapper>
  ) : null;
};

export default Movie;
