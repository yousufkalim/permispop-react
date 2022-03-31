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

import moment from "moment";

const Step3 = ({ step3, setStep3, onChange }) => {
  const [FirstRegDate, setFirstRegDate] = React.useState(new Date());
  const [StartDate, setStartDate] = React.useState(new Date());
  const [EndDate, setEndDate] = React.useState(new Date());
  const [TechnicalControl, setTechnicalControl] = React.useState(new Date());
  const [TechnicalControlEndDate, setTechnicalControlEndDate] = React.useState(
    new Date()
  );

  const handleFileChange = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "VehicleImg") {
        onChange("VehicleImg", res.data.message);
      } else if (e.target.name === "VehicleRegImg") {
        onChange("VehicleRegImg", res.data.message);
      } else if (e.target.name === "GreenCard") {
        onChange("GreenCard", res.data.message);
      } else if (e.target.name === "CtImg") {
        onChange("CtImg", res.data.message);
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
        {console.log("step3", step3)}
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
        <Typography className="Heading1">Vehicle Details</Typography>
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Date of the 1st Registration"
            value={step3.FristRegDate}
            name="FristRegDate"
            onChange={(e) => {
              onChange("FristRegDate", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
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
            label="Brand"
            placeholder="Select Option"
            name="Brand"
            value={step3.Brand}
            onChange={(e) => {
              onChange("Brand", e.target.value);
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
            label="Model"
            placeholder="Selcet Modal"
            name="Model"
            value={step3.Model}
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
              onChange("Model", e.target.value);
            }}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Number Plate"
            type="text"
            name="NumberPlate"
            placeholder="Numeric"
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Color"
            name="Color"
            type="text"
            placeholder="Select Color"
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Gearbox"
            name="GearBox"
            value={step3.GearBox}
            MenuItem={[
              { name: "Auto", value: "Auto" },
              { name: "Manual", value: "Manual" },
            ]}
            onChange={(e) => {
              onChange("GearBox", e.target.value);
            }}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Energy"
            placeholder="Select"
            name="Energy"
            value={step3.Energy}
            MenuItem={[
              { name: "Diesel", value: "Diesel" },
              { name: "Petrol", value: "Petrol" },
              { name: "Hybrid", value: "Hybrid" },
              { name: "Electric", value: "Electric" },
              { name: "GPL", value: "GPL" },
              { name: "Others", value: "Others" },
            ]}
            onChange={(e) => {
              onChange("Energy", e.target.value);
            }}
          ></DropDown>
        </Grid>
      </Grid>
      <div className="VehicleSection">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload your Image"
              label="YourImg"
              name="VehicleImg"
              value={step3.VehicleImg}
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload Vehicle Registration Certificate"
              label="RegCertificate"
              name="VehicleRegImg"
              value={step3.VehicleRegImg}
              onChange={handleFileChange}
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
            label="Insurer"
            type="text"
            placeholder="John"
            name="VehicleInsurer"
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Police Nunber"
            type="text"
            name="PoliceNumber"
            placeholder="Numeric"
            onChange={(e) => {
              setStep3({ ...step3, [e.target.name]: e.target.value });
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="Start Date"
            value={step3.StartDate}
            name="StartDate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            onChange={(e) => {
              onChange("StartDate", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
          />
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="End Date"
            name="EndDate"
            value={step3.EndDate}
            padding="20px 0 0 0px !important"
            width="100% !important"
            onChange={(e) => {
              onChange("EndDate", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
          />
          <div className="borderbottom"></div>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload Scanned Green Card"
              label="GreenCard"
              name="GreenCard"
              value={step3.GreenCard}
              onChange={handleFileChange}
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
            value={step3.TechControlDate}
            name="TechControlDate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            onChange={(e) => {
              onChange(
                "TechControlDate",
                moment(e).format("YYYY-MM-DDThh:mm:ss")
              );
            }}
          />
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label="End Date"
            value={step3.TechEndDate}
            name="TechEndDate"
            padding="20px 0 0 0px !important"
            width="100% !important"
            onChange={(e) => {
              onChange("TechEndDate", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
          />
          <div className="borderbottom"></div>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Scan and upload your CT"
              label="YourCt"
              name="CtImg"
              value={step3.CtImg}
              onChange={handleFileChange}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};
export default Step3;
