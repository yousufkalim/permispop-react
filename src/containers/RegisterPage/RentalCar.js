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
import Joi from "joi-browser";
import { useTranslation } from "react-i18next";

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
  const { i18n, t } = useTranslation();
  let history = useHistory();
  const steps = [t("Identity"), t("Details"), t("Vehicle"), t("Done")];

  const [step1Errors, setStep1Errors] = React.useState({});
  const [step1, setStep1] = React.useState({
    FirstName: "",
    SurName: "",
    Dob: new Date("01/01/2000"),
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

  const step1Schema = {
    FirstName: Joi.string()
      .min(2)
      .required()
      .label("First Name")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;
            case "string.min":
              err.message = `${err.context.label} must be atleast ${err.context.limit} alphabets Longs!`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    SurName: Joi.string()
      .min(2)
      .required()
      .label("SurName")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label}  Field can't be empty`;
              break;
            case "string.min":
              err.message = `${err.context.label} must be atleast ${err.context.limit} alphabets Longs!`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    Dob: Joi.string()
      .required()
      .label("Dob")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),

    Pob: Joi.string()
      .required()
      .label("Pob")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),

    Gender: Joi.string()
      .required()
      .label("Gender")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),

    Complement: Joi.string()
      .required()
      .label("Complement")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),

    Email: Joi.string()
      .email()
      .required()
      .label("Email")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} Field can't be empty!`;
              break;
            case "string.email":
              err.message = `Not a Valid ${err.context.label}`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Email2: Joi.optional()
      .label("Second Email")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.email":
              err.message = `${err.context.label} is Not Valid!`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Phone: Joi.string()

      .length(10)
      .required()
      .label("Phone")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    Phone2: Joi.label("Phone2")
      .optional()

      .error((errors) => {
        return errors;
      }),
    Password: Joi.string()
      .min(8)
      .max(15)
      .required()
      .label("password")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
            case "string.min":
              err.message = `${err.context.label} must be ${err.context.limit} characters Long!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),

    ConfirmPassword: Joi.string()
      .valid(Joi.ref("Password"))
      .min(8)
      .required()
      .label("confirmpassword")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
            case "string.min":
              err.message = `${err.context.label} cant exceed ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),

    TimeOnPlatform: Joi.string()
      .required()
      .label("TimeOnPlatform")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),

    ProfileImg: Joi.string()
      .required()
      .label("ProfileImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),

    FrontSideimg: Joi.string()
      .required()
      .label("FrontSideimg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),

    BackSideimg: Joi.string()
      .required()
      .label("BackSideimg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),

    Address: Joi.string()
      .required()
      .label("Address")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
          }
        });
        return errors;
      }),
  };

  const handleStep1 = (name, value) => {
    let errorMessage = "";
    if (name == "Address") {
      errorMessage = validateSuggest1(name, value.Label);
    } else if (name === "Password") {
      if (value.length < 8) {
        errorMessage = t("Password must be atleast 8 char long");
      } else if (value.length === 0) {
        errorMessage = t("Password cannot be empty");
      }
    } else if (name === "ConfirmPassword") {
      if (step1.Password != value) {
        errorMessage = t("Password didn't match");
      } else if (value.length === 0) {
        errorMessage = t("Password cannot be empty");
      }
    } else {
      errorMessage = validateSuggest1(name, value);
    }

    setStep1Errors({ ...step1Errors, [name]: errorMessage });
    setStep1({ ...step1, [name]: value });
  };

  const validateSuggest1 = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: step1Schema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const [step2Errors, setStep2Errors] = React.useState({});
  const [step2, setStep2] = React.useState({
    Siret: "",
    Kbls: "",
    CompanyInsurer: "",
    CompanyPoliceNumber: "",
    InsuranceDateExp: new Date(),
    RcPro: "",
  });

  const step2Schema = {
    Siret: Joi.string()
      .length(14)
      .required()
      .label("Siret")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;
            case "string.min":
              err.message = `${err.context.label} must be exactly ${err.context.limit} digits!`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    Kbls: Joi.string()
      .required()
      .label("Kbls")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    CompanyInsurer: Joi.string()
      .min(3)
      .required()
      .label("CompanyInsurer")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    CompanyPoliceNumber: Joi.string()
      .required()
      .label("Company Police Number")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    InsuranceDateExp: Joi.string()
      .required()
      .label("InsuranceDateExp")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    RcPro: Joi.string()
      .required()
      .label("RcPro")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
  };
  const handleStep2 = (name, value) => {
    const errorMessage = validateSuggest2(name, value);
    setStep2Errors({ ...step2Errors, [name]: errorMessage });
    setStep2({ ...step2, [name]: value });
  };

  const validateSuggest2 = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: step2Schema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const [step3Errors, setStep3Errors] = React.useState({});
  const [step3, setStep3] = React.useState({
    FristRegDate: new Date(),
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
    StartDate: new Date(),
    EndDate: new Date(),
    GreenCard: "",
    TechControlDate: new Date(),
    TechEndDate: new Date(),
    CtImg: "",
    checked: true,
    TechnicalControlCheck: "",
  });
  const step3Schema = {
    FristRegDate: Joi.string()
      .required()
      .label("First Registration")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    Brand: Joi.string()
      .required()
      .label("Brand")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    Model: Joi.string()
      .required()
      .label("Model")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    NumberPlate: Joi.string()
      .required()
      .label("NumPlate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Color: Joi.string()
      .required()
      .label("Color")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Energy: Joi.string()
      .required()
      .label("Energy")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    GearBox: Joi.string()
      .required()
      .label("Gearbox")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    VehicleImg: Joi.string()
      .required()
      .label("VehicleImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    VehicleRegImg: Joi.string()
      .required()
      .label("VehicleRegImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    VehicleInsurer: Joi.string()
      .min(3)
      .required()
      .label("VehicleInsurer")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    PoliceNumber: Joi.string()
      .required()
      .label("PoliceNumber")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    StartDate: Joi.string()
      .required()
      .label("StartDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    EndDate: Joi.string()
      .required()
      .label("EndDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} should not be past date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    GreenCard: Joi.string()
      .required()
      .label("GreenCard")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    TechControlDate: Joi.string()
      .required()
      .label("TechControlDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} should not be past date  `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    TechEndDate: Joi.string()
      .required()
      .label("TechEndDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} should not be past date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    CtImg: Joi.string()
      .required()
      .label("CtImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
  };

  const handleStep3 = (name, value) => {
    let errorMessage = "";
    if (name === "checked") {
    } else {
      errorMessage = validateSuggest3(name, value);
    }
    setStep3Errors({ ...step3Errors, [name]: errorMessage });
    setStep3({ ...step3, [name]: value });
  };

  const validateSuggest3 = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: step3Schema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

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
      Role: "CarRentalAgent",
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
                let TechnicalControlPromise = "";
                if (step3.checked) {
                  TechnicalControlPromise = API("post", "TechnicalControl", {
                    DateofTechnicalControl: vehicle.TechControlDate,
                    startDateOfTech: vehicle.TechControlDate,
                    endDateOfTechControl: vehicle.TechEndDate,
                    TechnicalControlImagePath: vehicle.CtImg,
                  });
                }
                let array = [];
                if (step3.checked) {
                  array = [VehicleInsurancePromise, TechnicalControlPromise];
                } else {
                  array = [VehicleInsurancePromise];
                }

                vehiclesRes.push(
                  Promise.all([VehicleInsurancePromise, TechnicalControlPromise]).then((e) => {
                    return API("post", "VehicleDetail", {
                      DateOfFirstRegistration: vehicle.FristRegDate,
                      Brand: vehicle.Brand,
                      Model: vehicle.Model,
                      Color: vehicle.Color,
                      Energy: vehicle.Energy,
                      GearBox: vehicle.GearBox,
                      NumberPlate: vehicle.NumberPlate,
                      VehicleRegistrationCertificatePhotoImagePath: vehicle.VehicleRegImg,
                      VehicleePhotosImagePath: vehicle.VehicleImg,
                      vehichleInsuranceInfoId: e[0].data.data.id,
                      technicalControlInfoID: e[1] ? e[1].data.data.id : "",
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
                  VehicleInsuranceInfoId: vehicles[0].data.data.vehichleInsuranceInfoId,
                  TechnicalControlInfoId: vehicles[0].data.data.technicalControlInfoID,
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
                    toast.success(t("Rental Car Registered Successfully"));
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
        title={t("Rental Car Registration")}
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
              <>{t("Instructor Identity")}</>
            ) : activeStep === 2 ? (
              <>{t("Rental Car Registration")}</>
            ) : activeStep === 3 ? (
              <>{t("Vehicles")}</>
            ) : (
              ""
            )}
          </Typography>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} className="stepper">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <span className="steplabel" style={{ fontfamily: "Inter", color: "black" }}>
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
                  <Typography sx={{ mt: 2, mb: 1 }}>{t("All steps completed - you're finished")}</Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      onClick={handleReset}
                      text={t("Reset")}
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
                      <Step1 step1={step1} setStep1={setStep1} onChange={handleStep1} step1Errors={step1Errors} />
                    ) : activeStep === 2 ? (
                      <Step2 step2={step2} setStep2={setStep2} onChange={handleStep2} step2Errors={step2Errors} />
                    ) : activeStep === 3 ? (
                      <Step3
                        step3={step3}
                        setStep3={setStep3}
                        onChange={handleStep3}
                        vehicles={vehicles}
                        setVehicles={setVehicles}
                        step3Errors={step3Errors}
                        setStep3Errors={setStep3Errors}
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
                      text={t("Back")}
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
                      text={activeStep === steps.length - 1 ? t("Finish") : t("Next")}
                      buttonLableStyle="btn_main"
                      style={{ marginTop: "24px" }}
                      width="10%"
                      customWidth1="100%"
                      height="48px"
                      height2="48px"
                      onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                      disabled={
                        (activeStep === 1 &&
                          step1Errors.Address === null &&
                          step1.Address.City != "" &&
                          step1.Address.Zip != "" &&
                          step1Errors.FirstName === null &&
                          step1Errors.SurName === null &&
                          step1Errors.Dob === null &&
                          step1Errors.Pob === null &&
                          step1Errors.Gender === null &&
                          step1Errors.Email === null &&
                          step1Errors.Phone === null &&
                          step1Errors.Password === "" &&
                          step1Errors.ConfirmPassword === "" &&
                          step1Errors.FrontSideimg === null &&
                          step1Errors.BackSideimg === null) ||
                        // && step1Errors.ProfileImg===null
                        // && step1Errors.Phone2===null
                        // && step1Errors.Email2===null
                        // && step1Errors.Complement===null
                        // && step1Errors.TimeOnPlatform===null

                        (activeStep === 2 &&
                          step2Errors.Siret === null &&
                          step2Errors.Kbls === null &&
                          step2Errors.CompanyInsurer === null &&
                          step2Errors.CompanyPoliceNumber === null &&
                          step2Errors.InsuranceDateExp === null &&
                          step2Errors.RcPro === null) ||
                        (activeStep === 3 && vehicles.length > 0)
                          ? false
                          : true
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
