import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";

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
            label="First Name"
            name="firstname"
            type="text"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Surname"
            name="surname"
            type="text"
            placeholder="Smith"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Date of Birth"
            name="dob"
            placeholder="102 Street, building 02, NY"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Place of Birth"
            name="pob"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Address"
            name="address"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Gender" name="gender"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Complement"
            name="complement"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Zip Code" name="zip" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="City"
            name="city"
            placeholder="102 Street, building 02, NY"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Email" name="email" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Phone" name="phone" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Password"
            name="password"
            placeholder="******"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Email"
            name="email2"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Phone"
            name="phone2"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Confirm Password"
            name="confirmpassword"
            placeholder="******"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="How much time you will give to students of our platforms?"
            name="timeonplatform"
            placeholder="John"
          ></TextField>
        </Grid>
      </Grid>
      <div className="DrivingInstrutor">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload your authorization front side"
              name="forntside"
              label="AuthFrontSide"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload your authorization back side"
              name="backside"
              label="AuthBackSide"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload your Profile Picture"
              name="profileimg"
              label="ProfileImg"
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
    </Box>
  );
};
export default Step1;
