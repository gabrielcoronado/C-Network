import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";

const Rate = () => {
  const [rate, setRate] = useState(0);
  console.log("rate", rate);
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
              }}
            />
            <Rating>
              <FaStar
                color={
                  rate === 0 || rate < givenRating
                    ? "000"
                    : givenRating === 1
                    ? "#ff4545"
                    : givenRating === 2
                    ? "#ffa534"
                    : givenRating === 3
                    ? "#ffe234"
                    : givenRating === 4
                    ? "#b7dd29"
                    : givenRating === 5
                    ? "#57e32c"
                    : "000"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};

export default Rate;
