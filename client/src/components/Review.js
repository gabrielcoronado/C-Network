import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import profile from "../PaiMei.jpeg";
import Rating from "./post/Rating";
import Loading from "./Loading";
import {
  Wrapper,
  Img,
  Poster,
  User,
  Title,
  Tag,
  RatingWrapper,
  Comment,
  PostData
} from "./styling/ReviewStyles";

const Review = ({ review, tagName }) => {
  const [movie, setMovie] = useState();
  const base_url = `https://image.tmdb.org`;
  const posterSize = `/t/p/w500`;

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${review.movie_id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        setMovie(data.data);
      })
    );
  }, []);

  return movie ? (
    <Wrapper key={review._id}>
      {/* {console.log("movie", movie)} */}
      <div>
        <Poster src={base_url + posterSize + movie.poster_path} />
      </div>
      <PostData>
        <Title>{movie.title}</Title>
        <RatingWrapper>
          <Rating rating={review.rating} size={"small"} />
        </RatingWrapper>

        <Comment>{review.comment}</Comment>
        <User>
          <Img src={profile} />
          <Tag>{tagName}</Tag>
        </User>
      </PostData>
    </Wrapper>
  ) : (
    <Loading />
  );
};

export default Review;
