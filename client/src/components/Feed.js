import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./providers/UserProvider";
import styled from "styled-components";
import profile from "../PaiMei.jpeg";
import Loading from "./Loading";
import Reviews from "./Reviews";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [feed, setFeed] = useState();
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
          console.log("feed", data);
          setFeed(data);
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
      <Reviews currentUser={currentUser} tagName={tagName} />
    </Wrapper>
  ) : (
    <Loading />
  );
};

const Wrapper = styled.div`
  padding: 20px 60px;
  margin: 0 auto;
  display: flex;
`;

const UserInfo = styled.div`
  /* padding-left: 50px; */
`;

const UserStats = styled.div`
  display: flex;
`;

const Name = styled.h1`
  /* font-size: 20px; */
`;

const ReviewCount = styled.div`
  padding-left: 20px;
`;

const Img = styled.img`
  height: 240px;
  width: 240px;
  border-radius: 50%;
`;

export default Profile;
