import React, { useState } from "react";
import { PostWrapper, CommentBox, Button } from "../styling/PostStyles";
import Rating from "./Rating";

const Post = ({ currentUser, id, hidden }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [postMessage, setPostMessage] = useState(false);
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
    setPostMessage(true);
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
      <Button
        disabled={comment === "" || rating === 0}
        style={{
          background: comment === "" || rating === 0 ? "gray" : null
        }}
        onClick={() => postAReview()}
      >
        Post Review
      </Button>
      {postMessage ? <p>Review Submitted!</p> : null}
    </PostWrapper>
  ) : null;
};

export default Post;
