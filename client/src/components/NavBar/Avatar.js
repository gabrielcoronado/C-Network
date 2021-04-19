import React from "react";
import styled from "styled-components";

const Avatar = ({ src }) => <StyledAvatar src={src} />;

const StyledAvatar = styled.img`
  margin-top: -2px;
  border-radius: 50%;
  margin-left: 15px;
  height: 36px;
  width: 36px;
`;

export default Avatar;
