import React, { ConcurrentMode } from "react";
import { render } from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "./index.css";

import store from "./store/store";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
render(
  <ConcurrentMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ConcurrentMode>,
  container
);
