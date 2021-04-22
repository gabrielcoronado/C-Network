import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import { useHistory } from "react-router-dom";
import placeholder from "./assets/placeholderImg.png";
import Rating from "./post/Rating";
import moment from "moment";
import {
  Wrapper,
  Img,
  Poster,
  User,
  Title,
  Tag,
  RatingWrapper,
  Comment,
  PostData,
  Date
} from "./styling/ReviewStyles";

const Review = ({ review, user }) => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [movie, setMovie] = useState();
  const base_url = `https://image.tmdb.org`;
  const posterSize = `/t/p/w500`;
  const date = moment(review.createdAt).format("DD-MM-YYYY HH:mm a");

  const handleProfile = id => {
    history.push(`/users/${id}`);
  };

  const singleMovieHandle = id => {
    history.push(`/movies/${id}`);
  };

  useEffect(() => {
    fetch(`/movies/${review.movie_id}`, {
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

  return movie && currentUser ? (
    <Wrapper
      key={review._id}
      onClick={() => singleMovieHandle(review.movie_id)}
    >
      <div>
        <Poster src={base_url + posterSize + movie.poster_path} />
      </div>
      <PostData>
        <Title>{movie.title}</Title>
        <Date>{date}</Date>
        <RatingWrapper>
          <Rating rating={review.rating} size={"small"} />
        </RatingWrapper>
        <Comment>{review.comment}</Comment>
        {review && review.reviewerId !== currentUser._id ? (
          <User onClick={() => handleProfile(review.reviewerId)}>
            {currentUser.photoURL ? (
              <Img src={currentUser.photoURL} />
            ) : (
              <Img src={placeholder} />
            )}
            <Tag>{user && user.name}</Tag>
          </User>
        ) : null}
      </PostData>
    </Wrapper>
  ) : (
    <Wrapper></Wrapper>
  );
};

export default Review;
