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
import API from "../../../api";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Common/FullScreenLoader";
import moment from "moment";

const InsuranceDetails = () => {
  const { i18n, t } = useTranslation();
  const [businesstore, setBusinesStore] = useState({});
  const [vehicledetail, setVehicleDetail] = useState({});
  const [drivinglicense, setDrivingLicense] = useState({});
  const [technicalcontrol, setTechnicalControl] = useState({});
  const [vehicleInsurance, setVehicleInsurance] = useState({});
  const [exerciseauthorization, setExerciseAuthorization] = useState({});
  const [companyinsurance, setCompanyInsurance] = useState({});
  const [description, setDescription] = useState("");
  const [updatefield, SetUpdateField] = useState("");
  const [openupdateprofilemodal, setOpenUpdateProfileModal] = useState(false);
  const [user, setUser] = useState();
  const [item, setItem] = React.useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    setItem(event.target.value);
  };
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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getInsuranceData(userData);
    setUser(userData);
  }, []);

  const getInsuranceData = async (userData) => {
    await API("get", `Profile/GetProfileByPersonalId?id=${userData.id}`).then(async (InsprofileRes) => {
      await API("get", `VehicleInsurance/GetVehicleInsuranceByIdAsync?id=${InsprofileRes.data.data.vehicleInsuranceInfoId}`).then(
        (Insurancevehicleres) => {
          setVehicleInsurance(Insurancevehicleres.data.data);
        }
      );
      await API("get", `InsuranceCompany/GetInsuranceCompanyByIdAsync?id=${InsprofileRes.data.data.insuranceCompanyInfoId}`).then(
        (Companyinsurance) => {
          setCompanyInsurance(Companyinsurance.data.data);
        }
      );
      await API("get", `DrivingLisence/GetDrivingLisenceByIdAsync?id=${InsprofileRes.data.data.drivingLisenceInfoId}`).then(
        (drivinglicenseres) => {
          setDrivingLicense(drivinglicenseres.data.data);
        }
      );

      let vehicle1Id = JSON.parse(InsprofileRes.data.data.vehicleDetailInfoId)["Vehicle 1"];

      await API("get", `VehicleDetail/GetVehicleDetailByIdAsync?id=${vehicle1Id}`).then((Vehicledetailres) => {
        setVehicleDetail(Vehicledetailres.data.data);
      });

      await API("get", `VehicleInsurance/GetVehicleInsuranceByIdAsync?id=${InsprofileRes.data.data.vehicleInsuranceInfoId}`).then(
        (vehicleinsuranceres) => {
          setVehicleInsurance(vehicleinsuranceres.data.data);
        }
      );
      await API("get", `TechnicalControl/GetTechnicalControlByIdAsync?id=${InsprofileRes.data.data.technicalControlInfoId}`).then(
        (Technicalcontrolres) => {
          setTechnicalControl(Technicalcontrolres.data.data);
        }
      );

      await API(
        "get",
        `ExersiceAuthorization/GetExersiceAuthorizationByIdAsync?id=${InsprofileRes.data.data.exersiceAuthorizationInfoId}`
      ).then((exerciseAuthorizationres) => {
        setExerciseAuthorization(exerciseAuthorizationres.data.data);
      });

      await API("get", `Business/GetBusinessStoreByIdAsync?id=${InsprofileRes.data.data.businessInfoId}`).then(
        (Businessstoreres) => {
          setBusinesStore(Businessstoreres.data.data);
        }
      );
      setLoading(false);
    });
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
        <Typography fontWeight={600} fontSize={25} paddingTop={5} marginLeft={4}>
          {t("Insurance Details")}
        </Typography>
        <Button
          className="insuranceBtn"
          text={t("Update Profile")}
          onClick={(e) => setOpenUpdateProfileModal(true)}
          borderRadius="10px"
          height="20% !important"
          margin="0 0 1% 0"
        ></Button>
      </Grid>
      <Divider />
      {loading ? (
        <Loader></Loader>
      ) : (
        <Grid container paddingTop={3} sx={{ margin: "30px" }}>
          <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
            <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
              {t("Insurance Company")}
            </Typography>
            <Divider />
            <Grid item xs={12} md={12} className="textdiv">
              <label>{t("Insurer")}</label>
              <input className="placeH" placeholder="EFU" value={companyinsurance.insurer ? companyinsurance.insurer : ""} />
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>{t("Police Number")}</label>
              <input placeholder="3222222" value={companyinsurance.policeNumber ? companyinsurance.policeNumber : ""} />
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>{t("Start Date")}</label>
              <input
                placeholder={t("invalid date")}
                value={companyinsurance.startDate ? moment(companyinsurance.startDate).format("DD/MM/YYYY") : ""}
              />
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>{t("End Date")}</label>
              <input
                placeholder="30/05/2021"
                value={companyinsurance.endDate ? moment(companyinsurance.endDate).format("DD/MM/YYYY") : ""}
              />
            </Grid>
          </Grid>

          <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
            <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
              {t("Driving License")}
            </Typography>
            <Divider />
            <Grid item xs={12} md={12} className="textdiv">
              <label>{t("License Number")}</label>
              <input
                className="placeH"
                placeholder="05/07/2021"
                value={drivinglicense.lisenceNumber ? drivinglicense.lisenceNumber : ""}
              />
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>{t("Delivery Place")}</label>
              <input placeholder="433-34344" value={drivinglicense.deliveryPlace ? drivinglicense.deliveryPlace : ""} />
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>{t("Obtain Date")}</label>
              <input
                placeholder="05/05/2021"
                value={drivinglicense.obtainingDate ? moment(drivinglicense.obtainingDate).format("DD/MM/YYYY") : ""}
              />
            </Grid>
            <Grid item xs={12} md={12} className="textdiv">
              <label>{t("Validity Date")}</label>
              <input
                placeholder="05/05/2021"
                value={drivinglicense.validityDate ? moment(drivinglicense.validityDate).format("DD/MM/YYYY") : ""}
              />
            </Grid>

            <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
              <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
                {t("Vehicle Detail")}
              </Typography>
              <Divider />
              <Grid item md={12} className="textdiv">
                <label>{t("Registration Date")}</label>
                <input
                  placeholder="05/05/2012"
                  value={
                    vehicledetail.dateOfFirstRegistration
                      ? moment(vehicledetail.dateOfFirstRegistration).format("DD/MM/YYYY")
                      : ""
                  }
                />
              </Grid>
              <Grid item md={12} className="textdiv">
                <label>{t("Brand")}</label>
                <input placeholder="Audi" value={vehicledetail.brand ? vehicledetail.brand : ""} />
              </Grid>
              <Grid item md={12} className="textdiv">
                <label>{t("Color")}</label>
                <input placeholder="Black" value={vehicledetail.color ? vehicledetail.color : ""} />
              </Grid>
              <Grid item md={12} className="textdiv">
                <label>{t("Model")}</label>
                <input placeholder="Black" value={vehicledetail.model ? vehicledetail.model : ""} />
              </Grid>
              <Grid item md={12} className="textdiv">
                <label>{t("Gear Box")}</label>
                <input placeholder="Auto" value={vehicledetail.gearBox ? vehicledetail.gearBox : ""} />
              </Grid>
            </Grid>
            <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
              <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
                {t("Vehicle Insurance")}
              </Typography>
              <Divider />
              <Grid item md={12} className="textdiv">
                <label>{t("Start Date")}</label>
                <input
                  placeholder="05/05/2012"
                  value={vehicleInsurance.startDate ? moment(vehicleInsurance.startDate).format("DD/MM/YYYY") : ""}
                />
              </Grid>
              <Grid item md={12} className="textdiv">
                <label>{t("End Date")}</label>
                <input
                  placeholder="05/05/2012"
                  value={vehicleInsurance.endDate ? moment(vehicleInsurance.endDate).format("DD/MM/YYYY") : ""}
                />
              </Grid>
            </Grid>
            <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
              <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
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
                        ? moment(technicalcontrol.startDateOfTech).format("DD/MM/YYYY")
                        : "N/A"
                      : "N/A"
                  }
                />
              </Grid>
              <Grid item md={12} className="textdiv">
                <label>{t("End Date")}</label>
                <input
                  placeholder="05/05/2012"
                  value={
                    technicalcontrol
                      ? technicalcontrol.endDateOfTechControl
                        ? moment(technicalcontrol.endDateOfTechControl).format("DD/MM/YYYY")
                        : "N/A"
                      : "N/A"
                  }
                />
              </Grid>
            </Grid>

            <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
              <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
                {t("Exercise Authorization")}
              </Typography>
              <Divider />
              <Grid item md={12} className="textdiv">
                <label>{t("Authorization Date")}</label>
                <input
                  placeholder="xxxxxxxxxxx"
                  value={
                    exerciseauthorization.authorizationDate
                      ? moment(exerciseauthorization.authorizationDate).format("DD/MM/YYYY")
                      : ""
                  }
                />
              </Grid>
              <Grid item md={12} className="textdiv">
                <label>{t("Issueing Authority")}</label>
                <input
                  placeholder="xxxxxxxxxxx"
                  value={exerciseauthorization.issuingAuthority ? exerciseauthorization.issuingAuthority : ""}
                />
              </Grid>
              <Grid item md={12} className="textdiv">
                <label>{t("Expiry Date")}</label>
                <input
                  placeholder="xxxxxxxxxxx"
                  value={
                    exerciseauthorization.expirationDate ? moment(exerciseauthorization.expirationDate).format("DD/MM/YYYY") : ""
                  }
                />
              </Grid>
            </Grid>

            <Grid xs={10.5} md={11} lg={5.6} className="vehicleGrid">
              <Typography className="GridTitle" paddingTop={2} paddingLeft={3} fontSize={20}>
                {t("Business Store")}
              </Typography>
              <Divider />
              <Grid item md={12} className="textdiv">
                <label>{t("Serial Number")}</label>
                <input placeholder="xxxxxxxxxx" value={businesstore.siretNumber ? businesstore.siretNumber : ""} />
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
                  <Typography sx={{ color: "#110000" }}>{t(" Profile Update Request")}</Typography>
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
                      <MenuItem value={0} disabled sx={{ paddingTop: "0px !important" }}>
                        {t("Select the options")}
                      </MenuItem>
                      <MenuItem
                        value="InsuranceCompany"
                        name=" InsuranceCompany"
                        onChange={(e) => SetUpdateField(e.target.value)}
                      >
                        {t("Insurance Company")}
                      </MenuItem>
                      <MenuItem value="DrivingLicense" name="DrivingLicense" onChange={(e) => SetUpdateField(e.target.value)}>
                        {t("Driving License")}
                      </MenuItem>
                      <MenuItem
                        value="ExerciseAuthorization"
                        name="ExerciseAuthorization"
                        onChange={(e) => SetUpdateField(e.target.value)}
                      >
                        {t("Exercise Authorization")}
                      </MenuItem>
                      <MenuItem value="BusinessDetails" name="BusinessDetails" onChange={(e) => SetUpdateField(e.target.value)}>
                        {t("Business Details")}
                      </MenuItem>
                      <MenuItem value="Vehicleinsurance" name="Vehicleinsurance" onChange={(e) => SetUpdateField(e.target.value)}>
                        {t("Vehicle insurance")}
                      </MenuItem>
                      <MenuItem value="TechnicalControl" name="TechnicalControl" onChange={(e) => SetUpdateField(e.target.value)}>
                        {t("Technical Control")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Typography sx={{ color: "#110000", marginBottom: "3px" }}>{t("Reason-Information to update")}</Typography>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    placeholder={t("Minimum 3 rows")}
                    name="description"
                    onChange={(e) => setDescription(e.target.name)}
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                  <div style={{ marginTop: "2%" }}>
                    <Button
                      text={t("Update Profile")}
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
        </Grid>
      )}
    </>
  );
};

export default InsuranceDetails;
