import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import TextField from "../Common/TextField";
// import Button from "../Common/Button";
import Divider from "../Common/Divider";
import FacebookIcon from "../../assets/images/facebookIcon.svg";
import TwitterIcon from "../../assets/images/twitterIcon.svg";
import InstagramIcon from "../../assets/images/instagramIcon.svg";
import LinkedinIcon from "../../assets/images/linkedinIcon.svg";
import YoutubeIcon from "../../assets/images/youtubeIcon.svg";
import { useTranslation } from "react-i18next";
import API from "../../api/index";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();
  const { i18n, t } = useTranslation();
  const [footer, setFooter] = useState({});
  const [lng, setLng] = useState();
  useEffect(() => {
    setLng(localStorage.getItem("i18nextLng"));
    getFooterData();
  }, [localStorage.getItem("i18nextLng")]);
  const getFooterData = async () => {
    await API("get", "CMS/GetPageData?page=home")
      .then((getFooterDataResponse) => {
        const footerData = getFooterDataResponse.data.data.find(
          (item) => item.sectionName === "Footer"
        );
        setFooter(footerData);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="main_footer_container">
      <div className="second_footer_container">
        <div className="footer_icons_container">
          <img src={FacebookIcon} alt="services" className="footer_icon" />
          <img src={InstagramIcon} alt="services" className="footer_icon" />
        </div>

        <Typography align="center" className="footer_title">
          {lng === "en"
            ? footer.headingEnglish
            : lng === "fr"
            ? footer.headingFrench
            : ""}
        </Typography>
        <div className="footer_policy_container">
          <p
            className="footer_policy"
            onClick={() => history.push("/home/terms&condition")}
          >
            {t("Terms and Conditions")}
          </p>
          <Divider
            orientation="vertical"
            light={true}
            flexItem
            variant="middle"
            sx={{
              margin: "10px",
            }}
            className={"divider"}
          />
          <Typography align="center" className="footer_policy footer_address">
            {lng === "en"
              ? footer.textEnglish
              : lng === "fr"
              ? footer.textFrench
              : ""}
          </Typography>
          <Divider
            orientation="vertical"
            light={true}
            flexItem
            variant="middle"
            className={"divider"}
          />
          <p
            className="footer_policy"
            onClick={() => history.push("/home/privacy&policy")}
          >
            {t("Privacy Policy")}
          </p>
        </div>
        <Typography align="center" className="footer_copyright">
          Copyright @ 2022 Permispop
        </Typography>
      </div>
    </div>
  );
};
export default Footer;
