import React, { useState, useEffect } from "react";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DatePicker from "../../Common/DatePicker";
import Button from "../../Common/Button";
import API from "../../../api/index";
import Makes from "../../../assets/makesModels/Makes.xml";
import Models from "../../../assets/makesModels/Models.xml";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import moment from "moment";
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

const Step5 = ({ step5, setStep5, onChange, vehicles, setVehicles,step5Errors,setStep5Errors }) => {
  const [addVehicle, setAddVehicle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [allMakes, setAllMakes] = useState([]);
  const [excludingMakes, setExcludingMakes] = useState([]);
  const [allModels, setAllModels] = useState([]);

  useEffect(() => {
    getAllMakes();
    getAllModels();
  }, []);

  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "CarImage") {
        onChange("CarImage", res.data.message);
      } else if (e.target.name === "CertificateFrontImage") {
        onChange("CertificateFrontImage", res.data.message);
      } else if (e.target.name === "CertificateBackImage") {
        onChange("CertificateBackImage", res.data.message);
      } else if (e.target.name === "GreenCard") {
        onChange("GreenCard", res.data.message);
      } else if (e.target.name === "CTImg") {
        onChange("CTImg", res.data.message);
      }
    });
  };

  const handleOpenModal = () => {
    setStep5({
      RegistrationDate: new Date(),
      Brand: "",
      Model: "",
      NumberPlate: "",
      GearBox: "",
      Color: "",
      Energy: "",
      CarImage: "",
      CertificateFrontImage: "",
      CertificateBackImage: "",
      Insurer: "",
      PoliceNumber: "",
      StartDate: new Date(),
      EndDate: new Date(),
      GreenCard: "",
      TechControlDate: new Date(),
      TechEndDate: new Date(),
      CTImg: "",
      TechnicalControlCheck: "",
      checked: false,
    });
    setIsEdit(false);
    setAddVehicle(true);
  };

  const handleAdd = () => {
    setVehicles((prev) => [...prev, step5]);
    setAddVehicle(false);
    setStep5Errors({})
  };

  const handleDeleteVehicle = (index) => {
    const tempArray = [...vehicles];
    tempArray.splice(index, 1);
    setVehicles(tempArray);
  };

  const handleEditVehicle = (index) => {
    const tempArray = [...vehicles];
    setEditIndex(index);
    setIsEdit(true);
    setStep5(tempArray[index]);
    setAddVehicle(true);
  };

  const handleSaveEditVehicle = () => {
    const tempArray = [...vehicles];
    tempArray[editIndex] = step5;
    setVehicles(tempArray);
    setAddVehicle(false);
    setIsEdit(false);
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
    onChange("Brand", e.target.value);
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
            {vehicles.length > 0 ? (
              vehicles.map((vehicle, index) => {
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
          <Typography className="Heading1">Vehicle Details</Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of the 1st Registration"
            required={true}
            name="RegistrationDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                value={step5.RegistrationDate}
                maxDate={moment()}
                onChange={(e) => {
                  onChange(
                    "RegistrationDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step5Errors['RegistrationDate']?true:false}
                ErrorMsg={step5Errors['RegistrationDate']}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Brand"
            required={true}
            name="Brand"
                placeholder="Select Option"
                value={step5.Brand}
                onChange={(e) => getExcludingMakes(e)}
                MenuItem={allMakes}
                error={step5Errors['Brand']?true:false}
                ErrorMsg={step5Errors['Brand']}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Model"
            required={true}
            name="Model"
                placeholder="Select Option"
                value={step5.Model}
                onChange={(e) => {
                  onChange("Model", e.target.value);
                }}
                error={step5Errors['Model']?true:false}
                ErrorMsg={step5Errors['Model']}
                MenuItem={excludingMakes}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
            required={true}
            label="Number Plate"
                name="NumberPlate"
                placeholder="xx-xxx-xx"
                value={step5.NumberPlate}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step5Errors['NumberPlate']?true:false}
                ErrorMsg={step5Errors['NumberPlate']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Gearbox"
            required={true}
            name="GearBox"
                MenuItem={[
                  { name: "Auto", value: "Auto" },
                  { name: "Manual", value: "Manual" },
                ]}
                onChange={(e) => {
                  onChange("GearBox", e.target.value);
                }}
                error={step5Errors['GearBox']?true:false}
                ErrorMsg={step5Errors['GearBox']}
                value={step5.GearBox}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
            required={true}
            label="Color"
                name="Color"
                placeholder="Red"
                value={step5.Color}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step5Errors['Color']?true:false}
                ErrorMsg={step5Errors['Color']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Energy"
                placeholder="Select"
            required={true}
            name="Energy"
                value={step5.Energy}
                MenuItem={[
                  { name: "Diesel", value: "Diesel" },
                  { name: "Petrol", value: "Petrol" },
                  { name: "Hybrid", value: "Hybrid" },
                  { name: "Electric", value: "Electric" },
                  { name: "GPL", value: "GPL" },
                  { name: "Others", value: "Others" },
                ]}
                onChange={(e) => {
                  onChange("Energy", e.target.value);
                }}
                error={step5Errors['Energy']?true:false}
                ErrorMsg={step5Errors['Energy']}
              ></DropDown>
            </Grid>
          </Grid>
          <div className="VehicleSection">
            <Grid
              container
              spacing={4}
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload your Image"
            required={true}
            label="CarImage"
                  name="CarImage"
                  value={step5.CarImage}
                  onChange={handleFileChange}
                  error={step5Errors['CarImage']?true:false}
                  ErrorMsg={step5Errors['CarImage']}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload Vehicle Registration Certificate"
            required={true}
            label="CertificateFrontImage"
                  name="CertificateFrontImage"
                  value={step5.CertificateFrontImage}
                  onChange={handleFileChange}
                  error={step5Errors['CertificateFrontImage']?true:false}
                  ErrorMsg={step5Errors['CertificateFrontImage']}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload Vehicle Registration Certificate Back"
            required={true}
            label="CertificateBackImage"
                  name="CertificateBackImage"
                  value={step5.CertificateBackImage}
                  onChange={handleFileChange}
                  error={step5Errors['CertificateBackImage']?true:false}
                  ErrorMsg={step5Errors['CertificateBackImage']}
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
            required={true}
            name="Insurer"
                placeholder="John"
                value={step5.Insurer}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step5Errors['Insurer']?true:false}
                ErrorMsg={step5Errors['Insurer']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Police Number"
            required={true}
            name="PoliceNumber"
                placeholder="xxx-xxx"
                value={step5.PoliceNumber}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={step5Errors['PoliceNumber']?true:false}
                ErrorMsg={step5Errors['PoliceNumber']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Start Date"
            required={true}
            padding="20px 0 0 0px !important"
                width="100% !important"
                name="StartDate"
                value={step5.StartDate}
                maxDate={moment()}
                onChange={(e) => {
                  onChange(
                    "StartDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step5Errors['StartDate']?true:false}
                ErrorMsg={step5Errors['StartDate']}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="End Date"
                padding="20px 0 0 0px !important"
            required={true}
            width="100% !important"
                name="EndDate"
                value={step5.EndDate}
                minDate={moment()}
                onChange={(e) => {
                  onChange("EndDate", moment(e).format("YYYY-MM-DDThh:mm:ss"));
                }}
                error={step5Errors['EndDate']?true:false}
                ErrorMsg={step5Errors['EndDate']}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
          </Grid>
          <div className="VehicleInsurance">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
            required={true}
            title="Upload Scanned Green Card"
                  name="GreenCard"
                  label="GreenCard"
                  value={step5.GreenCard}
                  onChange={handleFileChange}
                  error={step5Errors['GreenCard']?true:false}
                  ErrorMsg={step5Errors['GreenCard']}
                />
              </Grid>
            </Grid>
          </div>

          <div className="termsConditionsCheckboxContainer">
        <div className="termsConditionsCheckbox">
          <Checkbox
            name="TechnicalControlCheck"
            className="checkbox"
            onClick={(e) =>  onChange('checked', !step5.checked)}
          />
          <Typography variant="body1" className="termsConditionsCheckboxTitle">
          Technical Control Details if any?
          </Typography>
        </div>
      </div>
      {step5.checked ? (
        <div>
                              <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">Technical Control</Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of Technical Control"
                padding="20px 0 0 0px !important"
                width="100% !important"
                name="TechControlDate"
                maxDate={moment()}
                value={step5.TechControlDate}
                onChange={(e) => {
                  onChange(
                    "TechControlDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step5Errors['TechControlDate']?true:false}
                ErrorMsg={step5Errors['TechControlDate']}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="End Date"
                padding="20px 0 0 0px !important"
                width="100% !important"
                name="TechEndDate"
                minDate={moment()}
                value={step5.TechEndDate}
                onChange={(e) => {
                  onChange(
                    "TechEndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={step5Errors['TechEndDate']?true:false}
                ErrorMsg={step5Errors['TechEndDate']}
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
          </Grid>
          <div className="VehicleInsurance">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Scan and Upload your CT"
                  name="CTImg"
                  label="CTImg"
                  value={step5.CTImg}
                  onChange={handleFileChange}
                  error={step5Errors['CTImg']?true:false}
                  ErrorMsg={step5Errors['CTImg']}
                />
              </Grid>
            </Grid>
          </div>
      </div>
      ) : (
        ""
      )}
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
              disabled={
                 step5Errors.RegistrationDate===null
              && step5Errors.Brand===null 
              && step5Errors.Model===null 
              && step5Errors.NumberPlate===null 
              && step5Errors.GearBox===null 
              && step5Errors.Color===null 
              && step5Errors.Energy===null 
              && step5Errors.CarImage===null 
              && step5Errors.CertificateFrontImage===null 
              && step5Errors.CertificateBackImage===null 
              && step5Errors.Insurer===null 
              && step5Errors.PoliceNumber===null 
              && step5Errors.StartDate===null 
              && step5Errors.EndDate===null 
              && step5Errors.GreenCard===null 
              
              && step5.checked===false

              || step5Errors.TechControlDate===null 
              && step5Errors.TechEndDate===null 
              && step5Errors.CTImg===null 
              && step5Errors.RegistrationDate===null
              && step5Errors.Brand===null 
              && step5Errors.Model===null 
              && step5Errors.NumberPlate===null 
              && step5Errors.GearBox===null 
              && step5Errors.Color===null 
              && step5Errors.Energy===null 
              && step5Errors.CarImage===null 
              && step5Errors.CertificateFrontImage===null 
              && step5Errors.CertificateBackImage===null 
              && step5Errors.Insurer===null 
              && step5Errors.PoliceNumber===null 
              && step5Errors.StartDate===null 
              && step5Errors.EndDate===null 
              && step5Errors.GreenCard===null 


              ? false : true}
            ></Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default Step5;
