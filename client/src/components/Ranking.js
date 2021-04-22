import React, { useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import profile from "./assets/placeholderImg.png";

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

const RankingWrapper = styled.div`
  width: 240px;
`;

const TitleWrapper = styled.div`
  background: gray;
  border: 1px solid gray;
  text-align: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const RankWrapper = styled.div`
  border: 1px solid gray;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-bottom: 20px;
`;

const Rank = styled.div`
  border-bottom: 1px solid gray;
  padding: 25px 10px;
  display: flex;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  height: 40px;
`;

const Name = styled.div`
  font-size: 15px;
`;

const Info = styled.div`
  padding-left: 15px;
`;

const Reviews = styled.div`
  font-size: 13px;
  padding: 15px 20px 0 20px;
`;

export default Ranking;
