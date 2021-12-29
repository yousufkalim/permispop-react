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
          <TextField label="Surname" placeholder="Smith"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Address"
            placeholder="102 Street, building 02, NY"
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Date of birth"
            placeholder="19-10-1992 "
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Place of birth" placeholder="France"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Zip Code" placeholder="712333"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Gender"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Email"
            placeholder="arslan.alikh@gmail.com"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Email"
            placeholder="smart_coolkyo@yahoo.com"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Phone" placeholder="+33 123 4567890"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Phone"
            placeholder="+33 123 4567890"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="City" placeholder="New york"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Complement" placeholder="Student"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Password" placeholder="**************"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Confirm Password"
            placeholder="**************"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Number of hours" placeholder="44"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="NEPH Number" placeholder="532-3321-111"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Spoken Languages"
            placeholder="English, French"
          ></TextField>
        </Grid>
      </Grid>

      <Divider width="100%" borderColor="#D5E4E8" />

      <Grid container spacing={4} alignItems="flex-end">
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload front of your ID Card/Passport"
            label="front"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload back of your ID Card/Passport"
            label="back"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker title="Upload your profile picture" label="profile" />
        </Grid>
      </Grid>
      <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox defaultChecked className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Are you working on other platform?
          </Typography>
        </div>
      </div>
    </Box>
  );
};
export default Step1;
