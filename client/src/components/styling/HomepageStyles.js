import styled from "styled-components";

export const Img = styled.img`
  margin-bottom: 35px;
  width: 200px;
`;

export const Wrapper = styled.div`
  flex-direction: column;
  align-items: center;
  margin: 80px auto;
  display: flex;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  width: 400px;
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
  width: 180px;
  height: 50px;
  color: white;
`;
