import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";

const Step3 = (props) => {
  const [step3, setStep3] = React.useState({
    Tradename: "",
    Companyname: "",
    Address: "",
    RcPro: "",
  });
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
          <TextField label="Insurer" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Police Number" placeholder="Smith"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker label="Expiration date of your Insurance"></DatePicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker title="Upload your RC Pro" label="YourRCpro" />
        </Grid>
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      </Grid>
    </Box>
  );
};
export default Step3;
