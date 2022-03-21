import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import API from "../../../api/index";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";

const Step2 = (props) => {
  const [step2, setStep2] = React.useState({
    Siret: "",
    Kbls: "",
    CompanyInsurer: "",
    CompanyPoliceNumber: "",
    InsuranceDateExp: "",
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
        <div className="DrivingSchool">
          <Grid item xs={12} sm={12} md={12}>
            <div className="DrivingSchool1">
              <TextField label="SIRET Number" placeholder="John"></TextField>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div className="DrivingSchool2">
              <FilePicker title="Upload your KBLS" label="Kbls" />
            </div>
          </Grid>
        </div>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Insurance Company</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Insurer" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Police Nunber" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Expiration date of your insurance"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker title="Upload your RC Pro" label="LicenseFront" />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
    </Box>
  );
};
export default Step2;
