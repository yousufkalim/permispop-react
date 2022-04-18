import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Step3 = ({ step3, setStep3, onChange,step3Errors }) => {
  const { i18n , t } = useTranslation();
  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      onChange("RcPro", res.data.message);
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
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Insurer")}
            required={true}
            placeholder="John"
            name="insuranceCompany"
            value={step3.insuranceCompany}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step3Errors['insuranceCompany']?true:false}
            ErrorMsg={t(step3Errors['insuranceCompany'])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label={t("Police Number")}
            required={true}
            placeholder="0000000000"
            name="policeNumber"
            value={step3.policeNumber}
            onChange={(e) => {
              onChange(e.target.name, e.target.value);
            }}
            error={step3Errors['policeNumber']?true:false}
            ErrorMsg={t(step3Errors['policeNumber'])}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <DatePicker
            label={t("Expiration date of your Insurance")}
            padding="20px 0 0 0px !important"
            required={true}
            width="100% !important"
            name="dateInsurance"
            // onChange={(e) => {
            //   onChange("dateInsurance", new Date(e));
            // }}
            minDate={moment()}
            onChange={(e) => {
              onChange("dateInsurance", moment(e).format("YYYY-MM-DDThh:mm:ss"));
            }}
            value={step3.dateInsurance}
            error={step3Errors['dateInsurance']?true:false}
            ErrorMsg={step3Errors['dateInsurance']}
          ></DatePicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title={t("Upload your RC Pro")}
            required={true}
            label="YourRCpro"
            name="RcPro"
            type="file"
            value={step3.RcPro}
            onChange={handleFileChange}
            error={step3Errors['RcPro']?true:false}
            ErrorMsg={step3Errors['RcPro']}
          />
        </Grid>
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
      </Grid>
    </Box>
  );
};
export default Step3;
