import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./App.css"
import { SocketContext, socket } from "./context/socket";

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <Router>
        <App />
      </Router>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
