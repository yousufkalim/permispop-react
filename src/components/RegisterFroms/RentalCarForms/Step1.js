import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";
import validate from "validate.js";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { makeStyles } from "@mui/styles";
// import TextField from "@mui/material/TextField";

const Step1 = ({ step1, setStep1, onChange, step1error, setStep1Error }) => {
  const [Dob, setDob] = useState();
  const handleDob = (newValue) => {
    setDob(newValue);
  };
  const schema = {
    FirstName: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 32,
        minimum: 3,
      },
    },
    SurName: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 32,
        minimum: 3,
      },
    },
    dob: {
      presence: { allowEmpty: false, message: "is required" },
      // length: {
      //   minimum: 3,
      // },
    },
    Pob: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 33,
        minimum: 4,
      },
    },
    address: {
      presence: { allowEmpty: false, message: "is required" },
    },
    Gender: {
      presence: { allowEmpty: false, message: "is required" },
      // length: {
      //   maximum: 2,
      //   minimum: 4,
      // },
    },
    Complement: {
      presence: { allowEmpty: true, message: "is required" },
      length: {
        minimum: 3,
        maximum: 15,
      },
    },
    City: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 33,
        minimum: 4,
      },
    },
    Zip: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        minimum: 5,
        maximum: 5,
      },
    },
    Email: {
      presence: { allowEmpty: false, message: "is required" },
    },
    Phone: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 10,
        minimum: 10,
      },
    },
    Email2: {
      presence: { allowEmpty: true, message: "is required" },
    },
    Phone2: {
      presence: { allowEmpty: true, message: "is required" },
      length: {
        minimum: 10,
        maximum: 10,
      },
    },

    Password: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        minimum: 8,
      },
    },
    ConfirmPassword: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        minimum: 8,
      },
    },
    TimeOnPlatform: {
      presence: { allowEmpty: true, message: "is required" },
      length: {
        maximum: 7,
        minimum: 1,
      },
    },
    FrontSideimg: {
      presence: { allowEmpty: false, message: "is required" },
    },
    BackSideimg: {
      presence: { allowEmpty: false, message: "is required" },
    },
    ProfileImg: {
      presence: { allowEmpty: false, message: "is required" },
    },
  };

  useEffect(() => {
    const errors = validate(step1error.values, schema);

    setStep1Error((step1error) => ({
      ...step1error,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [step1error.values]);

  const handleError = (event) => {
    event.persist();
    //will set the form state
    setStep1Error((step1error) => ({
      ...step1error,
      values: {
        ...step1error.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...step1error.touched,
        [event.target.name]: true,
      },
    }));
  };
  const hasError = (field) =>
    step1error.touched[field] && step1error.errors[field] ? true : false;

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
      {console.log("props", step1)}

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            variant="standard"
            error={hasError("FirstName")}
            ErrorMsg={
              hasError("FirstName") ? step1error.errors.FirstName[0] : null
            }
            label="First Name"
            name="FirstName"
            type="text"
            placeholder="John"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("SurName")}
            ErrorMsg={hasError("SurName") ? step1error.errors.SurName[0] : null}
            label="Surname"
            name="SurName"
            type="text"
            placeholder="Cena"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Date of Birth"
            value={Dob}
            onChange={handleDob}
            name="Dob"
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
            error={hasError("Pob")}
            ErrorMsg={hasError("Pob") ? step1error.errors.Pob[0] : null}
            label="Place of Birth"
            type="text"
            name="Pob"
            placeholder="City, Country"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("address")}
            ErrorMsg={hasError("address") ? step1error.errors.address[0] : null}
            label="Address"
            name="address"
            type="text"
            placeholder="102 Street, building 02, NY"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            error={hasError("Gender")}
            ErrorMsg={hasError("Gender") ? step1error.errors.SurName[0] : null}
            label="Gender"
            name="Gender"
            placeholder="ali"
            MenuItem={[
              { name: "Male", value: "Male" },
              { name: "Female", value: "Female" },
              { name: "others", value: "Others" },
            ]}
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("Complement")}
            ErrorMsg={
              hasError("Complement") ? step1error.errors.Complement[0] : null
            }
            label="Complement"
            name="Complement"
            type="text"
            placeholder="TextField"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("City")}
            ErrorMsg={hasError("City") ? step1error.errors.City[0] : null}
            label="City"
            name="City"
            type="text"
            placeholder="Enter City"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("Zip")}
            ErrorMsg={hasError("Zip") ? step1error.errors.Zip[0] : null}
            label="Zip Code"
            name="Zip"
            type="number"
            placeholder="00000"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("Email")}
            ErrorMsg={hasError("Email") ? step1error.errors.Email[0] : null}
            label="Email"
            name="Email"
            type="email"
            placeholder="abc@xyz.com"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("Email2")}
            ErrorMsg={hasError("Email2") ? step1error.errors.Email2[0] : null}
            label="Second Email"
            name="Email2"
            type="email"
            placeholder="abc@xyz.com"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("Phone")}
            ErrorMsg={hasError("Phone") ? step1error.errors.Phone[0] : null}
            label="Phone"
            name="Phone"
            type="text"
            placeholder="1234567890"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("Phone2")}
            ErrorMsg={hasError("Phone2") ? step1error.errors.Phone2[0] : null}
            label="Second Phone"
            name="Phone2"
            type="text"
            placeholder="1234567890"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("Password")}
            ErrorMsg={
              hasError("Password") ? step1error.errors.Password[0] : null
            }
            label="Password"
            name="Password"
            type="password"
            placeholder="******"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("ConfirmPassword")}
            ErrorMsg={
              hasError("ConfirmPassword")
                ? step1error.errors.ConfirmPassword[0]
                : null
            }
            label="Confirm Password"
            name="ConfirmPassword"
            type="password"
            placeholder="******"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("TimeOnPlatform")}
            ErrorMsg={
              hasError("TimeOnPlatform")
                ? step1error.errors.TimeOnPlatform[0]
                : null
            }
            label="How much time you will give to students of our platforms?"
            name="TimeOnPlatform"
            type="number"
            placeholder="1"
            onChange={(e) => {
              setStep1({ ...step1, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
      </Grid>
      <div className="DrivingInstrutor">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              error={hasError("FrontSideimg")}
              ErrorMsg={
                hasError("FrontSideimg")
                  ? step1error.errors.FrontSideimg[0]
                  : null
              }
              title="Upload your authorization front side"
              name="FrontSideimg"
              label="AuthFrontSide"
              value={step1.FrontSideimg}
              onChange={(e) => {
                setStep1({ ...step1, [e.target.name]: e.target.value });
                handleError(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              error={hasError("BackSideimg")}
              ErrorMsg={
                hasError("BackSideimg")
                  ? step1error.errors.BackSideimg[0]
                  : null
              }
              title="Upload your authorization back side"
              name="BackSideimg"
              label="AuthBackSide"
              value={step1.BackSideimg}
              onChange={(e) => {
                setStep1({ ...step1, [e.target.name]: e.target.value });
                handleError(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              error={hasError("ProfileImg")}
              ErrorMsg={
                hasError("ProfileImg") ? step1error.errors.ProfileImg[0] : null
              }
              title="Upload your Profile Picture"
              name="ProfileImg"
              label="ProfileImg"
              value={step1.ProfileImg}
              onChange={(e) => {
                setStep1({ ...step1, [e.target.name]: e.target.value });
                handleError(e);
              }}
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
    </Box>
  );
};
export default Step1;
