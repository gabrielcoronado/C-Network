import React, { createContext, useEffect, useState } from "react";

export const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [dailyTrends, setDailyTrends] = useState();
  const [weeklyTrends, setWeeklyTrends] = useState();
  const [genres, setGenres] = useState();

  //Fetching Daily Trends
  useEffect(() => {
    fetch(`/trending/day`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        setDailyTrends(data.data.results);
      })
    );
  }, []);

  //Fetching Weekly Trends
  useEffect(() => {
    fetch(`/trending/week`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        setWeeklyTrends(data.data.results);
      })
    );
  }, []);

  return (
    <MovieContext.Provider
      value={{ dailyTrends, weeklyTrends, genres, setGenres }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
