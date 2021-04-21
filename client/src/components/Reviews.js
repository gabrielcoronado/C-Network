import React from "react";
import { ReviewsWrapper } from "./styling/ReviewStyles";
import Loading from "./Loading";
import Review from "./Review";
import styled from "styled-components";

const Reviews = ({ reviews, tagName, user }) => {
  return reviews ? (
    <ReviewsWrapper>
      <TitleWrapper>
        <h3>Feed:</h3>
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

const TitleWrapper = styled.div`
  background: gray;
  border: 1px solid gray;
  text-align: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export default Reviews;
