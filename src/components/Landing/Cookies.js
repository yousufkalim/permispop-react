import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../Common/Button";
import API from "../../api/index";
import { useTranslation } from "react-i18next";

const Cookies = () => {
  const { i18n, t } = useTranslation();
  const [cookies, setCookies] = useState({});
  const [lng, setLng] = useState();
  useEffect(() => {
    getCookiesData();
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  const getCookiesData = async () => {
    await API("get", "CMS/GetPageData?page=home")
      .then((getCookiesDataResponse) => {
        const cookiesData = getCookiesDataResponse.data.data.find(
          (item) => item.sectionName === "Header"
        );
        setCookies(cookiesData);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        zindex: "2147483645",
        width: "100%",
        backgroundColor: "rgba(12, 90, 70, 0.75)",
      }}
    >
      <div
        style={{
          padding: "1rem 2.5rem 1rem 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography sx={{ fontSize: 16, fontWeight: 500, color: "white" }}>
            COOKIE CONSENT
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 300, color: "white" }}>
            By continuing to broswer or by clicking 'Accept'.
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 300, color: "white" }}>
            You agree to storing of cookies on your device to enhance your site
            experience and for anlytical purpose.
          </Typography>
        </div>
        <Button text="Accept all Cookies"></Button>
      </div>
    </div>
  );
};

export default Cookies;
