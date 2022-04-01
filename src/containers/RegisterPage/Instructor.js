import React from "react";
import Button from "../../components/Common/Button";
import Footer from "../../components/Landing/Footer";
import RegisterHeader from "../../components/RegisterFroms/registerHeader";
import Step1 from "../../components/RegisterFroms/InstructorForms/Step1";
import Step2 from "../../components/RegisterFroms/InstructorForms/Step2";
import Step3 from "../../components/RegisterFroms/InstructorForms/Step3";
import Step4 from "../../components/RegisterFroms/InstructorForms/Step4";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { makeStyles, withStyles } from "@mui/styles";
import StepConnector from "@mui/material/StepConnector";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import API from "../../api/index";
import moment from "moment";

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

const Instructor = () => {
  const [activeStep, setActiveStep] = React.useState(1);

  const [step1, setStep1] = React.useState({
    Firstname: "",
    Surname: "",
    Address: {
      Label: "",
      Zip: "",
      City: "",
      Lat: "",
      Lng: "",
    },
    Dob: new Date(),
    Pob: "",
    Gender: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Complement: "",
    Password: "",
    ConfirmPassword: "",
    Noh: "",
    Neph: "",
    Language: [],
    FrontImg: "",
    BackImg: "",
    ProfileImg: "",
  });

  const [step2, setStep2] = React.useState({
    obtainingdate: new Date(),
    validitiyDate: new Date(),
    DateAuthorization: new Date(),
    ExpirationDate: new Date(),
    licenceNo: "",
    deliveryPlace: "",
    issuingAuthority: "",
    AuthorizationNumber: "",
    siretNo: "",
    licensefront: "",
    licenseback: "",
    kbls: "",
    Authorizationfront: "",
    Authorizationback: "",
  });
  const [step3, setStep3] = React.useState({
    companyInsurer: "",
    companyPoliceNum: "",
    insuranceExpDate: new Date(),
    companyRC: "",
    vehicleInsurer: "",
    vehiclePoliceNum: "",
    vehicleDoOb: new Date(),
    ExpDateinsurance: new Date(),
    RcPro: "",
  });
  const [step4, setStep4] = React.useState({
    FirstRegistration: new Date(),
    Brand: "",
    Model: "",
    NumPlate: "",
    Color: "",
    Energy: "",
    Gearbox: "",
    Insurer: "",
    PoliceNum: "",
    InsurerStartDate: new Date(),
    InsurerEndtDate: new Date(),
    TechStartDate: new Date(),
    TechEndDate: new Date(),
    Photo: "",
    RegCertificatefront: "",
    RegCertificateback: "",
    GreenCard: "",
    Ct: "",
  });

  const steps = ["Identity", "Details", "Insurance", "Vehicle", "Done"];

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
  const handleStep4 = (name, value) => {
    setStep4({ ...step4, [name]: value });
  };
  const handleSubmit = async (e) => {
    await API("post", "Personal", {
      RegistrationDate: moment().format("DD/MM/YYYY"),
      firstName: step1.Firstname,
      surName: step1.Surname,
      dob: step1.Dob,
      placeOfBirth: step1.Pob,
      gender: step1.Gender,
      ContactEmail: step1.Email,
      email: step1.Email,
      secondEmail: step1.Email2,
      phone: step1.Phone,
      secondPhone: step1.Phone2,
      complement: step1.Complement,
      password: step1.Password,
      noOfHrsWanted: step1.Noh,
      neph: step1.Neph,
      role: "Instructor",
      highWayCodeDate: step1.date,
      frontIdPhoto: step1.FrontImg,
      backIdPhoto: step1.BackImg,
      photo: step1.ProfileImg,
      SpokenLanguage: step1.Language,
      highWayCodeImage: step1.HighWayCodeImg,
      address: step1.Address.Label,
      zip: step1.Address.Zip,
      city: step1.Address.City,
      lat: step1.Address.Lat,
      long: step1.Address.Lat,
    })
      .then(async (PersonalResponce) => {
        await API("post", "TechnicalControl", {
          dateofTechnicalControl: step4.TechStartDate,
          endData: new Date(),
          endDateOfTechControl: step4.TechEndDate,
          startDateOfTech: new Date(),
          technicalControlImagePath: step4.Ct,
        }).then(async (TechnicalControlResponce) => {
          await API("post", "VehicleInsurance", {
            endDate: step3.ExpDateinsurance,
            greenCardImagePath: step3.RcPro,
            insurer: step3.vehicleInsurer,
            policeNumber: step3.vehiclePoliceNum,
            startDate: step3.vehicleDoOb,
          }).then(async (VehicleInsuranceResponce) => {
            await API("post", "VehicleDetail", {
              dateOfFirstRegistration: step4.FirstRegistration,
              brand: step4.Brand,
              model: step4.Model,
              numberPlate: step4.NumPlate,
              color: step4.Color,
              energy: step4.Energy,
              gearBox: step4.Gearbox,

              technicalControlInfoID: TechnicalControlResponce.data.data.id,
              vehichleInsuranceInfoId: VehicleInsuranceResponce.data.data.id,
              vehicleRegistrationCertificatePhotoImagePath:
                step4.RegCertificate,
              vehicleRegistrationCertificatePhotoImagePathBack:
                step4.RegCertificateback,
              vehicleePhotosImagePath: step4.Photo,
            }).then(async (VehicleDetailResponce) => {
              await API("post", "DrivingLisence", {
                already_have_license: false,
                deliveryPlace: step2.deliveryPlace,
                drivingLisenceImagePath: step2.licensefront,
                drivingLisenceImagePathBack: step2.licenseback,
                licenses_for: "qwerty",
                licenses_type: "qwerty",
                lisenceNumber: step2.licenceNo,
                obtainingDate: step2.obtainingdate,
                otherLicense: "",
                validityDate: step2.validitiyDate,
              }).then(async (DrivingLisenceResponce) => {
                await API("post", "ExersiceAuthorization", {
                  authorizationDate: step2.DateAuthorization,
                  authorizationImagePath: step2.Authorizationfront,
                  authorizationImagePathBack: step2.Authorizationback,
                  authorizationNumber: step2.AuthorizationNumber,
                  expirationDate: step2.ExpirationDate,
                  issuingAuthority: step2.issuingAuthority,
                }).then(async (ExersiceAuthorizationResponce) => {
                  await API("post", "Business", {
                    siratImagePath: step2.kbls,
                    siretNumber: step2.siretNo,
                  }).then(async (BusinessResponce) => {
                    await API("post", "InsuranceCompany", {
                      endDate: step3.insuranceExpDate,
                      insuranceImagePath: step3.companyRC,
                      insurer: step3.companyInsurer,
                      policeNumber: step3.companyPoliceNum,
                      startDate: new Date(),
                    }).then(async (InsuranceCompanyResponce) => {
                      await API("post", "Profile", {
                        businessInfoId: BusinessResponce.data.data.id,
                        drivingLisenceInfoId:
                          DrivingLisenceResponce.data.data.id,
                        exersiceAuthorizationInfoId:
                          ExersiceAuthorizationResponce.data.data.id,
                        insuranceCompanyInfoId:
                          InsuranceCompanyResponce.data.data.id,
                        lat: step1.Address.Lat,
                        long: step1.Address.Lng,
                        personalInfoId: PersonalResponce.data.data.id,
                        role: "Instructor",
                        status: "Active",
                        technicalControlInfoId:
                          TechnicalControlResponce.data.data.id,
                        vehicleDetailInfoId:
                          VehicleInsuranceResponce.data.data.id,
                        vehicleInsuranceInfoid:
                          VehicleInsuranceResponce.data.data.id,
                      }).then(async (ProfileResponce) => {
                        await API("post", "InstructorMeetupPoints", {
                          ZipCode: step1.Address.Zip,
                          city: step1.Address.City,
                          instructorId: PersonalResponce.data.data.id,
                          lat: step1.Address.Lat,
                          long: step1.Address.Lng,
                          meetup: step1.Address.Label,
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      })
      .catch((error) => {
        console.log(" ERROR -------------->", error);
      });
  };
  return (
    <React.Fragment>
      <RegisterHeader
        title="Instructor Registration"
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
              <>Driver’s License</>
            ) : activeStep === 3 ? (
              <>Insurance</>
            ) : activeStep === 4 ? (
              <>Vehicle Details</>
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
                      />
                    ) : activeStep === 4 ? (
                      <Step4
                        step4={step4}
                        setStep4={setStep4}
                        onChange={handleStep4}
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

export default Instructor;
