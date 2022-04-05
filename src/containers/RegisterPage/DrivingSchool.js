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

const DrivingSchool = () => {
  // States and Variables
  let history = useHistory();
  const [vehicles, setVehicles] = React.useState([]);
  const [instructors, setInstructors] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(1);

  const [step1, setStep1] = React.useState({
    TradeName: "",
    CompanyName: "",
    Address: {
      Label: "",
      Zip: "",
      City: "",
      Lat: "",
      Lng: "",
    },
    Complement: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Password: "",
    Password2: "",
    Language: [],
    OtherPlateform: false,
    Platform: "",
    Hours: "",
    CPF: false,
  });

  const [step2, setStep2] = React.useState({
    Number: "",
    IssuingAurh: "",
    Approvaldate: new Date(),
    RcProImg: "",
    SiretNumber: "",
    KBIS: "",
  });

  const [step3, setStep3] = React.useState({
    insuranceCompany: "",
    policeNumber: "",
    dateInsurance: new Date(),
    RcPro: "",
  });

  const [step4, setStep4] = React.useState({
    Firstname: "",
    Surname: "",
    Dob: "",
    Pob: "",
    Address: {
      Label: "",
      Zip: "",
      City: "",
      Lat: "",
      Lng: "",
    },
    Gender: "",
    Complement: "",
    ProfileImg: "",
  });

  const [step5, setStep5] = React.useState({
    RegistrationDate: new Date(),
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
    StartDate: new Date(),
    EndDate: new Date(),
    GreenCard: "",
    TechControlDate: new Date(),
    TechEndDate: new Date(),
    CTImg: "",
  });

  const [step6, setStep6] = React.useState({
    Firstname: "",
    Surname: "",
    Dob: new Date(),
    Pob: "",
    Gender: "",
    Address: {
      Label: "",
      Zip: "",
      City: "",
      Lat: "",
      Lng: "",
    },
    Complement: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Password: "",
    ConfirmPassword: "",
    ProfileImg: "",
    DriverLicenseNumber: "",
    DriverLicenseStartDate: new Date(),
    DriverLicenseEndDate: new Date(),
    DriverLicenseFrontImg: "",
    DriverLicenseBackImg: "",
    ExcAuthNumber: "",
    ExcAuthIssueAuth: "",
    ExcAuthStartDate: new Date(),
    ExcAuthEndDate: new Date(),
    ExcAuthFrontImg: "",
    ExcAuthBackImg: "",
    TypeContract: "",
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

  // FUNCTIONS

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

  const handleSubmit = async () => {
    let languageArray = step1.Language.map((lang) => {
      return lang.name;
    });

    await API("post", "Personal", {
      firstName: step1.TradeName,
      surName: step1.CompanyName,
      ContactEmail: step1.Email,
      email: step1.Email,
      secondEmail: step1.Email2,
      phone: step1.Phone,
      secondPhone: step1.Phone2,
      complement: step1.Complement,
      password: step1.Password,
      GiveOurPlatformTime: step1.Hours,
      SpokenLanguage: languageArray,
      address: step1.Address.Label,
      zip: step1.Address.Zip,
      city: step1.Address.City,
      lat: step1.Address.Lat,
      long: step1.Address.Lat,
      Role: "DrivingSchool",
      CPFAccept: step1.CPF,
      WhichPlatform: step1.Platform,
    })
      .then(async (DSPersonalRes) => {
        await API("post", "DrivingSchoolApproval", {
          ApprovalNumber: step2.Number,
          ApprovalIssuingAuthority: step2.IssuingAurh,
          DateOfApproval: step2.Approvaldate,
          ApprovalCertificationImagePath: step2.RcProImg,
        })
          .then(async (DrivingSchoolApprovalRes) => {
            await API("post", "Business", {
              siratImagePath: step2.SiretNumber,
              siretNumber: step2.KBIS,
            })
              .then(async (BusinessRes) => {
                await API("post", "InsuranceCompany", {
                  Insurer: step3.insuranceCompany,
                  endDate: step3.dateInsurance,
                  insuranceImagePath: step3.RcPro,
                  policeNumber: step3.policeNumber,
                  startDate: step3.dateInsurance,
                })
                  .then(async (InsuranceCompanyRes) => {
                    await API("post", "DrivingSchoolManager", {
                      address: step4.Address.Label,
                      city: step4.Address.City,
                      complement: step4.Complement,
                      dob: step4.Dob,
                      drivingSchoolManagerPhotoImagePath: step4.ProfileImg,
                      firstName: step4.Firstname,
                      placeOfBirth: step4.Pob,
                      surName: step4.Surname,
                      zip: step4.Address.Zip,
                    })
                      .then(async (DrivingSchoolManagerRes) => {
                        let finalVehicles = {};
                        let finalInstructors = {};

                        let vehiclesRes = [];
                        vehicles.map(async (vehicle) => {
                          let VehicleInsurancePromise = API(
                            "post",
                            "VehicleInsurance",
                            {
                              endDate: vehicle.StartDate,
                              greenCardImagePath: vehicle.GreenCard,
                              insurer: vehicle.Insurer,
                              policeNumber: vehicle.PoliceNumber,
                              startDate: vehicle.EndDate,
                            }
                          );

                          let TechnicalControlPromise = API(
                            "post",
                            "TechnicalControl",
                            {
                              dateofTechnicalControl: vehicle.TechControlDate,
                              endData: vehicle.TechEndDate,
                              endDateOfTechControl: vehicle.TechEndDate,
                              startDateOfTech: vehicle.TechControlDate,
                              technicalControlImagePath: vehicle.CTImg,
                            }
                          );

                          vehiclesRes.push(
                            Promise.all([
                              VehicleInsurancePromise,
                              TechnicalControlPromise,
                            ]).then((e) => {
                              return API("post", "VehicleDetail", {
                                brand: vehicle.Brand,
                                color: vehicle.Color,
                                dateOfFirstRegistration:
                                  vehicle.RegistrationDate,
                                energy: vehicle.Energy,
                                gearBox: vehicle.GearBox,
                                model: vehicle.Model,
                                numberPlate: vehicle.NumberPlate,
                                technicalControlInfoID: e[1].data.data.id,
                                vehichleInsuranceInfoId: e[0].data.data.id,
                                vehicleRegistrationCertificatePhotoImagePath:
                                  vehicle.CertificateFrontImage,
                                vehicleRegistrationCertificatePhotoImagePathBack:
                                  vehicle.CertificateBackImage,
                                vehicleePhotosImagePath: vehicle.CarImage,
                              });
                            })
                          );
                        });

                        let instructorsRes = [];
                        instructors.map(async (instructor, index) => {
                          let DSInstructorPersonalPromise = API(
                            "post",
                            "Personal",
                            {
                              firstName: instructor.Firstname,
                              surName: instructor.Surname,
                              dob: instructor.Dob,
                              placeOfBirth: instructor.Pob,
                              gender: instructor.Gender,
                              ContactEmail: instructor.Email,
                              email: instructor.Email,
                              secondEmail: instructor.Email2,
                              phone: instructor.Phone,
                              secondPhone: instructor.Phone2,
                              complement: instructor.Complement,
                              password: instructor.Password,
                              photo: instructor.ProfileImg,
                              SpokenLanguage: languageArray,
                              address: instructor.Address.Label,
                              zip: instructor.Address.Zip,
                              city: instructor.Address.City,
                              lat: instructor.Address.Lat,
                              long: instructor.Address.Lat,
                              Role: "DSInstructor",
                            }
                          );

                          let DrivingLisencePromise = API(
                            "post",
                            "DrivingLisence",
                            {
                              drivingLisenceImagePath:
                                instructor.DriverLicenseFrontImg,
                              drivingLisenceImagePathBack:
                                instructor.DriverLicenseBackImg,
                              lisenceNumber: instructor.DriverLicenseNumber,
                              obtainingDate: instructor.DriverLicenseStartDate,
                              validityDate: instructor.DriverLicenseEndDate,
                            }
                          );

                          let ExersiceAuthorizationPromise = API(
                            "post",
                            "ExersiceAuthorization",
                            {
                              authorizationDate: instructor.ExcAuthStartDate,
                              authorizationImagePath:
                                instructor.ExcAuthFrontImg,
                              authorizationImagePathBack:
                                instructor.ExcAuthBackImg,
                              authorizationNumber: instructor.ExcAuthNumber,
                              expirationDate: instructor.ExcAuthEndDate,
                              issuingAuthority: instructor.ExcAuthIssueAuth,
                            }
                          );
                          let BusinessPromise = API("post", "Business", {
                            siretNumber: "",
                          });

                          instructorsRes.push(
                            Promise.all([
                              DSInstructorPersonalPromise,
                              DrivingLisencePromise,
                              ExersiceAuthorizationPromise,
                              BusinessPromise,
                            ]).then((e) => {
                              finalInstructors = {
                                ...finalInstructors,
                                ["Instructor" + (index + 1)]: e[0].data.data.id,
                              };

                              API("post", "InstructorMeetupPoints", {
                                ZipCode: instructor.Address.Zip,
                                city: instructor.Address.City,
                                instructorId: e[0].data.data.id,
                                lat: instructor.Address.Lat,
                                long: instructor.Address.Lng,
                                meetup: instructor.Address.Label,
                              });

                              return API("post", "Profile", {
                                PersonalInfoId: e[0].data.data.id,
                                DrivingLisenceInfoId: e[1].data.data.id,
                                ExersiceAuthorizationInfoId: e[2].data.data.id,
                                BusinessInfoId: e[3].data.data.id,
                                DrivingSchoolIdentityInfoId:
                                  DSPersonalRes.data.data.id,
                                Lat: instructor.Address.Lat,
                                Long: instructor.Address.Lng,
                                Role: "DSInstructor",
                                status: "Active",
                              });
                            })
                          );
                        });

                        Promise.all(vehiclesRes).then((vehicles) => {
                          vehicles.map((v, index) => {
                            finalVehicles = {
                              ...finalVehicles,
                              ["Vehicle" + (index + 1)]: v.data.data.id,
                            };
                          });
                        });
                        Promise.all(instructorsRes).then(
                          async (instructors) => {
                            await API("post", "Profile", {
                              BusinessInfoId: BusinessRes.data.data.id,
                              DrivingSchoolApprovalInfoId:
                                DrivingSchoolApprovalRes.data.data.id,
                              DrivingSchoolIdentityInfoId:
                                DSPersonalRes.data.data.id,
                              DrivingSchoolInstructorInfoId:
                                JSON.stringify(finalInstructors),
                              DrivingSchoolManagerInfoId:
                                DrivingSchoolManagerRes.data.data.id,
                              DrivingSchoolVehiclesInfoId:
                                JSON.stringify(finalVehicles),
                              InsuranceCompanyInfoId:
                                InsuranceCompanyRes.data.data.id,
                              Lat: step1.Address.Lat,
                              Long: step1.Address.Lng,
                              PersonalInfoId: DSPersonalRes.data.data.id,
                              Role: "DrivingSchool",
                              Status: "Active",
                            })
                              .then((dsProfileRes) => {
                                history.push("/");
                                toast.success(
                                  "Driving School Registered Successfully"
                                );
                              })
                              .catch((error) => {
                                console.log(error);
                                toast.error(
                                  "Not Registered....Somethong went wrong"
                                );
                              });
                          }
                        );
                      })
                      .catch((error) => {
                        console.log("DrivingSchoolManager Error", error);
                      });
                  })
                  .catch((error) => {
                    console.log("InsuranceCompany Error", error);
                  });
              })
              .catch((error) => {
                console.log("Business Error", error);
              });
          })
          .catch((error) => {
            console.log("DrivingSchoolApproval Error", error);
          });
      })
      .catch((error) => {
        console.log("Personal Response", error);
      });
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
                    ) : activeStep === 5 ? (
                      <Step5
                        step5={step5}
                        setStep5={setStep5}
                        onChange={handleStep5}
                        vehicles={vehicles}
                        setVehicles={setVehicles}
                      />
                    ) : activeStep === 6 ? (
                      <Step6
                        step6={step6}
                        setStep6={setStep6}
                        onChange={handleStep6}
                        instructors={instructors}
                        setInstructors={setInstructors}
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

export default DrivingSchool;
