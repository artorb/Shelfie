import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import "./index.css";
import { store, StoreContext } from "./app/stores/store";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./browserHistory";

ReactDOM.render(
  <HistoryRouter history={history}>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </HistoryRouter>,
  document.getElementById("root")
);
