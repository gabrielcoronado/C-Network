import Movie from "./components/Movie";
import styled from "styled-components";
import Homepage from "./components/Homepage";
import Login from "./components/NavBar/login";
import RandomMovie from "./components/RandomMovie";
import NavBar from "./components/NavBar/NavBar";
import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <BrowserRouter>
        <NavBarGridWrapper>
          <NavBar />
        </NavBarGridWrapper>
        <MainPageGridWrapper>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/movies/randomsearch">
              <RandomMovie />
            </Route>
            <Route exact path="/movies/:id">
              <Movie />
            </Route>
          </Switch>
        </MainPageGridWrapper>
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-areas:
    "header header header header header header"
    "sidebar main main main main main";
  grid-template-columns: min-content auto;
`;

const NavBarGridWrapper = styled.div`
  grid-area: header;
`;
const MainPageGridWrapper = styled.div`
  grid-area: main;
`;

export default App;
