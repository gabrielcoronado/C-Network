import Feed from "./components/Feed";
import Movie from "./components/Movie";
import styled from "styled-components";
import Profile from "./components/Profile";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar/NavBar";
import UserSearch from "./components/UserSearch";
import RandomMovie from "./components/RandomMovie";
import GlobalStyle from "./components/GlobalStyle";
import MovieResults from "./components/MovieResults";
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
            {/* <Route exact path="/login">
              <Login />
            </Route> */}
            <Route exact path="/users/:id">
              <Profile />
            </Route>
            <Route exact path="/feed">
              <Feed />
            </Route>
            <Route exact path="/movies">
              <MovieResults />
            </Route>
            <Route exact path="/movies/randomsearch">
              <RandomMovie />
            </Route>
            <Route exact path="/movies/:id">
              <Movie />
            </Route>
            <Route exact path="/usersearch">
              <UserSearch />
            </Route>
          </Switch>
        </MainPageGridWrapper>
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  /* display: grid;
  grid-template-areas:
    "header header header header header header"
    "sidebar main main main main main";
  grid-template-columns: min-content auto; */
`;

const NavBarGridWrapper = styled.div`
  grid-area: header;
`;
const MainPageGridWrapper = styled.div`
  grid-area: main;
`;

export default App;
