import React from "react";
import logo from "../../newlogo.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Wrapper>
      <StyledLink to="/">
        <Img src={logo} />
        <P>The Couch Network</P>
      </StyledLink>
      <Nav>
        <StyledLink to="/login">Login</StyledLink>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: #032541;
  padding-right: 25px;
  flex-direction: row;
  align-items: center;
  padding-left: 25px;
  display: flex;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
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

const Img = styled.img`
  padding-top: 13px;
  height: 53px;
`;

const Nav = styled.div`
  justify-content: flex-end;
  background-color: #032541;
  display: flex;
  width: 100%;
`;

export default NavBar;
