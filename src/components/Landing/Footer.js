import React from "react";
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

const Footer = () => {
  const { i18n , t } = useTranslation();
  return (
    <div className="main_footer_container">
      <div className="second_footer_container">
        <div className="footer_icons_container">
          <img src={FacebookIcon} alt="services" className="footer_icon" />
          <img src={TwitterIcon} alt="services" className="footer_icon" />
          <img src={InstagramIcon} alt="services" className="footer_icon" />
          <img src={LinkedinIcon} alt="services" className="footer_icon" />
          <img src={YoutubeIcon} alt="services" className="footer_icon" />
        </div>
        <Typography align="center" className="footer_title">
          {t("PERMISPOP EDUCATION")}
        </Typography>
        <div className="footer_policy_container">
          <Typography align="center" className="footer_policy">
            {t("Terms and Conditions")}
          </Typography>
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
            500 N.Michigan Ave,Ste 600 Chicago, IL 60611
          </Typography>
          <Divider
            orientation="vertical"
            light={true}
            flexItem
            variant="middle"
            className={"divider"}
          />
          <Typography align="center" className="footer_policy">
            {t("Privacy Policy")}
          </Typography>
        </div>
        <Typography align="center" className="footer_copyright">
          Copyright @ 2021 Permispop Drive Education
        </Typography>
      </div>
    </div>
  );
};
export default Footer;
