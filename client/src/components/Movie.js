import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [singleMovie, setSingleMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/movie/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(res =>
        res.json().then(data => {
          console.log("movie", data);
          setSingleMovie(data.data);
        })
      );
    }
  }, []);

  return singleMovie ? (
    <div>
      <p>single Movie Page</p>
      <p>{singleMovie.title}</p>
    </div>
  ) : null;
};

export default Movie;
