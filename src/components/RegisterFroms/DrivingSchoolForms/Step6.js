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

const Step6 = ({ step6, setStep6, onChange, instructors, setInstructors }) => {
  const [addInstructor, setAddInstructor] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [addresses, setAddresses] = useState([]);

  const handleOpenModal = () => {
    setStep6({
      Firstname: "",
      Surname: "",
      Dob: new Date(),
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
      DriverLicenseStartDate: new Date(),
      DriverLicenseEndDate: new Date(),
      DriverLicenseFrontImg: "",
      DriverLicenseBackImg: "",
      ExcAuthNumber: "",
      ExcAuthIssueAuth: "",
      ExcAuthStartDate: new Date(),
      ExcAuthEndDate: new Date(),
      ExcAuthFrontImg: "",
      ExcAuthBackImg: "",
      TypeContract: "",
    });
    setIsEdit(false);
    setAddInstructor(true);
  };

  const handleAdd = () => {
    setInstructors((prev) => [...prev, step6]);
    setAddInstructor(false);
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
      setAddresses([]);
    } else {
      onChange("Address", { ...step6.Address, Label: e.target.value });
      var config = {
        method: "get",
        url: `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}&type=housenumber&autocomplete=1`,
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
                <TableCell align="left">No Instructors Added.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={addInstructor}
        onClose={() => setAddInstructor(false)}
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
                label="First Name"
                name="Firstname"
                placeholder="John"
                value={step6.Firstname}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Surname"
                name="Surname"
                placeholder="smith"
                value={step6.Surname}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of Birth"
                name="Dob"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  onChange("Dob", new Date(e));
                }}
                value={step6.Dob}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Place of Birth"
                name="Pob"
                placeholder="France"
                value={step6.Pob}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Gender"
                placeholder="Male"
                name="Gender"
                value={step6.Gender}
                onChange={(e) => onChange("Gender", e.target.value)}
                MenuItem={[
                  { name: "Male", value: "Male" },
                  { name: "Female", value: "Female" },
                  { name: "others", value: "others" },
                ]}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <AutoComplete
                name="address"
                label="Address"
                value={step6.Address.Label ? step6.Address.Label : ""}
                options={addresses}
                placeholder="Address"
                onChangeAddress={(e) => {
                  handleAddress(e);
                }}
                onAddressSelect={(e) => handleSelectAddress(e)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Complement"
                name="Complement"
                placeholder="Text"
                value={step6.Complement}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="City"
                name="City"
                disabled={true}
                type="text"
                placeholder="Enter City"
                value={step6.Address.City}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Zip Code"
                name="Zip"
                type="number"
                disabled={true}
                value={step6.Address.Zip}
                placeholder="00000"
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Email"
                name="Email"
                type="email"
                placeholder="Email"
                value={step6.Email}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Second Email"
                name="Email2"
                placeholder="smart_coolkyo@yahoo.com"
                value={step6.Email2}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Phone"
                name="Phone"
                placeholder="0000000000000"
                value={step6.Phone}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                name="Phone2"
                label="Second Phone"
                placeholder="00000000000000"
                value={step6.Phone2}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Password"
                name="Password"
                type="password"
                placeholder="**************"
                value={step6.Password}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Confirm Password"
                name="ConfirmPassword"
                type="password"
                placeholder="**************"
                value={step6.ConfirmPassword}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload Image"
                type="file"
                label="ProfileImg"
                name="ProfileImg"
                value={step6.ProfileImg}
                onChange={handleFileChange}
              />
            </Grid>
          </Grid>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">Driver’s License</Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Driver’s License Number"
                name="DriverLicenseNumber"
                placeholder="XXXXX_XXX"
                value={step6.DriverLicenseNumber}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of Obtaining"
                name="DriverLicenseStartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  onChange("DriverLicenseStartDate", new Date(e));
                }}
                value={step6.DriverLicenseStartDate}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="End Date"
                name="DriverLicenseEndDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  onChange("DriverLicenseEndDate", new Date(e));
                }}
                value={step6.DriverLicenseEndDate}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload your driving license front side"
                name="DriverLicenseFrontImg"
                type="file"
                label="DriverLicenseFrontImg"
                value={step6.DriverLicenseFrontImg}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload your driving license back side"
                name="DriverLicenseBackImg"
                type="file"
                label="DriverLicenseBackImg"
                value={step6.DriverLicenseBackImg}
                onChange={handleFileChange}
              />
            </Grid>
          </Grid>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">
            Authorization to Exercise
          </Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of the authorization to exercise"
                name="ExcAuthStartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  onChange("ExcAuthStartDate", new Date(e));
                }}
                value={step6.ExcAuthStartDate}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Expiration date"
                name="ExcAuthEndDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  onChange("ExcAuthEndDate", new Date(e));
                }}
                value={step6.ExcAuthEndDate}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Issuing Authority"
                name="ExcAuthIssueAuth"
                placeholder="xxxxxxxxx"
                value={step6.ExcAuthIssueAuth}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Authorization Number"
                name="ExcAuthNumber"
                placeholder="DON.John"
                value={step6.ExcAuthNumber}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
          </Grid>
          <div className="DrivingInstrutor">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload your authorization front side"
                  label="ExcAuthFrontImg"
                  name="ExcAuthFrontImg"
                  type="file"
                  value={step6.ExcAuthFrontImg}
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload your authorization back side"
                  label="ExcAuthBackImg"
                  name="ExcAuthBackImg"
                  type="file"
                  value={step6.ExcAuthBackImg}
                  onChange={handleFileChange}
                />
              </Grid>
            </Grid>
          </div>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">
            Type Of Contract With Driving School
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
                label="Employee"
              />
              <FormControlLabel
                value="External Provider"
                control={<Radio />}
                label="External Provider"
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
              text={isEdit ? "Edit" : "Add"}
              buttonLableStyle="btn_main"
              style={{ marginTop: "24px", marginRight: "10px" }}
              width="10%"
              customWidth1="100%"
              height="48px"
              height2="48px"
              onClick={isEdit ? handleSaveEditInstructor : handleAdd}
            ></Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default Step6;
