import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import config from 'aws-exports';
import Amplify from 'aws-amplify';

import "./Client/assets/scss/material-kit-pro-react.scss";

import Root from "./Root/ClientRoot";

var hist = createBrowserHistory();


Amplify.configure(config);

ReactDOM.render(
  <Root/>,
  document.getElementById("root")
);
