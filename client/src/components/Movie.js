import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { GiRoundStar } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { ImBlocked } from "react-icons/im";
import { withRouter } from "react-router";
import { FaRegEye } from "react-icons/fa";
import Loading from "./Loading";
import Post from "./post/Post";
import {
  Wrapper,
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
      <Poster src={base_url + posterSize + movieData.poster_path} />
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
        <Button onClick={() => setHidden && setHidden(!hidden)}>
          <GiRoundStar size={20} />
        </Button>
        <Button onClick={() => handleSeen && handleSeen()}>
          <FaRegEye size={20} />
        </Button>
        <Button onClick={() => handleBlacklist && handleBlacklist()}>
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
