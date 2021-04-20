import React, { useContext } from "react";
import profile from "../PaiMei.jpeg";
import { User, UserStats, Name, ReviewCount, Img } from "./styling/FeedStyles";
import { UserContext } from "./providers/UserProvider";

const UserInfo = ({ user }) => {
  const { currentUser, appUser, handleFollow, handleUnfollow } = useContext(
    UserContext
  );
  console.log("user", user);
  console.log("currentUser", currentUser);
  console.log("appUser", appUser);

  return user ? (
    <User>
      {user.photoURL ? <Img src={user.photoURL} /> : <Img src={profile} />}
      <UserStats>
        <Name>{user.name}</Name>
        <div>
          Following:
          {user.followingObject ? user.followingObject.length : "0"}
        </div>
        <ReviewCount>
          Reviews:
          {user.reviewsObject ? user.reviewsObject.length : "0"}
        </ReviewCount>
        {appUser._id !== user._id && appUser.following.includes(user._id) ? (
          <button>Unfollow</button>
        ) : appUser._id !== user._id &&
          !appUser.following.includes(user._id) ? (
          <button>Follow</button>
        ) : null}
      </UserStats>
    </User>
  ) : null;
};

export default UserInfo;
