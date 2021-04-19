"use strict";
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const {
  dailyTrend,
  getSingleMoviebyId,
  weeklyTrend,
  markMovieAsSeen,
  blacklistMovie,
  getMovieByQuery,
  likeReview,
  newReview,
  followUser,
  getReviewsByUser,
  getAllGenres,
  getRandomMovie,
  createNewUser,
  unfollowUser,
  getUserData,
  createUser
} = require("./handlers");

const PORT = 4000;

express()
  .use(cors())
  .use(express.json())
  .use(morgan("tiny"))

  .get(`/trending/day`, dailyTrend)
  .get(`/trending/week`, weeklyTrend)
  .get(`/movies/:id`, getSingleMoviebyId)
  .get(`/movies/movie/:query`, getMovieByQuery)
  //endpoints

  //Like a review
  //   .post(`/reviews/:id/like`, likeReview)

  //Post a review
  .post(`/reviews`, newReview)

  //Follow a new user
  .put(`/users/:id/follow`, followUser)

  //Unfollow a user
  .put(`/users/:id/unfollow`, unfollowUser)

  //See all post from all user
  .get(`/reviews`, getReviewsByUser)

  // Get user data
  .get(`/users/:id`, getUserData)

  // .get(`/movies/search`)

  // .get(`/actors/search`)

  // .get(`/movies/multi`)

  //Get all genres
  .get(`/genres`, getAllGenres)

  //Create a new user
  .post(`/users`, createNewUser)

  ///////FIREBASE///////
  .post("/login", createUser)

  //////////FIREBASE///////

  //   .get(`/movies/randomsearch`, getRandomMovie)

  .put(`/movies/:id/blacklist`, blacklistMovie)

  .put(`/movies/:id/seen`, markMovieAsSeen)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
