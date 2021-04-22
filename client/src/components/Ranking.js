import React, { useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import { useHistory } from "react-router-dom";
import profile from "./assets/placeholderImg.png";
import {
  RankingWrapper,
  TitleWrapper,
  RankWrapper,
  Rank,
  ProfilePic,
  Reviews,
  Name,
  Info
} from "./styling/RankingStyles";

const Ranking = () => {
  const history = useHistory();
  const { ranking } = useContext(UserContext);

  const handleUserPage = id => {
    history.push(`/users/${id}`);
  };
  return ranking ? (
    <RankingWrapper>
      <TitleWrapper>
        <h3>Ranking</h3>
      </TitleWrapper>
      <RankWrapper>
        {ranking.map(rank => {
          return (
            <Rank key={rank.name} onClick={() => handleUserPage(rank._id)}>
              {rank && rank.photoURL ? (
                <ProfilePic src={rank.photoURL} />
              ) : (
                <ProfilePic src={profile} />
              )}
              <Info>
                <Name>{rank.name}</Name>
                {rank && !rank.reviewsCount ? null : (
                  <Reviews>Reviews: {rank.reviewsCount}</Reviews>
                )}
              </Info>
            </Rank>
          );
        })}
      </RankWrapper>
    </RankingWrapper>
  ) : null;
};

export default Ranking;
