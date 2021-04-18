import React, { useState } from "react";
import Rating from "./Rating";
import styled from "styled-components";

const Post = ({ currentUser, id, hidden }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  console.log("comment", comment);

  const handleComment = ev => {
    setComment(ev.target.value.toLowerCase());
  };

  const handleClick = givenRating => {
    setRating(givenRating);
  };

  const postAReview = async () => {
    const res = await fetch(`http://localhost:4000/reviews`, {
      method: "POST",
      body: JSON.stringify({
        currentUser,
        comment,
        rating,
        id
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await res.json();
    console.log("seen", data);
  };

  return !hidden ? (
    <PostWrapper>
      <Rating handleClick={handleClick} rating={rating} />
      <CommentBox
        id="commentBox"
        onChange={handleComment}
        type="text"
        placeholder="write your review!"
      />
      <Button onClick={() => postAReview()}>Post Review</Button>
    </PostWrapper>
  ) : null;
};

const PostWrapper = styled.div`
  flex-direction: column;
  padding-bottom: 30px;
  align-items: center;
  margin-top: 100px;
  display: flex;
`;

const CommentBox = styled.textarea`
  border-radius: 10px;
  padding: 10px 20px;
  align-self: center;
  background: lightgray;
  font-size: 17px;
  outline: none;
  border: none;
  color: black;
  height: 20vh;
  width: 40vw;
`;

const Button = styled.button`
  background: #032541;
  border-radius: 10px;
  margin-top: 15px;
  font-size: 15px;
  outline: none;
  border: none;
  width: 150px;
  height: 50px;
`;

export default Post;
