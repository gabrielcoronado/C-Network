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
    const res = await fetch(`/movies/${id}/blacklist`, {
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
  };

  const handleSeen = async () => {
    const res = await fetch(`/movies/${id}/seen`, {
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
  };

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        setMovie(data.data);
      })
    );
  }, []);

  return movie ? (
    <Wrapper>
      <Movie
        style={{ opacity: "1" }}
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
