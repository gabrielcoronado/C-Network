import React from "react";
import { ReviewsWrapper } from "./styling/ReviewStyles";
import Loading from "./Loading";
import Review from "./Review";

const Reviews = ({ reviews, tagName, user }) => {
  return (
    <ReviewsWrapper>
      {reviews ? (
        <div>
          {reviews.map(review => {
            return (
              <div key={review._id}>
                {/* {console.log("review", review)} */}
                <Review review={review} tagName={tagName} user={user} />
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
