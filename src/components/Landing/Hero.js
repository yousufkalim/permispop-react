import React, { useEffect, useState } from "react";
import Button from "../Common/Button";
import Header from "../Common/Header";
import Typography from "@mui/material/Typography";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import RegisterModal from "./RegisterModal";
import { useTranslation } from "react-i18next";
import API from "../../api/index";

const Hero = () => {
  const { i18n, t } = useTranslation();
  const [Registeropen, setRegisteropen] = useState(false);
  const [header, setHeader] = useState({});
  const [lng, setLng] = useState();
  useEffect(() => {
    getHeaderData();
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  const getHeaderData = async () => {
    await API("get", "CMS/GetPageData?page=home")
      .then((getHeaderDataResponse) => {
        const headerData = getHeaderDataResponse.data.data.find(
          (item) => item.sectionName === "Header"
        );
        setHeader(headerData);
      })
      .catch((error) => console.log("error------->", error));
  };
  const handleRegisterOpen = () => setRegisteropen(true);
  const handleRegisterClose = () => setRegisteropen(false);
  // console.log("qwqwqwqwweercdsfss", header);
  return (
    <div className="main_hero_container">
      <div className="second_hero_container">
        <Header />
        <div className="hero_title_div">
          <Typography variant="h2" align="center" className="hero_title">
            {lng === "en"
              ? header.headingEnglish
              : lng === "fr"
              ? header.headingFrench
              : ""}
          </Typography>
        </div>
        <div className="hero_subtitle_div">
          <Typography variant="h2" align="center" className="hero_subtitle">
            {lng === "en"
              ? header.textEnglish
              : lng === "fr"
              ? header.textFrench
              : ""}
          </Typography>
        </div>
        <div className="hero_subtitle_btn_div">
          <Button
            style={{
              marginRight: "1%",
            }}
            type="submit"
            text={t("Join Now")}
            customWidth1="36%"
            customWidth2="60%"
            buttonLableStyle="btn_main"
            onClick={handleRegisterOpen}
          ></Button>

          <Button
            startIcon={
              <PlayCircleFilledWhiteOutlinedIcon sx={{ color: "#43DAB1" }} />
            }
            type="submit"
            color="white !important"
            textColor="#252831"
            text={t("Play Video")}
            customWidth1="36%"
            customWidth2="60%"
            buttonLableStyle="btn_main"
          ></Button>
        </div>
      </div>
      <RegisterModal
        open={Registeropen}
        closebtn={true}
        onClose={handleRegisterClose}
        modalTitle={t("Register As")}
        modalboxclassName="Register_modal"
        modalTitleclassName="Register_title"
      ></RegisterModal>
    </div>
  );
};
export default Hero;
