import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";
import { Select } from "@mui/material";
import validate from "validate.js";

const Step3 = ({ step3, setStep3, onChange }) => {
  const schema = {
    FristRegDate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    Brand: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 14,
        minimum: 2,
      },
    },
    Model: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 20,
        minimum: 3,
      },
    },
    NumberPlate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    Color: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 20,
        minimum: 3,
      },
    },

    GearBox: {
      presence: { allowEmpty: false, message: "is required" },
    },
    Energy: {
      presence: { allowEmpty: false, message: "is required" },
    },
    VehicleImg: {
      presence: { allowEmpty: false, message: "is required" },
    },
    VehicleRegImg: {
      presence: { allowEmpty: false, message: "is required" },
    },
    VehicleInsurer: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 20,
        minimum: 3,
      },
    },
    PoliceNumber: {
      presence: { allowEmpty: false, message: "is required" },
    },
    StartDate: {
      presence: { allowEmpty: false, message: "is required" },
    },

    EndDate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    GreenCard: {
      presence: { allowEmpty: false, message: "is required" },
    },
    TechControlDate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    TechEndDate: {
      presence: { allowEmpty: false, message: "is required" },
    },
    CtImg: {
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
  const hasError = (field) => {
    console.log("field", field);
    return formState.touched[field] && formState.errors[field] ? true : false;
  };

  const [FirstRegDate, setFirstRegDate] = React.useState(new Date());
  const [StartDate, setStartDate] = React.useState(new Date());
  const [EndDate, setEndDate] = React.useState(new Date());
  const [TechnicalControl, setTechnicalControl] = React.useState(new Date());
  const [TechnicalControlEndDate, setTechnicalControlEndDate] = React.useState(
    new Date()
  );

  const [FirstRegdate, setFirstRegdatedate] = React.useState(new Date());

  const handleFirstRegDateChange = (newvalue) => {
    if (newvalue === null) {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          ["FristRegDate"]: "",
        },
        touched: {
          ...formState.touched,
          ["FristRegDate"]: true,
        },
      }));
    } else {
      setFirstRegDate(newvalue);
      setStep3({ ...step3, ["FristRegDate"]: newvalue });
    }
  };
  const handleStartDateChange = (newvalue) => {
    setStartDate(newvalue);
  };
  const handleEndDateChange = (newvalue) => {
    setEndDate(newvalue);
  };
  const handleTechnicalControl = (newvalue) => {
    setTechnicalControl(newvalue);
  };
  const handleTechnicalControlEndDate = (newvalue) => {
    setTechnicalControlEndDate(newvalue);
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
        {console.log("step3", formState)}
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
        <Typography className="Heading1 CarRentalH">Insurance Company</Typography>
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            error={hasError("FristRegDate")}
            ErrorMsg={
              hasError("FristRegDate") ? formState.errors.FristRegDate[0] : null
            }
            label="Date of the 1st Registration"
            value={FirstRegDate}
            name="FristRegDate"
            onChange={handleFirstRegDateChange}
            padding="20px 0 0 0px !important"
            width="100% !important"
          />
          <div className="borderbottom"></div>

          {/* Replaced  */}
          {/* <TextField
            label="Date of the 1st Registration"
            placeholder="John"
          ></TextField> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            error={hasError("Brand")}
            ErrorMsg={hasError("Brand") ? formState.errors.Brand[0] : null}
            label="Brand"
            placeholder="Select Option"
            name="Brand"
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
              handleError(e);
            }}
            MenuItem={[
              { name: "Select Brand", value: "Select Brand" },
              { name: "Alfa Romeo", value: "Alfa Romeo" },
              { name: "Aston Martin", value: "Aston Martin" },
              { name: "Audi", value: "Audi" },
              { name: "Ford", value: "Ford" },
              { name: "BMW", value: "BMW" },
              { name: "HONDA", value: "HONDA" },
              { name: "Bentley", value: "Bentley" },
              { name: "Bugatti", value: "Bugatti" },
              { name: "Chrysler", value: "Chrysler" },
              { name: "Citroen", value: "Citroen" },
              { name: "DS", value: "DS" },
              { name: "Dacia", value: "Dacia" },
              { name: "Farrari", value: "Farrari" },
              { name: "Fait", value: "Fait" },
              { name: "Hyundai", value: "Hyundai" },
              { name: "Infiniti", value: "Infiniti" },
              { name: "Iveco", value: "Iveco" },
              { name: "Juguar", value: "Juguar" },
              { name: "Jeep", value: "Jeep" },
              { name: "Kia", value: "Kia" },
              { name: "Lamborghini", value: "Lamborghini" },
              { name: "Land Rover", value: "Land Rover" },
              { name: "Lexus", value: "Lexus" },
              { name: "Mazda", value: "Mazda" },
              { name: "Mercedes-Benz", value: "Mercedes-Benz" },
              { name: "Mini", value: "Mini" },
              { name: "Mitsubishi", value: "Mitsubishi" },
              { name: "Nissan", value: "Nissan" },
              { name: "opel", value: "opel" },
              { name: "Peugeot", value: "Peugeot" },
              { name: "Porsche", value: "Porsche" },
              { name: "Renault", value: "Renault" },
              { name: "Rover", value: "Rover" },
              { name: "Seat", value: "Seat" },
              { name: "Suzuki", value: "Suzuki" },
              { name: "Toyota", value: "Toyota" },
              { name: "Tesla", value: "Tesla" },
              { name: "Volkswagen", value: "Volkswagen" },
              { name: "Volvo", value: "Volvo" },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            error={hasError("Model")}
            ErrorMsg={hasError("Model") ? formState.errors.Model[0] : null}
            label="Model"
            placeholder="Selcet Modal"
            name="Model"
            MenuItem={[
              { name: "Select Model", value: "Select Model" },
              {
                name: "Vantage Roadster(2021)",
                value: "Vantage Roadster(2021)",
              },
              { name: "XF Sportbrake(2021)", value: "XF Sportbrake(2021)" },
              { name: "XF (2021)", value: "XF (2021" },
              { name: "XE (2021)", value: "XE (2021)" },
              {
                name: "F-Type Convertible(2021)",
                value: "F-Type Convertible(2021)",
              },
              { name: "F-Type (2021)", value: "F-Type (2021)" },
              { name: "F-Pace SVR (2021)", value: "F-Pace SVR (2021)" },
              { name: "F-Pace(2021)", value: "F-Pace(2021)" },
              { name: "E-Pace(2021)", value: "E-Pace(2021)" },
              {
                name: "C-Type Continuation(2021)",
                value: "C-Type Continuation(2021)",
              },
              {
                name: "XE Reims Edition(2020)",
                value: "XE Reims Edition(2020)",
              },
            ]}
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("NumberPlate")}
            ErrorMsg={
              hasError("NumberPlate") ? formState.errors.NumberPlate[0] : null
            }
            label="Number Plate"
            type="text"
            name="NumberPlate"
            placeholder="Numeric"
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("Color")}
            ErrorMsg={hasError("Color") ? formState.errors.Color[0] : null}
            label="Color"
            name="Color"
            type="text"
            placeholder="Select Color"
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            error={hasError("GearBox")}
            ErrorMsg={hasError("GearBox") ? formState.errors.GearBox[0] : null}
            label="Gearbox"
            name="GearBox"
            MenuItem={[
              { name: "Auto", value: "Auto" },
              { name: "Manual", value: "Manual" },
            ]}
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            error={hasError("Energy")}
            ErrorMsg={hasError("Energy") ? formState.errors.Energy[0] : null}
            label="Energy"
            placeholder="Select"
            name="Energy"
            MenuItem={[
              { name: "Diesel", value: "Diesel" },
              { name: "Petrol", value: "Petrol" },
              { name: "Hybrid", value: "Hybrid" },
              { name: "Electric", value: "Electric" },
              { name: "GPL", value: "GPL" },
              { name: "Others", value: "Others" },
            ]}
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></DropDown>
        </Grid>
      </Grid>
      <div className="VehicleSection">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              error={hasError("VehicleImg")}
              ErrorMsg={
                hasError("VehicleImg") ? formState.errors.VehicleImg[0] : null
              }
              title="Upload your Image"
              label="YourImg"
              name="VehicleImg"
              onChange={(e) => {
                setStep3({ ...step3, [e.target.name]: e.target.value });
                handleError(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              error={hasError("VehicleRegImg")}
              ErrorMsg={
                hasError("VehicleRegImg")
                  ? formState.errors.VehicleRegImg[0]
                  : null
              }
              title="Upload Vehicle Registration Certificate"
              label="RegCertificate"
              name="VehicleRegImg"
              onChange={(e) => {
                setStep3({ ...step3, [e.target.name]: e.target.value });
                handleError(e);
              }}
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Vehicle Insurance</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("VehicleInsurer")}
            ErrorMsg={
              hasError("VehicleInsurer")
                ? formState.errors.VehicleInsurer[0]
                : null
            }
            label="Insurer"
            type="text"
            placeholder="John"
            name="VehicleInsurer"
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            error={hasError("PoliceNumber")}
            ErrorMsg={
              hasError("PoliceNumber") ? formState.errors.PoliceNumber[0] : null
            }
            label="Police Nunber"
            type="text"
            name="PoliceNumber"
            placeholder="Numeric"
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
              handleError(e);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Start Date"
            value={StartDate}
            name="StartDate"
            onChange={handleStartDateChange}
            padding="20px 0 0 0px !important"
            width="100% !important"
          />
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="End Date"
            name="EndDate"
            value={EndDate}
            onChange={handleEndDateChange}
            padding="20px 0 0 0px !important"
            width="100% !important"
          />
          <div className="borderbottom"></div>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              error={hasError("GreenCard")}
              ErrorMsg={
                hasError("GreenCard") ? formState.errors.GreenCard[0] : null
              }
              title="Upload Scanned Green Card"
              label="GreenCard"
              name="GreenCard"
              onChange={(e) => {
                setStep3({ ...step3, [e.target.name]: e.target.value });
                handleError(e);
              }}
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Technical Control</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Date of Technical Control"
            value={TechnicalControl}
            name="TechControlDate"
            onChange={handleTechnicalControl}
            padding="20px 0 0 0px !important"
            width="100% !important"
          />
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="End Date"
            value={TechnicalControlEndDate}
            name="TechEndDate"
            onChange={handleTechnicalControlEndDate}
            padding="20px 0 0 0px !important"
            width="100% !important"
          />
          <div className="borderbottom"></div>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              error={hasError("CtImg")}
              ErrorMsg={hasError("CtImg") ? formState.errors.CtImg[0] : null}
              title="Scan and upload your CT"
              label="YourCt"
              name="CtImg"
              onChange={(e) => {
                setStep3({ ...step3, [e.target.name]: e.target.value });
                handleError(e);
              }}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};
export default Step3;
