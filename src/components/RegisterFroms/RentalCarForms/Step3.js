import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import DropDown from "../../Common/DropDown";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import API from "../../../api/index";
import DatePicker from "../../Common/DatePicker";
import moment from "moment";
import Makes from "../../../assets/makesModels/Makes.xml";
import MakesExc from "../../../assets/makesModels/MakesExc.xml";
import Models from "../../../assets/makesModels/Models.xml";
import axios from "axios";

const Step3 = (props) => {
  const [FirstRegDate, setFirstRegDate] = React.useState(new Date());
  const [StartDate, setStartDate] = React.useState(new Date());
  const [EndDate, setEndDate] = React.useState(new Date());
  const [TechnicalControl, setTechnicalControl] = React.useState(new Date());
  const [TechnicalControlEndDate, setTechnicalControlEndDate] = React.useState(
    new Date()
  );
  var XMLParser = require("react-xml-parser");
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
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
        <Typography className="Heading1">Vehicle Details</Typography>
        <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 2% 0px" />
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
        <Grid container spacing={4}>
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
    </Box>
  );
};
export default Step3;
