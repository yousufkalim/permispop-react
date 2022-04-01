import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DropDown from "../../Common/DropDown";
import Datepicker from "../../Common/DatePicker";
import API from "../../../api/index";
import Makes from "../../../assets/makesModels/Makes.xml";
import MakesExc from "../../../assets/makesModels/MakesExc.xml";
import Models from "../../../assets/makesModels/Models.xml";

const Step4 = (props) => {
  var XMLParser = require("react-xml-parser");
  const [allMakes, setAllMakes] = useState([]);
  const [ExcludingMakes, setAExcludingMakes] = useState([]);
  const [AllModels, setAllModels] = useState([]);

  const handleFileChange = async (e) => {
    const formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "Photo") {
        props.step1.Photo(res.data.message);
      } else if (e.target.name === "RegCertificate") {
        props.step1.RegCertificate(res.data.message);
      } else if (e.target.name === "RegCertificateback") {
        props.step1.RegCertificateback(res.data.message);
      } else if (e.target.name === "Ct") {
        props.step1.Ct(res.data.message);
      }
    });
  };
  const getAllMakes = () => {
    fetch(Makes)
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        const response = xml.children;
        let allArr = [];
        response.map((item) => {
          const id = item.children[0].value;
          const name = item.children[1].value;
          const url = item.children[2].value;
          allArr.push({
            id: id,
            name: name,
            url: url,
          });
        });
        this.getExcludingMakes(allArr);
        // console.log(“final array “, allArr);
      })
      .catch((err) => console.log(err));
  };
  const getExcludingMakes = (allMakes) => {
    fetch(MakesExc)
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        const response = xml.children;
        let excArr = [];
        response.map((item) => {
          const id = item.children[0].value;
          const name = item.children[1].value;
          const url = item.children[2].value;
          excArr.push({
            id: id,
            name: name,
            url: url,
          });
        });
        let result = allMakes.filter(
          (o1) => !excArr.some((o2) => o1.id === o2.id)
        );
        // console.log(“filtered array “, filteredArray);
        this.setState({ makes: result });
      })
      .catch((err) => console.log(err));
  };
  const getAllModels = () => {
    fetch(Models)
      .then((res) => res.text())
      .then((data) => {
        var xml = new XMLParser().parseFromString(data);
        const response = xml.children;
        let allArr = [];
        response.map((childs) => {
          childs.children.map((item) => {
            const modelId = item.children[0].value;
            const modelName = item.children[1].value;
            const year = item.children[2].value;
            const makesId = item.children[3].value;
            const makesName = item.children[4].value;
            allArr.push({
              modelId,
              modelName,
              year,
              makesId,
              makesName,
            });
          });
        });
        console.log("final Model array", allArr);
        this.setState({ allModels: allArr, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
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
          <Datepicker
            label="Date of 1st Registration"
            name="FirstRegistration"
            placeholder="19-10-2021"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step4.FirstRegistration}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></Datepicker>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Brand"
            name="Brand"
            placeholder="Smith"
            value={props.step4.Brand}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <DropDown
            label="Model"
            name="Model"
            placeholder="102 Street, building 02, NY"
            value={props.step4.Model}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></DropDown>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Number Plate"
            name="numPlate"
            placeholder="19-10-1992"
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
      {/* <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            label="Insurer"
            name="Insurer"
            placeholder="Male"
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
            placeholder=""
            value={props.step4.PoliceNum}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
          <Datepicker
            label="Start Date"
            name="InsurerStartDate"
            placeholder="19-10-2021"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step4.InsurerStartDate}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="End Date"
            name="InsurerEndtDate"
            placeholder="19-10-2021"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step4.InsurerEndtDate}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
      </Grid> */}
      <Divider width="100%" borderColor="#D5E4E8" margin="3% 0px 2% 0px" />
      <Typography className="Heading1">Technical Control</Typography>
      <Divider width="100%" borderColor="#D5E4E8" margin="2% 0px 3% 0px" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="Date of Technical Control"
            name="TechStartDate"
            placeholder="19-10-2021"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step4.TechStartDate}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
            }}
          ></Datepicker>
          <div className="borderbottom"></div>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Datepicker
            label="End Date"
            name="TechEndDate"
            placeholder="19-10-2021"
            padding="20px 0 0 0px !important"
            width="100% !important"
            value={props.step4.TechEndDate}
            onChange={(e) => {
              props.onChange(e.target.name, e.target.value);
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
            name="Photo"
            label="uploadImg"
            value={props.step4.Photo}
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Upload Vehicle Registration Certificate Front"
            label="Regcertificate"
            name="RegCertificate"
            value={props.step4.RegCertificate}
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
          {/* <FilePicker
            title="Upload Scanned Green Card"
            name="GreenCard"
            label="GreenCard"
            value={props.step4.GreenCard}
            onChange={handleFileChange}
          /> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FilePicker
            title="Scan and Upload your CT"
            name="Ct"
            label="UploadCT"
            value={props.step4.Ct}
            onChange={handleFileChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Step4;
