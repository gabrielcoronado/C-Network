import React, { useContext } from "react";
import profile from "./assets/placeholderImg.png";
import { User, UserStats, Name, ReviewCount, Img } from "./styling/FeedStyles";
import { UserContext } from "./providers/UserProvider";
import { Button, Header, Info, UnfollowButton } from "./styling/UserInfoStyles";

const UserInfo = ({ user }) => {
  // console.log("user", user);
  const { appUser, currentUser, setUpdateCurrentUser } = useContext(
    UserContext
  );

  const testFunction = async action => {
    const res = await fetch(`/users/${user._id}/${action}`, {
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
  };

  const handleUnfollow = async () => {
    await testFunction("unfollow");
    setUpdateCurrentUser(true);
  };

  const handleFollow = async () => {
    await testFunction("follow");
    setUpdateCurrentUser(true);
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
            <UnfollowButton onClick={() => handleUnfollow()}>
              Unfollow
            </UnfollowButton>
          ) : appUser.following &&
            appUser._id !== user._id &&
            !appUser.following.includes(user._id) ? (
            <Button onClick={() => handleFollow()}>Follow</Button>
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
