import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  //user http://localhost:3000/users/6075f0a52753174f496ff855

  useEffect(() => {
    fetch(`http://localhost:4000/users/6075f0a52753174f496ff855`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        console.log("user", data.data[0]);
        setCurrentUser(data.data[0]);
      })
    );
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
