import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import API from "../../../api/index";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DatePicker from "../../Common/DatePicker";
import validate from "validate.js";

const Step2 = ({ step2, setStep2, onChange }) => {
  const schema = {
    Siret: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 14,
        minimum: 14,
      },
    },
    Kbls: {
      presence: { allowEmpty: false, message: "is required" },
    },
    CompanyInsurer: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 20,
        minimum: 3,
      },
    },
    CompanyPoliceNumber: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 10,
        minimum: 10,
      },
    },
    RcPro: {
      presence: { allowEmpty: false, message: "is required" },
    },
  };
  const [formState, setFormState] = useState({
    isValid: false,
    errors: {},
    touched: {},
    values: {},
    age: {},
  });
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleError = (event) => {
    event.persist();
    //will set the form state
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

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
        <div className="DrivingSchool">
          <Grid item xs={12} sm={12} md={12}>
            <div className="DrivingSchool1">
              <TextField
                error={hasError("Siret")}
                ErrorMsg={hasError("Siret") ? formState.errors.Siret[0] : null}
                label="SIRET Number"
                type="text"
                name="Siret"
                placeholder="Must be 14 Digits"
                onChange={(e) => {
                  setStep2({ ...step2, [e.target.name]: e.target.value });
                  handleError(e);
                }}
              ></TextField>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div className="DrivingSchool2">
              <FilePicker
                error={hasError("Kbls")}
                ErrorMsg={hasError("Kbls") ? formState.errors.Kbls[0] : null}
                title="Upload your KBLS"
                label="Kbls"
                name="Kbls"
                onChange={(e) => {
                  setStep2({ ...step2, [e.target.name]: e.target.value });
                  handleError(e);
                }}
              />
            </div>
          </Grid>
        </div>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Insurance Company</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("CompanyInsurer")}
            ErrorMsg={
              hasError("CompanyInsurer")
                ? formState.errors.CompanyInsurer[0]
                : null
            }
            label="Insurer"
            type="text"
            placeholder="John"
            name="CompanyInsurer"
            onChange={(e) => {
              setStep2({ ...step2, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("CompanyPoliceNumber")}
            ErrorMsg={
              hasError("CompanyPoliceNumber")
                ? formState.errors.CompanyPoliceNumber[0]
                : null
            }
            label="Police Nunber"
            type="text"
            placeholder="Numeric"
            name="CompanyPoliceNumber"
            onChange={(e) => {
              setStep2({ ...step2, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Expiration date of your insurance"
            // value={ExpirationDate}
            // onChange={handleExpirationDateChange}
            padding="20px 0 0 0px !important"
            width="100% !important"
          />
          <div className="borderbottom"></div>

          {/* replaced  */}
          {/* <TextField
            label="Expiration date of your insurance"
            placeholder="John"
          ></TextField> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            error={hasError("RcPro")}
            ErrorMsg={hasError("RcPro") ? formState.errors.RcPro[0] : null}
            title="Upload your RC Pro"
            name="RcPro"
            label="LicenseFront"
            onChange={(e) => {
              setStep2({ ...step2, [e.target.name]: e.target.value });
              handleError(e);
            }}
          />
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
    </Box>
  );
};
export default Step2;
