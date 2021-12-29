import React from "react";
import Drawer from "../components/Common/Drawer";
import Routes from "../routes/Routes";
import { Route, Switch } from "react-router-dom";
const DrivingSchool = () => {
  const getRoutes = (Routes) => {
    return Routes.map((props, key) => {
      return (
        <Route
          exact
          path={props.layout + props.path}
          component={props.component}
          key={key}
        />
      );
    });
  };
  return (
    <>
      <Drawer routes={Routes.DrivingSchoolRoutes}>
        <div>
          <Switch>{getRoutes(Routes.DrivingSchoolRoutes)}</Switch>
        </div>
      </Drawer>
    </>
  );
};

export default DrivingSchool;
