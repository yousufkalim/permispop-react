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
import moment from "moment";
import { useTranslation } from "react-i18next";

const Step1 = (props) => {
  const { i18n , t } = useTranslation();
  const [addresses, setAddresses] = useState([]);
  const [languages, setLanguages] = useState([]);

  const handleSelectAddress = (e) => {
    if (e) {
    props.onChange("Address", {
      Label: e.label,
      Zip: e.PostalCode,
      City: e.city,
      Lat: e.lat,
      Lng: e.lng,
    });
  } else {
    props.onChange("Address", {
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
      props.onChange("Address", {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      });
      setAddresses([]);
    } else {
      props.onChange("Address", { ...props.step1.Address, Label: e.target.value });
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
      if (e.target.name === "FrontImg") {
        props.onChange("FrontImg", res.data.message);
      } else if (e.target.name === "BackImg") {
        props.onChange("BackImg", res.data.message);
      } else if (e.target.name === "ProfileImg") {
        props.onChange("ProfileImg", res.data.message);
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
            label={t("First Name")}
            name="Firstname"
            type="text"
            required={true}

            placeholder="First name"
            value={props.step1.Firstname}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step1Errors['Firstname']?true:false}
            ErrorMsg={t(props.step1Errors['Firstname'])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Surname")}
            name="Surname"
            required={true}
            placeholder="Surname"
            type="text"
            value={props.step1.Surname}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step1Errors['Surname']?true:false}
            ErrorMsg={t(props.step1Errors['Surname'])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AutoComplete
            name="Address"
            label={t("Address")}
            value={props.step1.Address.Label}
            options={addresses}
            placeholder={t("Address")}
            required={true}
            onChangeAddress={(e) => {
              handleAddress(e);
            }}
            error={props.step1Errors['Address']?true:false}
            ErrorMsg={props.step1Errors['Address']}
            onAddressSelect={(e) => handleSelectAddress(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label={t("Date of Birth")}
            name="Dob"
            required={true}
            value={props.step1.Dob}
            maxDate={moment()}
            // openTo={'01' | '01' | '2000'}
            // maxDate={moment("2000-01-01")}
            onChange={(e) => {
              props.onChange("Dob", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
            padding="20px 0 0 0px !important"
            width="100% !important"
            error={props.step1Errors['Dob']?true:false}
            ErrorMsg={t(props.step1Errors['Dob'])}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Place of Birth")}
            name="Pob"
            required={true}
            placeholder="Place of birth"
            type="text"
            value={props.step1.Pob}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step1Errors['Pob']?true:false}
            ErrorMsg={t(props.step1Errors['Pob'])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Zip Code")}
            required={true}
            name="Zip"
            placeholder="Zip code"
            disabled={true}
            value={props.step1.Address.Zip}
            // error={props.step1Errors['Zip']?true:false}
            // ErrorMsg={props.step1Errors['Zip']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label={t("Gender")}
            placeholder="Male"
            name="Gender"
            required={true}
            value={props.step1.Gender}
            onChange={(e) => props.onChange("Gender", e.target.value)}
            MenuItem={[
              { name: "Male", value: "Male" },
              { name: "Female", value: "Female" },
              { name: "others", value: "others" },
            ]}
            error={props.step1Errors['Gender']?true:false}
            ErrorMsg={t(props.step1Errors['Gender'])}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Email")}
            required={true}
            name="Email"
            placeholder="Email"
            type="email"
            value={props.step1.Email}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step1Errors['Email']?true:false}
            ErrorMsg={t(props.step1Errors['Email'])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Second Email")}
            name="Email2"
            type="email"
            placeholder="Second email"
            value={props.step1.Email2}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            // error={props.step1Errors['Email2']?true:false}
            // ErrorMsg={props.step1Errors['Email2']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Phone")}
            type="number"
            required={true}
            placeholder="Phone"
            name="Phone"
            value={props.step1.Phone}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step1Errors['Phone']?true:false}
            ErrorMsg={t(props.step1Errors['Phone'])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Second Phone")}
            type="number"
            placeholder="Second phone"
            name="Phone2"
            value={props.step1.Phone2}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            // error={props.step1Errors['Phone2']?true:false}
            // ErrorMsg={props.step1Errors['Phone2']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("City")}
            required={true}
            name="City"
            placeholder="City"
            disabled={true}
            value={props.step1.Address.City}
            // error={props.step1Errors['City']?true:false}
            // ErrorMsg={props.step1Errors['City']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Complement")}
            type="text"
            name="Complement"
            placeholder="Complement"
            value={props.step1.Complement}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            // error={props.step1Errors['Complement']?true:false}
            // ErrorMsg={props.step1Errors['Complement']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Password")}
            type="password"
            name="Password"
            required={true}
            placeholder="Password"
            value={props.step1.Password}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step1Errors['Password']?true:false}
            ErrorMsg={t(props.step1Errors['Password'])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>  
          <TextField
            label={t("Confirm Password")}
            required={true}
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm password"
            value={props.step1.ConfirmPassword}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);  
            }}
            error={props.step1Errors['ConfirmPassword']?true:false}
            ErrorMsg={t(props.step1Errors['ConfirmPassword'])}
          ></TextField>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Number of hours"
            required={true}
            type="number"
            name="Noh"
            placeholder="Number of hours"
            value={props.step1.Noh}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step1Errors['Noh']?true:false}
            ErrorMsg={props.step1Errors['Noh']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="NEPH Number"
            required={true}
            name="Neph"
            placeholder="NEPH number"
            type="text"
            value={props.step1.Neph}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
            error={props.step1Errors['Neph']?true:false}
            ErrorMsg={props.step1Errors['Neph']}
          ></TextField>
        </Grid> */}
        <Grid item xs={12} sm={12} md={4}>
          <LanguageAutoComplete
            name="Language"
            label={t("Spoken Language")}
            value={props.step1.Language}
            options={languages ? languages : []}
            placeholder="Language"
            setVal={props.onChange}
            // error={props.step1Errors['Language']?true:false}
            // ErrorMsg={props.step1Errors['Language']}
          />
        </Grid>
      </Grid>

      <Divider width="100%" borderColor="#D5E4E8" />

      <Grid container spacing={4} alignItems="flex-end">
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload front of your ID Card/Passport")}
            required={true}
            label="FrontImg"
            name="FrontImg"
            type="file"
            value={props.step1.FrontImg}
            onChange={handleFileChange}
            error={props.step1Errors['FrontImg']?true:false}
            ErrorMsg={props.step1Errors['FrontImg']}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload back of your ID Card/Passport")}
            required={true}
            label="BackImg"
            name="BackImg"
            type="file"
            value={props.step1.BackImg}
            onChange={handleFileChange}
            error={props.step1Errors['BackImg']?true:false}
            ErrorMsg={props.step1Errors['BackImg']}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload your profile picture")}
            label="ProfileImg"
            name="ProfileImg"
            type="file"
            value={props.step1.ProfileImg}
            onChange={handleFileChange}
            // error={props.step1Errors['ProfileImg']?true:false}
            // ErrorMsg={props.step1Errors['ProfileImg']}
          />
        </Grid>
      </Grid>
      <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox
            name="otherPlatform"
            className="checkbox"
            onClick={(e) =>  props.onChange('checked', !props.step1.checked)}
          />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            {t("Are you working on other platform?")}
          </Typography>
        </div>
      </div>
      {props.step1.checked ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              label={t("Which plateforms")}
              name="OtherPlateform"
              placeholder="Platform name"
              value={props.step1.OtherPlateform}
              onChange={(e) => {
                props.onChange(e.target.name, e.target.value);
              }}
            //   error={props.step1Errors['OtherPlateform']?true:false}
            // ErrorMsg={props.step1Errors['OtherPlateform']}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label={t("How much time will you give to the students of our platform?(hr/month)")}
              name="GiveTime"
              placeholder="How much time?"
              value={props.step1.GiveTime}
              onChange={(e) => {
                props.onChange(e.target.name, e.target.value);
              }}
            //   error={props.step1Errors['GiveTime']?true:false}
            // ErrorMsg={props.step1Errors['GiveTime']}
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
