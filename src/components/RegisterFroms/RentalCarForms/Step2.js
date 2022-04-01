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
const Step2 = ({ step2, setStep2, onChange }) => {
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
                label="SIRET Number"
                type="text"
                name="Siret"
                placeholder="Must be 14 Digits"
                onChange={(e) => {
                  setStep2({ ...step2, [e.target.name]: e.target.value });
                }}
              ></TextField>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div className="DrivingSchool2">
              <FilePicker
                title="Upload your KBLS"
                label="Kbls"
                name="Kbls"
                value={step2.Kbls}
                onChange={handleFileChange}
              />
            </div>
          </Grid>
        </div>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Insurance Company</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Insurer"
            type="text"
            placeholder="John"
            name="CompanyInsurer"
            onChange={(e) => {
              setStep2({ ...step2, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Police Nunber"
            type="text"
            placeholder="Numeric"
            name="CompanyPoliceNumber"
            onChange={(e) => {
              setStep2({ ...step2, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Expiration date of your insurance"
            // value={ExpirationDate}

            padding="20px 0 0 0px !important"
            width="100% !important"
            name="InsuranceDateExp"
            value={step2.InsuranceDateExp}
            onChange={(e) => {
              onChange(
                "InsuranceDateExp",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
          />
          <div className="borderbottom"></div>

          {/* replaced  */}
          {/* <TextField
            label="Expiration date of your insurance"
            placeholder="John"
          ></TextField> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your RC Pro"
            name="RcPro"
            label="LicenseFront"
            value={step2.RcPro}
            onChange={handleFileChange}
          />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
    </Box>
  );
};
export default Step2;
