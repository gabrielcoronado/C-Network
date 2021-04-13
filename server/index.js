"use strict";
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const { dailyTrend, getSingleMovie, weeklyTrend } = require("./handlers");

const PORT = 4000;

express()
  .use(cors())
  .use(express.json())
  .use(morgan("tiny"))

  .get(`/trending/day`, dailyTrend)
  .get(`/trending/week`, weeklyTrend)
  .get(`/movie/:id`, getSingleMovie)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
