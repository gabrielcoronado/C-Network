import React, { useState, useEffect } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { useParams } from "react-router-dom";
import { GiRoundStar } from "react-icons/gi";
import { ImBlocked } from "react-icons/im";
import { FaRegEye } from "react-icons/fa";
import styled from "styled-components";
import Loading from "./Loading";

const Movie = () => {
  const [singleMovie, setSingleMovie] = useState();
  const base_url = `https://image.tmdb.org`;
  const posterSize = `/t/p/w500`;
  const backdropSize = `/t/p/original`;

  const { id } = useParams();

  const time_converter = num => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return hours + "h" + " " + minutes + "m";
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/movies/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(res =>
        res.json().then(data => {
          console.log("movie", data.data);
          setSingleMovie(data.data);
        })
      );
    }
  }, []);

  return singleMovie ? (
    <Wrapper>
      <MovieWrapper
        styles={{
          backgroundImage: `url(${base_url +
            backdropSize +
            singleMovie.backdrop_path})`,
          backgroundSize: "cover"
        }}
      >
        {/* <img src={base_url + backdropSize + singleMovie.backdrop_path} /> */}
        <Poster src={base_url + posterSize + singleMovie.poster_path} />
        <MovieInfo>
          <H1>{singleMovie.title}</H1>
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
          <Button>
            <GiRoundStar size={20} />
          </Button>
          <Button>
            <FaRegEye size={20} />
          </Button>
          <Button>
            <ImBlocked size={20} />
          </Button>
          <Tagline>
            <i>{singleMovie.tagline}</i>
          </Tagline>
          <h3>Overview:</h3>
          <Overview>{singleMovie.overview}</Overview>
        </MovieInfo>
      </MovieWrapper>
    </Wrapper>
  ) : (
    <Loading />
  );
};

const Wrapper = styled.div`
  justify-content: center;
  padding: 40px 60px;
  max-width: 1400px;
  display: flex;
`;

const Poster = styled.img`
  border-radius: 10px;
  height: 450px;
`;

const MovieWrapper = styled.div`
  padding: 0 40px;
  z-index: 99999;
  display: flex;
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
  background-color: #032541;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  color: white;
  height: 47px;
  border: none;
  margin: 15px;
  width: 47px;
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
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
`;

const Runtime = styled.div`
  padding-left: 5px;
`;

export default Movie;
