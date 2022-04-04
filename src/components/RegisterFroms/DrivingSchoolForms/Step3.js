import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";

const Step3 = ({ step3, setStep3, onChange }) => {
  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      onChange("RcPro", res.data.message);
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
            label="Insurer"
            placeholder="John"
            name="insuranceCompany"
            value={step3.insuranceCompany}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Police Number"
            placeholder="0000000000"
            name="policeNumber"
            value={step3.policeNumber}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Expiration date of your Insurance"
            padding="20px 0 0 0px !important"
            width="100% !important"
            onChange={(e) => {
              onChange("dateInsurance", new Date(e));
            }}
          ></DatePicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your RC Pro"
            label="YourRCpro"
            name="RcPro"
            type="file"
            value={step3.RcPro}
            onChange={handleFileChange}
          />
        </Grid>
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      </Grid>
    </Box>
  );
};
export default Step3;
