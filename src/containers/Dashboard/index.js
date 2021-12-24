import React from "react";
import Drawer from "../../components/Common/Drawer";
import StudentProfile from "./Student/Profile";

const index = () => {
  return (
    <React.Fragment>
      <Drawer>
        <StudentProfile></StudentProfile>
      </Drawer>
    </React.Fragment>
  );
};

export default index;
