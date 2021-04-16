import React, { useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import Loading from "./Loading";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  console.log("currentUser", currentUser);

  return currentUser ? (
    <div>
      <div>ID: {currentUser._id}</div>
      <div>name:{currentUser.name}</div>
      <div>seen: {currentUser.seen}</div>
      <div>blacklist: {currentUser.blacklist}</div>
      <div>following: {currentUser.following}</div>
      <div>followingObject: {currentUser.followingObject[0].name}</div>
      <div>reviewComment:{currentUser.reviews[0].$oid}</div>
    </div>
  ) : (
    <Loading />
  );
};

export default Profile;
