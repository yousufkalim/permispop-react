import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import API from "../../../api/index";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DatePicker from "../../Common/DatePicker";
import axios from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Step2 = ({ step2, setStep2, onChange, step2Errors }) => {
  const { i18n, t } = useTranslation();
  const [InsuranceDateExp, setInsuranceDateExp] = useState();

  const handleExpirationDate = (newvalue) => {
    setInsuranceDateExp(newvalue);
  };
  const handleFileChange = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "Kbls") {
        onChange("Kbls", res.data.message);
      } else if (e.target.name === "RcPro") {
        onChange("RcPro", res.data.message);
      }
    });
  };

  return (
    <Box
      component="form"
      noValidate
      // onSubmit={handleSubmit}
      sx={{
        mt: 3,
        marginTop: "70px",
      }}
    >
      <Grid container spacing={4}>
        <div className="DrivingSchool">
          <Grid item xs={12} sm={12} md={12}>
            <div className="DrivingSchool1">
              <TextField
                label={t("SIRET Number")}
                type="number"
                required={true}
                name="Siret"
                value={step2.Siret}
                placeholder={t("Must be 14 Digits")}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step2Errors["Siret"] ? true : false}
                ErrorMsg={t(step2Errors["Siret"])}
              ></TextField>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div className="DrivingSchool2">
              <FilePicker
                title={t("Upload your KBLS")}
                label="Kbls"
                required={true}
                name="Kbls"
                value={step2.Kbls.split("_").slice(1).join("_")}
                onChange={handleFileChange}
                error={step2Errors["Kbls"] ? true : false}
                ErrorMsg={step2Errors["Kbls"]}
              />
            </div>
          </Grid>
        </div>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">{t("Insurance Company")}</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Insurer")}
            type="text"
            required={true}
            placeholder="John"
            name="CompanyInsurer"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step2Errors["CompanyInsurer"] ? true : false}
            ErrorMsg={t(step2Errors["CompanyInsurer"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Police Number")}
            type="text"
            required={true}
            placeholder="Numeric"
            name="CompanyPoliceNumber"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step2Errors["CompanyPoliceNumber"] ? true : false}
            ErrorMsg={t(step2Errors["CompanyPoliceNumber"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label={t("Expiration date of your insurance")}
            // value={ExpirationDate}

            padding="20px 0 0 0px !important"
            width="100% !important"
            name="InsuranceDateExp"
            required={true}
            value={step2.InsuranceDateExp}
            minDate={new Date()}
            onChange={(e) => {
              onChange(
                "InsuranceDateExp",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
            error={step2Errors["InsuranceDateExp"] ? true : false}
            ErrorMsg={step2Errors["InsuranceDateExp"]}
          />

          {/* replaced  */}
          {/* <TextField
            label="Expiration date of your insurance"
            placeholder="John"
          ></TextField> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload your RC Pro")}
            name="RcPro"
            required={true}
            label="LicenseFront"
            value={step2.RcPro.split("_").slice(1).join("_")}
            onChange={handleFileChange}
            error={step2Errors["RcPro"] ? true : false}
            ErrorMsg={step2Errors["RcPro"]}
          />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
    </Box>
  );
};
export default Step2;
