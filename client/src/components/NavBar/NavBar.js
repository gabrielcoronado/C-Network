import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Avatar from "./Avatar";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const { appUser, setAppUser, signOut, signInWithGoogle } = useContext(
    UserContext
  );
  const history = useHistory();

  const handleSignOut = () => {
    signOut();
    setAppUser({});
    history.push("/");
  };

  return (
    <Wrapper>
      <StyledLink to="/">
        <P>The Couch Network</P>
      </StyledLink>
      <Nav>
        <>
          {appUser && appUser.email ? (
            <>
              <StyledLink to="/usersearch">
                <Span>Search Users</Span>
              </StyledLink>
              <StyledLink to="/feed">
                <Span> Feed</Span>
              </StyledLink>
              <StyledLink to={`/users/${appUser._id}`}>
                <Span>Profile</Span>
              </StyledLink>
              {appUser.photoURL ? <Avatar src={appUser.photoURL} /> : null}
              <StyledButton onClick={handleSignOut}> Logout</StyledButton>
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
  cursor: pointer;
  font-size: 16px;
  display: flex;
  color: white;
`;

const StyledButton = styled.button`
  text-decoration: none;
  margin-left: 15px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  color: white;
`;

const P = styled.p`
  cursor: pointer;
  font-size: 23px;
  width: 250px;
  color: white;
`;

const Nav = styled.div`
  justify-content: flex-end;
  background-color: transparent;
  align-items: center;
  display: flex;
  width: 100%;
`;

const Span = styled.span`
  border-right: 1px solid white;
  padding-right: 15px;
  padding-left: 15px;
`;

export default NavBar;
