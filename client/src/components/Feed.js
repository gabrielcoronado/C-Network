import React, { useContext, useState, useEffect } from "react";
import { MovieContext } from "./providers/MovieProvider";
import { UserContext } from "./providers/UserProvider";
import { Wrapper, TrendingWrapper, SearchWrapper } from "./styling/FeedStyles";
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

  useEffect(() => {
    //Including the currentUser to get a complete feed
    if (currentUser && currentUser.following) {
      // console.log("IF CURRENT-USER");
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
          // console.log("reviews", data.data);
          setReviews(data.data);
        })
      );
    }
  }, [currentUser]);

  return currentUser ? (
    <Wrapper className="wrapper">
      {/* {console.log("currentUser", currentUser)} */}
      <Ranking />
      <Reviews user={currentUser} reviews={reviews} />
      <TrendingWrapper>
        <SearchWrapper>
          <SearchBar />
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
