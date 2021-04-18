import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Wrapper>
      <StyledLink to="/">
        <P>The Couch Network</P>
      </StyledLink>
      <Nav>
        <StyledLink to="/users/6075f0a52753174f496ff855">Profile</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: transparent;
  padding: 0 40px;
  flex-direction: row;
  align-items: center;
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 15px;
  font-size: 16px;
  display: flex;
  color: white;
`;

const P = styled.p`
  padding-left: 10px;
  font-size: 23px;
  width: 250px;
  color: white;
`;

const Nav = styled.div`
  justify-content: flex-end;
  background-color: transparent;
  display: flex;
  width: 100%;
`;

export default NavBar;
