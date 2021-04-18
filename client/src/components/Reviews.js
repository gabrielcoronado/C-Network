import React from "react";
import styled from "styled-components";
import profile from "../PaiMei.jpeg";
import Loading from "./Loading";
import Rating from "./post/Rating";
const Reviews = ({ currentUser, tagName }) => {
  const reviews = currentUser.reviewsObject;

  return (
    <ReviewsWrapper>
      {reviews ? (
        <div>
          {/* {console.log("reviewsObject", reviews)} */}
          {reviews.map(review => {
            return (
              <Review key={review._id}>
                <div>
                  <Img src={profile} />
                </div>
                <PostData>
                  <Tag>{tagName}</Tag>
                  {/* {console.log("review", review)} */}
                  <RatingWrapper>
                    <Rating rating={review.rating} size={"small"} />
                  </RatingWrapper>

                  <Comment>{review.comment}</Comment>
                </PostData>
              </Review>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  margin: 0 auto;
  color: whitesmoke;
`;

const Review = styled.div`
  padding: 20px 0;
  display: flex;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

const Tag = styled.p`
  color: gray;
`;

const RatingWrapper = styled.div`
  /* height: 20px; */
`;

const Comment = styled.p`
  font-size: 15px;
`;

const PostData = styled.div`
  margin-top: -15px;
  padding-left: 15px;
`;

export default Reviews;
