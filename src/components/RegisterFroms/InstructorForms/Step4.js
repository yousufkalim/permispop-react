import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DropDown from "../../Common/DropDown";

const Step1 = (props) => {
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
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Brand" placeholder="Smith"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Model"
            placeholder="102 Street, building 02, NY"
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Number Plate" placeholder="19-10-1992 "></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Color" placeholder="Red"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Energy" placeholder="712333"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="GearBox" placeholder="Auto"></DropDown>
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 2% 0px" />
      <Typography className="Heading1">Vehicle Insurance</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 3% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Insurer" placeholder="Male"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Police Number"
            placeholder="arslan.alikh@gmail.com"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Start Date" placeholder="19-10-2021"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="End Date" placeholder="19-10-2021"></TextField>
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 2% 0px" />
      <Typography className="Heading1">Technical Control</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 3% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Date of Technical Control"
            placeholder="19-10-2021"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="End Date" placeholder="19-10-2021"></TextField>
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 3% 0px" />
      <Grid container spacing={4} alignItems="flex-end">
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker title="Upload Image" label="uploadImg" />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload Vehicle Registration Certificate"
            label="Regcertificate"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker title="Upload Scanned Green Card" label="GreenCard" />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker title="Scan and Upload your CT" label="UploadCT" />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Step1;
