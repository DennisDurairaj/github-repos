import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store";
import "typeface-roboto";
import { CssBaseline, Container } from "@material-ui/core";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <Container>
      <App />
    </Container>
  </Provider>,
  document.getElementById("root")
);
