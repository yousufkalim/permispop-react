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

const Step2 = (props) => {
  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "Authorizationfront") {
        props.step1.Authorizationfront(res.data.message);
      } else if (e.target.name === "Authorizationback") {
        props.step1.Authorizationback(res.data.message);
      } else if (e.target.name === "licensefront") {
        props.step1.licensefront(res.data.message);
      } else if (e.target.name === "licenseback") {
        props.step1.licenseback(res.data.message);
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
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Driving License Number"
            name="licenceNo"
            type="text"
            placeholder="000000000"
            value={props.step2.licenceNo}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Place of Delivery"
            name="deliveryPlace"
            type="text"
            placeholder="France"
            value={props.step2.deliveryPlace}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Issuing Authority"
            name="issuingAuthority"
            placeholder="712333"
            value={props.step2.issuingAuthority}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Validity Date"
            name="validitiyDate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step2.validitiyDate}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Date of authorization to excersice"
            name="DateAuthorization"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step2.DateAuthorization}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Dates of Obtaining"
            name="obtainingdate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step2.obtainingdate}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label="Expiration Date"
            name="ExpirationDate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step2.ExpirationDate}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Authorization Number"
            name="AuthorizationNumber"
            type="text"
            placeholder="000000000"
            value={props.step2.AuthorizationNumber}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="SIRET Number"
            name="siretNo"
            type="text"
            placeholder="000000000"
            value={props.step2.siretNo}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
      </Grid>

      <Divider width="100%" borderColor="#D5E4E8" />

      <Grid container spacing={4} alignItems="flex-end">
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Driving License Front Side"
            label="drivingLicenseFront"
            type="file"
            name="licensefront"
            value={props.step2.licensefront}
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Driving License Back Side"
            label="drivingLicenseBack"
            type="file"
            name="licenseback"
            value={props.step2.licenseback}
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your KBLS"
            label="KBL"
            name="kbls"
            type="file"
            value={props.step2.kbls}
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Authorization Front Side"
            label="authFront"
            name="Authorizationfront"
            type="file"
            value={props.step2.Authorizationfront}
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Authorization Back Side"
            label="authBack"
            name="Authorizationback"
            type="file"
            value={props.step2.Authorizationback}
            onChange={handleFileChange}
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
