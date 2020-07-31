import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import "./assets/scss/material-dashboard-pro-react.scss?v=1.9.0";
import AdminRoot from "./AdminRoot/AdminRoot";
import './blast/style.css';

import { compose,createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import reducer from "./store/Reducer/Reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(applyMiddleware(Thunk)));

const hist = createBrowserHistory();

const Admin = () => {
  return (
    <Provider store={store}>
      <Router history={hist}>
        <AdminRoot/>
      </Router>
    </Provider>
  )
}

export default Admin;