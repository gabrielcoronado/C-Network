import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  width: 280px;
  margin: 0 auto;
`;

export const TitleWrapper = styled.div`
  background: gray;
  border: 1px solid gray;
  width: 280px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const MovieGrid = styled.div`
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  font-family: sans-serif;
  border: 1px solid gray;
  flex-direction: row;
  margin-bottom: 20px;
  overflow: overlay;
  overflow-x: auto;
  overflow-y: auto;
  font-size: 15px;
  width: 280px;
`;

export const Poster = styled.img`
  height: 100px;
  border-radius: 10px;
`;

export const Header = styled.p`
  margin: 15px auto;
`;

export const Info = styled.div`
  padding-left: 15px;
  text-align: left;
`;

export const Movie = styled.div`
  border-bottom: 1px solid gray;
  padding: 25px 15px;
  display: flex;
  cursor: pointer;
`;

export const Title = styled.p`
  margin-bottom: 0;
`;
