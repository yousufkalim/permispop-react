import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Checkbox from "@mui/material/Checkbox";
import API from "../../../api/index";

const Step2 = (props) => {
  const [step2, setStep2] = React.useState({
    licenceNo: "",
    doOb: "",
    validitiyDate: "",
    DateAuthorization: "",
    issuingAuthority: "",
    ExpirationDate: "",
    AuthorizationNumber: "",
    siretNo: "",
    licensefront: "",
    licenseback: "",
    kbls: "",
    Authorizationfront: "",
    Authorizationback: "",
  });
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
            label="Driving License Number"
            name="drivingLicenseNo"
            type="text"
            placeholder="000000000"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Place of Delivery"
            name="deliveryplace"
            type="text"
            placeholder="France"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Dates of Obtaining"
            name="obtainingdate"
            placeholder="19-10-1992"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Validity Date"
            name="validitydate"
            placeholder="19-10-1992"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Date of authorization to excersice"
            name="authorizationDate"
            placeholder="19-10-1992"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Issuing Authority"
            name="issuingAuthority"
            placeholder="712333"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Expiration Date"
            name="expirationDate"
            placeholder="19-10-1992"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Authorization Number"
            name="authorizationNumber"
            type="text"
            placeholder="000000000"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="SIRET Number"
            name="siretNumber"
            type="text"
            placeholder="000000000"
          ></TextField>
        </Grid>
      </Grid>

      <Divider width="100%" borderColor="#D5E4E8" />

      <Grid container spacing={4} alignItems="flex-end">
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Driving License Front Side"
            label="drivingLicenseFront"
            type="file"
            name="licensefront"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Driving License Back Side"
            label="drivingLicenseBack"
            type="file"
            name="licenseback"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your KBLS"
            label="KBL"
            name="kbls"
            type="file"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Authorization Front Side"
            label="authFront"
            name="Authorizationfront"
            type="file"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload your Authorization Back Side"
            label="authBack"
            name="Authorizationback"
            type="file"
          />
        </Grid>
      </Grid>
      {/* <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox defaultChecked className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Are you working on other platform?
          </Typography>
        </div>
        <div className="termsConditionsCheckbox">
          <Checkbox defaultChecked className="checkbox" />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
            Do you have other licenses obtained?
          </Typography>
        </div>
      </div> */}
    </Box>
  );
};
export default Step2;
