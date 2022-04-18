import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "../Common/Divider";
import Card from "../Common/Card";
import Button from "../Common/Button";
import service1 from "../../assets/images/services1.svg";
import service2 from "../../assets/images/services2.svg";
import service3 from "../../assets/images/services3.svg";
import dot from "../../assets/images/servicesDot.svg";
import CardImage1 from "../../assets/images/cardImg1.svg";
import CardImage2 from "../../assets/images/cardImg2.svg";
import { ReactComponent as NextIcon } from "../../assets/images/nextIcon.svg";
import { useTranslation } from "react-i18next";
const Services = () => {
  const { i18n , t } = useTranslation();
  return (
    <div className="main_services_container" id="services">
      <div className="second_services_container">
        <div className="services_title_div">
          <Typography variant="h2" align="center" className="services_title">
            {t("Our Services")}
          </Typography>
        </div>
        <div className="services_subtitle_div">
          <Typography variant="h2" align="center" className="services_subtitle">
            {t("Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at.")}
          </Typography>
        </div>
        {/*Service Card*/}
        <div className="card_main">
          <div className="card_container_outer">
            <img src={service1} alt="services" className="service_img" />
            <div className="card_container_inner">
              <img src={dot} alt="services" className="dot_img" />
              <Typography variant="h2" className="card_title">
                {t("User Behaviour")}
              </Typography>
            </div>
            <Typography variant="h2" className="card_subtitle">
              {t("Vestibulum eget augue consectetur, mattis turpis et, luctus eros.Aenean luctus varius lacus in imperdiet. Curabitur mi ligula,consequat")}
            </Typography>
          </div>
          <div className="card_container_outer">
            <img src={service2} alt="services" className="service_img" />
            <div className="card_container_inner">
              <img src={dot} alt="services" className="dot_img" />
              <Typography variant="h2" className="card_title">
                {t("Best Time Training")}
              </Typography>
            </div>
            <Typography variant="h2" className="card_subtitle">
              {t("Vestibulum eget augue consectetur, mattis turpis et, luctus eros.Aenean luctus varius lacus in imperdiet. Curabitur mi ligula,consequat")}
            </Typography>
          </div>
          <div className="card_container_outer">
            <img src={service3} alt="services" className="service_img" />
            <div className="card_container_inner">
              <img src={dot} alt="services" className="dot_img" />
              <Typography variant="h2" className="card_title">
                {t("Individual Approach")}
              </Typography>
            </div>
            <Typography variant="h2" className="card_subtitle">
              {t("Vestibulum eget augue consectetur, mattis turpis et, luctus eros.Aenean luctus varius lacus in imperdiet. Curabitur mi ligula,consequat")}
            </Typography>
          </div>
        </div>
        <Divider sx={{ margin: "6% 0px 6% 0px" }} />
        {/*Code Card*/}
        <div className="code_card_container">
          <div className="code_card_main">
            <Card
              heading={t("Pop Code")}
              subHeading={t("Online Training That Will Revolution Your Code and License")}
              image={CardImage1}
            ></Card>
            <Card
              heading={t("Highway Code")}
              subHeading={t("The Full Road Code Only For €14.90")}
              image={CardImage2}
            ></Card>
          </div>
        </div>
        <div className="highway_code_btn">
          <Button
            endIcon={<NextIcon />}
            text={t("Access The Highway Code Here")}
            height="60px"
            height2="60px"
            height3="60px"
            height4="50px"
            customWidth1="100%"
            customWidth2="100%"
            buttonLableStyle="highway_btn_label"
            onClick={() => window.open("https://popcode.online/password")}
          ></Button>
        </div>
        <Divider sx={{ margin: "6% 0px 6% 0px" }} />
      </div>
    </div>
  );
};
export default Services;
