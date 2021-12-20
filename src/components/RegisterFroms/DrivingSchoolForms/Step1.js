import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Checkbox from "@mui/material/Checkbox";

const Step1 = (props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
          <TextField label="Number" placeholder="John"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown label="Issuing Authority" placeholder="Smith"></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Date of Approval"
            placeholder="102 Street, building 02, NY"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Complement" placeholder="19-10-1992"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Zip Code" placeholder="Red"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="City" placeholder="712333"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Email" placeholder="Auto"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Second Email"
            placeholder="smart_coolkyo@yahoo.com"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Phone" placeholder="Red"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Second Phone" placeholder="Red"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Password" placeholder="**************"></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Confirm Password"
            placeholder="**************"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField label="Spoken Language" placeholder="Red"></TextField>
        </Grid>
      </Grid>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox defaultChecked className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Are you working on other platform?
          </Typography>
        </div>
        <div className="termsConditionsCheckbox">
          <Checkbox defaultChecked className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            I accept CPF financement
          </Typography>
        </div>
      </div>
    </Box>
  );
};
export default Step1;
