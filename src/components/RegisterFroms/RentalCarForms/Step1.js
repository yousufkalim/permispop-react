import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";
import AutoComplete from "../../Common/Autocomplete";
import axios from "axios";
import moment from "moment";

// import TextField from "@mui/material/TextField";

const Step1 = ({ step1, setStep1, onChange }) => {
  const [Dob, setDob] = useState();
  const [Gender, setGender] = useState();
  const [addresses, setAddresses] = useState([]);

  const handleSelectAddress = (e) => {
    onChange("Address", {
      Label: e.label,
      Zip: e.PostalCode,
      City: e.city,
      Lat: e.lat,
      Lng: e.lng,
    });
  };
  const handleAddress = async (e) => {
    var config = {
      method: "get",
      url: `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}&type=housenumber&autocomplete=1`,
    };
    await axios(config)
      .then(function (res) {
        let addressToSet = [];

        res.data.features.map((item) => {
          addressToSet.push({
            label: item.properties.label,
            city: item.properties.city,
            PostalCode: item.properties.postcode,
            lat: item.geometry.coordinates[1],
            lng: item.geometry.coordinates[0],
          });
        });
        setAddresses(addressToSet);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleFileChange = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "ProfileImg") {
        onChange("ProfileImg", res.data.message);
      } else if (e.target.name === "FrontSideimg") {
        onChange("FrontSideimg", res.data.message);
      } else if (e.target.name === "BackSideimg") {
        onChange("BackSideimg", res.data.message);
      }
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
            label="First Name"
            name="FirstName"
            type="text"
            placeholder="John"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Surname"
            name="SurName"
            type="text"
            placeholder="Cena"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Date of Birth"
            value={step1.Dob}
            name="Dob"
            onChange={(e) => {
              onChange("Dob", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
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
            name="Pob"
            placeholder="City, Country"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AutoComplete
            name="address"
            label="Address"
            value={addresses}
            options={addresses}
            placeholder="Address"
            onChangeAddress={(e) => {
              handleAddress(e);
            }}
            onAddressSelect={(e) => handleSelectAddress(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Gender"
            name="Gender"
            placeholder="ali"
            MenuItem={[
              { name: "Male", value: "Male" },
              { name: "Female", value: "Female" },
              { name: "others", value: "Others" },
            ]}
            value={step1.Gender}
            onChange={(e) => {
              onChange("Gender", e.target.value);
            }}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Complement"
            name="Complement"
            type="text"
            placeholder="TextField"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="City"
            name="City"
            disabled={true}
            type="text"
            placeholder="Enter City"
            // onChange={(e) => {
            //   setStep1({ ...step1, [e.target.name]: e.target.value });
            // }}
            value={step1.Address.City}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Zip Code"
            name="Zip"
            type="number"
            disabled={true}
            value={step1.Address.Zip}
            placeholder="00000"
            // onChange={(e) => {
            //   setStep1({ ...step1, [e.target.name]: e.target.value });
            // }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Email"
            name="Email"
            type="email"
            placeholder="abc@xyz.com"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Email"
            name="Email2"
            type="email"
            placeholder="abc@xyz.com"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Phone"
            name="Phone"
            type="text"
            placeholder="1234567890"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Phone"
            name="Phone2"
            type="text"
            placeholder="1234567890"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Password"
            name="Password"
            type="password"
            placeholder="******"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Confirm Password"
            name="ConfirmPassword"
            type="password"
            placeholder="******"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="How much time you will give to students of our platforms?"
            name="TimeOnPlatform"
            type="number"
            placeholder="1"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
      </Grid>
      <div className="DrivingInstrutor">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload your authorization front side"
              name="FrontSideimg"
              label="AuthFrontSide"
              value={step1.FrontSideimg}
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload your authorization back side"
              name="BackSideimg"
              label="AuthBackSide"
              value={step1.BackSideimg}
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload your Profile Picture"
              name="ProfileImg"
              label="ProfileImg"
              value={step1.ProfileImg}
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
    </Box>
  );
};
export default Step1;
