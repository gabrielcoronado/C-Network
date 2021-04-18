import styled from "styled-components";

export const Img = styled.img`
  width: 200px;
  margin-bottom: 35px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 80px auto;
`;

export const Button = styled.button`
  background-image: linear-gradient(
    90deg,
    rgb(253, 36, 29) 5%,
    rgb(255, 128, 55) 100%
  );
  border-radius: 10px;
  margin-top: 30px;
  font-size: 15px;
  cursor: pointer;
  outline: none;
  border: none;
  width: 250px;
  height: 50px;
  color: white;
`;
