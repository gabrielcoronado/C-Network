import styled from "styled-components";

export const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  height: 33px;
  width: 80px;
  margin-top: 22px;
  margin-left: 10px;
  border-radius: 10px;
  background-image: linear-gradient(
    90deg,
    rgb(253, 36, 29) 5%,
    rgb(255, 128, 55) 100%
  );
`;

export const UnfollowButton = styled(Button)`
  background: gray;
`;

export const Header = styled.div`
  display: flex;
`;

export const Info = styled.div`
  display: flex;
  font-size: 15px;
`;
