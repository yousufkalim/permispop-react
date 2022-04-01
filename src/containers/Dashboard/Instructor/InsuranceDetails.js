import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "../../../components/Common/Button";
import { Divider } from "@mui/material";
import API from "../../../api";

const InsuranceDetails = () => {
  const [businesstore, setBusinesStore] = useState({});
  const [vehicledetail, setVehicleDetail] = useState({});
  const [drivinglicense, setDrivingLicense] = useState({});
  const [technicalcontrol, setTechnicalControl] = useState({});
  const [vehicleInsurance, setVehicleInsurance] = useState({});
  const [exerciseauthorization, setExerciseAuthorization] = useState({});
  const [companyinsurance, setCompanyInsurance] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getInsuranceData(userData);
  }, []);

  const getInsuranceData = async (userData) => {
    await API("get", `Profile/GetProfileByPersonalId?id=${userData.id}`).then(
      async (InsprofileRes) => {
        await API(
          "get",
          `VehicleInsurance/GetVehicleInsuranceByIdAsync?id=${InsprofileRes.data.data.vehicleInsuranceInfoId}`
        ).then((Insurancevehicleres) => {
          setVehicleInsurance(Insurancevehicleres.data.data);
        });
        await API(
          "get",
          `InsuranceCompany/GetInsuranceCompanyByIdAsync?id=${InsprofileRes.data.data.insuranceCompanyInfoId}`
        ).then((Companyinsurance) => {
          setCompanyInsurance(Companyinsurance.data.data);
        });
        await API(
          "get",
          `DrivingLisence/GetDrivingLisenceByIdAsync?id=${InsprofileRes.data.data.drivingLisenceInfoId}`
        ).then((drivinglicenseres) => {
          setDrivingLicense(drivinglicenseres.data.data);
        });

        let vehicle1Id = JSON.parse(
          InsprofileRes.data.data.vehicleDetailInfoId
        ).Vehicle1;

        await API(
          "get",
          `VehicleDetail/GetVehicleDetailByIdAsync?id=${vehicle1Id}`
        ).then((Vehicledetailres) => {
          setVehicleDetail(Vehicledetailres.data.data);
        });

        await API(
          "get",
          `VehicleInsurance/GetVehicleInsuranceByIdAsync?id=${InsprofileRes.data.data.vehicleInsuranceInfoId}`
        ).then((vehicleinsuranceres) => {
          setVehicleInsurance(vehicleinsuranceres.data.data);
        });
        await API(
          "get",
          `TechnicalControl/GetTechnicalControlByIdAsync?id=${InsprofileRes.data.data.technicalControlInfoId}`
        ).then((Technicalcontrolres) => {
          setTechnicalControl(Technicalcontrolres.data.data);
        });

        await API(
          "get",
          `ExersiceAuthorization/GetExersiceAuthorizationByIdAsync?id=${InsprofileRes.data.data.exersiceAuthorizationInfoId}`
        ).then((exerciseAuthorizationres) => {
          setExerciseAuthorization(exerciseAuthorizationres.data.data);
        });

        await API(
          "get",
          `Business/GetBusinessStoreByIdAsync?id=${InsprofileRes.data.data.businessInfoId}`
        ).then((Businessstoreres) => {
          setBusinesStore(Businessstoreres.data.data);
        });
      }
    );
  };
  return (
    <>
      <Grid container spacing={1} className="insurancediv">
        <Typography
          fontWeight={600}
          fontSize={25}
          paddingTop={5}
          marginLeft={4}
        >
          Insurance Details
        </Typography>
        <Button className="insuranceBtn" text="Update Profile"></Button>
      </Grid>
      <Divider />

      <Grid container paddingTop={3} sx={{ margin: "30px" }}>
        <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
          <Typography
            className="GridTitle"
            paddingTop={2}
            paddingLeft={3}
            fontSize={20}
          >
            Insurance Company
          </Typography>
          <Divider />
          <Grid item xs={12} md={12} className="textdiv">
            <label>Insurer</label>
            <input
              className="placeH"
              placeholder="EFU"
              value={companyinsurance.insurer ? companyinsurance.insurer : ""}
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>Ploice Number</label>
            <input
              placeholder="3222222"
              value={
                companyinsurance.policeNumber
                  ? companyinsurance.policeNumber
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>Start Date</label>
            <input
              placeholder="invalid date"
              value={
                companyinsurance.startDate ? companyinsurance.startDate : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>End Date</label>
            <input
              placeholder="30/05/2021"
              value={companyinsurance.endDate ? companyinsurance.endDate : ""}
            />
          </Grid>
        </Grid>

        <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
          <Typography
            className="GridTitle"
            paddingTop={2}
            paddingLeft={3}
            fontSize={20}
          >
            Driving License
          </Typography>
          <Divider />
          <Grid item xs={12} md={12} className="textdiv">
            <label>License Number</label>
            <input
              className="placeH"
              placeholder="05/07/2021"
              value={
                drivinglicense.lisenceNumber ? drivinglicense.lisenceNumber : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>Delivery Place</label>
            <input
              placeholder="433-34344"
              value={
                drivinglicense.deliveryPlace ? drivinglicense.deliveryPlace : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>Obtain Date</label>
            <input
              placeholder="05/05/2021"
              value={
                drivinglicense.obtainingDate ? drivinglicense.obtainingDate : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>Validity Date</label>
            <input
              placeholder="05/05/2021"
              value={
                drivinglicense.validityDate ? drivinglicense.validityDate : ""
              }
            />
          </Grid>
        </Grid>

        <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
          <Typography
            className="GridTitle"
            paddingTop={2}
            paddingLeft={3}
            fontSize={20}
          >
            Vehicle Detail
          </Typography>
          <Divider />
          <Grid item md={12} className="textdiv">
            <label>Registration Date</label>
            <input
              placeholder="05/05/2012"
              value={
                vehicledetail.dateOfFirstRegistration
                  ? vehicledetail.dateOfFirstRegistration
                  : ""
              }
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>Brand</label>
            <input
              placeholder="Audi"
              value={vehicledetail.brand ? vehicledetail.brand : ""}
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>Color</label>
            <input
              placeholder="Black"
              value={vehicledetail.color ? vehicledetail.color : ""}
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>Model</label>
            <input
              placeholder="Black"
              value={vehicledetail.model ? vehicledetail.model : ""}
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>Gear Box</label>
            <input
              placeholder="Auto"
              value={vehicledetail.gearBox ? vehicledetail.gearBox : ""}
            />
          </Grid>
        </Grid>
        <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
          <Typography
            className="GridTitle"
            paddingTop={2}
            paddingLeft={3}
            fontSize={20}
          >
            Vehicle Insurance
          </Typography>
          <Divider />
          <Grid item md={12} className="textdiv">
            <label>Start Date</label>
            <input
              placeholder="05/05/2012"
              value={
                vehicleInsurance.startDate ? vehicleInsurance.startDate : ""
              }
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>End Date</label>
            <input
              placeholder="05/05/2012"
              value={vehicleInsurance.endDate ? vehicleInsurance.endDate : ""}
            />
          </Grid>
        </Grid>
        <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
          <Typography
            className="GridTitle"
            paddingTop={2}
            paddingLeft={3}
            fontSize={20}
          >
            Technical Control
          </Typography>
          <Divider />
          <Grid item md={12} className="textdiv">
            <label>Start Date</label>
            <input
              placeholder="05/05/2012"
              value={
                technicalcontrol.startDateOfTech
                  ? technicalcontrol.startDateOfTech
                  : ""
              }
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>End Date</label>
            <input
              placeholder="05/05/2012"
              value={
                technicalcontrol.endDateOfTechControl
                  ? technicalcontrol.endDateOfTechControl
                  : ""
              }
            />
          </Grid>
        </Grid>

        <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
          <Typography
            className="GridTitle"
            paddingTop={2}
            paddingLeft={3}
            fontSize={20}
          >
            Exercise Authorization
          </Typography>
          <Divider />
          <Grid item md={12} className="textdiv">
            <label>Authorization Date</label>
            <input
              placeholder="xxxxxxxxxxx"
              value={
                exerciseauthorization.authorizationDate
                  ? exerciseauthorization.authorizationDate
                  : ""
              }
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>Issueing Authority</label>
            <input
              placeholder="xxxxxxxxxxx"
              value={
                exerciseauthorization.issuingAuthority
                  ? exerciseauthorization.issuingAuthority
                  : ""
              }
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>Expiry Date</label>
            <input
              placeholder="xxxxxxxxxxx"
              value={
                exerciseauthorization.expirationDate
                  ? exerciseauthorization.expirationDate
                  : ""
              }
            />
          </Grid>
        </Grid>

        <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
          <Typography
            className="GridTitle"
            paddingTop={2}
            paddingLeft={3}
            fontSize={20}
          >
            Business Store
          </Typography>
          <Divider />
          <Grid item md={12} className="textdiv">
            <label>Serial Number</label>
            <input
              placeholder="xxxxxxxxxx"
              value={businesstore.siretNumber ? businesstore.siretNumber : ""}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InsuranceDetails;
