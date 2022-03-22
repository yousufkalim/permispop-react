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
  const [step1, setStep1] = React.useState({
    TradeName: "",
    CompanyName: "",
    Address: "",
    Complement: "",
    Zip: "",
    City: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Password: "",
    Password2: "",
    Language: "",
    OtherPlateform: false,
    CPF: "",
  });
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
            name="tradename"
            placeholder="John"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Company Name"
            name="companyname"
            placeholder="Smith.PVT"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Address"
            name="address"
            placeholder="Address"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Complement"
            name="complement"
            placeholder="Text"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Zip Code"
            name="zip"
            placeholder="00000"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="City" name="city" placeholder="City"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Email" name="email" placeholder="Email"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Email"
            name="email2"
            placeholder="smart_coolkyo@yahoo.com"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Phone"
            name="phone"
            placeholder="0000000000000"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            name="phone2"
            label="Second Phone"
            placeholder="00000000000000"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Password"
            name="password"
            placeholder="**************"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Confirm Password"
            name="confirmpassword"
            placeholder="**************"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Spoken Language"
            name="language"
            placeholder="Red"
          ></TextField>
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox
            onClick={(e) => setChecked(!checked)}
            name="check1"
            className="checkbox"
          />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Are you working on other platform?
          </Typography>
        </div>
        <div className="termsConditionsCheckbox">
        <Checkbox className="checkbox" name="check2" />
        <Typography variant="body1" className="termsConditionsCheckboxTitle">
          I accept CPF financement
        </Typography>
      </div>
      </div>
        {checked ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={5} sx={{ marginRight: "1%" }}>
              <TextField
                name="platform"
                label="Which platform(s)?"
                placeholder="Platform name"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <TextField
                label="How much time will you give to the students of our platform?(hr/month)"
                placeholder="No. of hours"
                name="hours"
              ></TextField>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      {/* <div className="termsConditionsCheckbox">
        <Checkbox className="checkbox" name="check2" />
        <Typography variant="body1" className="termsConditionsCheckboxTitle">
          I accept CPF financement
        </Typography>
      </div> */}
    </Box>
  );
};
export default Step1;
