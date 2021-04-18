import React from "react";
import { FaStar } from "react-icons/fa";
import { Radio, Rating } from "./RatingStyles";

const Rate = ({ handleClick, rating, size }) => {
  const bigStar = {
    justifyContent: "center",
    aligItems: "center",
    fontSize: size === "small" ? "15px" : "30px",
    display: "flex",
    height: "10vh",
    marginTop: 0
  };

  return (
    <div className="container" style={bigStar}>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label key={index}>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => handleClick && handleClick(givenRating)}
            />
            <Rating>
              <FaStar
                color={
                  rating === 0 || rating < givenRating
                    ? "gray"
                    : rating === 1
                    ? "#ff4545"
                    : rating === 2
                    ? "#ffa534"
                    : rating === 3
                    ? "#ffe234"
                    : rating === 4
                    ? "#b7dd29"
                    : rating === 5
                    ? "#57e32c"
                    : "gray"
                }
              />
            </Rating>
          </label>
        );
      })}
    </div>
  );
};

export default Rate;
