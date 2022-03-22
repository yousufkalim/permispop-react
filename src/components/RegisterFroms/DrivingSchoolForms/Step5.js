import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Checkbox from "@mui/material/Checkbox";
import DatePicker from "../../Common/DatePicker";

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
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Vehicle Details</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker
            label="Date of the 1st Registration"
            name="regDate"
          ></DatePicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Brand" name="brand"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Model" name="model"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Number Plate"
            name="numberPlate"
            placeholder="xx-xxx-xx"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Gearbox"
            name="gearbox"
            placeholder="Smith"
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Color" name="color" placeholder="Red"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Energy" name="energy" placeholder="John"></DropDown>
        </Grid>
      </Grid>
      <div className="VehicleSection">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker title="Upload  Image" name="YourImg" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload Vehicle Registration Certificate Frontside"
              name="RegCertificateFront"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload Vehicle Registration Certificate Backside"
              name="RegCertificateBack"
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Vehicle Insurance</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Insurer"
            name="insurer"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Police Number"
            name="policeNumber"
            placeholder="xxx-xxx"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker label="Start Date" name="startDate"></DatePicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker label="End Date" name="endDate"></DatePicker>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker title="Upload Scanned Green Card" name="greenCard" />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Technical Control</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker
            label="Date of Technical Control"
            name="techControlDate"
          ></DatePicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker label="End Date" name="endDate"></DatePicker>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker title="Scan and Upload your CT" name="YourCT" />
          </Grid>
        </Grid>
      </div>
      {/* <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox defaultChecked className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Terms and Condition applied
          </Typography>
        </div>
      </div> */}
    </Box>
  );
};
export default Step1;
