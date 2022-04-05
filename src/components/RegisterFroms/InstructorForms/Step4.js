import React, { useEffect, useState } from "react";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DropDown from "../../Common/DropDown";
import Datepicker from "../../Common/DatePicker";
import API from "../../../api/index";
import Makes from "../../../assets/makesModels/Makes.xml";
import Models from "../../../assets/makesModels/Models.xml";
import Button from "../../Common/Button";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
} from "@mui/material";
var XMLParser = require("react-xml-parser");

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

const Step4 = (props) => {
  const [allMakes, setAllMakes] = useState([]);
  const [excludingMakes, setExcludingMakes] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [addVehicle, setAddVehicle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  useEffect(() => {
    getAllMakes();
    getAllModels();
  }, []);

  const handleOpenModal = () => {
    props.setStep4({
      FirstRegistration: new Date(),
      Brand: "",
      Model: "",
      NumPlate: "",
      Color: "",
      Energy: "",
      Gearbox: "",
      Insurer: "",
      PoliceNum: "",
      VehicleInsurerStartDate: new Date(),
      VehicleInsurerEndDate: new Date(),
      TechStartDate: new Date(),
      TechEndDate: new Date(),
      PhotoPath: "",
      RegCertificatefront: "",
      RegCertificateback: "",
      GreenCardImgPath: "",
      ControlTechImgPath: "",
    });
    setIsEdit(false);
    setAddVehicle(true);
  };

  const handleAdd = () => {
    props.setVehicles((prev) => [...prev, props.step4]);
    setAddVehicle(false);
  };

  const handleDeleteVehicle = (index) => {
    const tempArray = [...props.vehicles];
    tempArray.splice(index, 1);
    props.setVehicles(tempArray);
  };

  const handleEditVehicle = (index) => {
    const tempArray = [...props.vehicles];
    setEditIndex(index);
    setIsEdit(true);
    props.setStep4(tempArray[index]);
    setAddVehicle(true);
  };

  const handleSaveEditVehicle = () => {
    const tempArray = [...props.vehicles];
    tempArray[editIndex] = props.step4;
    props.setVehicles(tempArray);
    setAddVehicle(false);
    setIsEdit(false);
  };

  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata)
      .then((UploadProfileImageResponce) => {
        if (e.target.name === "PhotoPath") {
          props.onChange("PhotoPath", UploadProfileImageResponce.data.message);
        } else if (e.target.name === "RegCertificatefront") {
          props.onChange(
            "RegCertificatefront",
            UploadProfileImageResponce.data.message
          );
        } else if (e.target.name === "RegCertificateback") {
          props.onChange(
            "RegCertificateback",
            UploadProfileImageResponce.data.message
          );
        } else if (e.target.name === "ControlTechImgPath") {
          props.onChange(
            "ControlTechImgPath",
            UploadProfileImageResponce.data.message
          );
        } else if (e.target.name === "GreenCardImgPath") {
          props.onChange(
            "GreenCardImgPath",
            UploadProfileImageResponce.data.message
          );
        }
      })
      .catch((error) => {
        console.log("UploadProfileImageResponce------>", error);
        toast.error("Image not Uploaded");
      });
  };

  const getAllMakes = () => {
    axios
      .get(Makes, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        var xml = new XMLParser().parseFromString(response.data);

        const data = xml.children;
        let allArr = [];

        data.map((item) => {
          const Id = item.children[0].value;
          const value = item.children[1].value;
          const url = item.children[2].value;
          allArr.push({
            name: value,
            value: value,
            url: url,
          });
        });
        setAllMakes(allArr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAllModels = () => {
    axios
      .get(Models, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        var xml = new XMLParser().parseFromString(response.data);

        const data = xml.children;
        let allArr = [];

        data.map((childs) => {
          childs.children.map((item) => {
            const value = item.children[1].value;
            const name = item.children[1].value;
            const year = item.children[2].value;
            const makesId = item.children[3].value;
            const makesName = item.children[4].value;
            allArr.push({
              value,
              name,
              year,
              makesId,
              makesName,
            });
          });
        });
        setAllModels({ allModels: allArr, loading: false });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getExcludingMakes = (e) => {
    props.onChange("Brand", e.target.value);
    let result = allModels.allModels.filter((modal) => {
      if (modal.makesName === e.target.value) {
        return modal;
      }
    });
    setExcludingMakes(result);
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
            {props.vehicles.length > 0 ? (
              props.vehicles.map((vehicle, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "20px" }}>
                          {vehicle.Brand}
                        </div>
                        <div> {vehicle.Model} </div>
                      </div>
                    </TableCell>

                    <TableCell align="right">
                      <EditIcon
                        sx={{
                          color: "#149e7a",
                          marginRight: "10px",
                        }}
                        onClick={() => handleEditVehicle(index)}
                      />
                      <DeleteIcon
                        sx={{
                          color: "red",
                        }}
                        onClick={() => handleDeleteVehicle(index)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">No Vehicle Added.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={addVehicle}
        onClose={() => setAddVehicle(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" noValidate sx={style}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
              <Datepicker
                label="Date of 1st Registration"
                name="FirstRegistration"
                placeholder="19-10-2021"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={props.step4.FirstRegistration}
                onChange={(e) => {
                  props.onChange(
                    "FirstRegistration",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
              ></Datepicker>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Brand"
                placeholder="Select Option"
                value={props.step4.Brand}
                onChange={(e) => getExcludingMakes(e)}
                MenuItem={allMakes}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Model"
                name="Model"
                placeholder="Select Option"
                value={props.step4.Model}
                onChange={(e) => {
                  props.onChange("Model", e.target.value);
                }}
                MenuItem={excludingMakes}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Number Plate"
                name="NumPlate"
                placeholder="Numebr Plate"
                value={props.step4.NumPlate}
                onChange={(e) => {
                  props.onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Color"
                name="Color"
                placeholder="Red"
                value={props.step4.Color}
                onChange={(e) => {
                  props.onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Energy"
                name="Energy"
                placeholder="712333"
                value={props.step4.Energy}
                onChange={(e) => {
                  props.onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="GearBox"
                name="Gearbox"
                onChange={(e) => {
                  props.onChange("Gearbox", e.target.value);
                }}
                MenuItem={[
                  { name: "Manual", value: "Manual" },
                  { name: "Auto", value: "Auto" },
                ]}
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
                name="Insurer"
                value={props.step4.Insurer}
                onChange={(e) => {
                  props.onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Police Number"
                name="PoliceNum"
                value={props.step4.PoliceNum}
                onChange={(e) => {
                  props.onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <Datepicker
                label="Start Date"
                name="VehicleInsurerStartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={props.step4.VehicleInsurerStartDate}
                onChange={(e) => {
                  props.onChange(
                    "VehicleInsurerStartDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
              ></Datepicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Datepicker
                label="End Date"
                name="VehicleInsurerEndDate"
                placeholder="19-10-2021"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={props.step4.VehicleInsurerEndDate}
                onChange={(e) => {
                  props.onChange(
                    "VehicleInsurerEndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
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
                name="TechStartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={props.step4.TechStartDate}
                onChange={(e) => {
                  props.onChange(
                    "TechStartDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
              ></Datepicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Datepicker
                label="End Date"
                name="TechEndDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={props.step4.TechEndDate}
                onChange={(e) => {
                  props.onChange(
                    "TechEndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
              ></Datepicker>
              <div className="borderbottom"></div>
            </Grid>
          </Grid>
          <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 3% 0px" />
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload Image"
                name="PhotoPath"
                label="PhotoPath"
                value={props.step4.PhotoPath}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload Vehicle Registration Certificate Front"
                label="RegCertificatefront"
                name="RegCertificatefront"
                value={props.step4.RegCertificatefront}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload Vehicle Registration Certificate Back"
                label="RegCertificateback"
                name="RegCertificateback"
                value={props.step4.RegCertificateback}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload Scanned Green Card"
                name="GreenCardImgPath"
                label="GreenCardImgPath"
                value={props.step4.GreenCardImgPath}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Scan and Upload your CT"
                name="ControlTechImgPath"
                label="ControlTechImgPath"
                value={props.step4.ControlTechImgPath}
                onChange={handleFileChange}
              />
            </Grid>
          </Grid>
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
              onClick={isEdit ? handleSaveEditVehicle : handleAdd}
            ></Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default Step4;
