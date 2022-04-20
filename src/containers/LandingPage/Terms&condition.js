import React, { useState, useEffect } from "react";
import Header from "../../components/Common/Header";
import Footer from "../../components/Landing/Footer";
import { Typography } from "@mui/material";
import API from "../../api/index";
import { useTranslation } from "react-i18next";

const Termscondition = () => {
  const { i18n, t } = useTranslation();
  const [termcondition, setTermcondition] = useState({});
  const [lng, setLng] = useState();
  useEffect(() => {
    getTermscondition();
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  const getTermscondition = async () => {
    await API("get", "CMS/GetPageData?page=terms")
      .then((getTermsconditionResponse) => {
        const TermconditionData = getTermsconditionResponse.data.data.find(
          (item) => item.sectionName === "Terms and conditions"
        );
        setTermcondition(TermconditionData);
      })
      .catch((error) => console.log("error------->", error));
  };
  return (
    <React.Fragment>
      <Header />
      <div className="terms_title_div">
        <Typography className="terms_title">
          {lng === "en"
            ? termcondition?.headingEnglish
            : lng === "fr"
            ? termcondition?.headingFrench
            : ""}
        </Typography>
      </div>
      <div>
        <Typography className="terms_text">
          {lng === "en"
            ? termcondition?.textEnglish
            : lng === "fr"
            ? termcondition?.textFrench
            : ""}
        </Typography>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Termscondition;
