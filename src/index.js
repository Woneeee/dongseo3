import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./css/common/Reset.css";
import "./css/common/Color.css";
import "./css/common/Style.scss";
import "./css/library/DatePicker.scss";

import "./css/layout/Header.scss";
import "./css/layout/Banner.scss";

import "./css/page/Login.scss";
import "./css/page/main/Style.scss";
import "./css/page/main/Company.scss";

import "./css/page/report/Style.scss";

import "./css/page/management/Style.scss";
import "./css/page/management/Process.scss";
import "./css/page/management/Company.scss";
import "./css/page/management/Account.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter basename={process.env.PUBLIC_URL} future={{ v7_relativeSplatPath: true }}>
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
);
