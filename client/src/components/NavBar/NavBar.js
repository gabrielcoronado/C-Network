import React from "react";
// import { MdMovieFilter } from "react-icons/md";
import styled from "styled-components";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  // const history = useHistory();

  return (
    <Wrapper>
      <Link to="/">
        {/* <MdMovieFilter size={28} color={"white"} /> */}
        <P>TCN</P>
      </Link>
      <Nav>{/* <P>Login</P> */}</Nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: sans-serif;
  background-color: #032541;
`;

const P = styled.p`
  color: white;
  padding-left: 10px;
  font-size: 20px;
`;

const Nav = styled.div`
  float: right;
  background-color: #032541;
`;

export default NavBar;
