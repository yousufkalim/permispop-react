import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";
import Makes from "../../../assets/makesModels/Makes.xml";
import MakesExc from "../../../assets/makesModels/MakesExc.xml";
import Models from "../../../assets/makesModels/Models.xml";
import Button from "../../Common/Button";
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

const Step3 = (props) => {
  const [FirstRegDate, setFirstRegDate] = React.useState(new Date());
  const [StartDate, setStartDate] = React.useState(new Date());
  const [EndDate, setEndDate] = React.useState(new Date());
  const [TechnicalControl, setTechnicalControl] = React.useState(new Date());
  const [addVehicle, setAddVehicle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [TechnicalControlEndDate, setTechnicalControlEndDate] = React.useState(
    new Date()
  );
  const [allMakes, setAllMakes] = useState([]);
  const [excludingMakes, setExcludingMakes] = useState([]);
  const [allModels, setAllModels] = useState([]);

  useEffect(() => {
    getAllMakes();
    getAllModels();
  }, []);

  const handleOpenModal = () => {
    props.setStep3({
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
    props.setVehicles((prev) => [...prev, props.step3]);
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
    props.setStep3(tempArray[index]);
    setAddVehicle(true);
  };

  const handleSaveEditVehicle = () => {
    const tempArray = [...props.vehicles];
    tempArray[editIndex] = props.step3;
    props.setVehicles(tempArray);
    setAddVehicle(false);
    setIsEdit(false);
  };

  const handleFileChange = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "VehicleImg") {
        props.onChange("VehicleImg", res.data.message);
      } else if (e.target.name === "VehicleRegImg") {
        props.onChange("VehicleRegImg", res.data.message);
      } else if (e.target.name === "GreenCard") {
        props.onChange("GreenCard", res.data.message);
      } else if (e.target.name === "CtImg") {
        props.onChange("CtImg", res.data.message);
      }
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
            <Divider
              width="100%"
              borderColor="#D5E4E8"
              margin="2% 0px 2% 0px"
            />
            <Typography style={{ marginLeft: "30px" }} className="Heading1">
              Vehicle Details
            </Typography>
            <Divider
              width="100%"
              borderColor="#D5E4E8"
              margin="2% 0px 2% 0px"
            />
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of the 1st Registration"
                value={props.step3.FristRegDate}
                name="FristRegDate"
                onChange={(e) => {
                  props.onChange(
                    "FristRegDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                padding="20px 0 0 0px !important"
                width="100% !important"
              />
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Brand"
                placeholder="Select Option"
                value={props.step3.Brand}
                onChange={(e) => getExcludingMakes(e)}
                MenuItem={allMakes}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Model"
                name="Model"
                placeholder="Select Option"
                value={props.step3.Model}
                onChange={(e) => {
                  props.onChange("Model", e.target.value);
                }}
                MenuItem={excludingMakes}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Number Plate"
                type="text"
                name="NumberPlate"
                placeholder="Numeric"
                onChange={(e) => {
                  props.onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Color"
                name="Color"
                type="text"
                placeholder="Select Color"
                onChange={(e) => {
                  props.onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Gearbox"
                name="GearBox"
                value={props.step3.GearBox}
                MenuItem={[
                  { name: "Auto", value: "Auto" },
                  { name: "Manual", value: "Manual" },
                ]}
                onChange={(e) => {
                  props.onChange("GearBox", e.target.value);
                }}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Energy"
                placeholder="Select"
                name="Energy"
                value={props.step3.Energy}
                MenuItem={[
                  { name: "Diesel", value: "Diesel" },
                  { name: "Petrol", value: "Petrol" },
                  { name: "Hybrid", value: "Hybrid" },
                  { name: "Electric", value: "Electric" },
                  { name: "GPL", value: "GPL" },
                  { name: "Others", value: "Others" },
                ]}
                onChange={(e) => {
                  props.onChange("Energy", e.target.value);
                }}
              ></DropDown>
            </Grid>
          </Grid>
          <div className="VehicleSection">
            <Grid
              container
              spacing={4}
              style={{ display: "flex", alignItems: "flex-end" }}
            >
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload your Image"
                  label="YourImg"
                  name="VehicleImg"
                  value={props.step3.VehicleImg}
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload Vehicle Registration Certificate"
                  label="RegCertificate"
                  name="VehicleRegImg"
                  value={props.step3.VehicleRegImg}
                  onChange={handleFileChange}
                />
              </Grid>
            </Grid>
          </div>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">Vehicle Insurance</Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Insurer"
                type="text"
                placeholder="John"
                name="VehicleInsurer"
                onChange={(e) => {
                  props.onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Police Nunber"
                type="text"
                name="PoliceNumber"
                placeholder="Numeric"
                onChange={(e) => {
                  props.onChange(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Start Date"
                value={props.step3.StartDate}
                name="StartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  props.onChange(
                    "StartDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
              />
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="End Date"
                name="EndDate"
                value={props.step3.EndDate}
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  props.onChange(
                    "EndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
              />
              <div className="borderbottom"></div>
            </Grid>
          </Grid>
          <div className="VehicleInsurance">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload Scanned Green Card"
                  label="GreenCard"
                  name="GreenCard"
                  value={props.step3.GreenCard}
                  onChange={handleFileChange}
                />
              </Grid>
            </Grid>
          </div>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">Technical Control</Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of Technical Control"
                value={props.step3.TechControlDate}
                name="TechControlDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  props.onChange(
                    "TechControlDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
              />
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="End Date"
                value={props.step3.TechEndDate}
                name="TechEndDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  props.onChange(
                    "TechEndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
              />
              <div className="borderbottom"></div>
            </Grid>
          </Grid>
          <div className="VehicleInsurance">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Scan and upload your CT"
                  label="YourCt"
                  name="CtImg"
                  value={props.step3.CtImg}
                  onChange={handleFileChange}
                />
              </Grid>
            </Grid>
          </div>
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
export default Step3;
