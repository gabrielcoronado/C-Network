import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MovieProvider } from "./components/providers/MovieProvider";
import UserProvider from "./components/providers/UserProvider";

ReactDOM.render(
  <MovieProvider>
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </MovieProvider>,
  document.getElementById("root")
);
