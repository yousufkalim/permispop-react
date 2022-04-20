import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import { useTranslation } from "react-i18next";
import API from "../../api/index";

const ContactUs = () => {
  const { i18n, t } = useTranslation();
  const [contactUs, setContactUs] = useState({});
  const [lng, setLng] = useState();
  useEffect(() => {
    getContactusData();
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);
  const getContactusData = async () => {
    await API("get", "CMS/GetPageData?page=home")
      .then((getContactusDataResponse) => {
        const contactUsData = getContactusDataResponse.data.data.find(
          (item) => item.sectionName === "Contact Us"
        );
        setContactUs(contactUsData);
      })
      .catch((error) => console.log("error------->", error));
  };

  const handleChange = (e) => {
    console.log("hello", e.target.value);
  };

  return (
    <div className="main_contact_container" id="contactUs">
      <div className="second_contact_container">
        <div className="contact_title_div">
          <Typography variant="h2" align="center" className="contact_title">
            {lng === "en"
              ? contactUs?.headingEnglish
              : lng === "fr"
              ? contactUs?.headingFrench
              : ""}
          </Typography>
        </div>
        <div className="contact_subtitle_div">
          <Typography variant="h2" align="center" className="contact_subtitle">
            {lng === "en"
              ? contactUs?.textEnglish
              : lng === "fr"
              ? contactUs?.textFrench
              : ""}
          </Typography>
        </div>
        <Box
          component="form"
          noValidate
          // onSubmit={handleSubmit}
          sx={{ mt: 3, marginLeft: "10%", marginRight: "10%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label={t("Full Name")}
                placeholder="Permispop"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label={t("Email")}
                placeholder="hello@permispop.com"
                inputLabelStyle="input_label"
                inputLabelProps={{ required: false }}
                handleChange={(e) => handleChange(e)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label={t("Phone")}
                placeholder="+33 123 4567890"
                inputLabelStyle="input_label"
                inputLabelProps={{ required: false }}
                handleChange={(e) => handleChange(e)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label={t("Address")}
                placeholder="France"
                inputLabelStyle="input_label"
                inputLabelProps={{ required: false }}
                handleChange={(e) => handleChange(e)}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("Message")}
                placeholder={t("Write your message here")}
                inputLabelStyle="input_label"
                handleChange={(e) => handleChange(e)}
              ></TextField>
            </Grid>
            <Grid
              xs={12}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                type="submit"
                text={t("Send")}
                buttonLableStyle={"btn_main"}
                style={{ marginTop: "24px" }}
                width="16%"
                customWidth1="100%"
                height="48px"
                height2="48px"
              ></Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default ContactUs;
