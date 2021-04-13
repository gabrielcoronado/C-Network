import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { createStore } from "redux"
// import { Provider } from "react-redux";
import { MovieProvider } from "./components/providers/MovieProvider";

// const store = createStore(
//   movieReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

ReactDOM.render(
  <MovieProvider>
    {/* <Provider store={store}> */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
    {/* </Provider> */}
  </MovieProvider>,
  document.getElementById("root")
);
