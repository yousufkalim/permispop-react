import React, { useEffect, useState } from "react";
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
import API from "../../api/index";

const Services = () => {
  const { i18n, t } = useTranslation();
  const [card1, setCard1] = useState({});
  const [card2, setCard2] = useState({});
  const [card3, setCard3] = useState({});
  const [lng, setLng] = useState("");
  useEffect(() => {
    setLng(localStorage.getItem("i18nextLng"));
    getCardsData();
  }, [localStorage.getItem("i18nextLng")]);

  const getCardsData = async () => {
    await API("get", "CMS/GetPageData?page=home")
      .then((getCardsDataResponse) => {
        const cardsData = getCardsDataResponse.data.data.filter(
          (item) => item.sectionName === "Our Services"
        );
        setCard1(cardsData.find((item) => item.cardName === "Card 1"));
        setCard2(cardsData.find((item) => item.cardName === "Card 2"));
        setCard3(cardsData.find((item) => item.cardName === "Card 3"));
      })
      .catch((error) => console.log("error------->", error));
  };
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
            {t(
              "Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at."
            )}
          </Typography>
        </div>
        {/*Service Card*/}
        <div className="card_main">
          <div className="card_container_outer">
            <img src={service1} alt="services" className="service_img" />
            <div className="card_container_inner">
              <img src={dot} alt="services" className="dot_img" />
              <Typography variant="h2" className="card_title">
                {console.log("HAZAZAAZAAZAZAZ", card1)}
                {lng === "en"
                  ? card1?.headingEnglish
                  : lng === "fr"
                  ? card1?.headingFrench
                  : ""}
              </Typography>
            </div>
            <Typography variant="h2" className="card_subtitle">
              {lng === "en"
                ? card1?.textEnglish
                : lng === "fr"
                ? card1?.textFrench
                : ""}
            </Typography>
          </div>
          <div className="card_container_outer">
            <img src={service2} alt="services" className="service_img" />
            <div className="card_container_inner">
              <img src={dot} alt="services" className="dot_img" />
              <Typography variant="h2" className="card_title">
                {lng === "en"
                  ? card2?.headingEnglish
                  : lng === "fr"
                  ? card2?.headingFrench
                  : ""}
              </Typography>
            </div>
            <Typography variant="h2" className="card_subtitle">
              {lng === "en"
                ? card2?.textEnglish
                : lng === "fr"
                ? card2?.textFrench
                : ""}
            </Typography>
          </div>
          <div className="card_container_outer">
            <img src={service3} alt="services" className="service_img" />
            <div className="card_container_inner">
              <img src={dot} alt="services" className="dot_img" />
              <Typography variant="h2" className="card_title">
                {lng === "en"
                  ? card3?.headingEnglish
                  : lng === "fr"
                  ? card3?.headingFrench
                  : ""}
              </Typography>
            </div>
            <Typography variant="h2" className="card_subtitle">
              {lng === "en"
                ? card3?.textEnglish
                : lng === "fr"
                ? card3?.textFrench
                : ""}
            </Typography>
          </div>
        </div>
        <Divider sx={{ margin: "6% 0px 6% 0px" }} />
        {/*Code Card*/}
        <div className="code_card_container">
          <div className="code_card_main">
            <Card
              heading={t("Pop Code")}
              subHeading={t(
                "Online Training That Will Revolution Your Code and permis"
              )}
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
