import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "../../../components/Common/Button";
import { Divider } from "@mui/material";
import API from "../../../api";

const InsuranceDetails = () => {
  const [businesstore, setBusinesStore] = useState({});
  const [vehicledetail, setVehicleDetail] = useState({});
  const [technicalcontrol, setTechnicalControl] = useState({});
  const [vehicleInsurance, setCehicleInsurance] = useState({});
  const [companyinsurance, setCompanyInsurance] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getInsuranceData(userData);
  }, []);

  const getInsuranceData = async (userData) => {
    await API("get", `Profile/GetProfileByPersonalId?id=${userData.id}`).then(
      async (DSprofileRes) => {
        await API(
          "get",
          `Business/GetBusinessStoreByIdAsync?id=${DSprofileRes.data.data.businessInfoId}`
        ).then((Businessstoreres) => {
          setBusinesStore(Businessstoreres.data.data);
        });
        await API(
          "get",
          `InsuranceCompany/GetInsuranceCompanyByIdAsync?id=${DSprofileRes.data.data.insuranceCompanyInfoId}`
        ).then((Companyinsurance) => {
          setCompanyInsurance(Companyinsurance.data.data);
        });

        let vehicle1Id = JSON.parse(
          DSprofileRes.data.data.drivingSchoolVehiclesInfoId
        ).vehicle1;

        await API(
          "get",
          `VehicleDetail/GetVehicleDetailByIdAsync?id=${vehicle1Id}`
        ).then(async (VehicelDetailres) => {
          setVehicleDetail(VehicelDetailres.data.data);

          let technicalId = JSON.parse(
            VehicelDetailres.data.data.technicalControlInfoID
          ).id;

          let vehicleInsuranceId = JSON.parse(
            VehicelDetailres.data.data.vehichleInsuranceInfoId
          ).id;

          await API(
            "get",
            `TechnicalControl/GetTechnicalControlByIdAsync?id=${technicalId}`
          ).then((Technicalcontrolres) => {
            setTechnicalControl(Technicalcontrolres.data.data);
          });
          await API(
            "get",
            `VehicleInsurance/GetVehicleInsuranceByIdAsync?id=${vehicleInsuranceId}`
          ).then((vehichleInsuranceRes) => {
            setCehicleInsurance(vehichleInsuranceRes.data.data);
          });
        });
      }
    );
  };

  return (
    <>
      <Grid container spacing={1} className="insurancediv">
        <Typography fontWeight={600} fontSize={25} paddingTop={5}>
          Insurance Details
        </Typography>
        <Button className="insuranceBtn" text="Update Profile"></Button>
      </Grid>
      <Divider />

      <Grid container paddingTop={3}>
        <Grid xs={12} md={12} lg={5.6} className="vehicleGrid">
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

        <Grid xs={12} md={12} lg={5.6} className="vehicleGrid">
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
            <label>Insurer</label>
            <input
              placeholder="Honda"
              value={vehicleInsurance.insurer ? vehicleInsurance.insurer : ""}
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>Police Number</label>
            <input
              placeholder="15"
              value={
                vehicleInsurance.policeNumber
                  ? vehicleInsurance.policeNumber
                  : ""
              }
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>Start Date</label>
            <input
              placeholder="05/02/2021"
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

        <Grid xs={12} md={12} lg={5.6} className="vehicleGrid">
          <Typography
            className="GridTitle"
            paddingTop={2}
            paddingLeft={3}
            fontSize={20}
          >
            Vehicle Details
          </Typography>
          <Divider />
          <Grid item xs={12} md={12} className="textdiv">
            <label>Registration Date</label>
            <input
              className="placeH"
              placeholder="05/07/2021"
              value={
                vehicledetail.dateOfFirstRegistration
                  ? vehicledetail.dateOfFirstRegistration
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>Brand</label>
            <input
              placeholder="BMW"
              value={vehicledetail.brand ? vehicledetail.brand : ""}
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>Colour</label>
            <input
              placeholder="Red"
              value={vehicledetail.color ? vehicledetail.color : ""}
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>Model</label>
            <input
              placeholder="X6 M Competition"
              value={vehicledetail.model ? vehicledetail.model : ""}
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>Gearbox</label>
            <input
              placeholder="Auto"
              value={vehicledetail.gearBox ? vehicledetail.gearBox : ""}
            />
          </Grid>
        </Grid>
        <Grid xs={12} md={12} lg={5.8}>
          <Grid xs={12} md={12} lg={12} className="vehicleGrid">
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

          <Grid xs={12} md={12} lg={12} marginTop={3} className="vehicleGrid">
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
      </Grid>
    </>
  );
};

export default InsuranceDetails;
