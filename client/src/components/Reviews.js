import React from "react";
import { ReviewsWrapper } from "./styling/ReviewStyles";
import Loading from "./Loading";
import Review from "./Review";

const Reviews = ({ reviews, tagName }) => {
  return (
    <ReviewsWrapper>
      {reviews ? (
        <div>
          {reviews.map(review => {
            return (
              <div key={review._id}>
                <Review review={review} tagName={tagName} />
              </div>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </ReviewsWrapper>
  );
};

export default Reviews;
