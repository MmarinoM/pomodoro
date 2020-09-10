import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./styles.scss";

const mountNode = document.querySelector("#app");
ReactDOM.render(<App name={"Michael"} />, mountNode);
