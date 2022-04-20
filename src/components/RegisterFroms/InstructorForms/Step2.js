import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Datepicker from "../../Common/DatePicker";
import API from "../../../api/index";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
const Step2 = (props) => {
  const { i18n, t } = useTranslation();
  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "Authorizationfront") {
        props.onChange("Authorizationfront", res.data.message);
      } else if (e.target.name === "Authorizationback") {
        props.onChange("Authorizationback", res.data.message);
      } else if (e.target.name === "licensefront") {
        props.onChange("licensefront", res.data.message);
      } else if (e.target.name === "licenseback") {
        props.onChange("licenseback", res.data.message);
      } else if (e.target.name === "kbls") {
        props.onChange("kbls", res.data.message);
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
      <Typography className="Heading1">{t("Driver License")}</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="1% 0px 1% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Driving License Number")}
            required={true}
            name="licenceNo"
            type="text"
            placeholder="000000000"
            value={props.step2.licenceNo}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step2Errors["licenceNo"] ? true : false}
            ErrorMsg={t(props.step2Errors["licenceNo"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label={t("Date of Obtaining")}
            required={true}
            name="obtainingdate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step2.obtainingdate}
            maxDate={moment()}
            onChange={(e) => {
              props.onChange(
                "obtainingdate",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
            error={props.step2Errors["obtainingdate"] ? true : false}
            ErrorMsg={props.step2Errors["obtainingdate"]}
          ></Datepicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label={t("Validity Date")}
            required={true}
            name="validitiyDate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step2.validitiyDate}
            minDate={moment()}
            onChange={(e) => {
              props.onChange(
                "validitiyDate",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
            error={props.step2Errors["validitiyDate"] ? true : false}
            ErrorMsg={props.step2Errors["validitiyDate"]}
          ></Datepicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Place of Delivery")}
            name="deliveryPlace"
            type="text"
            required={true}
            placeholder="France"
            value={props.step2.deliveryPlace}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step2Errors["deliveryPlace"] ? true : false}
            ErrorMsg={t(props.step2Errors["deliveryPlace"])}
          ></TextField>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Issuing Authority")}
            name="issuingAuthority"
            required={true}
            placeholder="712333"
            value={props.step2.issuingAuthority}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step2Errors["issuingAuthority"] ? true : false}
            ErrorMsg={t(props.step2Errors["issuingAuthority"])}
          ></TextField>
          <div className="borderbottom"></div>
        </Grid>
      </Grid>
      <Typography className="Heading1" sx={{ marginTop: "2%" }}>
        {t("Authorization to Exercise")}
      </Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label={t("Date of Authorization to Excersice")}
            required={true}
            name="DateAuthorization"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step2.DateAuthorization}
            maxDate={moment()}
            onChange={(e) => {
              props.onChange(
                "DateAuthorization",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
            error={props.step2Errors["DateAuthorization"] ? true : false}
            ErrorMsg={props.step2Errors["DateAuthorization"]}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>

        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          {console.log("value", props.step2.ExpirationDate)}
          <Datepicker
            required={true}
            label={t("Expiration Date")}
            name="ExpirationDate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step2.ExpirationDate}
            minDate={moment()}
            onChange={(e) => {
              props.onChange(
                "ExpirationDate",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
            error={props.step2Errors["ExpirationDate"] ? true : false}
            ErrorMsg={props.step2Errors["ExpirationDate"]}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Authorization Number")}
            required={true}
            name="AuthorizationNumber"
            type="text"
            placeholder="000000000"
            value={props.step2.AuthorizationNumber}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step2Errors["AuthorizationNumber"] ? true : false}
            ErrorMsg={t(props.step2Errors["AuthorizationNumber"])}
          ></TextField>
        </Grid>
      </Grid>
      <Typography className="Heading1" sx={{ marginTop: "2%" }}>
        {t("Enterprise")}
      </Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            required={true}
            label={t("SIRET Number")}
            name="siretNo"
            type="number"
            placeholder="000000000"
            value={props.step2.siretNo}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step2Errors["siretNo"] ? true : false}
            ErrorMsg={t(props.step2Errors["siretNo"])}
          ></TextField>
        </Grid>
      </Grid>

      <Divider width="100%" borderColor="#D5E4E8" />

      <Grid container spacing={4} alignItems="flex-end">
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload your Driving License Front Side")}
            label="licensefront"
            required={true}
            type="file"
            name="licensefront"
            value={props.step2.licensefront.split("_").slice(1).join("_")}
            onChange={handleFileChange}
            error={props.step2Errors["licensefront"] ? true : false}
            ErrorMsg={props.step2Errors["licensefront"]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload your Driving License Back Side")}
            required={true}
            label="licenseback"
            type="file"
            name="licenseback"
            value={props.step2.licenseback.split("_").slice(1).join("_")}
            onChange={handleFileChange}
            error={props.step2Errors["licenseback"] ? true : false}
            ErrorMsg={props.step2Errors["licenseback"]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            required={true}
            title={t("Upload your KBLS")}
            label="kbls"
            name="kbls"
            type="file"
            value={props.step2.kbls.split("_").slice(1).join("_")}
            onChange={handleFileChange}
            error={props.step2Errors["kbls"] ? true : false}
            ErrorMsg={props.step2Errors["kbls"]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload your Authorization Front Side")}
            label="Authorizationfront"
            required={true}
            name="Authorizationfront"
            type="file"
            value={props.step2.Authorizationfront.split("_").slice(1).join("_")}
            onChange={handleFileChange}
            error={props.step2Errors["Authorizationfront"] ? true : false}
            ErrorMsg={props.step2Errors["Authorizationfront"]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload your Authorization Back Side")}
            required={true}
            label="Authorizationback"
            name="Authorizationback"
            type="file"
            value={props.step2.Authorizationback.split("_").slice(1).join("_")}
            onChange={handleFileChange}
            error={props.step2Errors["Authorizationback"] ? true : false}
            ErrorMsg={props.step2Errors["Authorizationback"]}
          />
        </Grid>
      </Grid>
      {/* <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox defaultChecked className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Are you working on other platform?
          </Typography>
        </div>
        <div className="termsConditionsCheckbox">
          <Checkbox defaultChecked className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Do you have other licenses obtained?
          </Typography>
        </div>
      </div> */}
    </Box>
  );
};
export default Step2;
