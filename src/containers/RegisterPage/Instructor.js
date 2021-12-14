import React from "react";
import RegisterHeader from "../../components/RegisterFroms/registerHeader";
import Footer from "../../components/Landing/Footer";

const Instructor = () => {
  return (
    <React.Fragment>
      <RegisterHeader
        title="Instructor Registration"
        subtitle1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius justo et scelerisque varius. Nullam mollis augue et facilisis blandit. Morbi sollicitudin a eros sed cursus."
        subtitle2="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at. Nam suscipit felis sit amet convallis."
      />
      <Footer />
    </React.Fragment>
  );
};

export default Instructor;
