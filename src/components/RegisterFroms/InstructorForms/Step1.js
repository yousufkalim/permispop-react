import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Checkbox from "@mui/material/Checkbox";
import Datepicker from "../../Common/DatePicker";
import MultiSelect from "../../Common/MultiSelect";
import API from "../../../api/index";

const Step1 = (props) => {
  const [step1, setStep1] = React.useState({
    firstname: "",
    surname: "",
    address: "",
    dob: "",
    pob: "",
    zip: "",
    gender: "",
    email: "",
    email2: "",
    phone: "",
    phone2: "",
    city: "",
    complement: "",
    password: "",
    confirmPassword: "",
    noh: "",
    neph: "",
    language: "",
    frontImg: "",
    backImag: "",
    profileImg: "",
    otherPlatform: false,
    lat: "",
    lng: "",
  });
  const handleChange = async (e) => {
    console.log(e.target.files[0]);

    const formdata = new FormData();

    if (e.targer.name) formdata.append(`file`, e.target.files[0]);
    // let res = await api("post", "/uploadImage", formdata);
    const response = await API("post", "Personal/UploadProfileImage", formdata);
    if (response) {
      console.log("res", response);
    }
  };
  function handleSelecetedTags(items) {
    console.log(items);
  }
  const [dob, setDob] = useState(new Date());
  const handleDob = (newValue) => {
    setDob(newValue);
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
            label="First Name"
            name="firstname"
            type="text"
            placeholder="First name"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Surname"
            name="surname"
            placeholder="Surname"
            type="text"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Address"
            name="address"
            placeholder="Address"
            type="text"
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label="Date of birth"
            name="dob"
            value={dob}
            onChange={handleDob}
            padding="20px 0 0 0px !important"
            width="100% !important"
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Place of birth"
            name="pob"
            placeholder="Place of birth"
            type="text"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Zip Code"
            name="zip"
            placeholder="Zip code"
            type="number"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Gender"
            name="gender"
            MenuItem={[
              { name: "Male", value: "Male" },
              { name: "Female", value: "Female" },
              { name: "others", value: "others" },
            ]}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Email"
            name="email"
            placeholder="Email"
            type="email"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Email"
            name="email2"
            type="email"
            placeholder="Second email"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Phone"
            type="text"
            placeholder="Phone"
            name="phone"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Phone"
            type="text"
            placeholder="Second phone"
            name="phone2"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="City"
            name="city"
            placeholder="City"
            type="text"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Complement"
            type="text"
            name="coplement"
            placeholder="Complement"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmpassword"
            placeholder="Confirm password"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Number of hours"
            type="number"
            name="noh"
            placeholder="Number of hours"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="NEPH Number"
            name="neph"
            placeholder="NEPH number"
            type="text"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <MultiSelect
            selectedTags={handleSelecetedTags}
            variant="standard"
            id="tags"
            name="tags"
            placeholder="add Tags"
            text="Spoken Languages"
          ></MultiSelect>
        </Grid>
      </Grid>

      <Divider width="100%" borderColor="#D5E4E8" />

      <Grid container spacing={4} alignItems="flex-end">
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload front of your ID Card/Passport"
            label="front"
            name="frontIdPhoto"
            type="file"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload back of your ID Card/Passport"
            label="back"
            name="backIdPhoto"
            type="file"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your profile picture"
            label="profile"
            name="photo"
            type="file"
          />
        </Grid>
      </Grid>
      <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox name="otherPlatform" className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Are you working on other platform?
          </Typography>
        </div>
      </div>
    </Box>
  );
};
export default Step1;
