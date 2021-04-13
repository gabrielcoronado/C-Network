const fetch = require("node-fetch");
require("dotenv").config();
const key = process.env.REACT_APP_TMDB_KEY;

//Daily Trends
const dailyTrend = async (req, res) => {
  const api_url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`;
  const fetch_response = await fetch(api_url);
  const data = await fetch_response.json();
  data
    ? res.status(200).json({ status: 200, data: data })
    : res.status(400).json({ status: 400, message: "no data" });
};

// Weekly Trends
const weeklyTrend = async (req, res) => {
  const api_url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`;
  const fetch_response = await fetch(api_url);
  const data = await fetch_response.json();
  data
    ? res.status(200).json({ status: 200, data: data })
    : res.status(400).json({ status: 400, message: "no data" });
};

//Fetching data for a single Movie.
const getSingleMovie = async (req, res) => {
  const { id } = req.params;
  const api_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
  const fetch_response = await fetch(api_url);
  const data = await fetch_response.json();

  data
    ? res.status(200).json({ status: 200, data: data })
    : res.status(400).json({ status: 400, message: "no data" });
};

module.exports = {
  dailyTrend,
  getSingleMovie,
  weeklyTrend
};
