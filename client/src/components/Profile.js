import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import Reviews from "./Reviews";

const Profile = () => {
  // const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState();

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        setUser(data.data[0]);
      })
    );
  }, []);

  return user ? (
    <div>
      <UserInfo user={user} />
      <Reviews reviews={user.reviewsObject} user={user} />
    </div>
  ) : null;
};

export default Profile;
