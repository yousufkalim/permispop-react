import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "../../../components/Common/Button";
import { Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import API from "../../../api";

const InsuranceDetails = () => {
  const { i18n, t } = useTranslation();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  const [businesstore, setBusinesStore] = useState({});
  const [vehicledetail, setVehicleDetail] = useState({});
  const [technicalcontrol, setTechnicalControl] = useState({});
  const [vehicleInsurance, setVehicleInsurance] = useState({});
  const [companyinsurance, setCompanyInsurance] = useState({});
  const [description, setDescription] = useState("");
  const [updatefield, SetUpdateField] = useState("");
  const [openupdateprofilemodal, setOpenUpdateProfileModal] = useState(false);
  const [user, setUser] = useState();
  const [item, setItem] = React.useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getInsuranceData(userData);
    setUser(userData);
  }, []);

  const getInsuranceData = async (userData) => {
    await API("get", `Profile/GetProfileByPersonalId?id=${userData.id}`).then(
      async (InsprofileRes) => {
        await API(
          "get",
          `InsuranceCompany/GetInsuranceCompanyByIdAsync?id=${InsprofileRes.data.data.insuranceCompanyInfoId}`
        ).then((Companyinsurance) => {
          setCompanyInsurance(Companyinsurance.data.data);
        });

        let vehicle1Id = JSON.parse(
          InsprofileRes.data.data.vehicleDetailInfoId
        ).vehicle1;

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
          `Business/GetBusinessStoreByIdAsync?id=${InsprofileRes.data.data.businessInfoId}`
        ).then((Businessstoreres) => {
          setBusinesStore(Businessstoreres.data.data);
        });
      }
    );
  };
  const updateProfile = async () => {
    if (description != "") {
      await API("post", `Profile/updateByAdminRequest`, {
        Description: description,
        UpdateField: updatefield,
        User: user.id,
      }).then((res) => {
        toast.success(t("Request is created for profile update"));
        setDescription("");
        SetUpdateField("");
        setOpenUpdateProfileModal(false);
      });
    } else {
      toast.error(t("Description cannot be empty"));
      setDisabled(false);
    }
  };
  return (
    <>
      <Grid container spacing={1} className="insurancediv">
        <Typography fontWeight={600} fontSize={25} paddingTop={5}>
          {t("Insurance Details")}
        </Typography>
        <Button
          className="insuranceBtn"
          text={t("Update Profile")}
          onClick={(e) => setOpenUpdateProfileModal(true)}
        ></Button>
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
            {t("Insurance Company")}
          </Typography>
          <Divider />
          <Grid item xs={12} md={12} className="textdiv">
            <label>{t("Insurer")}</label>
            <input
              className="placeH"
              placeholder="EFU"
              value={companyinsurance.insurer ? companyinsurance.insurer : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>{t("Police Number")}</label>
            <input
              placeholder="3222222"
              value={
                companyinsurance.policeNumber
                  ? companyinsurance.policeNumber
                  : ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>{t("Start Date")}</label>
            <input
              placeholder={t("invalid date")}
              value={
                companyinsurance.startDate ? companyinsurance.startDate : ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>{t("End Date")}</label>
            <input
              placeholder="30/05/2021"
              value={companyinsurance.endDate ? companyinsurance.endDate : ""}
              disabled
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
              {t("Technical Control")}
            </Typography>
            <Divider />
            <Grid item md={12} className="textdiv">
              <label>{t("Start Date")}</label>
              <input
                placeholder="05/05/2012"
                value={
                  technicalcontrol
                    ? technicalcontrol.startDateOfTech
                      ? technicalcontrol.startDateOfTech
                      : "N/A"
                    : "N/A"
                }
                disabled
              />
            </Grid>
            <Grid item md={12} className="textdiv">
              <label>{t("End Date")}</label>
              <input
                placeholder="05/05/2012"
                value={
                  technicalcontrol
                    ? technicalcontrol.endDateOfTechControl
                      ? technicalcontrol.endDateOfTechControl
                      : "N/A"
                    : "N/A"
                }
                disabled
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
              {t("Business Store")}
            </Typography>
            <Divider />
            <Grid item md={12} className="textdiv">
              <label>{t("Serial Number")}</label>
              <input
                placeholder="xxxxxxxxxx"
                value={businesstore.siretNumber ? businesstore.siretNumber : ""}
                disabled
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12} md={12} lg={5.6} className="vehicleGrid">
          <Typography
            className="GridTitle"
            paddingTop={2}
            paddingLeft={3}
            fontSize={20}
          >
            {t("Vehicle Details")}
          </Typography>
          <Divider />
          <Grid item xs={12} md={12} className="textdiv">
            <label>{t("Registration Date")}</label>
            <input
              className="placeH"
              placeholder="05/07/2021"
              value={
                vehicledetail.dateOfFirstRegistration
                  ? vehicledetail.dateOfFirstRegistration
                  : ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>{t("Brand")}</label>
            <input
              placeholder="BMW"
              value={vehicledetail.brand ? vehicledetail.brand : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>{t("Color")}</label>
            <input
              placeholder="Red"
              value={vehicledetail.color ? vehicledetail.color : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>{t("Model")}</label>
            <input
              placeholder="X6 M Competition"
              value={vehicledetail.model ? vehicledetail.model : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={12} className="textdiv">
            <label>{t("Gearbox")}</label>
            <input
              placeholder="Auto"
              value={vehicledetail.gearBox ? vehicledetail.gearBox : ""}
              disabled
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
            {t("Vehicle Insurance")}
          </Typography>
          <Divider />
          <Grid item md={12} className="textdiv">
            <label>{t("Insurer")}</label>
            <input
              placeholder="Honda"
              value={vehicleInsurance.insurer ? vehicleInsurance.insurer : ""}
              disabled
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>{t("Police Number")}</label>
            <input
              placeholder="15"
              value={
                vehicleInsurance.policeNumber
                  ? vehicleInsurance.policeNumber
                  : ""
              }
              disabled
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>{t("Start Date")}</label>
            <input
              placeholder="05/02/2021"
              value={
                vehicleInsurance.startDate ? vehicleInsurance.startDate : ""
              }
              disabled
            />
          </Grid>
          <Grid item md={12} className="textdiv">
            <label>{t("End Date")}</label>
            <input
              placeholder="05/05/2012"
              value={vehicleInsurance.endDate ? vehicleInsurance.endDate : ""}
              disabled
            />
          </Grid>
        </Grid>
        <>
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={openupdateprofilemodal}
            onClose={() => setOpenUpdateProfileModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <Typography sx={{ color: "#110000" }}>
                {t("Profile Update Request")}
              </Typography>
              <FormControl variant="" sx={{ ml: "-3%" }} className="MobileView">
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  //   value={item}
                  defaultValue={0}
                  onChange={handleChange}
                  sx={{
                    width: "500px",
                    fontSize: "18px",
                    color: "#110000",
                  }}
                >
                  <MenuItem
                    value={0}
                    disabled
                    sx={{ paddingTop: "0px !important" }}
                  >
                    {t("Select the options")}
                  </MenuItem>
                  <MenuItem
                    value="InsuranceCompany"
                    name=" InsuranceCompany"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
                    {t("Insurance Company")}
                  </MenuItem>
                  <MenuItem
                    value="DrivingLicense"
                    name="DrivingLicense"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
                    {t("Driving License")}
                  </MenuItem>
                  <MenuItem
                    value="ExerciseAuthorization"
                    name="ExerciseAuthorization"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
                    {t("Exercise Authorization")}
                  </MenuItem>
                  <MenuItem
                    value="BusinessDetails"
                    name="BusinessDetails"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
                    {t("Business Details")}
                  </MenuItem>
                  <MenuItem
                    value="Vehicleinsurance"
                    name="Vehicleinsurance"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
                    {t("Vehicle insurance")}
                  </MenuItem>
                  <MenuItem
                    value="TechnicalControl"
                    name="TechnicalControl"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
                    {t("Technical Control")}
                  </MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ color: "#110000", marginBottom: "3px" }}>
                {t("Reason-Information to update")}
              </Typography>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Minimum 3 rows"
                name="description"
                onChange={(e) => setDescription(e.target.name)}
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <div style={{ marginTop: "2%" }}>
                <Button
                  text="Update Profile"
                  width="95% !important"
                  color="#149e7a"
                  borderRadius="10px"
                  onClick={updateProfile}
                  disabled={disabled}
                ></Button>
              </div>
            </Box>
          </Modal>
        </>
      </Grid>
    </>
  );
};

export default InsuranceDetails;
