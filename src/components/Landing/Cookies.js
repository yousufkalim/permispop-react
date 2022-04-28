import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../Common/Button";
import API from "../../api/index";
import { useTranslation } from "react-i18next";


const Cookies = () => {
  const { i18n, t } = useTranslation();
  const [cookies, setCookies] = useState({});
  const [lng, setLng] = useState();
  const [cookieValue, setCookieValue] = useState(true);
  useEffect(() => {
    let temp = localStorage.getItem("Cookies Accepted");
    if (!temp) {
      localStorage.setItem("Cookies Accepted", true);
    }
  }, []);
  useEffect(() => {
    getCookiesData();
    setCookieValue(localStorage.getItem("Cookies Accepted"));
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  const getCookiesData = async () => {
    await API("get", "CMS/GetPageData?page=home")
      .then((getCookiesDataResponse) => {
        const cookiesData = getCookiesDataResponse.data.data.find(
          (item) => item.sectionName === "Cookies"
        );
        setCookies(cookiesData);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {cookieValue === "true" ? (
        <div className="cookies_main_div">
          <div className="cookies_div2">
            <div style={{ width: "50%" }}>
              <Typography className="cookies_heading_text">
                {lng === "en"
                  ? cookies.headingEnglish
                  : lng === "fr"
                  ? cookies.headingFrench
                  : ""}
              </Typography>
              <Typography className="cookies_body_text">
                {lng === "en"
                  ? cookies.textEnglish
                  : lng === "fr"
                  ? cookies.textFrench
                  : ""}
              </Typography>
            </div>
            <Button
              text="Accept all Cookies"
              onClick={() => {
                localStorage.setItem("Cookies Accepted", false);
                setCookieValue(false);
              }}
            ></Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Cookies;
