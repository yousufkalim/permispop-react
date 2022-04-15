import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import DataTable from "../../../components/Common/Table";
import MultipleSelectPlaceholder from "../../../components/Common/SelectField";
import { Vehiclescolumns } from "../../../utils/tableHeads";
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

import API from "../../../api";
import { Typography, Grid, Box, Checkbox, Paper, Modal } from "@mui/material";
import { async } from "validate.js";
import Joi from "joi-browser";


function createData(dateofregistration, brand, model, color, noplate, gearbox) {
  return { dateofregistration, brand, model, color, noplate, gearbox };
}
const Index = () => {
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
    setVehicleErrors({});
  };
  const [vehicleErrors, setVehicleErrors] = useState({});
  const [checkbox1, setCheckbox1] = React.useState(false);
  const [disable, setDisable] = useState(false);
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

  const vehicleSchema = {
    FristRegDate: Joi.string()
      .required()
      .label("FristRegDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
      Brand: Joi.string()
      .required()
      .label("Brand")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
      Model: Joi.string()
      .required()
      .label("Model")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    NumberPlate: Joi.string()
      .required()
      .label("NumberPlate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    Color: Joi.string()
      .required()
      .label("Color")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    GearBox: Joi.string()
      .required()
      .label("GearBox")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    Energy: Joi.string()
      .required()
      .label("Energy")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    VehicleImg: Joi.string()
      .required()
      .label("VehicleImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    VehicleRegImg: Joi.string()
      .required()
      .label("VehicleRegImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    VehicleInsurer: Joi.string()
      .required()
      .label("VehicleInsurer")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    PoliceNumber: Joi.string()
      .required()
      .label("PoliceNumber")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    StartDate: Joi.string()
      .required()
      .label("StartDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    EndDate: Joi.string()
      .required()
      .label("EndDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    GreenCard: Joi.string()
      .required()
      .label("GreenCard")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    TechControlDate: Joi.string()
      .required()
      .label("TechControlDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    TechEndDate: Joi.string()
      .required()
      .label("TechEndDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
    CtImg: Joi.string()
      .required()
      .label("CtImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
  }

  const onChange = (name, value) => {
    const errorMessage = validateSuggest(name, value);
    setVehicleErrors({...vehicleErrors,[name]:errorMessage});
    setVehicleDet({ ...vehicleDet, [name]: value });
  };
  const validateSuggest = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: vehicleSchema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
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
    handleDeleteVehicle(userData);
    setUser(userData);
    getAllMakes();
    getAllModels();
  }, []);

  const getVehicleData = async (userData) => {
    let allVehicles = [];
    await API("get", `Profile/GetProfileByPersonalId?id=${userData.id}`).then(
      (InsprofileRes) => {
        let vehicleId = JSON.parse(
          InsprofileRes.data.data.drivingSchoolVehiclesInfoId
        );
        allVehicles = Object.entries(vehicleId).map(([key, value]) => {
          return API(
            "get",
            `VehicleDetail/GetVehicleDetailByIdAsync?id=${value}`
          );
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
  };
 
  const handleFileChange = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "VehicleImg") {
        onChange("VehicleImg", res.data.message);
      } else if (e.target.name === "VehicleRegImg") {
        onChange("VehicleRegImg", res.data.message);
      } else if (e.target.name === "GreenCard") {
        onChange("GreenCard", res.data.message);
      } else if (e.target.name === "CtImg") {
        onChange("CtImg", res.data.message);
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

  const handleSaveEditVehicle = async () => {
    await API("put", "VehicleInsurance", {
      Insurer: vehicleDet.VehicleInsurer,
      PoliceNumber: vehicleDet.PoliceNumber,
      StartDate: vehicleDet.StartDate,
      EndDate: vehicleDet.EndDate,
      GreenCardImagePath: vehicleDet.GreenCard,
      id: selectedInsuranceId.id,
    }).then(async (vehicleinsRes) => {
      await API("put", "TechnicalControl", {
        DateofTechnicalControl: vehicleDet.TechControlDate,
        startDateOfTech: vehicleDet.TechControlDate,
        endDateOfTechControl: vehicleDet.TechEndDate
          ? vehicleDet.TechEndDate
          : "",
        TechnicalControlImagePath: vehicleDet.CtImg,
        id: selectedTechnicalId.id,
      }).then(async (Technicalres) => {
        await API("put", "VehicleDetail", {
          DateOfFirstRegistration: vehicleDet.FristRegDate,
          Brand: vehicleDet.Brand,
          Model: vehicleDet.Model,
          Color: vehicleDet.Color,
          Energy: vehicleDet.Energy,
          GearBox: vehicleDet.GearBox,
          NumberPlate: vehicleDet.NumberPlate,
          VehicleRegistrationCertificatePhotoImagePath:
            vehicleDet.VehicleRegImg,
          VehicleePhotosImagePath: vehicleDet.VehicleImg,
          vehichleInsuranceInfoId: vehicleinsRes.data.data.id,
          technicalControlInfoID: Technicalres.data.data.id,
        }).then(() => {
          toast.success("Vehicle detail updated sucessfully");
          setAddVehicle(false);
          setIsEdit(false);
          getVehicleData(user);
        });
      });
    });
  };

  const handleEditVehicle = (index) => {
    const tempArray = [...vehicleData];
    console.log("temp", tempArray);
    setEditIndex(index);
    setIsEdit(true);

    let technical = JSON.parse(tempArray[index].technicalControlInfoID);
    let vehicleIns = JSON.parse(tempArray[index].vehichleInsuranceInfoId);
    console.log("tempArray", technical);
    console.log("vehicleIns", vehicleIns);

    setSelectedTechnicalId(technical);
    setSelectedInsuranceId(vehicleIns);

    setVehicleDet({
      FristRegDate: tempArray[index].dateOfFirstRegistration,
      Brand: tempArray[index].brand,
      Model: tempArray[index].model,
      NumberPlate: tempArray[index].numberPlate,
      Color: tempArray[index].color,
      GearBox: tempArray[index].gearBox,
      Energy: tempArray[index].energy,
      VehicleImg: tempArray[index].vehicleePhotosImagePath,
      VehicleRegImg:
        tempArray[index].vehicleRegistrationCertificatePhotoImagePath,
      VehicleInsurer: vehicleIns.insurer,
      PoliceNumber: vehicleIns.policeNumber,
      StartDate: vehicleIns.startDate,
      EndDate: vehicleIns.endDate,
      GreenCard: vehicleIns.greenCardImagePath,
      TechControlDate: technical.dateofTechnicalControl,
      TechEndDate: technical.endDate,
      CtImg: technical.technicalControlImagePath,
    });
    setIsEdit(true);
    setAddVehicle(true);
  };

  const handleDeleteVehicle = async (index) => {
    const tempArray = [...vehicleData];
    await API("get", `Profile/GetProfileByPersonalId?id=${user.id}`).then(
      async (InsprofileRes) => {
        let vehicleId = JSON.parse(
          InsprofileRes.data.data.drivingSchoolVehiclesInfoId
        );

        let allVehicles = {};
        Object.entries(vehicleId).map(([key, value], i) => {
          if (tempArray[index].id === value) {
          } else {
            allVehicles = {
              ...allVehicles,
              ["Vehicle" + (Object.keys(allVehicles).length + 1)]: value,
            };
          }
        });

        await API(
          "get",
          `VehicleDetail/UpdateVehicleDetail/?id=${tempArray[index].id}`
        ).then(async (vehicleres) => {
          await API("post", `Profile/UpdateProfile`, {
            banDate: InsprofileRes.data.data.banDate,
            banStatus: InsprofileRes.data.data.banDate,
            id: InsprofileRes.data.data.id,
            businessInfoId: InsprofileRes.data.data.businessInfoId,
            drivingLisenceInfoId: InsprofileRes.data.data.drivingLisenceInfoId,
            drivingSchoolApprovalInfoId:
              InsprofileRes.data.data.drivingSchoolApprovalInfoId,
            drivingSchoolIdentityInfoId:
              InsprofileRes.data.data.drivingSchoolIdentityInfoId,
            drivingSchoolInstructorInfoId:
              InsprofileRes.data.data.drivingSchoolInstructorInfoId,
            drivingSchoolManagerInfoId:
              InsprofileRes.data.data.drivingSchoolManagerInfoId,
            drivingSchoolVehiclesInfoId:
              InsprofileRes.data.data.drivingSchoolVehiclesInfoId,
            exersiceAuthorizationInfoId:
              InsprofileRes.data.data.exersiceAuthorizationInfoId,
            insuranceCompanyInfoId:
              InsprofileRes.data.data.insuranceCompanyInfoId,
            isAdminBan: InsprofileRes.data.data.isAdminBan,
            isEmailSent: InsprofileRes.data.data.isEmailSent,
            lat: InsprofileRes.data.data.lat,
            long: InsprofileRes.data.data.long,
            personalInfoId: InsprofileRes.data.data.personalInfoId,
            personalInfos: InsprofileRes.data.data.personalInfos,
            role: InsprofileRes.data.data.role,
            status: InsprofileRes.data.data.status,
            technicalControlInfoId:
              InsprofileRes.data.data.technicalControlInfoId,
            vehicleInsuranceInfoId:
              InsprofileRes.data.data.vehicleInsuranceInfoId,
            drivingSchoolVehiclesInfoId:
              Object.keys(allVehicles).length > 0
                ? JSON.stringify(allVehicles)
                : "",
          }).then((updateprofileres) => {
            toast.success("Vehicle deleted scuccessfully");
            getVehicleData(user);
          });
        });
      }
    );
  };

  const handleAddVehicle = async () => {
    await API("get", `Profile/GetProfileByPersonalId?id=${user.id}`).then(
      async (InsprofileRes) => {
        let vehicleId = JSON.parse(InsprofileRes.data.data.drivingSchoolVehiclesInfoId);
        let allVehicles = {};

        await API("post", "VehicleInsurance", {
          Insurer: vehicleDet.VehicleInsurer,
          PoliceNumber: vehicleDet.PoliceNumber,
          StartDate: vehicleDet.StartDate,
          EndDate: vehicleDet.EndDate,
          GreenCardImagePath: vehicleDet.GreenCard,
          id: selectedInsuranceId.id,
        }).then(async (vehicleinsRes) => {
          await API("post", "TechnicalControl", {
            DateofTechnicalControl: vehicleDet.TechControlDate,
            startDateOfTech: vehicleDet.TechControlDate,
            endDateOfTechControl: vehicleDet.TechEndDate
              ? vehicleDet.TechEndDate
              : "",
            TechnicalControlImagePath: vehicleDet.CtImg,
            id: selectedTechnicalId.id,
          }).then(async (Technicalres) => {
            await API("post", "VehicleDetail", {
              DateOfFirstRegistration: vehicleDet.FristRegDate,
              Brand: vehicleDet.Brand,
              Model: vehicleDet.Model,
              Color: vehicleDet.Color,
              Energy: vehicleDet.Energy,
              GearBox: vehicleDet.GearBox,
              NumberPlate: vehicleDet.NumberPlate,
              VehicleRegistrationCertificatePhotoImagePath:
                vehicleDet.VehicleRegImg,
              VehicleePhotosImagePath: vehicleDet.VehicleImg,
              vehichleInsuranceInfoId: vehicleinsRes.data.data.id,
              technicalControlInfoID: Technicalres.data.data.id,
            }).then(async (vehicleres) => {
              allVehicles = JSON.parse(
                InsprofileRes.data.data.drivingSchoolVehiclesInfoId
              );

              allVehicles = {
                ...allVehicles,
                ["Vehicle" + (Object.keys(allVehicles).length + 1)]:
                  vehicleres.data.data.id,
              };

              await API("post", `Profile/UpdateProfile`, {
                banDate: InsprofileRes.data.data.banDate,
                banStatus: InsprofileRes.data.data.banDate,
                id: InsprofileRes.data.data.id,
                businessInfoId: InsprofileRes.data.data.businessInfoId,
                drivingLisenceInfoId:
                  InsprofileRes.data.data.drivingLisenceInfoId,
                drivingSchoolApprovalInfoId:
                  InsprofileRes.data.data.drivingSchoolApprovalInfoId,
                drivingSchoolIdentityInfoId:
                  InsprofileRes.data.data.drivingSchoolIdentityInfoId,
                drivingSchoolInstructorInfoId:
                  InsprofileRes.data.data.drivingSchoolInstructorInfoId,
                drivingSchoolManagerInfoId:
                  InsprofileRes.data.data.drivingSchoolManagerInfoId,
                vehicleDetailInfoId:
                  InsprofileRes.data.data.vehicleDetailInfoId,
                exersiceAuthorizationInfoId:
                  InsprofileRes.data.data.exersiceAuthorizationInfoId,
                insuranceCompanyInfoId:
                  InsprofileRes.data.data.insuranceCompanyInfoId,
                isAdminBan: InsprofileRes.data.data.isAdminBan,
                isEmailSent: InsprofileRes.data.data.isEmailSent,
                lat: InsprofileRes.data.data.lat,
                long: InsprofileRes.data.data.long,
                personalInfoId: InsprofileRes.data.data.personalInfoId,
                personalInfos: InsprofileRes.data.data.personalInfos,
                role: InsprofileRes.data.data.role,
                status: InsprofileRes.data.data.status,
                technicalControlInfoId:
                  InsprofileRes.data.data.technicalControlInfoId,
                vehicleInsuranceInfoId:
                  InsprofileRes.data.data.vehicleInsuranceInfoId,
                drivingSchoolVehiclesInfoId:
                  Object.keys(allVehicles).length > 0
                    ? JSON.stringify(allVehicles)
                    : "",
              }).then(() => {
                toast.success("Vehicle added scuccessfully");
                getVehicleData(user);
                setAddVehicle(false);
                setVehicleErrors({});
              });
            });
          });
        });
      }
    );
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
      <MobileViewFilters title="Vehicles" />
      <div className="Filters">
        <Grid
          container
          spacing={1}
          sx={{ marginTop: "30px", marginLeft: "70px" }}
        >
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
              Vehicles
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
      <div
        style={{
          display: "flex",
          width: "95%",
          marginTop: "5%",
          justifyContent: "flex-end",
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
      <DataTable
        data={vehicleData}
        columns={Vehiclescolumns}
        open={handleEditVehicle}
        handleDeleteVehicle={handleDeleteVehicle}
      ></DataTable>

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
                value={vehicleDet.FristRegDate}
                maxDate={moment()}
                name="FristRegDate"
                required={true}

                onChange={(e) => {
                  onChange(
                    "FristRegDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={vehicleErrors['FristRegDate']?true:false}
                ErrorMsg={vehicleErrors['FristRegDate']}
                padding="20px 0 0 0px !important"
                width="100% !important"
              />
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Brand"
                required={true}
                placeholder="Select Option"
                value={vehicleDet.Brand}
                onChange={(e) => getExcludingMakes(e)}
                MenuItem={allMakes}
                error={vehicleErrors['Brand']?true:false}
                ErrorMsg={vehicleErrors['Brand']}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Model"
                required={true}
                name="Model"
                placeholder="Select Option"
                value={vehicleDet.Model}
                onChange={(e) => {
                  onChange("Model", e.target.value);
                }}
                error={vehicleErrors['Model']?true:false}
                ErrorMsg={vehicleErrors['Model']}
                MenuItem={excludingMakes}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Number Plate"
                type="text"
                required={true}
                name="NumberPlate"
                value={vehicleDet.NumberPlate}
                placeholder="Numeric"
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={vehicleErrors['NumberPlate']?true:false}
                ErrorMsg={vehicleErrors['NumberPlate']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                required={true}
                label="Color"
                name="Color"
                value={vehicleDet.Color}
                type="text"
                placeholder="Select Color"
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={vehicleErrors['Color']?true:false}
                ErrorMsg={vehicleErrors['Color']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Gearbox"
                required={true}
                name="GearBox"
                value={vehicleDet.GearBox}
                MenuItem={[
                  { name: "Auto", value: "Auto" },
                  { name: "Manual", value: "Manual" },
                ]}
                onChange={(e) => {
                  onChange("GearBox", e.target.value);
                }}
                error={vehicleErrors['GearBox']?true:false}
                ErrorMsg={vehicleErrors['GearBox']}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Energy"
                placeholder="Select"
                required={true}
                name="Energy"
                value={vehicleDet.Energy}
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
                error={vehicleErrors['Energy']?true:false}
                ErrorMsg={vehicleErrors['Energy']}
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
                required={true}
                label="YourImg"
                  name="VehicleImg"
                  value={vehicleDet.VehicleImg}
                  onChange={handleFileChange}
                  error={vehicleErrors['VehicleImg']?true:false}
                  ErrorMsg={vehicleErrors['VehicleImg']}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FilePicker
                  title="Upload Vehicle Registration Certificate"
                  label="RegCertificate"
                required={true}
                name="VehicleRegImg"
                  value={vehicleDet.VehicleRegImg}
                  onChange={handleFileChange}
                  error={vehicleErrors['VehicleRegImg']?true:false}
                  ErrorMsg={vehicleErrors['VehicleRegImg']}
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
                required={true}
                placeholder="John"
                name="VehicleInsurer"
                value={vehicleDet.VehicleInsurer}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={vehicleErrors['VehicleInsurer']?true:false}
                ErrorMsg={vehicleErrors['VehicleInsurer']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Police Nunber"
                type="text"
                required={true}
                name="PoliceNumber"
                placeholder="Numeric"
                value={vehicleDet.PoliceNumber}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                error={vehicleErrors['PoliceNumber']?true:false}
                ErrorMsg={vehicleErrors['PoliceNumber']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Start Date"
                value={vehicleDet.StartDate}
                maxDate={moment()}
                required={true}
                name="StartDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  onChange(
                    "StartDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={vehicleErrors['StartDate']?true:false}
                ErrorMsg={vehicleErrors['StartDate']}
              />
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="End Date"
                minDate={moment()}
                required={true}
                name="EndDate"
                value={vehicleDet.EndDate}
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  onChange("EndDate", moment(e).format("YYYY-MM-DDThh:mm:ss"));
                }}
                error={vehicleErrors['EndDate']?true:false}
                ErrorMsg={vehicleErrors['EndDate']}
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
                required={true}
                name="GreenCard"
                  value={vehicleDet.GreenCard}
                  onChange={handleFileChange}
                  error={vehicleErrors['GreenCard']?true:false}
                  ErrorMsg={vehicleErrors['GreenCard']}
                />
              </Grid>
            </Grid>
          </div>
          <div className="termsConditionsCheckbox">
          <Checkbox
                disabled={disable}
                className="checkbox"
                onClick={(e) => setCheckbox1(!checkbox1)}
              />
              <Typography
                variant="body1"
                className="termsConditionsCheckboxTitle"
              >
                Technical Control Details if any?
              </Typography>
            </div>
            {checkbox1 ? (
              <>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Typography className="Heading1">Technical Control</Typography>
          <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of Technical Control"
                value={vehicleDet.TechControlDate}
                maxDate={moment()}
                name="TechControlDate"
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  onChange(
                    "TechControlDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={vehicleErrors['TechControlDate']?true:false}
                ErrorMsg={vehicleErrors['TechControlDate']}
              />
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="End Date"
                value={vehicleDet.TechEndDate}
                name="TechEndDate"
                minDate={moment()}
                padding="20px 0 0 0px !important"
                width="100% !important"
                onChange={(e) => {
                  onChange(
                    "TechEndDate",
                    moment(e).format("YYYY-MM-DDThh:mm:ss")
                  );
                }}
                error={vehicleErrors['TechEndDate']?true:false}
                ErrorMsg={vehicleErrors['TechEndDate']}
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
                  value={vehicleDet.CtImg}
                  onChange={handleFileChange}
                  error={vehicleErrors['CtImg']?true:false}
                ErrorMsg={vehicleErrors['CtImg']}
                />
              </Grid>
            </Grid>
          </div>
          </>
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
            {console.log("handleAddVehicle",handleAddVehicle)}
            <Button
              text={isEdit ? "Edit" : "Add"}
              buttonLableStyle="btn_main"
              style={{ marginTop: "24px", marginRight: "10px" }}
              width="10%"
              customWidth1="100%"
              height="48px"
              height2="48px"
              onClick={isEdit ? handleSaveEditVehicle : handleAddVehicle}
              disabled={
                vehicleErrors.FristRegDate===null 
                // && vehicleErrors.Brand===null
                // && vehicleErrors.Model===null
                // && vehicleErrors.NumberPlate===null
                // && vehicleErrors.Color===null
                // && vehicleErrors.GearBox===null
                // && vehicleErrors.Energy===null
                // && vehicleErrors.VehicleImg===null
                // && vehicleErrors.VehicleRegImg===null
                // && vehicleErrors.VehicleInsurer===null
                // && vehicleErrors.PoliceNumber===null
                // && vehicleErrors.StartDate===null
                // && vehicleErrors.EndDate===null
                // && vehicleErrors.GreenCard===null
                && checkbox1===false

                || vehicleErrors.TechControlDate===null
                && vehicleErrors.TechEndDate===null
                && vehicleErrors.CtImg===null
                ? false : true }

            ></Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Index;
