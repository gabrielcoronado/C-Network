import styled from "styled-components";

export const ProfileWrapper = styled.div`
  padding: 20px 60px;
  /* border: 1px solid gray; */
  width: 50vw;
  margin: 0 auto;
  display: flex;
`;

export const FeedWrapper = styled.div`
  padding: 15px 30px 30px 30px;
  margin-bottom: 30px;
  width: 50vw;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  border-bottom: 1px solid gray;
`;

export const Filters = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  font-size: 20px;
  padding-bottom: 30px;
  width: 30%;
`;
