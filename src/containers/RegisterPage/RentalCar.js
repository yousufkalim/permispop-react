import React, { useState } from "react";
import Button from "../../components/Common/Button";
import RegisterHeader from "../../components/RegisterFroms/registerHeader";
import Footer from "../../components/Landing/Footer";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { makeStyles, withStyles } from "@mui/styles";
import StepConnector from "@mui/material/StepConnector";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Step1 from "../../components/RegisterFroms/RentalCarForms/Step1";
import Step2 from "../../components/RegisterFroms/RentalCarForms/Step2";
import Step3 from "../../components/RegisterFroms/RentalCarForms/Step3";
import API from "../../api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 23,
  },
  root: {
    "& $line": {
      backgroundColor: "#fff",
      border: "1px solid #DDEEF2",
    },
  },
  active: {
    "& $line": {
      backgroundColor: "#fff",
      border: "1px solid #DDEEF2",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#219D7B",
    },
  },

  line: {
    height: 10,
    border: 0,
    background: "#000000",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    background: "#fff",
    zIndex: 1,
    color: "black",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "151.02%",
    boxShadow: "0px 4px 11px rgba(0, 0, 0, 0.11)",
  },
  active: {
    fontfamily: "Inter",
    color: "black",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 11px rgba(0, 0, 0, 0.11)",
  },
  completed: {
    color: "#fff",
    fontfamily: "Inter",
    backgroundColor: "#219D7B",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {props.icon}
    </div>
  );
}

const RentalCar = () => {
  let history = useHistory();
  const steps = ["Identity", "Details", "Vehicle", "Done"];
  const [step1, setStep1] = React.useState({
    FirstName: "",
    SurName: "",
    Dob: "",
    Pob: "",
    Gender: "",
    Complement: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Password: "",
    ConfirmPassword: "",
    TimeOnPlatform: "",
    ProfileImg: "",
    FrontSideimg: "",
    BackSideimg: "",
    Address: {
      Label: "",
      Zip: "",
      City: "",
      Lat: "",
      Lng: "",
    },
  });

  const [step2, setStep2] = React.useState({
    Siret: "",
    Kbls: "",
    CompanyInsurer: "",
    CompanyPoliceNumber: "",
    InsuranceDateExp: "",
    RcPro: "",
  });
  const [step3, setStep3] = React.useState({
    FristRegDate: "",
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
    StartDate: "",
    EndDate: "",
    GreenCard: "",
    TechControlDate: "",
    TechEndDate: "",
    CtImg: "",
  });
  const [activeStep, setActiveStep] = React.useState(1);
  const [vehicles, setVehicles] = React.useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(1);
  };
  const handleStep1 = (name, value) => {
    setStep1({ ...step1, [name]: value });
  };
  const handleStep2 = (name, value) => {
    setStep2({ ...step2, [name]: value });
  };
  const handleStep3 = (name, value) => {
    setStep3({ ...step3, [name]: value });
  };

  const handleSubmit = async () => {
    await API("post", "Personal", {
      FirstName: step1.FirstName,
      SurName: step1.SurName,
      DOB: step1.Dob,
      PlaceOfBirth: step1.Pob,
      Gender: step1.Gender,
      FrontIDPhoto: step1.FrontSideimg,
      BackIDPhoto: step1.BackSideimg,
      Address: step1.Address.Label,
      Complement: step1.Complement,
      ZIP: step1.Address.Zip,
      City: step1.Address.City,
      Photo: step1.ProfileImg,
      Password: step1.Password,
      NoOfHrsWanted: step1.TimeOnPlatform,
      Email: step1.Email,
      Phone: step1.Phone,
      SecondEmail: step1.Email2,
      SecondPhone: step1.Phone2,
      Lat: step1.Address.Lat,
      Long: step1.Address.Lng,
      Role: "Car Rental",
    })
      .then(async (personalRes) => {
        await API("post", "Business", {
          Insurer: step2.CompanyInsurer,
          PoliceNumber: step2.CompanyPoliceNumber,
          StartDate: step2.InsuranceDateExp,
          EndDate: step2.InsuranceDateExp,
          GreenCardImagePath: step2.RcPro,
        })
          .then(async (BusinessRes) => {
            await API("post", "InsuranceCompany", {
              Insurer: step2.CompanyInsurer,
              PoliceNumber: step2.CompanyPoliceNumber,
              StartDate: step2.InsuranceDateExp,
              EndDate: step2.InsuranceDateExp,
              GreenCardImagePath: step2.RcPro,
            }).then(async (InsuranceCompanyRes) => {
              let finalVehicles = {};

              let vehiclesRes = [];
              vehicles.map(async (vehicle) => {
                let VehicleInsurancePromise = API("post", "VehicleInsurance", {
                  Insurer: vehicle.VehicleInsurer,
                  PoliceNumber: vehicle.PoliceNumber,
                  StartDate: vehicle.StartDate,
                  EndDate: vehicle.EndDate,
                  GreenCardImagePath: vehicle.GreenCard,
                });

                let TechnicalControlPromise = API("post", "TechnicalControl", {
                  DateofTechnicalControl: vehicle.TechControlDate,
                  startDateOfTech: vehicle.TechControlDate,
                  endDateOfTechControl: vehicle.TechEndDate,
                  TechnicalControlImagePath: vehicle.CtImg,
                });

                vehiclesRes.push(
                  Promise.all([
                    VehicleInsurancePromise,
                    TechnicalControlPromise,
                  ]).then((e) => {
                    return API("post", "VehicleDetail", {
                      DateOfFirstRegistration: vehicle.TechControlDate,
                      Brand: vehicle.TechControlDate,
                      Model: vehicle.TechEndDate,
                      Color: vehicle.CtImg,
                      Energy: vehicle.Energy,
                      GearBox: vehicle.GearBox,
                      NumberPlate: vehicle.NumberPlate,
                      VehicleRegistrationCertificatePhotoImagePath:
                        vehicle.VehicleRegImg,
                      VehicleePhotosImagePath: vehicle.VehicleImg,
                      vehichleInsuranceInfoId: e[0].data.data.id,
                      technicalControlInfoID: e[1].data.data.id,
                    });
                  })
                );
              });

              Promise.all(vehiclesRes).then(async (vehicles) => {
                vehicles.map((v, index) => {
                  finalVehicles = {
                    ...finalVehicles,
                    ["Vehicle" + (index + 1)]: v.data.data.id,
                  };
                });
                await API("post", "Profile", {
                  role: "CarRentalAgent",
                  PersonalInfoId: personalRes.data.data.id,
                  VehicleDetailInfoId: JSON.stringify(finalVehicles),
                  VehicleInsuranceInfoId:
                    vehicles[0].data.data.vehichleInsuranceInfoId,
                  TechnicalControlInfoId:
                    vehicles[0].data.data.technicalControlInfoID,
                  BusinessInfoId: BusinessRes.data.data.id,
                  InsuranceCompanyInfoId: InsuranceCompanyRes.data.data.id,
                }).then(async (Profileres) => {
                  await API("post", "InstructorMeetupPoints", {
                    PersonalInfoId: personalRes.data.data.id,
                    MeetUp: step1.Address.Label,
                    ZIP: step1.Address.Zip,
                    City: step1.Address.City,
                    Lat: step1.Address.Lat,
                    Long: step1.Address.Lng,
                  }).then((e) => {
                    history.push("/");
                    toast.success("Rental Car Registered Successfully");
                  });
                });
              });
            });
          })
          .catch((error) => {
            console.log("Business Error", error);
          });

        console.log("personalResres", personalRes.data.data);
      })
      .catch((error) => {
        console.log("Personal Response", error);
      });
  };
  return (
    <React.Fragment>
      <RegisterHeader
        title="Rental Car Registration"
        subtitle1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius justo et scelerisque varius. Nullam mollis augue et facilisis blandit. Morbi sollicitudin a eros sed cursus."
        subtitle2="Quisque lobortis ultrices dolor, fringilla venenatis leo sodales at. Nam suscipit felis sit amet convallis."
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "60px",
        }}
      >
        <Box sx={{ width: "96%" }}>
          <Typography
            sx={{
              mt: 2,
              mb: 1,
              color: "#2B3135",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItem: "center",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "30px",
              marginBottom: "50px",
            }}
          >
            {activeStep === 1 ? (
              <>Instructor Identity</>
            ) : activeStep === 2 ? (
              <>Rental Car Registration</>
            ) : activeStep === 3 ? (
              <>Vehicles</>
            ) : (
              ""
            )}
          </Typography>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
            className="stepper"
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <span
                    className="steplabel"
                    style={{ fontfamily: "Inter", color: "black" }}
                  >
                    {label}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "83%" }}>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      onClick={handleReset}
                      text="Reset"
                      buttonLableStyle="btn_main"
                      style={{ marginTop: "24px", marginRight: "10px" }}
                      width="10%"
                      customWidth1="100%"
                      height="48px"
                      height2="48px"
                    ></Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    {activeStep === 1 ? (
                      <Step1
                        step1={step1}
                        setStep1={setStep1}
                        onChange={handleStep1}
                      />
                    ) : activeStep === 2 ? (
                      <Step2
                        step2={step2}
                        setStep2={setStep2}
                        onChange={handleStep2}
                      />
                    ) : activeStep === 3 ? (
                      <Step3
                        step3={step3}
                        setStep3={setStep3}
                        onChange={handleStep3}
                        vehicles={vehicles}
                        setVehicles={setVehicles}
                      />
                    ) : (
                      ""
                    )}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      disabled={activeStep === 1}
                      onClick={handleBack}
                      text="Back"
                      buttonLableStyle="btn_main"
                      style={{ marginTop: "24px", marginRight: "10px" }}
                      width="10%"
                      customWidth1="100%"
                      height="48px"
                      height2="48px"
                    ></Button>
                    <Button
                      endIcon={<ArrowForwardIcon sx={{ color: "#fff" }} />}
                      type="submit"
                      text={activeStep === steps.length - 1 ? "Finish" : "Next"}
                      buttonLableStyle="btn_main"
                      style={{ marginTop: "24px" }}
                      width="10%"
                      customWidth1="100%"
                      height="48px"
                      height2="48px"
                      onClick={
                        activeStep === steps.length - 1
                          ? handleSubmit
                          : handleNext
                      }
                    ></Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </div>
        </Box>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default RentalCar;
