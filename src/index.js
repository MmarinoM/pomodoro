import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./styles.scss";
import Pomodoro from "./components/pomodoro";

const mountNode = document.querySelector("#app");
ReactDOM.render(<App name={"Michael"} />, mountNode);
ReactDOM.render(<Pomodoro title={"Pomodoro"} />, mountNode);
