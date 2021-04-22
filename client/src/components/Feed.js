import React, { useContext, useState, useEffect } from "react";
import { MovieContext } from "./providers/MovieProvider";
import { UserContext } from "./providers/UserProvider";
import {
  Wrapper,
  TrendingWrapper,
  SearchWrapper,
  RankWrapper
} from "./styling/FeedStyles";
import { Button } from "./styling/HomepageStyles";
import { useHistory } from "react-router-dom";

// import profile from "../PaiMei.jpeg";
import SearchBar from "./SearchBar";
import Trending from "./Trending";
import Loading from "./Loading";
import Reviews from "./Reviews";
import Ranking from "./Ranking";

const Profile = () => {
  const { dailyTrends, weeklyTrends } = useContext(MovieContext);
  const { currentUser } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const history = useHistory();

  const toRandomMovie = () => {
    history.push("movies/randomsearch");
  };

  useEffect(() => {
    //Including the currentUser to get a complete feed
    if (currentUser && currentUser.following) {
      // console.log("IF CURRENT-USER");
      const reviewersId = currentUser.following.concat([currentUser._id]);

      fetch(`/reviews?reviewersId=${reviewersId.join(",")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(res =>
        res.json().then(data => {
          // console.log("reviews", data.data);
          setReviews(data.data);
        })
      );
    }
  }, [currentUser]);

  return currentUser ? (
    <Wrapper className="wrapper">
      <RankWrapper>
        <Ranking />
        <Button onClick={() => toRandomMovie()}>Random Movie Picker</Button>
      </RankWrapper>
      <Reviews user={currentUser} reviews={reviews} />
      <TrendingWrapper>
        <SearchWrapper>
          <SearchBar redirect="true" />
        </SearchWrapper>
        <Trending trends={dailyTrends} />
        <Trending trends={weeklyTrends} />
      </TrendingWrapper>
    </Wrapper>
  ) : (
    <Loading />
  );
};

export default Profile;
