import React, { useState, useEffect } from "react";
import Header from "../../components/Common/Header";
import Footer from "../../components/Landing/Footer";
import API from "../../api/index";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const PrivacyPolicy = () => {
  const { i18n, t } = useTranslation();
  const [privacyPolicy, setPrivacyPolicy] = useState({});
  const [lng, setLng] = useState();
  useEffect(() => {
    getPrivacyPolicy();
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  const getPrivacyPolicy = async () => {
    await API("get", "CMS/GetPageData?page=privacy")
      .then((getPrivacyPolicyResponse) => {
        const PrivacyPolicyData = getPrivacyPolicyResponse.data.data.find(
          (item) => item.sectionName === "Privacy Policy"
        );
        setPrivacyPolicy(PrivacyPolicyData);
      })
      .catch((error) => console.log("error------->", error));
  };
  return (
    <React.Fragment>
      <Header />
      <div className="terms_title_div">
        <Typography className="terms_title">
          {lng === "en"
            ? privacyPolicy?.headingEnglish
            : lng === "fr"
            ? privacyPolicy?.headingFrench
            : ""}
        </Typography>
      </div>
      <div>
        <Typography className="terms_text">
          {lng === "en"
            ? privacyPolicy?.textEnglish
            : lng === "fr"
            ? privacyPolicy?.textFrench
            : ""}
        </Typography>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default PrivacyPolicy;
