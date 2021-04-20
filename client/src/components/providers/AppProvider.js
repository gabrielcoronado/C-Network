// import React, { createContext, useEffect, useState } from "react";
// import withFirebaseAuth from "react-with-firebase-auth";
// import firebase from "firebase/app";
// import "firebase/auth";
// export const AppContext = createContext(null);

// var firebaseConfig = {
//   apiKey: "AIzaSyAopvg1mEkhrSBFul49i8xiEyVgDpMuE60",
//   authDomain: "c-network-e52f3.firebaseapp.com",
//   projectId: "c-network-e52f3",
//   storageBucket: "c-network-e52f3.appspot.com",
//   messagingSenderId: "491793447664",
//   appId: "1:491793447664:web:2b1c12ccecfeb647c6e035"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseAppAuth = firebaseApp.auth();
// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider()
// };

// const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [appUser, setAppUser] = useState({});
//   const [message, setMessage] = useState("");

//   const handleSignOut = () => {
//     signOut();
//     setAppUser({});
//   };

//   useEffect(() => {
//     if (user) {
//       fetch(`http://localhost:4000/login`, {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           displayName: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL
//         })
//       })
//         .then(res => {
//           console.log("RES", res);
//           return res.json();
//         })
//         .then(json => {
//           setAppUser(json.data);
//           setCurrentUser(json.data);
//           console.log("JSON", json);
//           setMessage(json.message);
//         });
//     }
//   }, [user]);

//   return (
//     <AppContext.Provider
//       value={{ signInWithGoogle, appUser, handleSignOut, message, currentUser }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth
// })(AppProvider);
