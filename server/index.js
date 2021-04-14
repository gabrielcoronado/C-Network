"use strict";
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const {
  dailyTrend,
  getSingleMovie,
  weeklyTrend,
  markMovieAsSeen,
  blacklistMovie,
  likeReview,
  newReview,
  followUser,
  getReviewsByUser,
  getAllGenres,
  getRandomMovie,
  createNewUser,
  unfollowUser,
  getUser
} = require("./handlers");

const PORT = 4000;

express()
  .use(cors())
  .use(express.json())
  .use(morgan("tiny"))

  .get(`/trending/day`, dailyTrend)
  .get(`/trending/week`, weeklyTrend)
  .get(`/movies/:id`, getSingleMovie)

  //endpoints

  //Like a review
  //   .post(`/reviews/:id/like`, likeReview)

  //Post a review
  .post(`/reviews`, newReview)

  //Follow a new user
  .put(`/users/:id/follow`, followUser)

  //Unfollow a user
  .put(`/users/:id/unfollow`, unfollowUser)

  //See all post from user
  .get(`/users/:id/reviews`, getReviewsByUser)

  // Get user data
  .get(`/users/:id`, getUser)

  // .get(`/movies/search`)

  // .get(`/actors/search`)

  // .get(`/movies/multi`)

  //Get all genres
  //   .get(`/movies/genres`, getAllGenres)

  //Create a new user
  .post(`/users`, createNewUser)

  //   .get(`/movies/randomsearch`, getRandomMovie)

  // currentUser siempre va a estar en el body

  // .post(`/movies/:id/blacklist`, blacklistMovie)

  // .post(`/movies/:id/seen`, markMovieAsSeen)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
