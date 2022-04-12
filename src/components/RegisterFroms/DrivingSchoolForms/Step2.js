import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Checkbox from "@mui/material/Checkbox";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";
import moment from "moment";

const Step2 = ({ step2, setStep2, onChange,step2Errors }) => {
  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "RcProImg") {
        onChange("RcProImg", res.data.message);
      } else if (e.target.name === "KBIS") {
        onChange("KBIS", res.data.message);
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
            label="Number"
            required={true}
            name="Number"
            placeholder="000000"
            value={step2.Number}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step2Errors['Number']?true:false}
            ErrorMsg={step2Errors['Number']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Issuing Authority"
            required={true}
            placeholder="xxxxxxxxxx"
            name="IssuingAurh"
            value={step2.IssuingAurh}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step2Errors['IssuingAurh']?true:false}
            ErrorMsg={step2Errors['IssuingAurh']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
          // minDate={new Date()}
            label="Date of Approval"
            required={true}
            name="Approvaldate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            maxDate={moment()}
            // onChange={(e) => {
            //   onChange("Approvaldate", new Date(e));
            // }}
            onChange={(e) => {
              onChange("Approvaldate", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
            error={step2Errors['Approvaldate']?true:false}
            ErrorMsg={step2Errors['Approvaldate']}
            value={step2.Approvaldate}
          ></DatePicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Certificate"
            label="YourCertificate"
            name="RcProImg"
            type="file"
            value={step2.RcProImg}
            onChange={handleFileChange}
            // error={step2Errors['RcProImg']?true:false}
            // ErrorMsg={step2Errors['RcProImg']}
          />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Business</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <div className="DrivingSchool">
          <Grid item xs={12} sm={12} md={12}>
            <div className="DrivingSchool1">
              <TextField
                label="SIRET Number"
            required={true}
            placeholder="000000"
                name="SiretNumber"
                value={step2.SiretNumber}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step2Errors['SiretNumber']?true:false}
            ErrorMsg={step2Errors['SiretNumber']}
              ></TextField>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div className="DrivingSchool2">
              <FilePicker
                title="Upload your Kbls"
            required={true}
            name="KBIS"
                label="Yourkbls"
                type="file"
                value={step2.KBIS}
                onChange={handleFileChange}
                error={step2Errors['KBIS']?true:false}
            ErrorMsg={step2Errors['KBIS']}
              />
            </div>
          </Grid>
        </div>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
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
            I accept CPF financement
          </Typography>
        </div>
      </div> */}
    </Box>
  );
};
export default Step2;
