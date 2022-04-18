import React from "react";
import RegisterHeader from "../../components/RegisterFroms/registerHeader";
import StudentForm from "../../components/RegisterFroms/StudentForm";
import Footer from "../../components/Landing/Footer";
import { useTranslation } from "react-i18next";

const Student = () => {
  const { i18n , t } = useTranslation();
  return (
    <React.Fragment>
      <RegisterHeader
        title={t("Student Registration")}
        subtitle1={t("Are you there to register on PermisPop as a student? No problem! The registration is done in one step!")}
        subtitle2={t("You asked OKLM with your friends and one of them just told you about permispop? Have you seen our ad or heard of us but are you in class or outisde Don’t leave!")}
      />
      <StudentForm />
      <Footer />
    </React.Fragment>
  );
};

export default Student;
