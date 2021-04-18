import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import { GoPrimitiveDot } from "react-icons/go";
import { GiRoundStar } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { ImBlocked } from "react-icons/im";
import { withRouter } from "react-router";
import { FaRegEye } from "react-icons/fa";
import styled from "styled-components";
import Loading from "./Loading";
import Post from "./post/Post";

const Movie = () => {
  const [singleMovie, setSingleMovie] = useState();
  const [hidden, setHidden] = useState(true);
  const { id } = useParams();
  // const {
  //   params: { id }
  // } = match;
  const { currentUser, handleSeen, handleBlacklist, setPath } = useContext(
    UserContext
  );
  console.log("Movie CurrentUser", currentUser);

  const base_url = `https://image.tmdb.org`;
  // const backdropSize = `/t/p/original`;
  const posterSize = `/t/p/w500`;

  const time_converter = num => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return hours + "h " + minutes + "m";
  };

  useEffect(() => {
    setPath(id);
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        // console.log("movie", data.data);
        setSingleMovie(data.data);
      })
    );
  }, []);

  return singleMovie ? (
    <Wrapper>
      <MovieWrapper
        styles={{
          backgroundImage: `url(
          http://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${singleMovie.backdrop_path}
       )`,
          backgroundSize: "cover"
        }}
      >
        <Poster src={base_url + posterSize + singleMovie.poster_path} />
        <MovieInfo>
          <H1>{singleMovie.title}</H1>
          {/* //DETAILS - THIS CAN GO IN 1 COMPONENT */}
          <Details>
            <div>{singleMovie.release_date}</div>
            <Lang>({singleMovie.original_language.toUpperCase()})</Lang>
            <GoPrimitiveDot size={11} />
            {singleMovie.genres.map(genre => {
              return (
                <Genre key={genre.id}>
                  {" "}
                  <strong>{genre.name}</strong>
                </Genre>
              );
            })}
            <GoPrimitiveDot size={11} />
            <Runtime>{time_converter(singleMovie.runtime)}</Runtime>
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
            <i>{singleMovie.tagline}</i>
          </Tagline>
          <h3>Overview:</h3>
          <Overview>{singleMovie.overview}</Overview>
        </MovieInfo>
      </MovieWrapper>
      <Post hidden={hidden} currentUser={currentUser} id={id} />
    </Wrapper>
  ) : (
    <Loading />
  );
};

const Wrapper = styled.div`
  justify-content: center;
  margin: 0 auto;
  padding: 40px 60px;
  max-width: 1300px;
  /* background: transparent; */
  width: 100%;
  /* border-bottom: 1px solid black; */
  background-position: right -200px top;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-image: url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/uQtqiAu2bBlokqjlURVLEha6zoi.jpg); */
`;

const Poster = styled.img`
  border-radius: 10px;
  height: 450px;
`;

const MovieWrapper = styled.div`
  /* padding: 0 40px; */
  display: flex;
  /* background: transparent; */
  width: 100%;
  opacity: 1;
`;

const H1 = styled.div`
  font-weight: 600;
  font-size: 35px;
`;

const Tagline = styled.div`
  font-weight: 300;
  color: gray;
`;

const Button = styled.button`
  /* background-color: #032541; */
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  color: white;
  height: 47px;
  border: none;
  margin: 15px;
  width: 47px;

  &:active {

  }
`;

const Lang = styled.div`
  margin: 0 5px;
`;

const Details = styled.div`
  align-items: center;
  font-weight: 300;
  font-size: 15px;
  margin: 7px 0;
  display: flex;
`;

const Overview = styled.div`
  font-weight: 300;
`;

const MovieInfo = styled.div`
  align-self: center;
  padding-left: 40px;
`;

const Genre = styled.div`
  padding-right: 5px;
  padding-left: 5px;
  display: flex;
`;

const Runtime = styled.div`
  padding-left: 5px;
`;

export default withRouter(Movie);
