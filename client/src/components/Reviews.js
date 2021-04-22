import React from "react";
import { ReviewsWrapper, TitleWrapper } from "./styling/ReviewStyles";
import Loading from "./Loading";
import Review from "./Review";

const Reviews = ({ reviews, tagName, user }) => {
  const sortedReviews = reviews.sort((review1, review2) => {
    if (review1.createdAt < review2.createdAt) {
      return 1;
    } else if (review1.createdAt > review2.createdAt) {
      return -1;
    } else {
      return 0;
    }
  });

  return reviews ? (
    <ReviewsWrapper>
      <TitleWrapper>
        <h3>Feed</h3>
      </TitleWrapper>
      {sortedReviews.map(review => {
        return (
          <div key={review._id}>
            <Review review={review} user={user} />
          </div>
        );
      })}
    </ReviewsWrapper>
  ) : (
    <Loading />
  );
};

export default Reviews;
