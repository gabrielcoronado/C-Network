import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";

export const UserContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyAopvg1mEkhrSBFul49i8xiEyVgDpMuE60",
  authDomain: "c-network-e52f3.firebaseapp.com",
  projectId: "c-network-e52f3",
  storageBucket: "c-network-e52f3.appspot.com",
  messagingSenderId: "491793447664",
  appId: "1:491793447664:web:2b1c12ccecfeb647c6e035"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

const UserProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [userSearchInput, setUserSearchInput] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [updateCurrentUser, setUpdateCurrentUser] = useState(false);
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState("");
  const [ranking, setRanking] = useState();

  useEffect(() => {
    if (user) {
      fetch(`/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
      })
        .then(res => {
          // console.log("RES", res);
          return res.json();
        })
        .then(json => {
          setAppUser(json.data);
          setCurrentUser(json.data);
          console.log("JSON", json.data);
          setMessage(json.message);
        });
    }
  }, [user]);

  useEffect(() => {
    if (currentUser && updateCurrentUser) {
      fetch(`/users/${currentUser._id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "current-user-id": currentUser._id
        }
      }).then(res =>
        res.json().then(data => {
          console.log("user", data.data);
          setCurrentUser(data.data);
          setAppUser(data.data);
          setUpdateCurrentUser(false);
        })
      );
    }
  }, [updateCurrentUser]);

  ////// SET RANKING //////
  useEffect(() => {
    fetch(`/users/ranking`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res =>
      res.json().then(data => {
        // console.log("raking", data.data);
        setRanking(data.data);
      })
    );
  }, []);

  return (
    <UserContext.Provider
      value={{
        searchSubmitted,
        searchInput,
        setSearchInput,
        setSearchSubmitted,
        signInWithGoogle,
        appUser,
        message,
        currentUser,
        ranking,
        setUserSearchInput,
        userSearchInput,
        setAppUser,
        signOut,
        setUpdateCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(UserProvider);
