import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 15px 80px;
  height: 80vh;
  max-width: 1024px;
  margin: 0 auto;
`;

export const SearchButton = styled.button`
  width: 180px;
  height: 50px;
  border-radius: 10px;
  outline: none;
  margin: 40px auto;
  cursor: pointer;
  background: linear-gradient(
    90deg,
    rgb(253, 36, 29) 5%,
    rgb(255, 128, 55) 100%
  );
`;

export const MovieResult = styled.div`
  justify-content: center;
  padding-top: 30px;
  width: 100%;
`;

export const H1 = styled.h1`
  padding-bottom: 15px;
  margin-top: -5px;
`;

export const Div = styled.div`
  text-align: center;
  padding-bottom: 25px;
  border-bottom: 1px solid gray;
`;
