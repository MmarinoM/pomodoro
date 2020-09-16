import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
// import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

const mountNode = document.querySelector("#app");
ReactDOM.render(<App name={"Michael"} />, mountNode);
