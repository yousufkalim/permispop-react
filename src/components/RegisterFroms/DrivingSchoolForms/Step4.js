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
import moment from "moment";
import { useTranslation } from "react-i18next";

const Step4 = ({ step4, setStep4, onChange, step4Errors }) => {
  const { i18n, t } = useTranslation();
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
      onChange("Address", {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      });
      setAddresses([]);
    } else {
      onChange("Address", { ...step4.Address, Label: e.target.value });
      var config = {
        method: "get",
        url: `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}&autocomplete=1`,
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
            label={t("First Name")}
            name="Firstname"
            required={true}
            placeholder="John"
            value={step4.Firstname}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step4Errors["Firstname"] ? true : false}
            ErrorMsg={t(step4Errors["Firstname"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Surname")}
            name="Surname"
            required={true}
            placeholder="Smith"
            value={step4.Surname}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step4Errors["Surname"] ? true : false}
            ErrorMsg={t(step4Errors["Surname"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label={t("Date of Birth")}
            required={true}
            name="Dob"
            padding="20px 0 0 0px !important"
            width="100% !important"
            maxDate={new Date()}
            // onChange={(e) => {
            //   onChange("Dob", new Date(e));
            // }}

            onChange={(e) => {
              onChange("Dob", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
            value={step4.Dob}
            error={step4Errors["Dob"] ? true : false}
            ErrorMsg={step4Errors["Dob"]}
          ></DatePicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Place of Birth")}
            required={true}
            name="Pob"
            placeholder="France"
            value={step4.Pob}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step4Errors["Pob"] ? true : false}
            ErrorMsg={t(step4Errors["Pob"])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AutoComplete
            name="Address"
            required={true}
            label={t("Address")}
            value={step4.Address.Label}
            options={addresses}
            placeholder={t("Address")}
            onChangeAddress={(e) => {
              handleAddress(e);
            }}
            error={step4Errors["Address"] ? true : false}
            ErrorMsg={t(step4Errors["Address"])}
            onAddressSelect={(e) => handleSelectAddress(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label={t("Gender")}
            required={true}
            name="Gender"
            placeholder="Gender"
            MenuItem={[
              { name: t("Male"), value: "male" },
              { name: t("Female"), value: "female" },
              { name: t("Others"), value: "others" },
            ]}
            onChange={(e) => {
              onChange("Gender", e.target.value);
            }}
            error={step4Errors["Gender"] ? true : false}
            ErrorMsg={step4Errors["Gender"]}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Complement")}
            name="Complement"
            placeholder="John"
            value={step4.Complement}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            // error={step4Errors['Complement']?true:false}
            // ErrorMsg={step4Errors['Complement']}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            required={true}
            label={t("Zip Code")}
            name="Zip"
            placeholder="0000000"
            value={step4.Address.Zip}
            disabled={true}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("City")}
            required={true}
            name="City"
            placeholder="102 Street, building 02, NY"
            value={step4.Address.City}
            disabled={true}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload your Image")}
            required={true}
            name="ProfileImg"
            label="ProfileImg"
            type="file"
            value={step4.ProfileImg.split("_").slice(1).join("_")}
            onChange={handleFileChange}
            error={step4Errors["ProfileImg"] ? true : false}
            ErrorMsg={step4Errors["ProfileImg"]}
          />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox
            defaultChecked
            className="checkbox"
            name="TermAndCondition"
            value={step4.TermAndCondition}
            onClick={() =>
              setStep4({ ...step4, TermAndCondition: !step4.TermAndCondition })
            }
          />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            {t("Terms and Condition applied")}
          </Typography>
        </div>
      </div>
    </Box>
  );
};
export default Step4;
