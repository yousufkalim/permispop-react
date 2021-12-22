// Init
import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import Home from "../containers/LandingPage/index";
import Dashboard from "../containers/Dashboard/index";
import Register from "../containers/RegisterPage/index";

const index = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};

export default index;
