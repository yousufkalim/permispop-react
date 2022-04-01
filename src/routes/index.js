// Init
import React from "react";

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

const index = (props) => {
  return (
    <Switch>
      <Switch>
        {props.role ? (
          <>
            {console.log("a")}
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
              <Redirect from="/" to="/dsInstructor/myprofile" />
            ) : props.role === "Student" ? (
              <Redirect from="/" to="/student/myProfille" />
            ) : props.role === "CarRentalAgent" ? (
              <Redirect from="/" to="/CarRental/myprofile" />
            ) : props.role === "DrivingSchool" ? (
              <Redirect from="/" to="/DrivingSchool/myprofile" />
            ) : props.role === "Instructor" ? (
              <Redirect from="/" to="/instructor/myprofile" />
            ) : (
              <Redirect from="/" to="/" />
            )}
          </>
        ) : (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/register/student" component={StudentRegister} />
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

        {/* default route */}
      </Switch>
    </Switch>
  );
};

export default index;
