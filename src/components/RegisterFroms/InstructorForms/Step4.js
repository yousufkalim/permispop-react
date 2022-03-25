import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DropDown from "../../Common/DropDown";
import Datepicker from "../../Common/DatePicker";

import API from "../../../api/index";

const Step4 = (props) => {
  // const [step4, setStep4] = React.useState({
  //   FirstRegistration: "",
  //   Brand: "",
  //   Model: "",
  //   NumPlate: "",
  //   Color: "",
  //   Energy: "",
  //   Gearbox: "",
  //   Insurer: "",
  //   PoliceNum: "",
  //   StartDate: "",
  //   DateTechControl: "",
  //   TechEndDate: "",
  //   Photo: "",
  //   RegCertificate: "",
  //   GreenCard: "",
  //   Ct: "",
  // });

  const handleChange = async (e) => {
    console.log(e.target.files[0]);

    const formdata = new FormData();

    if (e.targer.name) formdata.append(`file`, e.target.files[0]);
    // let res = await api("post", "/uploadImage", formdata);
    const response = await API("post", "Personal/UploadProfileImage", formdata);
    if (response) {
      console.log("res", response);
    }
  };
  const [Startvalue, setStartValue] = useState(new Date());
  const handleStartdate = (newValue) => {
    setStartValue(newValue);
  };
  const [Endvalue, setEndValue] = useState(new Date());
  const handleEnddate = (newValue) => {
    setEndValue(newValue);
  };

  const [technicalcontrol, setTechnicalcontrol] = useState(new Date());
  const handleTechnicalcontrol = (newValue) => {
    setTechnicalcontrol(newValue);
  };

  const [technicalcontrolendvalue, setTechnicalcontrolendvalue] = useState(
    new Date()
  );
  const handleTechnicalcontrolendvalue = (newValue) => {
    setTechnicalcontrolendvalue(newValue);
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
            label="Date of 1st Registration"
            name="regDate"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Brand" name="" placeholder="Smith"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Model"
            name="model"
            placeholder="102 Street, building 02, NY"
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Number Plate"
            name="numPlate"
            placeholder="19-10-1992 "
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Color" name="color" placeholder="Red"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Energy"
            name="energy"
            placeholder="712333"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="GearBox"
            name="gearbox"
            placeholder="Auto"
          ></DropDown>
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 2% 0px" />
      <Typography className="Heading1">Vehicle Insurance</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 3% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Insurer"
            name="insurer"
            placeholder="Male"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Police Number"
            name="policeNum"
            placeholder="arslan.alikh@gmail.com"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label="Start Date"
            name="startdate"
            placeholder="19-10-2021"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={Startvalue}
            onChange={handleStartdate}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="End Date"
            name="enddate"
            placeholder="19-10-2021"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={Endvalue}
            onChange={handleEnddate}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 2% 0px" />
      <Typography className="Heading1">Technical Control</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 3% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Date of Technical Control"
            name="techControlDate"
            placeholder="19-10-2021"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={technicalcontrol}
            onChange={handleTechnicalcontrol}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="End Date"
            name="techEndDate"
            placeholder="19-10-2021"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={technicalcontrolendvalue}
            onChange={handleTechnicalcontrolendvalue}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 3% 0px" />
      <Grid container spacing={4} alignItems="flex-end">
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker title="Upload Image" name="photo" label="uploadImg" />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload Vehicle Registration Certificate"
            label="Regcertificate"
            name="regCertificate"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload Scanned Green Card"
            name="greencard"
            label="GreenCard"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Scan and Upload your CT"
            name="ct"
            label="UploadCT"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Step4;
