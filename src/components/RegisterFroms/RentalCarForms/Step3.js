import React from "react";
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

const Step3 = (props) => {
  const [FirstRegDate , setFirstRegDate] = React.useState(new Date())
  const [StartDate , setStartDate] = React.useState(new Date())
  const [EndDate , setEndDate] = React.useState(new Date())
  const [TechnicalControl , setTechnicalControl] = React.useState(new Date())
  const [TechnicalControlEndDate , setTechnicalControlEndDate] = React.useState(new Date())
 
  const [FirstRegdate , setFirstRegdatedate] = React.useState(new Date())
  const [step3, setStep3] = React.useState({
    FristRegDate: "",
    Brand: "",
    Model: "",
    NumberPlate: "",
    Color: "",
    GearBox: "",
    Energy: "",
    VehicleImg: "",
    VehicleRegImg: "",
    VehicleInsurer: "",
    PoliceNumber: "",
    StartDate: "",
    EndDate: "",
    GreenCard: "",
    TechControlDate: "",
    TechEndDate: "",
    CtImg: "",
  });
  const handleFirstRegDateChange = (newvalue) => {
    setFirstRegDate(newvalue);
  }
  const handleStartDateChange = (newvalue) => {
    setStartDate(newvalue);
  }
  const handleEndDateChange = (newvalue) => {
    setEndDate(newvalue);
  }
  const handleTechnicalControl = (newvalue) => {
    setTechnicalControl(newvalue);
  }
  const handleTechnicalControlEndDate = (newvalue) => {
    setTechnicalControlEndDate(newvalue);
  }
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
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
        <Typography className="Heading1">Insurance Company</Typography>
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker 
          label="Date of the 1st Registration"
          value={FirstRegDate}
          onChange={handleFirstRegDateChange}

          />
          {/* Replaced  */}
          {/* <TextField
            label="Date of the 1st Registration"
            placeholder="John"
          ></TextField> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Brand" placeholder="Select Option" 
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
          <DropDown label="Model" placeholder="Selcet Modal"
          MenuItem={[
            { name: "Select Model", value: "Select Model" },
            { name: "Vantage Roadster(2021)", value: "Vantage Roadster(2021)" },
            { name: "XF Sportbrake(2021)", value: "XF Sportbrake(2021)" },
            { name: "XF (2021)", value: "XF (2021" },
            { name: "XE (2021)", value: "XE (2021)" },
            { name: "F-Type Convertible(2021)", value: "F-Type Convertible(2021)" },
            { name: "F-Type (2021)", value: "F-Type (2021)" },
            { name: "F-Pace SVR (2021)", value: "F-Pace SVR (2021)" },
            { name: "F-Pace(2021)", value: "F-Pace(2021)" },
            { name: "E-Pace(2021)", value: "E-Pace(2021)" },
            { name: "C-Type Continuation(2021)", value: "C-Type Continuation(2021)" },
            { name: "XE Reims Edition(2020)", value: "XE Reims Edition(2020)" },
            ]}></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Number Plate" placeholder="Numeric"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Color" placeholder="Select Color"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Gearbox"
          MenuItem={[
            { name: "Auto", value: "Auto" },
            { name: "Manual", value: "Manual" },
            ]}></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Energy" placeholder="Select"
          MenuItem={[
            { name: "Diesel", value: "Diesel" },
            { name: "Petrol", value: "Petrol" },
            { name: "Hybrid", value: "Hybrid" },
            { name: "Electric", value: "Electric" },
            { name: "GPL", value: "GPL" },
            { name: "Others", value: "Others" },
            ]}
          ></DropDown>
        </Grid>
      </Grid>
      <div className="VehicleSection">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker title="Upload your Image" label="YourImg" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker
              title="Upload Vehicle Registration Certificate"
              label="RegCertificate"
            />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Vehicle Insurance</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Insurer" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Police Nunber" placeholder="Numeric"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker label="Start Date" 
            value={StartDate}
            onChange={handleStartDateChange}
          ></DatePicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker label="End Date"
            value={EndDate}
            onChange={handleEndDateChange}
            ></DatePicker>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker title="Upload Scanned Green Card" label="GreenCard" />
          </Grid>
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Typography className="Heading1">Technical Control</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker
            label="Date of Technical Control"
            value={TechnicalControl}
            onChange={handleTechnicalControl}
          ></DatePicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker label="End Date" 
            value={TechnicalControlEndDate}
            onChange={handleTechnicalControlEndDate}
          ></DatePicker>
        </Grid>
      </Grid>
      <div className="VehicleInsurance">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <FilePicker title="Scan and upload your CT" label="YourCt" />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};
export default Step3;
