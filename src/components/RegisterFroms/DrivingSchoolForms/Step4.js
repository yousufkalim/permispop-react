import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Checkbox from "@mui/material/Checkbox";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";
import DropDown from "../../Common/DropDown";
import AutoComplete from "../../Common/Autocomplete";
import axios from "axios";

const Step4 = ({ step4, setStep4, onChange }) => {
  const [addresses, setAddresses] = React.useState([]);

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
      setAddresses([]);
    } else {
      onChange("Address", { ...step4.Address, Label: e.target.value });
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
      onChange("ProfileImg", res.data.message);
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
            name="Firstname"
            placeholder="John"
            value={step4.Firstname}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Surname"
            name="Surname"
            placeholder="Smith"
            value={step4.Surname}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Date of Birth"
            name="dob"
            padding="20px 0 0 0px !important"
            width="100% !important"
            onChange={(e) => {
              onChange("Dob", new Date(e));
            }}
          ></DatePicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Place of Birth"
            name="Pob"
            placeholder="France"
            value={step4.Pob}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AutoComplete
            name="address"
            label="Address"
            value={step4.Address.Label ? step4.Address.Label : ""}
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
            placeholder="Gender"
            MenuItem={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
              { name: "Others", value: "others" },
            ]}
            onChange={(e) => {
              onChange("Gender", e.target.value);
            }}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Complement"
            name="Complement"
            placeholder="John"
            value={step4.Complement}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Zip Code"
            name="Zip"
            placeholder="0000000"
            value={step4.Address.Zip}
            disabled={true}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="City"
            name="City"
            placeholder="102 Street, building 02, NY"
            value={step4.Address.City}
            disabled={true}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Image"
            name="ProfileImg"
            label="ProfileImg"
            type="file"
            value={step4.ProfileImg}
            onChange={handleFileChange}
          />
        </Grid>
      </Grid>
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
export default Step4;
