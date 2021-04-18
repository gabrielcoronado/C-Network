import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [path, setPath] = useState("");

  // console.log("searchInput", searchInput);

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

  const handleBlacklist = async () => {
    const res = await fetch(`http://localhost:4000/movies/${path}/blacklist`, {
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
    const res = await fetch(`http://localhost:4000/movies/${path}/seen`, {
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

  return (
    <UserContext.Provider
      value={{
        searchSubmitted,
        currentUser,
        searchInput,
        setSearchInput,
        setSearchSubmitted,
        handleSeen,
        handleBlacklist,
        setPath
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
