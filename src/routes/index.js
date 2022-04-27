// Init
import React, { useState, useEffect } from "react";
// web view map for native
import NativeMap from "../containers/Dashboard/Student/MapNative/MapNative";
// Routes
import { Route, Switch, Redirect } from "react-router-dom";
import InstructorLayout from "../Layout/instructor";
import StudentLayout from "../Layout/Student";
import DsInstructorLayout from "../Layout/DsInstructor";
import DrivingSchoolLayout from "../Layout/DrivingSchool";
import CarRentalLayout from "../Layout/CarRental";
import Home from "../containers/LandingPage/index";
//registration form routes
import StudentRegister from "../containers/RegisterPage/Student";
import RentalCarRegister from "../containers/RegisterPage/RentalCar";
import InstructorRegister from "../containers/RegisterPage/Instructor";
import DrivingSchoolRegister from "../containers/RegisterPage/DrivingSchool";
// Privacy&Policy
import PrivacyPolicy from "../containers/LandingPage/Privacy&Policy";
// Terms&Condition
import TermsCondition from "../containers/LandingPage/Terms&condition";
import jwt_decode from "jwt-decode";
import { Base64 } from "js-base64";
const queryParams = new URLSearchParams(window.location.search);
const FromNative = queryParams.get("FromNative");
const NativeRedirect = queryParams.get("NativeRedirect");
const token = queryParams.get("token");

const Index = (props) => {
  const [inNative, setInNative] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(true);
    if (FromNative) {
      if (token) {
        let decoded = jwt_decode(token);
        let USER_DATA = JSON.parse(Base64.decode(decoded.userData));
        localStorage.setItem("user", JSON.stringify(USER_DATA));
        localStorage.setItem("token", token);
        window.location = "/NativeMap?NativeRedirect=true";
      } else {
        setInNative(false);
      }
    } else if (NativeRedirect) {
      setInNative(true);
    } else {
      setInNative(false);
    }
  }, []);
  return (
    <Switch>
      {update && (
        <Switch>
          {inNative === true ? (
            <>
              <Route exact path="/NativeMap" component={NativeMap} />
            </>
          ) : props.role ? (
            <>
              <Route
                path="/instructor"
                render={(props) => <InstructorLayout {...props} />}
              />
              <Route
                path="/student"
                render={(props) => <StudentLayout {...props} />}
              />
              <Route
                path="/dsInstructor"
                render={(props) => <DsInstructorLayout {...props} />}
              />
              <Route
                path="/drivingSchool"
                render={(props) => <DrivingSchoolLayout {...props} />}
              />
              <Route
                path="/carRental"
                render={(props) => <CarRentalLayout {...props} />}
              />

              {props.role === "DSInstructor" ? (
                <Redirect
                  from="/"
                  to={
                    window.location.pathname !== "/"
                      ? window.location.pathname
                      : "/dsInstructor/myProfile"
                  }
                />
              ) : props.role === "Student" ? (
                <Redirect
                  from="/"
                  to={
                    window.location.pathname !== "/"
                      ? window.location.pathname
                      : "/student/myProfile"
                  }
                />
              ) : props.role === "CarRentalAgent" ? (
                <Redirect
                  from="/"
                  to={
                    window.location.pathname !== "/"
                      ? window.location.pathname
                      : "/CarRental/myProfile"
                  }
                />
              ) : props.role === "DrivingSchool" ? (
                <Redirect
                  from="/"
                  to={
                    window.location.pathname !== "/"
                      ? window.location.pathname
                      : "/DrivingSchool/myProfile"
                  }
                />
              ) : props.role === "Instructor" ? (
                <Redirect
                  from="/"
                  to={
                    window.location.pathname !== "/"
                      ? window.location.pathname
                      : "/instructor/myProfile"
                  }
                />
              ) : (
                <Redirect from="/" to="/" />
              )}
            </>
          ) : (
            <>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/register/student"
                component={StudentRegister}
              />
              <Route
                exact
                path="/register/instructor"
                component={InstructorRegister}
              />
              <Route
                exact
                path="/register/drivingSchool"
                component={DrivingSchoolRegister}
              />
              <Route
                exact
                path="/register/carRental"
                component={RentalCarRegister}
              />
              <Route exact path="/register" component={StudentRegister} />
              <Route
                exact
                path="/home/terms&condition"
                component={TermsCondition}
              />
              <Route
                exact
                path="/home/privacy&policy"
                component={PrivacyPolicy}
              />
              <Redirect from="/" to="/" />
            </>
          )}
        </Switch>
      )}
    </Switch>
  );
};

export default Index;
