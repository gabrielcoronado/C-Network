import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import Reviews from "./Reviews";
import MovieCard from "./MovieCard";
import { UserContext } from "./providers/UserProvider";
import {
  ProfileWrapper,
  FeedWrapper,
  Filters,
  Button
} from "./styling/ProfileStyles";
import { CardWrapper } from "./styling/MovieResultsStyles";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState();
  const [selectedTab, setSelectedTab] = useState("feed");

  const { id } = useParams();

  useEffect(() => {
    if (currentUser) {
      fetch(`/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "current-user-id": currentUser._id
        }
      }).then(res =>
        res.json().then(data => {
          setUser(data.data);
        })
      );
    }
  }, [id, currentUser]);

  return user ? (
    <ProfileWrapper>
      <FeedWrapper>
        <UserInfo user={user} />
        <Filters>
          <Button
            style={
              selectedTab === "feed"
                ? { borderBottom: "1px solid rgb(255, 128, 55)" }
                : null
            }
            onClick={() => setSelectedTab("feed")}
          >
            Feed
          </Button>
          {user._id === currentUser._id ? (
            <>
              <Button
                style={
                  selectedTab === "blacklist"
                    ? { borderBottom: "1px solid rgb(255, 128, 55)" }
                    : null
                }
                onClick={() => setSelectedTab("blacklist")}
              >
                Blacklist
              </Button>
              <Button
                style={
                  selectedTab === "seen"
                    ? { borderBottom: "1px solid rgb(255, 128, 55)" }
                    : null
                }
                onClick={() => setSelectedTab("seen")}
              >
                Favorite
              </Button>
            </>
          ) : null}
        </Filters>
        {selectedTab === "feed" ? (
          <Reviews reviews={user.reviewsObject} user={user} />
        ) : selectedTab === "seen" ? (
          <CardWrapper>
            {user.seen &&
              user.seen.map(movieid => {
                return <MovieCard movieid={movieid} key={movieid} />;
              })}
          </CardWrapper>
        ) : selectedTab === "blacklist" ? (
          <CardWrapper>
            {user.blacklist &&
              user.blacklist.map(movieid => {
                return <MovieCard movieid={movieid} key={movieid} />;
              })}
          </CardWrapper>
        ) : null}
      </FeedWrapper>
    </ProfileWrapper>
  ) : null;
};

export default Profile;
