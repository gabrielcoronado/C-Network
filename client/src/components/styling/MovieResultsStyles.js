import styled from "styled-components";

export const Wrapper = styled.div``;

export const Div = styled.div`
  display: flex;
  padding-right: 30px;
`;

export const BarDiv = styled.div`
  margin: 0 auto;
  width: 600px;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
  padding-left: 30px;
`;

export const Card = styled.div`
  width: 200px;
  margin: 0px 7px 40px 7px;
  border-radius: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid gray;
  cursor: pointer;
`;

export const Title = styled.p`
  font-size: 15px;
  padding-left: 8px;
  margin-bottom: 0;
`;

export const ReleaseDate = styled.p`
  font-size: 12px;
  margin-top: 3px;
  color: gray;
  padding-left: 8px;
`;

export const Poster = styled.img`
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  height: 270px;
  width: 200px;
`;
