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
          <TextField label="First Name" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Surname" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Date of Birth"
            placeholder="102 Street, building 02, NY"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Place of Birth" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Gender"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Address" placeholder="Smith"></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Complement" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Zip Code" placeholder="Smith"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="City"
            placeholder="102 Street, building 02, NY"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Email" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Phone" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Second Phone" placeholder="Smith"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Second Email" placeholder="Email"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Password" placeholder="********"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Confirm Password"
            placeholder="********"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker title="Upload your Image" label="YourImage" />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Driver’s License</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Driver’s License Number"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Date of Obtaining" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="End Date" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your driving license front side"
            label="LicenseFrontSide"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your driving license back side"
            label="LicenseBackSide"
          />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Authorization to Exercise</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Date of Obtaining" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Date of Obtaining" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Date of Obtaining" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Date of Obtaining" placeholder="John"></TextField>
        </Grid>
      </Grid>
      <div className="DrivingInstrutor">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload your authorization front side"
              label="AuthFrontSide"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload your authorization back side"
              label="AuthFrontSide"
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Authorization to Exercise</Typography>
      <Typography className="HeadingContent">
        0 Employee 0 External Provider
      </Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />

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
