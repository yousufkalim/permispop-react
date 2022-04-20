import React, { useEffect, useState } from "react";
import RegisterHeader from "../../components/RegisterFroms/registerHeader";
import StudentForm from "../../components/RegisterFroms/StudentForm";
import Footer from "../../components/Landing/Footer";
import { useTranslation } from "react-i18next";
import API from "../../api/index";

const Student = () => {
  const [studentForm, setStudentForm] = useState({});
  const [lng, setLng] = useState();
  const { i18n, t } = useTranslation();
  useEffect(() => {
    getStudentForm();
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  const getStudentForm = async () => {
    await API("get", "CMS/GetPageData?page=register")
      .then((getStudentFormResponse) => {
        const studentFormData = getStudentFormResponse.data.data.find(
          (item) => item.sectionName === "Student"
        );
        setStudentForm(studentFormData);
      })
      .catch((error) => console.log("error------->", error));
  };
  return (
    <React.Fragment>
      <RegisterHeader
        title={
          lng === "en"
            ? studentForm?.headingEnglish
            : lng === "fr"
            ? studentForm?.headingFrench
            : ""
        }
        subtitle1={
          lng === "en"
            ? studentForm?.textEnglish
            : lng === "fr"
            ? studentForm?.textFrench
            : ""
        }
      />
      <StudentForm />
      <Footer />
    </React.Fragment>
  );
};

export default Student;
