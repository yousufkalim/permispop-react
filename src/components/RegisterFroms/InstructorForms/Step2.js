import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Datepicker from "../../Common/DatePicker";
import API from "../../../api/index";

const Step2 = (props) => {
  const [step2, setStep2] = React.useState({
    licenceNo: "",
    doOb: "",
    validitiyDate: "",
    DateAuthorization: "",
    issuingAuthority: "",
    ExpirationDate: "",
    AuthorizationNumber: "",
    siretNo: "",
    licensefront: "",
    licenseback: "",
    kbls: "",
    Authorizationfront: "",
    Authorizationback: "",
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
  const [validitydate, setValiditydate] = useState(new Date());
  const handleValiditydate = (newValue) => {
    setValiditydate(newValue);
  };
  const [authorizationdate, setAuthorizationdate] = useState(new Date());
  const handleAuthorizationdate = (newValue) => {
    setAuthorizationdate(newValue);
  };
  const [obtainingdate, setObtainingdate] = useState(new Date());
  const handleObtainingDate = (newValue) => {
    setObtainingdate(newValue);
  };
  const [expirationdate, setExpirationdate] = useState(new Date());
  const handleExpirationdate = (newValue) => {
    setExpirationdate(newValue);
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
            name="drivingLicenseNo"
            type="text"
            placeholder="000000000"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Place of Delivery"
            name="deliveryplace"
            type="text"
            placeholder="France"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Issuing Authority"
            name="issuingAuthority"
            placeholder="712333"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Validity Date"
            name="validityDate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={validitydate}
            onChange={handleValiditydate}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Date of authorization to excersice"
            name="authorizationdate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={authorizationdate}
            onChange={handleAuthorizationdate}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Dates of Obtaining"
            name="obtainingdate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={obtainingdate}
            onChange={handleObtainingDate}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label="Expiration Date"
            name="expirationdate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={expirationdate}
            onChange={handleExpirationdate}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Authorization Number"
            name="authorizationNumber"
            type="text"
            placeholder="000000000"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="SIRET Number"
            name="siretNumber"
            type="text"
            placeholder="000000000"
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
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Driving License Back Side"
            label="drivingLicenseBack"
            type="file"
            name="licenseback"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your KBLS"
            label="KBL"
            name="kbls"
            type="file"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Authorization Front Side"
            label="authFront"
            name="Authorizationfront"
            type="file"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Authorization Back Side"
            label="authBack"
            name="Authorizationback"
            type="file"
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
