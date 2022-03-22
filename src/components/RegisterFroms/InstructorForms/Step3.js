import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Datepicker from "../../Common/DatePicker";

import API from "../../../api/index";

const Step1 = (props) => {
  const [step3, setStep3] = React.useState({
    companyInsurer: "",
    companyPoliceNum: "",
    insuranceExpDate: "",
    companyRC: "",
    vehicleInsurer: "",
    vehiclePoliceNum: "",
    vehicleDoOb: "",
    ExpDateinsurance: "",
    RcPro: "",
  });
  const handleChange = async (e) => {
    console.log(e.target.files[0]);

    const formdata = new FormData();

    if (e.targer.name) formdata.append(`file`, e.target.files[0]);
    // let res = await api("post", "/uploadImage", formdata);
    const response = await API("post", "Personal/UploadProfileImage", formdata);
    if (response) {
      console.log("res", response);
    }
  };
  const [obtainingdate, setObtainingdate] = useState(new Date());
  const handleObtainingDate = (newValue) => {
    setObtainingdate(newValue);
  };
  const [expirationdate, setExpirationdate] = useState(new Date());
  const handleExpirationdate = (newValue) => {
    setExpirationdate(newValue);
  };

  const [companyexpirationdate, setCompanyexpirationdate] = useState(
    new Date()
  );
  const handleCompanyExpirationdate = (newValue) => {
    setCompanyexpirationdate(newValue);
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
      <Typography className="Heading1">Insurance Company</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="1% 0px 1% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Insurer"
            name="companyInsurer"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Police Number"
            name="companyPoliceNum"
            placeholder="Smith"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label="Expiration date of your insurance"
            name="insuranceExpDate"
            placeholder="19-10-1992 "
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={companyexpirationdate}
            onChange={handleCompanyExpirationdate}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your RC Pro"
            name="companyRC"
            label="Rcpro"
          />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 2% 0px" />
      <Typography className="Heading1">Vehicle Insurance</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 3% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Insurer"
            name="vehicleInsurer"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Police Number"
            name="vehiclePoliceNum"
            placeholder="Smith"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label="Dates of Obtaining"
            name="vehicleDoOb"
            placeholder="102 Street, building 02, NY"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={obtainingdate}
            onChange={handleObtainingDate}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
      </Grid>
      <Grid container spacing={4} mt={2} className="InsuranceSection">
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Expiration date of your insurance"
            placeholder="19-10-1992 "
            padding="20px 0 0 0px !important"
            width="100% !important"
            name="ExpDateinsurance"
            value={expirationdate}
            onChange={handleExpirationdate}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your RC Pro"
            name="RcPro"
            label="UploadRc"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Step1;
