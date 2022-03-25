import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import Checkbox from "@mui/material/Checkbox";
import API from "../../../api/index";


const Step1 = (props) => {
  const [checked, setChecked] = React.useState(false);

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
          label="Tradename"
          name="TradeName"
          placeholder="John"
          value={props.step1.TradeName}
          onChange={(e) => {
            props.onChange(e.target.name, e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Company Name"
          name="CompanyName"
          placeholder="Smith.PVT"
          value={props.step1.CompanyName}
          onChange={(e) => {
            props.onChange(e.target.name, e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Address"
          name="Address"
          placeholder="Address"
          value={props.step1.CompanyName}
          onChange={(e) => {
            props.onChange(e.target.name, e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Complement"
          name="Complement"
          placeholder="Text"
          value={props.step1.CompanyName}
          onChange={(e) => {
            props.onChange(e.target.name, e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Zip Code"
          value={props.step1.CompanyName}
          onChange={(e) => {
            props.onChange(e.target.name, e.target.value);
          }}
          name="Zip"
          placeholder="00000"
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="City"
          name="City"
          placeholder="City"
          value={props.step1.CompanyName}
          onChange={(e) => {
            props.onChange(e.target.name, e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Email"
          name="Email"
          placeholder="Email"
          value={props.step1.CompanyName}
          onChange={(e) => {
            props.onChange(e.target.name, e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Second Email"
          name="Email2"
          placeholder="smart_coolkyo@yahoo.com"
          value={props.step1.CompanyName}
          onChange={(e) => {
            props.onChange(e.target.name, e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Phone"
          name="Phone"
          placeholder="0000000000000"
          value={props.step1.CompanyName}
          onChange={(e) => {
            props.onChange(e.target.name, e.target.value);
          }}
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          name="Phone2"
          label="Second Phone"
          placeholder="00000000000000"
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Password"
          name="Password"
          placeholder="**************"
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Confirm Password"
          name="Password2"
          placeholder="**************"
        ></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          label="Spoken Language"
          name="Language"
          placeholder="Red"
        ></TextField>
      </Grid>
    </Grid>
    <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
    <div className="termsConditionsCheckboxContainer">
      <div className="termsConditionsCheckbox">
        <Checkbox
          onClick={(e) => setChecked(!checked)}
          name="OtherPlateform"
          className="checkbox"
        />
        <Typography variant="body1" className="termsConditionsCheckboxTitle">
          Are you working on other platform?
        </Typography>
      </div>
      {checked ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5} sx={{ marginRight: "1%" }}>
            <TextField
              name="Platform"
              label="Which platform(s)?"
              placeholder="Platform name"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <TextField
              label="How much time will you give to the students of our platform?(hr/month)"
              placeholder="No. of hours"
              name="Hours"
            ></TextField>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </div>
    <div className="termsConditionsCheckbox">
      <Checkbox className="checkbox" name="CPF" />
      <Typography variant="body1" className="termsConditionsCheckboxTitle">
        I accept CPF financement
      </Typography>
    </div>
  </Box>
);
};
export default Step1;
