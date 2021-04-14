import React, { createContext, useEffect, useState } from "react";

export const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [dailyTrends, setDailyTrends] = useState();
  const [weeklyTrends, setWeeklyTrends] = useState();

  //Fetching Daily Trends
  useEffect(() => {
    fetch(`http://localhost:4000/trending/day`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        console.log("Data", data.data);
        setDailyTrends(data.data.results);
      })
    );
  }, []);

  //Fetching Weekly Trends
  useEffect(() => {
    fetch(`http://localhost:4000/trending/week`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        console.log("Data", data.data.results);
        setWeeklyTrends(data.data.results);
      })
    );
  }, []);

  return (
    <MovieContext.Provider value={{ dailyTrends, weeklyTrends }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
