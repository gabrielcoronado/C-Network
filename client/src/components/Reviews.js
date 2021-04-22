import React from "react";
import { ReviewsWrapper, TitleWrapper } from "./styling/ReviewStyles";
import Loading from "./Loading";
import Review from "./Review";

const Reviews = ({ reviews, tagName, user }) => {
  return reviews ? (
    <ReviewsWrapper>
      <TitleWrapper>
        <h3>Feed</h3>
      </TitleWrapper>
      {reviews.map(review => {
        return (
          <div key={review._id}>
            <Review review={review} tagName={tagName} user={user} />
          </div>
        );
      })}
    </ReviewsWrapper>
  ) : (
    <Loading />
  );
};

export default Reviews;
