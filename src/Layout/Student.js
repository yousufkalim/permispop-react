import React from "react";
import Drawer from "../components/Common/Drawer";
import Routes from "../routes/Routes";
import { Route, Switch } from "react-router-dom";
import NotVerified from "../components/Common/NotVerified";

const Student = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const getRoutes = (Routes) => {
    return Routes.map((props, key) => {
      if (user.documentTested === "Tested" || props.path === "/myProfille") {
        return (
          <Route
            exact
            path={props.layout + props.path}
            component={props.component}
            key={key}
          />
        );
      } else {
        return (
          <Route
            exact
            path={props.layout + props.path}
            component={NotVerified}
            key={key}
          />
        );
      }
    });
  };

  return (
    <>
      <Drawer routes={Routes.StudentRoutes}>
        <div>
          <Switch>{getRoutes(Routes.StudentRoutes)}</Switch>
        </div>
      </Drawer>
    </>
  );
};

export default Student;
