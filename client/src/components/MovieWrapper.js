import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./providers/UserProvider";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";
import Loading from "./Loading";
import Post from "./post/Post";
import Movie from "./Movie";
import { Wrapper } from "./styling/MovieStyles";

const MovieWrapper = () => {
  const { currentUser } = useContext(UserContext);
  const [hidden, setHidden] = useState(true);
  const [movie, setMovie] = useState();

  const { id } = useParams();

  const handleBlacklist = async () => {
    const res = await fetch(`http://localhost:4000/movies/${id}/blacklist`, {
      method: "PUT",
      body: JSON.stringify({
        currentUser
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await res.json();
    console.log("blacklisted", data);
  };

  const handleSeen = async () => {
    const res = await fetch(`http://localhost:4000/movies/${id}/seen`, {
      method: "PUT",
      body: JSON.stringify({
        currentUser
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await res.json();
    console.log("seen", data);
  };

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        // console.log("movie", data.data);
        setMovie(data.data);
      })
    );
  }, []);

  return movie ? (
    <Wrapper>
      <Movie
        movieData={movie}
        handleSeen={handleSeen}
        handleBlacklist={handleBlacklist}
        setHidden={setHidden}
        hidden={hidden}
      />
      <Post hidden={hidden} currentUser={currentUser} id={id} />
    </Wrapper>
  ) : (
    <Loading />
  );
};

export default withRouter(MovieWrapper);