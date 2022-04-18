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
                <Redirect from="/" to="/dsInstructor/myProfile" />
              ) : props.role === "Student" ? (
                <Redirect from="/" to="/student/myProfile" />
              ) : props.role === "CarRentalAgent" ? (
                <Redirect from="/" to="/CarRental/myProfile" />
              ) : props.role === "DrivingSchool" ? (
                <Redirect from="/" to="/DrivingSchool/myProfile" />
              ) : props.role === "Instructor" ? (
                <Redirect from="/" to="/instructor/myProfile" />
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
              <Redirect from="/" to="/" />
            </>
          )}
        </Switch>
      )}
    </Switch>
  );
};

export default Index;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJIYW16YSIsImVtYWlsIjoiaGFtemFAZ21haWwuY29tIiwidXNlckRhdGEiOiJleUpwWkNJNklqWXhaREk1TkdJek5XSTFOemxpTWpRd05HUmtNbVE1TlNJc0ltUjFjR3hwWTJGMFpWOXBaQ0k2SWpZeFpESTVOR0l6TldJMU56bGlNalF3TkdSa01tUTVOU0lzSW1acGNuTjBUbUZ0WlNJNklraGhiWHBoSWl3aWMzVnlUbUZ0WlNJNklrRnNhU0lzSW1SUFFpSTZJakU1T1RrdE1URXRNamxVTVRrNk1EQTZNREF1TURBd1dpSXNJbkJzWVdObFQyWkNhWEowYUNJNklreGhhRzl5WlNJc0ltZGxibVJsY2lJNmJuVnNiQ3dpWm5KdmJuUkpSRkJvYjNSdklqcHVkV3hzTENKaVlXTnJTVVJRYUc5MGJ5STZiblZzYkN3aVlXUmtjbVZ6Y3lJNklsSnZkWFJsSUVSbElFeGhhRzkxY21OaFpHVWdJaXdpWTI5dGNHeGxiV1Z1ZENJNklsSnZkWFJsSUVSbElpd2lla2xRSWpvaU5EQXpNREFpTENKamFYUjVJam9pVDNKMGFHVjJhV1ZzYkdVaUxDSndhRzkwYnlJNmJuVnNiQ3dpY0dGemMzZHZjbVFpT2lKTlZFbDZUa1JWTWs1Nlp6MGlMQ0p1UlZCSUlqb2lNVEl4SWl3aWJtOVBaa2h5YzFkaGJuUmxaQ0k2SWpJaUxDSmxiV0ZwYkNJNkltaGhiWHBoUUdkdFlXbHNMbU52YlNJc0luQm9iMjVsSWpvaU1USXpORFUyTnpnNU5TSXNJbk5sWTI5dVpFVnRZV2xzSWpvaWFHRnRlbUV5UUdkdFlXbHNMbU52YlNJc0luTmxZMjl1WkZCb2IyNWxJam9pTVRJek5EVTJOemc1T0NJc0ltaHBaMmhYWVhsRGIyUmxSR0YwWlNJNmJuVnNiQ3dpYUdsbmFGZGhlVU52WkdWSmJXRm5aU0k2Ym5Wc2JDd2liR0YwSWpvaU5ETXVOVFUyTURJMklpd2liRzl1WnlJNklpMHhMakUxTVRJd01TSXNJbkp2YkdVaU9pSlRkSFZrWlc1MElpd2laSEpwZG1sdVoxTmphRzl2YkVsRUlqcHVkV3hzTENKeVpXZHBjM1J5WVhScGIyNUVZWFJsSWpwdWRXeHNMQ0prYjJOMWJXVnVkRlJsYzNSbFpDSTZJbFJsYzNSbFpDSXNJbU52Ym5SaFkzUkZiV0ZwYkNJNkltaGhiWHBoUUdkdFlXbHNMbU52YlNJc0ltTlFSa0ZqWTJWd2RDSTZJbVpoYkhObElpd2lkMjl5YTFkcGRHaFBkR2hsY2lJNmJuVnNiQ3dpWjJsMlpVOTFjbEJzWVhSbWIzSnRWR2x0WlNJNmJuVnNiQ3dpZDJocFkyaFFiR0YwWm05eWJTSTZiblZzYkN3aWJHRnpkRUZqZEdsMlpWUnBiV1VpT2lJeU1ESXlMVEEwTFRBM1ZEQTJPalUxT2pJekxqWXdOamM0TVRNck1ESTZNREFpTENKemNHOXJaVzVNWVc1bmRXRm5aU0k2V3lKRmJtZHNhWE5vSWwwc0luQnliMlpwYkdWSmJtWnZJanB1ZFd4c0xDSmhZbk5sYm5SVGRHRnlkRVJoZEdVaU9tNTFiR3dzSW1GaWMyVnVkRVZ1WkVSaGRHVWlPbTUxYkd3c0ltVnRZV2xzVTJWdWRDSTZiblZzYkN3aWFYTlBibXhwYm1VaU9tWmhiSE5sTENKc1lYTjBVMlZsYmlJNklqSXdNakl0TURRdE1EWlVNRFU2TkRNNk5UWXVNRE15V2lJc0luQmhhV1FpT201MWJHd3NJbTF6WjAxaGFXeERiM1Z1ZENJNmJuVnNiQ3dpYVc1emRISjFZM1J2Y2sxbFpYUjFjRkJ2YVc1MFNXNW1iM01pT201MWJHeDkiLCJyb2xlIjoiU3R1ZGVudCIsImF1ZCI6WyIqIiwiaHR0cDovL2xvY2FsaG9zdDo2MzUzOS8iXSwic2VjcmV0S2V5IjoidGhpc2lzc2VjcmV0a2V5IiwianRpIjoiYzA4NDNjMDUtYWU0Ni00ODAzLWI4YzgtMDAyODNhMGM0MGVjIiwiZXhwIjoxNjQ5MzE4MTIzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYzNTM5LyJ9._txcklq0HWDCzVr4qNrZi9gXiNkgxCwFvAlIcQGqsd4