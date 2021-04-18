import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./providers/UserProvider";
import {
  Wrapper,
  UserInfo,
  UserStats,
  Name,
  ReviewCount,
  Img
} from "./styling/FeedStyles";
import profile from "../PaiMei.jpeg";
import Loading from "./Loading";
import Reviews from "./Reviews";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const tagName = "@gab";

  useEffect(() => {
    console.log("currentUser", currentUser);

    //Including the currentUser to get a complete feed
    if (currentUser && currentUser.following) {
      console.log("IF CURRENT-USER");
      const reviewersId = currentUser.following.concat([currentUser._id]);

      fetch(
        `http://localhost:4000/reviews?reviewersId=${reviewersId.join(",")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      ).then(res =>
        res.json().then(data => {
          console.log("reviews", data.data);
          setReviews(data.data);
        })
      );
    }
  }, [currentUser]);

  return currentUser ? (
    <Wrapper>
      <UserInfo>
        <Img src={profile} />
        <Name>{currentUser.name}</Name>
        <div>{tagName}</div>
        <UserStats>
          <div>
            Following:
            {currentUser.followingObject
              ? currentUser.followingObject.length
              : "0"}
          </div>
          <ReviewCount>
            Reviews:
            {currentUser.reviewsObject ? currentUser.reviewsObject.length : "0"}
          </ReviewCount>
        </UserStats>
      </UserInfo>
      <Reviews currentUser={currentUser} reviews={reviews} tagName={tagName} />
    </Wrapper>
  ) : (
    <Loading />
  );
};

export default Profile;
