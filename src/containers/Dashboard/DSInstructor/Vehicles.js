import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import DataTable from "../../../components/Common/Table";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import { DsVehiclescolumns } from "../../../utils/tableHeads";
import { Vehiclerows } from "../../../utils/tablerows";
import DatePicker from "../../../components/Common/DatePicker";
import MobileViewFilters from "../../../components/Common/MobileViewFilters";
import Divider from "../../../components/Common/Divider";
import TextField from "../../../components/Common/TextField";
import DropDown from "../../../components/Common/DropDown";
import FilePicker from "../../../components/Common/FilePicker";
import Makes from "../../../assets/makesModels/Makes.xml";
import MakesExc from "../../../assets/makesModels/MakesExc.xml";
import Models from "../../../assets/makesModels/Models.xml";
import Button from "../../../components/Common/Button";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTranslation } from "react-i18next";

import API from "../../../api";
import { Typography, Grid, Box, Checkbox, Paper, Modal } from "@mui/material";
import { async } from "validate.js";

function createData(dateofregistration, brand, model, color, noplate, gearbox) {
  return { dateofregistration, brand, model, color, noplate, gearbox };
}
const Index = () => {
  const { i18n, t } = useTranslation();
  const [allMakes, setAllMakes] = useState([]);
  const [excludingMakes, setExcludingMakes] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [addVehicle, setAddVehicle] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [selectedTechnicalId, setSelectedTechnicalId] = useState([]);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState([]);

  const [vehicleData, setVehicleData] = useState([]);
  const [user, setUser] = useState();
  const [Startvalue, setStartValue] = useState(new Date());
  const handleStartdate = (newValue) => {
    setStartValue(newValue);
  };
  const [Endvalue, setEndValue] = useState(new Date());
  const handleEnddate = (newValue) => {
    setEndValue(newValue);
  };

  const handleOpenModal = () => {
    setVehicleDet({
      FristRegDate: new Date(),
      Brand: "",
      Model: "",
      NumberPlate: "",
      Color: "",
      GearBox: "",
      Energy: "",
      VehicleImg: "",
      VehicleRegImg: "",
      VehicleInsurer: "",
      PoliceNumber: "",
      StartDate: new Date(),
      EndDate: new Date(),
      GreenCard: "",
      TechControlDate: new Date(),
      TechEndDate: new Date(),
      CtImg: "",
    });
    setIsEdit(false);
    setAddVehicle(true);
  };
  const [vehicleDet, setVehicleDet] = React.useState({
    FristRegDate: new Date(),
    Brand: "",
    Model: "",
    NumberPlate: "",
    Color: "",
    GearBox: "",
    Energy: "",
    VehicleImg: "",
    VehicleRegImg: "",
    VehicleInsurer: "",
    PoliceNumber: "",
    StartDate: new Date(),
    EndDate: new Date(),
    GreenCard: "",
    TechControlDate: new Date(),
    TechEndDate: new Date(),
    CtImg: "",
  });
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
    overflowX: "hidden",
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getVehicleData(userData);
    setUser(userData);
  }, []);

  const getVehicleData = async (userData) => {
    let allVehicles = [];
    await API("get", `Profile/GetProfileByPersonalId?id=${userData.id}`).then(async (DSInsprofileRes) => {
      await API("get", `Profile/GetProfileByPersonalId?id=${DSInsprofileRes.data.data.drivingSchoolIdentityInfoId}`).then(
        (DSInsPerprofileRes) => {
          let vehicleId = JSON.parse(DSInsPerprofileRes.data.data.drivingSchoolVehiclesInfoId);

          allVehicles = Object.entries(vehicleId).map(([key, value]) => {
            return API("get", `VehicleDetail/GetVehicleDetailByIdAsync?id=${value}`);
          });
          Promise.all(allVehicles).then((res) => {
            let vehicles = [];
            res.map((veh) => {
              vehicles.push(veh.data.data);
            });
            setVehicleData(vehicles);
          });
        }
      );
    });
  };
  const onChange = (name, value) => {
    setVehicleDet({ ...vehicleDet, [name]: value });
  };

  return (
    <>
      {/* <MobileViewFilters title={t("Vehicles")} /> */}
      <div className="Filters">
        <Grid container spacing={1} sx={{ marginTop: "30px", marginLeft: "70px" }}>
          <Grid xs={12} sm={12} md={3}>
            <Typography
              sx={{
                marginTop: "20px",
                paddingLeft: "20px",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: 500,
                fontSize: "24px",
                lineHight: "34px",
                /* identical to box height */

                color: "#2A3235",
              }}
            >
              {t("Vehicles")}
            </Typography>
          </Grid>
          {/* <Grid xs={3} sm={3} md={2}>
            <MultipleSelectPlaceholder
              value={["All"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={3} sm={3} md={2}>
            <MultipleSelectPlaceholder
              value={["Filter by receiver"]}
            ></MultipleSelectPlaceholder>
          </Grid>
          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="Start Date"
              value={Startvalue}
              onChange={handleStartdate}
            ></DatePicker>
          </Grid>

          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="End Date"
              // label={["date"]}
              value={Endvalue}
              onChange={handleEnddate}
            ></DatePicker>
          </Grid> */}
        </Grid>
      </div>
      <Divider width="100%" borderColor="#D5E4E8" />

      <DataTable data={vehicleData} columns={DsVehiclescolumns}></DataTable>
    </>
  );
};

export default Index;
