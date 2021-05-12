import React, { useState} from "react";
import { Route, Switch } from "react-router-dom";
import "./components/chat/style.css";
import Home from "./components/chat/Home";
import Landing from "./components/Landing";

export default function App() {
  const [id, setId] = useState();
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Landing onClickId={setId} id={id} {...props} />}
      ></Route>
      <Route
        exact
        path="/home"
        render={(props) => <Home onClickId={setId} id={id} {...props} />}
      ></Route>
    </Switch>
  );
}
