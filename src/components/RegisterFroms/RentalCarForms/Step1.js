import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";

const Step1 = (props) => {
  const [DoB, setDoB] = React.useState(new Date())
  const [step, setStep1] = React.useState({
    FirstName: "",
    SurName: "",
    Dob: "",
    Pob: "",
    Address: "",
    Gender: "",
    Complement: "",
    Zip: "",
    City: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Password: "",
    ConfirmPassword: "",
    TimeOnPlatform: "",
    ProfileImg: "",
    FrontSideimg: "",
    BackSideimg: "",
  });
  const handleDoBChange = (newvalue) => {
    setDoB(newvalue);
  }
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
            placeholder="Cena"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{marginTop:"9px"}}>
          <DatePicker
            label="Date of Birth"
            
            value={DoB}
            onChange={handleDoBChange}
            padding="20px 0 0 0px !important"
            width="100% !important"
          />
          <div className="borderbottom"></div>

          {/* replaced */}
          {/* <TextField
            label="Date of Birth"
            name="dob"
            placeholder="102 Street, building 02, NY"
          ></TextField> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Place of Birth"
            type="text"
            name="pob"
            placeholder="City, Country"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Address"
            name="address"
            type="text"
            placeholder="102 Street, building 02, NY"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Gender" name="gender" placeholder="ali"
          MenuItem={[
            { name: "Male", value: "Male" },
            { name: "Female", value: "Female" },
            { name: "others", value: "Others" },
          ]} >
          </DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Complement"
            name="complement"
            type="text"
           placeholder="TextField"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Zip Code" name="zip" type="number" placeholder="00000"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="City"
            name="city"
            type="text"
            placeholder="Enter City"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Email" name="email" type="email" placeholder="abc@xyz.com"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Phone" name="phone" type="text" placeholder="1234567890"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="******"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Email"
            name="email2"
            type="email"
            placeholder="abc@xyz.com"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Phone"
            name="phone2"
            type="text"
            placeholder="1234567890"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Confirm Password"
            name="confirmpassword"
            type="password"
            placeholder="******"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
            
          <TextField
            label="How much time you will give to students of our platforms?"
            name="timeonplatform"
            type="number"
            placeholder="1"
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
