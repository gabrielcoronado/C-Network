import styled from "styled-components";

export const Wrapper = styled.div`
  border-bottom: 1px solid gray;
  padding: 15px 30px 30px 30px;
  margin-bottom: 30px;
  display: flex;
  /* min-width: 40vw;
  width: 40vw; */
`;

export const ReviewsWrapper = styled.div`
  border-right: 1px solid gray;
  border-left: 1px solid gray;
  /* box-shadow: 0px 0px 16px 1px #9e9e9e; */
  color: whitesmoke;
  margin: 0 auto;
  min-width: 40vw;
  border-radius: 10px;
  width: 40vw;
`;

export const TitleWrapper = styled.div`
  background: gray;
  border: 1px solid gray;
  text-align: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const Date = styled.div`
  font-size: 11px;
  padding: 10px 0;
  color: gray;
`;

export const Img = styled.img`
  margin-right: 15px;
  border-radius: 50%;
  height: 25px;
  width: 25px;
`;

export const Poster = styled.img`
  border-radius: 5px;
  cursor: pointer;
  height: 180px;
`;

export const User = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
`;

export const Title = styled.span`
  font-size: 25px;
  cursor: pointer;
`;

export const Tag = styled.p`
  font-size: 13px;
  color: gray;
`;

export const RatingWrapper = styled.div`
  align-items: baseline;
  padding-top: 15px;
  display: flex;
  height: 20px;
`;

export const Comment = styled.p`
  padding-top: 15px;
  font-size: 15px;
`;

export const PostData = styled.div`
  padding-left: 25px;
`;
