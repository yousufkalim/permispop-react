import React, { useState, useEffect } from "react";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DatePicker from "../../Common/DatePicker";
import Button from "../../Common/Button";
import API from "../../../api/index";
import AutoComplete from "../../Common/Autocomplete";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import {
  Typography,
  Grid,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  overflowX: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  mt: 3,
  borderRadius: "4px",
};

const Step6 = ({
  step6,
  setStep6,
  onChange,
  instructors,
  setInstructors,
  step6Errors,
  setStep6Errors,
}) => {
  const { i18n, t } = useTranslation();
  const [addInstructor, setAddInstructor] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [addresses, setAddresses] = useState([]);

  const handleOpenModal = () => {
    setStep6({
      Firstname: "",
      Surname: "",
      Dob: new Date("01/01/1999"),
      Pob: "",
      Gender: "",
      Address: {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      },
      Complement: "",
      Email: "",
      Email2: "",
      Phone: "",
      Phone2: "",
      Password: "",
      ConfirmPassword: "",
      ProfileImg: "",
      DriverLicenseNumber: "",
      DriverLicenseStartDate: "",
      DriverLicenseEndDate: "",
      DriverLicenseFrontImg: "",
      DriverLicenseBackImg: "",
      ExcAuthNumber: "",
      ExcAuthIssueAuth: "",
      ExcAuthStartDate: "",
      ExcAuthEndDate: "",
      ExcAuthFrontImg: "",
      ExcAuthBackImg: "",
      TypeContract: "",
    });
    setIsEdit(false);
    setAddInstructor(true);
  };
  const closeAddModal = () => {
    setAddInstructor(false);
    setStep6Errors({});
  };
  const handleAdd = async () => {
    await API(
      "get",
      `Personal/Email?Email=${step6.Email}&phn=${step6.Phone}&SecondPhn=${step6.Phone2}&SecondEmail=${step6.Email2}`
    ).then(async (emailRes) => {
      if (emailRes.data.data === null || emailRes.data.data === "") {
        setInstructors((prev) => [...prev, step6]);
        setAddInstructor(false);
        setStep6Errors({});
      } else if (emailRes.data.data) {
        toast.warning(emailRes.data.data);
      }
    });
  };

  const handleDeleteInstructor = (index) => {
    const tempArray = [...instructors];
    tempArray.splice(index, 1);
    setInstructors(tempArray);
  };

  const handleEditInstructor = (index) => {
    const tempArray = [...instructors];
    setEditIndex(index);
    setIsEdit(true);
    setStep6(tempArray[index]);
    setAddInstructor(true);
  };

  const handleSaveEditInstructor = () => {
    const tempArray = [...instructors];
    tempArray[editIndex] = step6;
    setInstructors(tempArray);
    setAddInstructor(false);
    setIsEdit(false);
  };

  const handleSelectAddress = (e) => {
    if (e) {
      onChange("Address", {
        Label: e.label,
        Zip: e.PostalCode,
        City: e.city,
        Lat: e.lat,
        Lng: e.lng,
      });
    } else {
      onChange("Address", {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      });
    }
  };

  const handleAddress = async (e) => {
    if (e.target.value === "") {
      onChange("Address", {
        Label: "",
        Zip: "",
        City: "",
        Lat: "",
        Lng: "",
      });
      setAddresses([]);
    } else {
      onChange("Address", { ...step6.Address, Label: e.target.value });
      var config = {
        method: "get",
        url: `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}&autocomplete=1`,
      };
      await axios(config)
        .then(function (res) {
          let addressToSet = [];
          res.data.features.map((item) => {
            addressToSet.push({
              label: item.properties.label,
              city: item.properties.city,
              PostalCode: item.properties.postcode,
              lat: item.geometry.coordinates[1],
              lng: item.geometry.coordinates[0],
            });
          });
          setAddresses(addressToSet);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "ProfileImg") {
        onChange("ProfileImg", res.data.message);
      } else if (e.target.name === "DriverLicenseFrontImg") {
        onChange("DriverLicenseFrontImg", res.data.message);
      } else if (e.target.name === "DriverLicenseBackImg") {
        onChange("DriverLicenseBackImg", res.data.message);
      } else if (e.target.name === "ExcAuthFrontImg") {
        onChange("ExcAuthFrontImg", res.data.message);
      } else if (e.target.name === "ExcAuthBackImg") {
        onChange("ExcAuthBackImg", res.data.message);
      }
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          marginTop: "70px",
        }}
      >
        <AddCircleIcon
          sx={{
            color: "#149e7a",
            transform: "Scale(2)",
          }}
          onClick={handleOpenModal}
        />
      </div>

      <TableContainer sx={{ mt: "30px" }} component={Paper}>
        <Table sx={{ minWidth: "650px" }} aria-label="simple table">
          <TableBody>
            {instructors.length > 0 ? (
              instructors.map((instructor, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "20px" }}>
                          {instructor.Firstname}
                        </div>
                        <div>{instructor.Surname}</div>
                      </div>
                    </TableCell>

                    <TableCell align="right">
                      <EditIcon
                        sx={{
                          color: "#149e7a",
                          marginRight: "10px",
                        }}
                        onClick={() => handleEditInstructor(index)}
                      />
                      <DeleteIcon
                        sx={{
                          color: "red",
                        }}
                        onClick={() => handleDeleteInstructor(index)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{t("No Instructors Added.")}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={addInstructor}
        onClose={() => closeAddModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          noValidate
          // onSubmit={handleSubmit}
          sx={style}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("First Name")}
                required={true}
                name="Firstname"
                placeholder="John"
                value={step6.Firstname}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Firstname"] ? true : false}
                ErrorMsg={t(step6Errors["Firstname"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required={true}
                label={t("Surname")}
                name="Surname"
                placeholder="smith"
                value={step6.Surname}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Surname"] ? true : false}
                ErrorMsg={t(step6Errors["Surname"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                required={true}
                label={t("Date of Birth")}
                name="Dob"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={step6.Dob}
                maxDate={new Date()}
                onChange={(e) => {
                  onChange("Dob", moment(e).format("YYYY-MM-DDThh:mm:ss"));
                }}
                error={step6Errors["Dob"] ? true : false}
                ErrorMsg={step6Errors["Dob"]}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required={true}
                label={t("Place of Birth")}
                name="Pob"
                placeholder="France"
                value={step6.Pob}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Pob"] ? true : false}
                ErrorMsg={t(step6Errors["Pob"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label={t("Gender")}
                required={true}
                placeholder={t("Male")}
                name="Gender"
                value={step6.Gender}
                onChange={(e) => onChange("Gender", e.target.value)}
                MenuItem={[
                  { name: t("Male"), value: "Male" },
                  { name: t("Female"), value: "Female" },
                  { name: t("others"), value: "others" },
                ]}
                error={step6Errors["Gender"] ? true : false}
                ErrorMsg={step6Errors["Gender"]}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <AutoComplete
                name="Address"
                required={true}
                label={t("Address")}
                value={step6.Address.Label ? step6.Address.Label : ""}
                options={addresses}
                placeholder={t("Address")}
                onChangeAddress={(e) => {
                  handleAddress(e);
                }}
                error={step6Errors["Address"] ? true : false}
                ErrorMsg={t(step6Errors["Address"])}
                onAddressSelect={(e) => handleSelectAddress(e)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Complement")}
                name="Complement"
                placeholder="Text"
                value={step6.Complement}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                // error={step6Errors['Complement']?true:false}
                // ErrorMsg={step6Errors['Complement']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("City")}
                name="City"
                required={true}
                disabled={true}
                type="text"
                placeholder="Enter City"
                value={step6.Address.City}
                onChange={(e) => {
                  setStep6({ ...step6, [e.target.name]: e.target.value });
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Zip Code")}
                required={true}
                name="Zip"
                type="number"
                disabled={true}
                value={step6.Address.Zip}
                onChange={(e) => {
                  setStep6({ ...step6, [e.target.name]: e.target.value });
                }}
                placeholder="00000"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required={true}
                label={t("Email")}
                name="Email"
                type="email"
                placeholder="Email"
                value={step6.Email}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Email"] ? true : false}
                ErrorMsg={t(step6Errors["Email"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Second Email")}
                name="Email2"
                type="email"
                placeholder="smart_coolkyo@yahoo.com"
                value={step6.Email2}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Email2"] ? true : false}
                ErrorMsg={t(step6Errors["Email2"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Phone")}
                name="Phone"
                placeholder="0000000000000"
                type="number"
                required={true}
                value={step6.Phone}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Phone"] ? true : false}
                ErrorMsg={t(step6Errors["Phone"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                name="Phone2"
                label={t("Second Phone")}
                type="number"
                placeholder="00000000000000"
                value={step6.Phone2}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Phone2"] ? true : false}
                ErrorMsg={t(step6Errors["Phone2"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Password")}
                required={true}
                name="Password"
                type="password"
                placeholder="**************"
                value={step6.Password}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["Password"] ? true : false}
                ErrorMsg={t(step6Errors["Password"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Confirm Password")}
                required={true}
                name="ConfirmPassword"
                type="password"
                placeholder="**************"
                value={step6.ConfirmPassword}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["ConfirmPassword"] ? true : false}
                ErrorMsg={t(step6Errors["ConfirmPassword"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title={t("Upload Image")}
                type="file"
                label="ProfileImg"
                name="ProfileImg"
                value={step6.ProfileImg.split("_").slice(1).join("_")}
                onChange={handleFileChange}
                // error={step6Errors['ProfileImg']?true:false}
                // ErrorMsg={step6Errors['ProfileImg']}
              />
            </Grid>
          </Grid>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">{t("Driver’s License")}</Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Driver’s License Number")}
                required={true}
                name="DriverLicenseNumber"
                placeholder="XXXXX_XXX"
                value={step6.DriverLicenseNumber}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["DriverLicenseNumber"] ? true : false}
                ErrorMsg={t(step6Errors["DriverLicenseNumber"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label={t("Date of Obtaining")}
                required={true}
                name="DriverLicenseStartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={step6.DriverLicenseStartDate}
                maxDate={new Date()}
                onChange={(e) => {
                  onChange(
                    "DriverLicenseStartDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step6Errors["DriverLicenseStartDate"] ? true : false}
                ErrorMsg={step6Errors["DriverLicenseStartDate"]}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label={t("End Date")}
                required={true}
                name="DriverLicenseEndDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={step6.DriverLicenseEndDate}
                minDate={new Date()}
                onChange={(e) => {
                  onChange(
                    "DriverLicenseEndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step6Errors["DriverLicenseEndDate"] ? true : false}
                ErrorMsg={step6Errors["DriverLicenseEndDate"]}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title={t("Upload your driving license front side")}
                required={true}
                name="DriverLicenseFrontImg"
                type="file"
                label="DriverLicenseFrontImg"
                value={step6.DriverLicenseFrontImg.split("_")
                  .slice(1)
                  .join("_")}
                onChange={handleFileChange}
                error={step6Errors["DriverLicenseFrontImg"] ? true : false}
                ErrorMsg={step6Errors["DriverLicenseFrontImg"]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                required={true}
                title={t("Upload your driving license back side")}
                name="DriverLicenseBackImg"
                type="file"
                label="DriverLicenseBackImg"
                value={step6.DriverLicenseBackImg.split("_").slice(1).join("_")}
                onChange={handleFileChange}
                error={step6Errors["DriverLicenseBackImg"] ? true : false}
                ErrorMsg={step6Errors["DriverLicenseBackImg"]}
              />
            </Grid>
          </Grid>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">
            {t("Authorization to Exercise")}
          </Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label={t("Date of the authorization to exercise")}
                required={true}
                name="ExcAuthStartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={step6.ExcAuthStartDate}
                maxDate={new Date()}
                onChange={(e) => {
                  onChange(
                    "ExcAuthStartDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step6Errors["ExcAuthStartDate"] ? true : false}
                ErrorMsg={step6Errors["ExcAuthStartDate"]}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label={t("Expiration date")}
                required={true}
                name="ExcAuthEndDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                minDate={new Date()}
                onChange={(e) => {
                  onChange(
                    "ExcAuthEndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step6Errors["ExcAuthEndDate"] ? true : false}
                ErrorMsg={step6Errors["ExcAuthEndDate"]}
                value={step6.ExcAuthEndDate}
              ></DatePicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required={true}
                label={t("Issuing Authority")}
                name="ExcAuthIssueAuth"
                placeholder="xxxxxxxxx"
                value={step6.ExcAuthIssueAuth}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["ExcAuthIssueAuth"] ? true : false}
                ErrorMsg={t(step6Errors["ExcAuthIssueAuth"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Authorization Number")}
                required={true}
                name="ExcAuthNumber"
                placeholder="DON.John"
                value={step6.ExcAuthNumber}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step6Errors["ExcAuthNumber"] ? true : false}
                ErrorMsg={t(step6Errors["ExcAuthNumber"])}
              ></TextField>
            </Grid>
          </Grid>
          <div className="DrivingInstrutor">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title={t("Upload your authorization front side")}
                  required={true}
                  label="ExcAuthFrontImg"
                  name="ExcAuthFrontImg"
                  type="file"
                  value={step6.ExcAuthFrontImg.split("_").slice(1).join("_")}
                  onChange={handleFileChange}
                  error={step6Errors["ExcAuthFrontImg"] ? true : false}
                  ErrorMsg={step6Errors["ExcAuthFrontImg"]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title={t("Upload your authorization back side")}
                  label="ExcAuthBackImg"
                  required={true}
                  name="ExcAuthBackImg"
                  type="file"
                  value={step6.ExcAuthBackImg.split("_").slice(1).join("_")}
                  onChange={handleFileChange}
                  error={step6Errors["ExcAuthBackImg"] ? true : false}
                  ErrorMsg={step6Errors["ExcAuthBackImg"]}
                />
              </Grid>
            </Grid>
          </div>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">
            {t("Type Of Contract With Driving School")}
          </Typography>
          <Typography className="HeadingContent">
            <RadioGroup
              defaultValue="Employee"
              name="radio-buttons-group"
              style={{
                display: "flex",
              }}
            >
              <FormControlLabel
                value="Employee"
                control={<Radio />}
                label={t("Employee")}
              />
              <FormControlLabel
                value="External Provider"
                control={<Radio />}
                label={t("External Provider")}
              />
            </RadioGroup>
          </Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Button
              text={isEdit ? t("Edit") : t("Add")}
              buttonLableStyle="btn_main"
              style={{ marginTop: "24px", marginRight: "10px" }}
              width="10%"
              customWidth1="100%"
              height="48px"
              height2="48px"
              onClick={isEdit ? handleSaveEditInstructor : handleAdd}
              disabled={
                step6Errors.Firstname === null &&
                step6Errors.Surname === null &&
                step6Errors.Pob === null &&
                step6Errors.Gender === null &&
                step6Errors.Email === null &&
                step6Errors.Phone === "" &&
                (step6Errors.Phone2 === undefined ||
                  step6Errors.Phone2 === "") &&
                (step6Errors.Email2 === undefined ||
                  step6Errors.Email2 === "") &&
                step6Errors.Password === "" &&
                step6Errors.ConfirmPassword === "" &&
                step6Errors.DriverLicenseNumber === null &&
                step6Errors.DriverLicenseFrontImg === null &&
                step6Errors.DriverLicenseBackImg === null &&
                step6Errors.ExcAuthNumber === null &&
                step6Errors.ExcAuthIssueAuth === null &&
                step6Errors.ExcAuthFrontImg === null &&
                step6Errors.ExcAuthBackImg === null &&
                step6Errors.Dob === "" &&
                step6Errors.DriverLicenseStartDate === null &&
                step6Errors.DriverLicenseEndDate === null &&
                step6Errors.ExcAuthStartDate === null &&
                step6Errors.ExcAuthEndDate === null &&
                step6Errors.Address === null &&
                step6.Address.City != "" &&
                step6.Address.Zip != ""
                  ? false
                  : true
              }
            ></Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default Step6;
