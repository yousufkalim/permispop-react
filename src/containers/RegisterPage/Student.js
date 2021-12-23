import React from "react";
import RegisterHeader from "../../components/RegisterFroms/registerHeader";
import StudentForm from "../../components/RegisterFroms/StudentForm";
import Footer from "../../components/Landing/Footer";

const Student = () => {
  return (
    <React.Fragment>
      <RegisterHeader
        title="Student Registration"
        subtitle1="Are you there to register on PermisPop as a student? No problem!
                  The registration is done in one step!"
        subtitle2="You asked OKLM with your friends and one of them just told you
                  about permispop? Have you seen our ad or heard of us but are you
                  in class or outisde Don’t leave!"
      />
      <StudentForm />
      <Footer />
    </React.Fragment>
  );
};

export default Student;
