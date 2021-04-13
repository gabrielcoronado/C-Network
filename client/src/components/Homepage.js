import React from "react";
// import { MovieContext } from "./providers/MovieProvider";
// import { useHistory } from "react-router-dom";
import Trending from "./Trending";

require("dotenv").config();

const Homepage = () => {
  return (
    <div>
      Homepage
      <Trending />
    </div>
  );
};

export default Homepage;
