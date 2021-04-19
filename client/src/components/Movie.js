import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./providers/UserProvider";
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

const Movie = () => {
  const [movie, setMovie] = useState();
  const [hidden, setHidden] = useState(true);
  const { id } = useParams();

  const { currentUser, handleSeen, handleBlacklist } = useContext(UserContext);

  const base_url = `https://image.tmdb.org`;
  // const backdropSize = `/t/p/original`;
  const posterSize = `/t/p/w500`;

  const time_converter = num => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return hours + "h " + minutes + "m";
  };

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        // console.log("movie", data.data);
        setMovie(data.data);
      })
    );
  }, []);

  return movie ? (
    <Wrapper>
      <MovieWrapper
        styles={{
          backgroundImage: `url(
          http://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}
       )`,
          backgroundSize: "cover"
        }}
      >
        <Poster src={base_url + posterSize + movie.poster_path} />
        <MovieInfo>
          <H1>{movie.title}</H1>
          {/* //DETAILS - THIS CAN GO IN 1 COMPONENT */}
          <Details>
            <div>{movie.release_date}</div>
            <Lang>({movie.original_language.toUpperCase()})</Lang>
            <GoPrimitiveDot size={11} />
            {movie.genres.map(genre => {
              return (
                <Genre key={genre.id}>
                  {" "}
                  <strong>{genre.name}</strong>
                </Genre>
              );
            })}
            <GoPrimitiveDot size={11} />
            <Runtime>{time_converter(movie.runtime)}</Runtime>
          </Details>
          {/* UP UNTIL HERE */}
          <Button onClick={() => setHidden(!hidden)}>
            <GiRoundStar size={20} />
          </Button>
          <Button onClick={() => handleSeen()}>
            <FaRegEye size={20} />
          </Button>
          <Button onClick={() => handleBlacklist()}>
            <ImBlocked size={20} />
          </Button>
          <Tagline>
            <i>{movie.tagline}</i>
          </Tagline>
          <h3>Overview:</h3>
          <Overview>{movie.overview}</Overview>
        </MovieInfo>
      </MovieWrapper>
      <Post hidden={hidden} currentUser={currentUser} id={id} />
    </Wrapper>
  ) : (
    <Loading />
  );
};

export default withRouter(Movie);
