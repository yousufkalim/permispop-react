import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Checkbox from "@mui/material/Checkbox";

const Step1 = (props) => {
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
            label="Date of the 1st Registration"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Brand" placeholder="Smith"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Model"
            placeholder="102 Street, building 02, NY"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Number Plate" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Gearbox" placeholder="Smith"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Gearbox" placeholder="Red"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Energy" placeholder="John"></TextField>
        </Grid>
      </Grid>
      <div className="VehicleSection">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker title="Upload your Image" label="YourImg" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload Vehicle Registration Certificate"
              label="RegCertificate"
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Vehicle Insurance</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Insurer" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Police Number" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Start Date"
            placeholder="102 Street, building 02, NY"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="End Date"
            placeholder="102 Street, building 02, NY"
          ></TextField>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker title="Upload Scanned Cown Card" label="CownCard" />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Technical Control</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Date of Technical Control"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="End Date" placeholder="John"></TextField>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker title="Scan and Upload your CT" label="YourCT" />
          </Grid>
        </Grid>
      </div>
      <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox defaultChecked className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Terms and Condition applied
          </Typography>
        </div>
      </div>
    </Box>
  );
};
export default Step1;
