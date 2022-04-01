import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Checkbox from "@mui/material/Checkbox";
import Datepicker from "../../Common/DatePicker";
import LanguageAutoComplete from "../../Common/LanguageAutoComplete";
import axios from "axios";
import AutoComplete from "../../Common/Autocomplete";
import API from "../../../api/index";

const Step1 = (props) => {
  const [checked, setisChecked] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [languages, setLanguages] = useState([]);

  const handleSelectAddress = (e) => {
    props.onChange("Address", {
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
      .then((res) => {
        let addressToSet = [];
        res.data.features.map((item) => {
          addressToSet.push({
            label: item.properties.label,
            city: item.properties.city,
            PostalCode: item.properties.postcode,
            lat: item.properties.x,
            lng: item.properties.y,
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
      if (e.target.name === "FrontImg") {
        props.step1.FrontImg(res.data.message);
      } else if (e.target.name === "BackImg") {
        props.step1.BackImg(res.data.message);
      } else if (e.target.name === "ProfileImg") {
        props.step1.ProfileImg(res.data.message);
      }
    });
  };
  const handleLanguage = async (e) => {
    var config = {
      method: "get",
      url: `https://parseapi.back4app.com/classes/Language?limit=300&keys=name`,
      headers: {
        "X-Parse-Application-Id": "mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja", // This is the fake app's application id
        "X-Parse-Master-Key": "TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH", // This is the fake app's readonly master key
      },
    };
    await axios(config)
      .then((res) => {
        let languageToSet = [];
        res.data.results.map((item) => {
          languageToSet.push({
            name: item.name,
          });
        });
        setLanguages(languageToSet);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    handleLanguage();
  }, []);
  return (
    <Box
      component="form"
      noValidate
      // onSubmit={handleChange}
      sx={{
        mt: 3,
        marginTop: "70px",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="First Name"
            name="Firstname"
            type="text"
            placeholder="First name"
            value={props.step1.Firstname}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Surname"
            name="Surname"
            placeholder="Surname"
            type="text"
            value={props.step1.Surname}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AutoComplete
            name="Address"
            label="Address"
            value={props.step1.Address.Label}
            options={addresses}
            placeholder="Address"
            onChangeAddress={(e) => {
              handleAddress(e);
            }}
            onAddressSelect={(e) => handleSelectAddress(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label="Date of birth"
            name="Dob"
            value={props.step1.Dob}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            padding="20px 0 0 0px !important"
            width="100% !important"
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Place of birth"
            name="Pob"
            placeholder="Place of birth"
            type="text"
            value={props.step1.Pob}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Zip Code"
            name="Zip"
            placeholder="Zip code"
            disabled={true}
            value={props.step1.Address.Zip}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Gender"
            placeholder="Male"
            name="Gender"
            value={props.step1.Gender}
            onChange={(e) => props.onChange(e.target.name, e.target.value)}
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
            name="Email"
            placeholder="Email"
            type="email"
            value={props.step1.Email}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Email"
            name="Email2"
            type="email"
            placeholder="Second email"
            value={props.step1.Email2}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Phone"
            type="text"
            placeholder="Phone"
            name="Phone"
            value={props.step1.Phone}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Phone"
            type="text"
            placeholder="Second phone"
            name="Phone2"
            value={props.step1.Phone2}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="City"
            name="City"
            placeholder="City"
            disabled={true}
            value={props.step1.Address.City}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Complement"
            type="text"
            name="Coplement"
            placeholder="Complement"
            value={props.step1.Coplement}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Password"
            type="password"
            name="Password"
            placeholder="Password"
            value={props.step1.Password}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Confirm Password"
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm password"
            value={props.step1.ConfirmPassword}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Number of hours"
            type="number"
            name="Noh"
            placeholder="Number of hours"
            value={props.step1.Noh}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="NEPH Number"
            name="Neph"
            placeholder="NEPH number"
            type="text"
            value={props.step1.Neph}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <LanguageAutoComplete
            name="Language"
            label="Spoken Language"
            value={props.step1.Language}
            options={languages}
            placeholder="Language"
            setVal={props.onChange}
          />
        </Grid>
      </Grid>

      <Divider width="100%" borderColor="#D5E4E8" />

      <Grid container spacing={4} alignItems="flex-end">
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload front of your ID Card/Passport"
            label="front"
            name="FrontImg"
            type="file"
            value={props.step1.FrontImg}
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload back of your ID Card/Passport"
            label="back"
            name="BackImg"
            type="file"
            value={props.step1.BackImag}
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your profile picture"
            label="profile"
            name="ProfileImg"
            type="file"
            value={props.step1.ProfileImg}
            onChange={handleFileChange}
          />
        </Grid>
      </Grid>
      <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox
            name="otherPlatform"
            className="checkbox"
            onClick={(e) => setisChecked(!checked)}
          />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Are you working on other platform?
          </Typography>
        </div>
      </div>
      {checked ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              label="Which plateforms"
              type="plateforms"
              name="plateforms"
              placeholder="Seperated by"
              value={props.step1.Firstname}
              onChange={(e) => {
                props.onChange(e.target.name, e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="How much time will you give to the students of our platform?(hr/month)"
              name="Time"
              placeholder="How much time?"
              type="text"
              value={props.step1.Firstname}
              onChange={(e) => {
                props.onChange(e.target.name, e.target.value);
              }}
            ></TextField>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </Box>
  );
};
export default Step1;
