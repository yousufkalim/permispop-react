import React, { useState, useEffect } from "react";
import Drawer from "../components/Common/Drawer";
import Routes from "../routes/Routes";
import { Route, Switch } from "react-router-dom";
import NotVerified from "../components/Common/NotVerified";
import DeActive from "../components/Common/DeActive";
import API from "../api";

const Student = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userProfileStatus, setUserProfileStatus] = useState("");

  useEffect(() => {
    getProfileDate();
  }, []);

  const getProfileDate = async () => {
    const res = await API(
      "get",
      `Profile/GetProfileByPersonalId?id=${user.id}`
    );
    setUserProfileStatus(res.data.data.banStatus);
  };

  const getRoutes = (Routes) => {
    return Routes.map((props, key) => {
      if (user.documentTested === "Tested" || props.path === "/myProfille") {
        if (userProfileStatus !== "DeActive" || props.path === "/myProfille") {
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
              component={DeActive}
              key={key}
            />
          );
        }
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
