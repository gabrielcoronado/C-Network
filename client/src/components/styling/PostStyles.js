import styled from "styled-components";

export const PostWrapper = styled.div`
  flex-direction: column;
  padding-bottom: 30px;
  align-items: center;
  margin-top: 100px;
  display: flex;
`;

export const CommentBox = styled.textarea`
  border-radius: 10px;
  padding: 10px 20px;
  align-self: center;
  background: lightgray;
  font-size: 17px;
  outline: none;
  border: none;
  color: black;
  height: 20vh;
  width: 40vw;
`;

export const Button = styled.button`
  background: linear-gradient(
    90deg,
    rgb(253, 36, 29) 5%,
    rgb(255, 128, 55) 100%
  );
  border-radius: 10px;
  margin-top: 15px;
  font-size: 15px;
  outline: none;
  border: none;
  width: 150px;
  height: 50px;
`;
