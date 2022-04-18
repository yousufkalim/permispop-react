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

const DrivingSchool = () => {
  // States and Variables
  let history = useHistory();
  const { i18n , t } = useTranslation();
  const [vehicles, setVehicles] = React.useState([]);
  const [instructors, setInstructors] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(1);

  const [step1Errors, setStep1Errors] = React.useState({});
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

  const step1Schema = {
    TradeName: Joi.string()
      .min(3)
      .required()
      .label(t("Trade Name"))
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
    CompanyName: Joi.string()
      .required()
      .label(t("Company Name"))
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
    Address: Joi.string()
      .required()
      .label(t("Address"))
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
      .label(t("Complement"))
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
      .label(t("Email"))
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = t(`${err.context.label} Field can't be empty!`);
              break;
            case "string.email":
              err.message = t(`Not a Valid ${err.context.label}`);
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    Email2: Joi.optional()
      .label(t("Second Email"))
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
      .label(t("Phone"))
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

    Password2: Joi.string()
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
    Language: Joi.array()
      .label("Language")
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

    Platform: Joi.string()
      .label("Platform")
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
    Hours: Joi.string()
      .label("Hours")
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
    CPF: Joi.string()
      .label("CPF")
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
    if (name === "Address") {
      errorMessage = validateSuggest1(name, value.Label);
    } else if (name === "Password") {
      if (value.length < 8) {
        errorMessage = t("Password must be atleast 8 char long");
      } else if (value.length === 0) {
        errorMessage = t("Password cannot be empty");
      }
    } else if (name === "Password2") {
      if (step1.Password != value) {
        errorMessage = t("Password didn't match");
      } else if (value.length === 0) {
        errorMessage = t("Password cannot be empty");
      }
    } else if (name == "OtherPlateform") {
    } else {
      errorMessage = validateSuggest1(name, value);
    }
    setStep1Errors({
      ...step1Errors,
      [name]: errorMessage,
    });
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
    Number: "",
    IssuingAurh: "",
    Approvaldate: new Date(),
    RcProImg: "",
    SiretNumber: "",
    KBIS: "",
  });

  const step2Schema = {
    Number: Joi.string()
      .required()
      .label("Number")
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
    IssuingAurh: Joi.string()
      .required()
      .label("Issuing Aurh")
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
    Approvaldate: Joi.string()
      .required()
      .label("Approval Date")
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
    RcProImg: Joi.string()
      .label("RcProImg")
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
    SiretNumber: Joi.string()
      .min(14)
      .max(14)
      .required()
      .label("Siret Number")
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
    KBIS: Joi.string()
      .required()
      .label("KBIS")
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
    insuranceCompany: "",
    policeNumber: "",
    dateInsurance: new Date(),
    RcPro: "",
  });

  const step3Schema = {
    insuranceCompany: Joi.string()
      .min(3)
      .required()
      .label("Insurance Company")
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
    policeNumber: Joi.string()
      .required()
      .label("Police Number")
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
    dateInsurance: Joi.string()
      .required()
      .label("Date Insurance")
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

  const handleStep3 = (name, value) => {
    const errorMessage = validateSuggest3(name, value);
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

  const [step4Errors, setStep4Errors] = React.useState({});
  const [step4, setStep4] = React.useState({
    Firstname: "",
    Surname: "",
    Dob: new Date("01/01/2000"),
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
    TermAndCondition: false,
  });

  const step4Schema = {
    Firstname: Joi.string()
      .min(3)
      .required()
      .label("Firstname")
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
    Surname: Joi.string()
      .min(3)
      .required()
      .label("Surname")
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
    Dob: Joi.string()
      .required()
      .label("Dob")
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
    Pob: Joi.string()
      .required()
      .label("Pob")
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
    Address: Joi.string()
      .required()
      .label("Address")
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
    Gender: Joi.string()
      .required()
      .label("Gender")
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
    Complement: Joi.string()
      .label("Complement")
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
    ProfileImg: Joi.string()
      .required()
      .label("ProfileImg")
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
  };

  const handleStep4 = (name, value) => {
    let errorMessage = "";
    if (name == "Address") {
      errorMessage = validateSuggest4(name, value.Label);
    } else {
      errorMessage = validateSuggest4(name, value);
    }
    setStep4Errors({ ...step4Errors, [name]: errorMessage });
    setStep4({ ...step4, [name]: value });
  };

  const validateSuggest4 = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: step4Schema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const [step5Errors, setStep5Errors] = React.useState({});
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
    checked:false,
    TechnicalControlCheck:"",
  });

  const step5Schema = {
    RegistrationDate: Joi.string()
      .required()
      .label("Registration Date")
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
              err.message = `${err.context.label} Should not be a Future Date `;
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
              err.message = `${err.context.label} Should not be a Future Date `;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    NumberPlate: Joi.string()
      .required()
      .label("NumberPlate")
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
    GearBox: Joi.string()
      .required()
      .label("GearBox")
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
    Color: Joi.string()
      .required()
      .label("Color")
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
    Energy: Joi.string()
      .required()
      .label("Energy")
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
    CarImage: Joi.string()
      .required()
      .label("Car Image")
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
    CertificateFrontImage: Joi.string()
      .required()
      .label("Certificate Front Image")
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
    CertificateBackImage: Joi.string()
      .required()
      .label("Certificate BackImage")
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
    Insurer: Joi.string()
      .min(3)
      .required()
      .label("Insurer")
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
    PoliceNumber: Joi.string()
      .required()
      .label("Police Number")
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
    StartDate: Joi.string()
      .required()
      .label("Start Date")
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
    EndDate: Joi.string()
      .required()
      .label("End Date")
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
    GreenCard: Joi.string()
      .required()
      .label("GreenCard")
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
    TechControlDate: Joi.string()
      .required()
      .label("TechControlDate")
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
    TechEndDate: Joi.string()
      .required()
      .label("TechEndDate")
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
    CTImg: Joi.string()
      .required()
      .label("CT Img")
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
  };
  const handleStep5 = (name, value) => {
    let errorMessage = ''
    if (name==="checked"){
      
    } else {

      errorMessage = validateSuggest5(name, value);
    }
    setStep5Errors({ ...step5Errors, [name]: errorMessage });
    setStep5({ ...step5, [name]: value });
  };
  const validateSuggest5 = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: step5Schema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const [step6Errors, setStep6Errors] = React.useState({});
  const [step6, setStep6] = React.useState({
    Firstname: "",
    Surname: "",
    Dob: new Date("01/01/2000"),
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

  const step6Schema = {
    Firstname: Joi.string()
      .min(3)
      .required()
      .label("Firstname")
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
    Surname: Joi.string()
      .min(3)
      .required()
      .label("Surname")
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
    Dob: Joi.string()
      .required()
      .label("Dob")
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
    Pob: Joi.string()
      .required()
      .label("Pob")
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
    Gender: Joi.string()
      .required()
      .label("Gender")
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
    Address: Joi.string()
      .required()
      .label("Address")
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
    Complement: Joi.string()
      .label("Complement")
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
    Email: Joi.string()
      .email()
      .required()
      .label("Email")
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
    Email2: Joi.string()
      .label("Email2")
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
    Phone: Joi.string()
      .required()
      .label("Phone")
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
    Phone2: Joi.string()
      .label("Phone2")
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
    Password: Joi.string()
      .min(8)
      .required()
      .label("Password")
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
    ConfirmPassword: Joi.string()
      .label("ConfirmPassword")
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
    ProfileImg: Joi.string()
      .label("ProfileImg")
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
    DriverLicenseNumber: Joi.string()
      .required()
      .label("DriverLicenseNumber")
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
    DriverLicenseStartDate: Joi.string()
      .required()
      .label("DriverLicenseStartDate")
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
    DriverLicenseEndDate: Joi.string()
      .required()
      .label("DriverLicenseEndDate")
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
    DriverLicenseFrontImg: Joi.string()
      .required()
      .label("DriverLicenseFrontImg")
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
    DriverLicenseBackImg: Joi.string()
      .required()
      .label("DriverLicenseBackImg")
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
    ExcAuthNumber: Joi.string()
      .required()
      .label("ExcAuthNumber")
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
    ExcAuthIssueAuth: Joi.string()
      .required()
      .label("ExcAuthIssueAuth")
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
    ExcAuthStartDate: Joi.string()
      .required()
      .label("ExcAuthStartDate")
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
    ExcAuthEndDate: Joi.string()
      .required()
      .label("ExcAuthEndDate")
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
    ExcAuthFrontImg: Joi.string()
      .required()
      .label("ExcAuthFrontImg")
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
    ExcAuthBackImg: Joi.string()
      .required()
      .label("ExcAuthBackImg")
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
    TypeContract: Joi.string()
      .label("TypeContract")
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
  };

  const handleStep6 = (name, value) => {
    let errorMessage = "";
    if (name === "Address") {
      errorMessage = validateSuggest6(name, value.Label);
    }  else if (name === "Password") {
      if (value.length < 8) {
        errorMessage = t("Password must be atleast 8 char long");
      } else if (value.length === 0) {
        errorMessage = t("Password cannot be empty");
      }
    } else if (name === "Password2") {
      if (step1.Password != value) {
        errorMessage = t("Password didn't match");
      } else if (value.length === 0) {
        errorMessage = t("Password cannot be empty");
      }
    } else if (name == "OtherPlateform") {
    }else {
      errorMessage = validateSuggest6(name, value);
    }
    setStep6Errors({ ...step6Errors, [name]: errorMessage });
    setStep6({ ...step6, [name]: value });
  };
  const validateSuggest6 = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: step6Schema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
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
                                  t("Driving School Registered Successfully")
                                );
                              })
                              .catch((error) => {
                                console.log(error);
                                toast.error(
                                  t("Not Registered....Somethong went wrong")
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
        title={t("Driving School Registration")}
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
              <>{t("Confirm Identity")}</>
            ) : activeStep === 2 ? (
              <>{t("Approval")}</>
            ) : activeStep === 3 ? (
              <>{t("Insurance Company")}</>
            ) : activeStep === 4 ? (
              <>{t("Manager Identity")}</>
            ) : activeStep === 5 ? (
              <>{t("Vehicles")}</>
            ) : activeStep === 6 ? (
              <>{t("Identity Of Instructor")}</>
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
                    {t("All steps completed - you're finished")}
                  </Typography>
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
                      <Step1
                        step1={step1}
                        setStep1={setStep1}
                        onChange={handleStep1}
                        step1Errors={step1Errors}
                      />
                    ) : activeStep === 2 ? (
                      <Step2
                        step2={step2}
                        setStep2={setStep2}
                        onChange={handleStep2}
                        step2Errors={step2Errors}
                      />
                    ) : activeStep === 3 ? (
                      <Step3
                        step3={step3}
                        setStep3={setStep3}
                        onChange={handleStep3}
                        step3Errors={step3Errors}
                      />
                    ) : activeStep === 4 ? (
                      <Step4
                        step4={step4}
                        setStep4={setStep4}
                        onChange={handleStep4}
                        step4Errors={step4Errors}
                      />
                    ) : activeStep === 5 ? (
                      <Step5
                        step5={step5}
                        setStep5={setStep5}
                        onChange={handleStep5}
                        vehicles={vehicles}
                        setVehicles={setVehicles}
                        step5Errors={step5Errors}
                        setStep5Errors={setStep5Errors}
                      />
                    ) : activeStep === 6 ? (
                      <Step6
                        step6={step6}
                        setStep6={setStep6}
                        onChange={handleStep6}
                        instructors={instructors}
                        setInstructors={setInstructors}
                        step6Errors={step6Errors}
                        setStep6Errors={setStep6Errors}
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
                      onClick={
                        activeStep === steps.length - 1
                          ? handleSubmit
                          : handleNext
                      }
                      // disabled={
                      //   activeStep === 1 
                          // && step1Errors.TradeName===null 
                          // && step1Errors.CompanyName===null
                          // && step1Errors.Email===null
                          // && step1Errors.Phone===null
                          // && step1Errors.Password===''
                          // && step1Errors.Password2===''
                          //  && step1Errors.Address === null
                          // && step1.Address.City != ""
                          //  && step1.Address.Zip != "" 

                        // && step1Errors.Language===null
                        // && step1Errors.CPF===null
                        // && step1Errors.Complement===null
                        // && step1Errors.Email2===null
                        // && step1Errors.Phone2===null

                        // && step1.OtherPlateform===false

                        // || step1Errors.Platform===null
                        // && step1Errors.Hours===null
                        // && step1Errors.TradeName===null 
                        // && step1Errors.CompanyName===null
                        // && step1Errors.Email===null
                        // && step1Errors.Phone===null
                        // && step1Errors.Password===''
                        // && step1Errors.Password2===''
                        //  && step1Errors.Address === null
                        // && step1.Address.City != ""
                        //  && step1.Address.Zip != "" 
                        
                        
                        // && step1Errors.Complement===null
                        // && step1Errors.Email2===null
                        // && step1Errors.Phone2===null
                        // && step1Errors.Language===null
                        // && step1Errors.CPF===null


                        //  || activeStep === 2
                        // && step2Errors.Number===null
                        // && step2Errors.IssuingAurh===null
                        // && step2Errors.SiretNumber===null
                        // && step2Errors.KBIS===null
                        // && step2Errors.Approvaldate===null

                        // && step2Errors.RcProImg===null

                        // || activeStep === 3 
                        // && step3Errors.insuranceCompany===null
                        // && step3Errors.policeNumber===null
                        // && step3Errors.RcPro===null
                        // && step3Errors.dateInsurance===null

                        // || activeStep === 4
                        //   && step4Errors.Firstname===null
                        //   && step4Errors.Surname===null
                        //   && step4Errors.Pob===null
                        //   && step4Errors.Gender===null
                        //   && step4Errors.ProfileImg===null
                        //   && step4Errors.Dob===null
                        //   && step4Errors.Address===null

                        //   && step4.TermAndCondition === false 

                          // ||activeStep === 5 && vehicles.length > 0 
                          // ||activeStep === 6 && instructors.length > 0
                      //     ? false
                      //     : true
                      // }
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
