import React from "react";
import { ReviewsWrapper, TitleWrapper } from "./styling/ReviewStyles";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import Review from "./Review";

const Reviews = ({ reviews, user }) => {
  const sortedReviews = reviews.sort((review1, review2) => {
    if (review1.createdAt < review2.createdAt) {
      return 1;
    } else if (review1.createdAt > review2.createdAt) {
      return -1;
    } else {
      return 0;
    }
  });

  return reviews && user ? (
    <ReviewsWrapper>
      <TitleWrapper>
        {user.reviewsObject.length ? (
          <h3>Feed</h3>
        ) : (
          <StyledLink to="/movies">
            <h3>Review your first Movie!</h3>
          </StyledLink>
        )}
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: whitesmoke;
  cursor: pointer;

  :hover {
    color: #2a2c2f;
  }
`;

export default Reviews;
