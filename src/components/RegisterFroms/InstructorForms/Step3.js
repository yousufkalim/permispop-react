import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Datepicker from "../../Common/DatePicker";
import API from "../../../api/index";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Step1 = (props) => {
  const { i18n, t } = useTranslation();
  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata)
      .then((res) => {
        if (e.target.name === "companyRC") {
          props.onChange("companyRC", res.data.message);
        }
      })
      .catch((error) => {
        console.log("UploadProfileImageResponce------>", error);
        toast.error(t("Image not Uploaded"));
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
      <Typography className="Heading1">{t("Insurance Company")}</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="1% 0px 1% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            required={true}
            label={t("Insurer")}
            name="companyInsurer"
            placeholder="John"
            value={props.step3.companyInsurer}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step3Errors["companyInsurer"] ? true : false}
            ErrorMsg={t(props.step3Errors["companyInsurer"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Police Number")}
            name="companyPoliceNum"
            required={true}
            placeholder="Smith"
            value={props.step3.companyPoliceNum}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step3Errors["companyPoliceNum"] ? true : false}
            ErrorMsg={t(props.step3Errors["companyPoliceNum"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label={t("Expiration date of your insurance")}
            required={true}
            name="insuranceExpDate"
            placeholder="19-10-1992 "
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step3.insuranceExpDate}
            minDate={new Date()}
            onChange={(e) => {
              props.onChange(
                "insuranceExpDate",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
            error={props.step3Errors["insuranceExpDate"] ? true : false}
            ErrorMsg={props.step3Errors["insuranceExpDate"]}
          ></Datepicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload your RC Pro")}
            name="companyRC"
            required={true}
            label="companyRC"
            value={props.step3.companyRC.split("_").slice(1).join("_")}
            onChange={handleFileChange}
            error={props.step3Errors["companyRC"] ? true : false}
            ErrorMsg={props.step3Errors["companyRC"]}
          />
        </Grid>
      </Grid>
      {/* <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 2% 0px" />
      <Typography className="Heading1">Vehicle Insurance</Typography> */}
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 3% 0px" />
      {/* <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Insurer"
            name="vehicleInsurer"
            placeholder="John"
            value={props.step3.vehicleInsurer}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step3Errors['vehicleInsurer']?true:false}
            ErrorMsg={props.step3Errors['vehicleInsurer'] && props.step3Errors['vehicleInsurer']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Police Number"
            name="vehiclePoliceNum"
            placeholder="Smith"
            value={props.step3.vehiclePoliceNum}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step3Errors['vehiclePoliceNum']?true:false}
            ErrorMsg={props.step3Errors['vehiclePoliceNum'] && props.step3Errors['vehiclePoliceNum']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label="Dates of Obtaining"
            name="vehicleDoOb"
            placeholder="102 Street, building 02, NY"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step3.vehicleDoOb}
            onChange={(e) => {
              props.onChange(
                "vehicleDoOb",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
            error={props.step3Errors['vehicleDoOb']?true:false}
            ErrorMsg={props.step3Errors['vehicleDoOb'] && props.step3Errors['vehicleDoOb']}
          ></Datepicker>
        </Grid>
      </Grid> */}
      {/* <Grid container spacing={4} mt={2} className="InsuranceSection">
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Expiration date of your insurance"
            placeholder="xx-xx-xxxx"
            padding="20px 0 0 0px !important"
            width="100% !important"
            name="ExpDateinsurance"
            value={props.step3.ExpDateinsurance}
            onChange={(e) => {
              props.onChange(
                "ExpDateinsurance",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
            error={props.step3Errors['ExpDateinsurance']?true:false}
            ErrorMsg={props.step3Errors['ExpDateinsurance'] && props.step3Errors['ExpDateinsurance']}
          ></Datepicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Vehicle Insurance RC Pro"
            name="RcPro"
            label="UploadRc"
            value={props.step3.RcPro}
            onChange={handleFileChange}
            error={props.step3Errors['RcPro']?true:false}
            ErrorMsg={props.step3Errors['RcPro'] && props.step3Errors['RcPro']}
          />
        </Grid>
      </Grid> */}
    </Box>
  );
};
export default Step1;
