import React from "react";
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
import Step1 from "../../components/RegisterFroms/DrivingSchoolForms/Step1";
import Step2 from "../../components/RegisterFroms/DrivingSchoolForms/Step2";
import Step3 from "../../components/RegisterFroms/DrivingSchoolForms/Step3";
import Step4 from "../../components/RegisterFroms/DrivingSchoolForms/Step4";
import Step5 from "../../components/RegisterFroms/DrivingSchoolForms/Step5";
import Step6 from "../../components/RegisterFroms/DrivingSchoolForms/Step6";

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

const DrivingSchool = () => {
  const [step1, setStep1] = React.useState({
    TradeName: "",
    CompanyName: "",
    Address: "",
    Complement: "",
    Zip: "",
    City: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Password: "",
    Password2: "",
    Language: "",
    OtherPlateform: false,
    Platform: "",
    Hours: "",
    CPF: false,
  });
  const [step2, setStep2] = React.useState({
    Number: "",
    IssuingAurh: "",
    Approvaldate: "",
    RcProImg: "",
    SiretNumber: "",
    City: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Password: "",
    Password2: "",
    Language: "",
    OtherPlateform: false,
    CPF: "",
  });
  const [step3, setStep3] = React.useState({
    Tradename: "",
    Companyname: "",
    Address: "",
    RcPro: "",
  });
  const [step4, setStep4] = React.useState({
    Firstname: "",
    Surname: "",
    Dob: "",
    Pob: "",
    Address: "",
    Gender: "",
    Complement: "",
    ip: "",
    City: "",
  });
  const [step5, setStep5] = React.useState({
    RegistrationDate: "",
    Brand: "",
    Model: "",
    NumberPlate: "",
    GearBox: "",
    Color: "",
    Energy: "",
    CarImage: "",
    CertificateFrontImage: "",
    CertificateBackImage: "",
    Insurer: "",
    PoliceNumber: "",
    StartDate: "",
    EndDate: "",
    GreenCard: "",
    TechControlDate: "",
    TechEndDate: "",
    CT: "",
  });
  const [step6, setStep6] = React.useState({
    Firstname: "",
    Surname: "",
    Dob: "",
    Pob: "",
    Gender: "",
    Address: "",
    Complment: "",
    ZipCode: "",
    City: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Password: "",
    ConfirmPassword: "",
    UploadImage: "",
    DriverLicenseNumber: "",
  });

  const steps = [
    "Identity",
    "Details",
    "Insurance",
    "Manaager",
    "Vehicle",
    "Instructor",
    "Done",
  ];

  const [activeStep, setActiveStep] = React.useState(1);

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
  const handleStep5 = (name, value) => {
    setStep5({ ...step5, [name]: value });
  };
  const handleStep6 = (name, value) => {
    setStep6({ ...step6, [name]: value });
  };

  return (
    <React.Fragment>
      <RegisterHeader
        title="Driving School Registration"
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
              <>Confirm Identity</>
            ) : activeStep === 2 ? (
              <>Approval</>
            ) : activeStep === 3 ? (
              <>Insurance Company</>
            ) : activeStep === 4 ? (
              <>Manager Identity</>
            ) : activeStep === 5 ? (
              <>Vehicles</>
            ) : activeStep === 6 ? (
              <>Identity Of Instructor</>
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
                        step2={step1}
                        setStep1={setStep1}
                        onChange={handleStep2}
                      />
                    ) : activeStep === 3 ? (
                      <Step3
                        step1={step1}
                        setStep1={setStep1}
                        onChange={handleStep3}
                      />
                    ) : activeStep === 4 ? (
                      <Step4
                        step1={step1}
                        setStep1={setStep1}
                        onChange={handleStep4}
                      />
                    ) : activeStep === 5 ? (
                      <Step5
                        step1={step1}
                        setStep1={setStep1}
                        onChange={handleStep5}
                      />
                    ) : activeStep === 6 ? (
                      <Step6
                        step1={step1}
                        setStep1={setStep1}
                        onChange={handleStep6}
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
                      onClick={handleNext}
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

export default DrivingSchool;
