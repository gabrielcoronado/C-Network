const fetch = require("node-fetch");
require("dotenv").config();
const key = process.env.REACT_APP_TMDB_KEY;
const { MongoClient, ObjectID } = require("mongodb");
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const dbConnect = async () => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("Connected!");
  const db = client.db("c-network");

  return { client, db };
};

const handleResult = (client, result, data, res) => {
  if (result) {
    res.status(201).json({ status: 201, data: result });
  } else {
    res.status(500).json({ status: 500, data: data, message: err.message });
  }
  client.close();
  console.log("Disconnected!");
};

const handleMovieDbResponse = (data, res) => {
  // console.log("data", data);
  data
    ? res.status(200).json({ status: 200, data: data })
    : res.status(400).json({ status: 400, message: "no data" });
};

//Daily Trends
const dailyTrend = async (req, res) => {
  const api_url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`;
  const fetch_response = await fetch(api_url);
  const data = await fetch_response.json();

  handleMovieDbResponse(data, res);
};

// Weekly Trends
const weeklyTrend = async (req, res) => {
  const api_url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`;
  const fetch_response = await fetch(api_url);
  const data = await fetch_response.json();

  handleMovieDbResponse(data, res);
};

//Get all genres
const getAllGenres = async (req, res) => {
  const api_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`;
  const fetch_response = await fetch(api_url);
  const data = await fetch_response.json();

  handleMovieDbResponse(data, res);
};

//Fetching data for a single Movie.
const getSingleMoviebyId = async (req, res) => {
  const { id } = req.params;
  const api_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
  const fetch_response = await fetch(api_url);
  const data = await fetch_response.json();

  handleMovieDbResponse(data, res);
};

//To Do
const getMovieByQuery = async (req, res) => {
  try {
    const { query } = req.params;
    console.log("query", query);

    const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`;

    const fetch_response = await fetch(api_url);
    const data = await fetch_response.json();

    handleMovieDbResponse(data, res);
  } catch (err) {
    console.log("error", err);
  }
};

//Get reviews by user
const getReviewsByUser = async (req, res) => {
  try {
    const { client, db } = await dbConnect();
    const { reviewersId } = req.query;
    console.log("query", req.query);
    //aggregate lets us use the lookup which allows us to match/import data from other collections
    const result = await db
      .collection("reviews")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "reviewerId",
            foreignField: "_id",
            as: "reviewer"
          }
        },
        {
          $match: {
            reviewerId: {
              $in: reviewersId.split(",").map(reviewer => ObjectID(reviewer))
            }
          }
        }
      ])
      .sort({ createdAt: -1 })
      .toArray();

    handleResult(client, result, req.body, res);
  } catch (err) {
    console.log(err.stack);
  }
};

const newReview = async (req, res) => {
  try {
    const { client, db } = await dbConnect();

    const { currentUser, comment, rating, id } = req.body;

    const result = await db.collection("reviews").insertOne({
      movie_id: id,
      reviewerId: ObjectID(currentUser._id),
      comment,
      rating,
      createdAt: new Date()
    });
    assert.equal(1, result.insertedCount);

    const reviewId = result.ops[0]._id;

    const result2 = await db
      .collection("users")
      .updateOne(
        { _id: ObjectID(currentUser._id) },
        { $addToSet: { reviews: ObjectID(reviewId) } }
      );

    handleResult(client, result, req.body, res);
  } catch (err) {
    console.log(err.stack);
  }
};

const createNewUser = async (req, res) => {
  const { client, db } = await dbConnect();

  const { name } = req.body;

  const result = await db.collection("users").insertOne({
    name: name,
    following: [],
    seen: [],
    blacklist: []
  });

  handleResult(client, result, req.body, res);
};

const followUser = async (req, res) => {
  const { client, db } = await dbConnect();

  const userToFollowId = req.params.id;

  const { currentUser } = req.body;

  const result = await db
    .collection("users")
    .updateOne(
      { _id: ObjectID(currentUser._id) },
      { $addToSet: { following: ObjectID(userToFollowId) } }
    );

  handleResult(client, result, req.body, res);
};

const unfollowUser = async (req, res) => {
  const { client, db } = await dbConnect();

  const userToUnfollowId = req.params.id;

  const { currentUser } = req.body;

  const result = await db
    .collection("users")
    .updateOne(
      { _id: ObjectID(currentUser._id) },
      { $pullAll: { following: [ObjectID(userToUnfollowId)] } }
    );

  handleResult(client, result, req.body, res);
};

const blacklistMovie = async (req, res) => {
  const { client, db } = await dbConnect();

  const movieToBlacklist = req.params.id;

  const { currentUser } = req.body;
  console.log("currentUser", currentUser);

  const result = await db
    .collection("users")
    .updateOne(
      { _id: ObjectID(currentUser._id) },
      { $addToSet: { blacklist: movieToBlacklist } }
    );

  handleResult(client, result, req.body, res);
};

const markMovieAsSeen = async (req, res) => {
  const { client, db } = await dbConnect();

  const seenMovie = req.params.id;

  const { currentUser } = req.body;

  const result = await db
    .collection("users")
    .updateOne(
      { _id: ObjectID(currentUser._id) },
      { $addToSet: { seen: seenMovie } }
    );

  handleResult(client, result, req.body, res);
};

const getUser = async (req, res) => {
  try {
    const { client, db } = await dbConnect();
    const userId = req.params.id;
    console.log("userId", userId);
    //aggregate lets us use the lookup which allows us to match/import data from other collections
    const result = await db
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "followingObject"
          }
        },
        {
          $lookup: {
            from: "reviews",
            localField: "reviews",
            foreignField: "_id",
            as: "reviewsObject"
          }
        },
        { $match: { _id: ObjectID(userId) } }
      ])
      .toArray();
    console.log("result", result);
    handleResult(client, result, req.body, res);
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {
  dailyTrend,
  getSingleMoviebyId,
  weeklyTrend,
  getReviewsByUser,
  newReview,
  createNewUser,
  followUser,
  unfollowUser,
  getUser,
  blacklistMovie,
  markMovieAsSeen,
  getAllGenres,
  getMovieByQuery
};
