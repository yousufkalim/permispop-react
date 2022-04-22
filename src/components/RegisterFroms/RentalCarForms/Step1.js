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
import { useTranslation } from "react-i18next";

// import TextField from "@mui/material/TextField";

const Step1 = ({ step1, setStep1, onChange, step1Errors }) => {
  const { i18n, t } = useTranslation();
  const [Dob, setDob] = useState();
  const [Gender, setGender] = useState();
  const [addresses, setAddresses] = useState([]);

  const handleSelectAddress = (e) => {
    if (e) {
      onChange("Address", {
        Label: e.label,
        Zip: e.PostalCode,
        City: e.city,
        Lat: e.lat,
        Lng: e.lng,
      });
    } else {
      onChange("Address", {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      });
    }
  };
  const handleAddress = async (e) => {
    if (e.target.value === "") {
      onChange("Address", {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      });
      setAddresses([]);
    } else {
      onChange("Address", { ...step1.Address, Label: e.target.value });
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
    }
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
            label={t("First Name")}
            required={true}
            name="FirstName"
            type="text"
            placeholder="John"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["FirstName"] ? true : false}
            ErrorMsg={t(step1Errors["FirstName"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Surname")}
            required={true}
            name="SurName"
            type="text"
            placeholder="Cena"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["SurName"] ? true : false}
            ErrorMsg={t(step1Errors["SurName"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            required={true}
            label={t("Date of Birth")}
            value={step1.Dob}
            name="Dob"
            onChange={(e) => {
              onChange("Dob", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
            maxDate={new Date()}
            padding="20px 0 0 0px !important"
            width="100% !important"
            error={step1Errors["Dob"] ? true : false}
            ErrorMsg={step1Errors["Dob"]}
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
            label={t("Place of Birth")}
            required={true}
            type="text"
            name="Pob"
            placeholder="City, Country"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["Pob"] ? true : false}
            ErrorMsg={t(step1Errors["Pob"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AutoComplete
            required={true}
            name="Address"
            label={t("Address")}
            value={step1.Address.Label}
            options={addresses}
            placeholder={t("Address")}
            onChangeAddress={(e) => {
              handleAddress(e);
            }}
            error={step1Errors["Address"] ? true : false}
            ErrorMsg={t(step1Errors["Address"])}
            onAddressSelect={(e) => handleSelectAddress(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label={t("Gender")}
            required={true}
            name="Gender"
            placeholder="ali"
            MenuItem={[
              { name: t("Male"), value: "Male" },
              { name: t("Female"), value: "Female" },
              { name: t("others"), value: "Others" },
            ]}
            value={step1.Gender}
            onChange={(e) => {
              onChange("Gender", e.target.value);
            }}
            error={step1Errors["Gender"] ? true : false}
            ErrorMsg={step1Errors["Gender"]}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Complement")}
            name="Complement"
            type="text"
            placeholder="TextField"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            // error={step1Errors['Complement']?true:false}
            // ErrorMsg={step1Errors['Complement']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("City")}
            required={true}
            name="City"
            disabled={true}
            type="text"
            placeholder={t("Enter City")}
            // error={step1Errors['City']?true:false}
            // ErrorMsg={step1Errors['City']}
            value={step1.Address.City}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Zip Code")}
            required={true}
            name="Zip"
            type="number"
            disabled={true}
            value={step1.Address.Zip}
            placeholder="00000"
            // onChange={(e) => {
            //   setStep1({ ...step1, [e.target.name]: e.target.value });
            // }}
            // error={step1Errors['Zip']?true:false}
            // ErrorMsg={step1Errors['Zip']}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Email")}
            required={true}
            name="Email"
            type="email"
            placeholder="abc@xyz.com"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["Email"] ? true : false}
            ErrorMsg={t(step1Errors["Email"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Second Email")}
            name="Email2"
            type="email"
            placeholder="abc@xyz.com"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["Email2"] ? true : false}
            ErrorMsg={t(step1Errors["Email2"])}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Phone")}
            required={true}
            name="Phone"
            type="number"
            placeholder="000000"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            value={step1.Phone}
            error={step1Errors["Phone"] ? true : false}
            ErrorMsg={t(step1Errors["Phone"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Second Phone")}
            name="Phone2"
            type="number"
            placeholder="0000000"
            value={step1.Phone2}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["Phone2"] ? true : false}
            ErrorMsg={t(step1Errors["Phone2"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Password")}
            required={true}
            name="Password"
            type="password"
            placeholder="******"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["Password"] ? true : false}
            ErrorMsg={t(step1Errors["Password"])}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Confirm Password")}
            required={true}
            name="ConfirmPassword"
            type="password"
            placeholder="******"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["ConfirmPassword"] ? true : false}
            ErrorMsg={t(step1Errors["ConfirmPassword"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t(
              "How much time you will give to students of our platforms?"
            )}
            name="TimeOnPlatform"
            type="number"
            placeholder="1"
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            // error={step1Errors['TimeOnPlatform']?true:false}
            // ErrorMsg={step1Errors['TimeOnPlatform']}
          ></TextField>
        </Grid>
      </Grid>
      <div className="DrivingInstrutor">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title={t("Upload your authorization front side")}
              required={true}
              name="FrontSideimg"
              label="AuthFrontSide"
              value={step1.FrontSideimg}
              onChange={handleFileChange}
              error={step1Errors["FrontSideimg"] ? true : false}
              ErrorMsg={step1Errors["FrontSideimg"]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title={t("Upload your authorization back side")}
              required={true}
              name="BackSideimg"
              label="AuthBackSide"
              value={step1.BackSideimg}
              onChange={handleFileChange}
              error={step1Errors["BackSideimg"] ? true : false}
              ErrorMsg={step1Errors["BackSideimg"]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title={t("Upload your Profile Picture")}
              name="ProfileImg"
              label="ProfileImg"
              value={step1.ProfileImg}
              onChange={handleFileChange}
              error={step1Errors["ProfileImg"] ? true : false}
              ErrorMsg={step1Errors["ProfileImg"]}
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
    </Box>
  );
};
export default Step1;
