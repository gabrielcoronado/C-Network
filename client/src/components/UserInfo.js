import React from "react";
import profile from "../PaiMei.jpeg";
import { User, UserStats, Name, ReviewCount, Img } from "./styling/FeedStyles";

const UserInfo = ({ user }) => {
  const tagName = "@gab";

  return user ? (
    <User>
      <Img src={profile} />
      <Name>{user.name}</Name>
      <div>{tagName}</div>
      <UserStats>
        <div>
          Following:
          {user.followingObject ? user.followingObject.length : "0"}
        </div>
        <ReviewCount>
          Reviews:
          {user.reviewsObject ? user.reviewsObject.length : "0"}
        </ReviewCount>
      </UserStats>
    </User>
  ) : null;
};

export default UserInfo;
