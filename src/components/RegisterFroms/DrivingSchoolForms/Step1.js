import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import API from "../../../api/index";
import AutoComplete from "../../Common/Autocomplete";
import LanguageAutoComplete from "../../Common/LanguageAutoComplete";
import { useTranslation } from "react-i18next";

const Step1 = ({ step1, setStep1, onChange, step1Errors }) => {
  const { i18n, t } = useTranslation();
  const [addresses, setAddresses] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    handleLanguage();
  }, []);

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
            label={t("Tradename")}
            name="TradeName"
            type="text"
            required={true}
            placeholder="John"
            value={step1.TradeName}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["TradeName"] ? true : false}
            ErrorMsg={t(step1Errors["TradeName"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Company Name")}
            required={true}
            name="CompanyName"
            placeholder="Smith.PVT"
            type="text"
            value={step1.CompanyName}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["CompanyName"] ? true : false}
            ErrorMsg={t(step1Errors["CompanyName"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AutoComplete
            name="Address"
            required={true}
            label={t("Address")}
            value={step1.Address.Label}
            options={addresses}
            placeholder={t("Address")}
            onChangeAddress={(e) => {
              handleAddress(e);
            }}
            onAddressSelect={(e) => handleSelectAddress(e)}
            error={step1Errors["Address"] ? true : false}
            ErrorMsg={t(step1Errors["Address"])}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Complement")}
            name="Complement"
            placeholder="Text"
            type="text"
            value={step1.Complement}
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
            placeholder="Enter City"
            // error={step1Errors['City']?true:false}
            // ErrorMsg={step1Errors['City']}
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
            value={step1.Address.City}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            required={true}
            label={t("Zip Code")}
            name="Zip"
            type="number"
            disabled={true}
            value={step1.Address.Zip}
            placeholder="00000"
            // error={step1Errors['Zip']?true:false}
            // ErrorMsg={step1Errors['Zip']}
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Email")}
            name="Email"
            required={true}
            type="email"
            placeholder="Email"
            value={step1.Email}
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
            placeholder="smart_coolkyo@yahoo.com"
            value={step1.Email2}
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
            placeholder="0000000000000"
            value={step1.Phone}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["Phone"] ? true : false}
            ErrorMsg={t(step1Errors["Phone"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            name="Phone2"
            label={t("Second Phone")}
            type="number"
            placeholder="00000000000000"
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
            placeholder="**************"
            value={step1.Password}
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
            name="Password2"
            type="password"
            placeholder="**************"
            value={step1.Password2}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step1Errors["Password2"] ? true : false}
            ErrorMsg={t(step1Errors["Password2"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} style={{ marginBottom: "20px" }}>
          <LanguageAutoComplete
            name="Language"
            label={t("Spoken Language")}
            value={step1.Language}
            options={languages ? languages : []}
            placeholder={t("Language")}
            setVal={onChange}
            // error={step1Errors['Language']?true:false}
            // ErrorMsg={step1Errors['Language']}
          />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="7% 0px 2% 0px" />
      <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox
            onClick={(e) => {
              onChange("OtherPlateform", !step1.OtherPlateform);
            }}
            name="OtherPlateform"
            className="checkbox"
            checked={step1.OtherPlateform}
            // error={step1Errors['OtherPlateform']?true:false}
            // ErrorMsg={step1Errors['OtherPlateform']}
          />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            {t("Are you working on other platform?")}
          </Typography>
        </div>
        {step1.OtherPlateform ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={5} sx={{ marginRight: "1%" }}>
              <TextField
                name="Platform"
                label={t("Which platform(s)?")}
                placeholder="Platform name"
                type="text"
                value={step1.Platform}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                // error={step1Errors['Platform']?true:false}
                // ErrorMsg={step1Errors['Platform']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <TextField
                label={t(
                  "How much time will you give to the students of our platform?(hr/month)"
                )}
                placeholder="No. of hours"
                name="Hours"
                type="text"
                value={step1.Hours}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                // error={step1Errors['Hours']?true:false}
                // ErrorMsg={step1Errors['Hours']}
              ></TextField>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </div>
      <div className="termsConditionsCheckbox">
        <Checkbox
          className="checkbox"
          name="CPF"
          onClick={(e) => {
            setStep1({
              ...step1,
              ["CPF"]: e.target.checked,
            });
          }}
          // error={step1Errors['CPF']?true:false}
          // ErrorMsg={step1Errors['CPF']}
          checked={step1.CPF}
        />
        <Typography variant="body1" className="termsConditionsCheckboxTitle">
          {t("I accept CPF financement")}
        </Typography>
      </div>
    </Box>
  );
};
export default Step1;
