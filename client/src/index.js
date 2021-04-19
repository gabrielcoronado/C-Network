import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { createStore } from "redux"
// import { Provider } from "react-redux";
import { MovieProvider } from "./components/providers/MovieProvider";
import UserProvider from "./components/providers/UserProvider";
// import AppProvider from "./components/providers/AppProvider";
// const store = createStore(
//   movieReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

ReactDOM.render(
  // <AppProvider>
  <MovieProvider>
    <UserProvider>
      {/* <Provider store={store}> */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
      {/* </Provider> */}
    </UserProvider>
  </MovieProvider>,
  // </AppProvider>,
  document.getElementById("root")
);
