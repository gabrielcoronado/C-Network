import React, { useContext } from "react";
import profile from "./assets/PaiMei.jpeg";
import { User, UserStats, Name, ReviewCount, Img } from "./styling/FeedStyles";
import { UserContext } from "./providers/UserProvider";
import { Button, Header, Info } from "./styling/UserInfoStyles";

const UserInfo = ({ user, setStatusChange }) => {
  console.log("user", user);
  const { appUser, currentUser } = useContext(UserContext);

  const handleFollow = async id => {
    console.log("providerID", id);
    const res = await fetch(`/users/${id}/follow`, {
      method: "PUT",
      body: JSON.stringify({
        currentUser
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await res.json();
    console.log("seen", data);
    setStatusChange(true);
  };

  const handleUnfollow = async id => {
    console.log("id", id);
    const res = await fetch(`/users/${id}/unfollow`, {
      method: "PUT",
      body: JSON.stringify({
        currentUser
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await res.json();
    console.log("seen", data);
    setStatusChange(true);
  };

  return user && appUser ? (
    <User>
      {user.photoURL ? <Img src={user.photoURL} /> : <Img src={profile} />}
      <UserStats>
        <Header>
          <Name>{user.name}</Name>
          {appUser.following &&
          appUser._id !== user._id &&
          appUser.following.includes(user._id) ? (
            <Button onClick={() => handleUnfollow(user._id)}>Unfollow</Button>
          ) : appUser.following &&
            appUser._id !== user._id &&
            !appUser.following.includes(user._id) ? (
            <Button onClick={() => handleFollow(user._id)}>Follow</Button>
          ) : null}
        </Header>
        <Info>
          <div>
            Following:{" "}
            {user.followingObject ? user.followingObject.length : "0"}
          </div>
          <ReviewCount>
            Reviews: {user.reviewsObject ? user.reviewsObject.length : "0"}
          </ReviewCount>
        </Info>
      </UserStats>
    </User>
  ) : null;
};

export default UserInfo;
