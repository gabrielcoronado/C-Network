import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { AppContext } from "../providers/AppProvider";
import Avatar from "./Avatar";

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  const { appUser, signInWithGoogle, handleSignOut } = useContext(AppContext);

  return (
    <Wrapper>
      <StyledLink to="/">
        <P>The Couch Network</P>
      </StyledLink>
      <Nav>
        {currentUser ? (
          <StyledLink to={`/users/${currentUser._id}`}>Profile</StyledLink>
        ) : null}
        <StyledLink to="/feed">Feed</StyledLink>
        <>
          {appUser && appUser.photoURL ? (
            <>
              <Avatar src={appUser.photoURL} />
              <StyledButton onClick={handleSignOut}>Logout</StyledButton>
            </>
          ) : (
            <StyledButton onClick={signInWithGoogle}>Login</StyledButton>
          )}
        </>
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

const StyledButton = styled.button`
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
