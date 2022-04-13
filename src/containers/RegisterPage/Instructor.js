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
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Joi from "joi-browser";


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
  let history = useHistory();

  const [activeStep, setActiveStep] = React.useState(1);
  const [vehicles, setVehicles] = React.useState([]);

  const [step1Errors, setStep1Errors] = React.useState({});
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
    Dob: new Date("01/01/2000"),
    Pob: "",
    Gender: "",
    Email: "",
    Email2: "",
    Phone: "",
    Phone2: "",
    Complement: "",
    Password: "",
    ConfirmPassword: "",
    Language: [],
    FrontImg: "",
    BackImg: "",
    ProfileImg: "",
    OtherPlateform: "",
    GiveTime: "",
    checked:false,
  });

  const step1Schema = {

    Firstname: Joi.string()
      .min(3)
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

      Surname: Joi.string()
      .min(3)
      .required()
      .label("Surname")
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

      Address: Joi.string()
      .required()
      .label("Address")
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

      Dob: Joi.string()
      .required()
      .label("dob")
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
      .label("pob")
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
      .label("gender")
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
      Phone2: Joi
      .label("Phone2")
      .optional()

      .error((errors) => {
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
      .valid(Joi.ref('Password'))
      .label("ConfirmPassword")
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

      Language: Joi.array()
      .required()
      .min(1)
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

      FrontImg: Joi.string()
      .required()
      .label("FrontImg")
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
      BackImg: Joi.string()
      .required()
      .label("BackImg")
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
      OtherPlateform: Joi.string()
      .label("OtherPlateform")
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
      GiveTime: Joi.string()
      .label("GiveTime")
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
    let errorMessage = ''
    if (name==="Address"){
      errorMessage = validateSuggest1(name, value.Label);
    }
    else if (name=="checked"){

    }
    else if(name==='Password'){
      if(value.length<8){
        errorMessage = 'Password must be atleast 8 char long';

      }
      else if(value.length===0){
        errorMessage = 'Password cannot be empty';

      }

    }
    else if(name==='ConfirmPassword'){
      if(step1.Password != value){
        errorMessage = "Password didn't match";

      }
      else if(value.length===0){
        errorMessage = 'Password cannot be empty';

      }

    }
    else {
      errorMessage = validateSuggest1(name, value);
    }
    setStep1Errors({...step1Errors,[name]:errorMessage});
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

  const step2Schema = {
    licenceNo: Joi.string()
    .required()
    .label("licence No.")
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

    deliveryPlace: Joi.string()
    .required()
    .label("delivery Place")
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
    issuingAuthority: Joi.string()
    .required()
    .label("Issuing Authority")
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
    AuthorizationNumber: Joi.string()
    .required()
    .label("Authorization Number")
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
    siretNo: Joi.string()
    .length(14)
    .required()
    .label("siret No.")
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
    obtainingdate: Joi.string()
    .required()
    .label("Obtaining Date")
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
    validitiyDate: Joi.string()
    .required()
    .label("Validitiy Date")
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
    DateAuthorization: Joi.string()
    .required()
    .label("Date Authorization")
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
    ExpirationDate: Joi.string()
    .required()
    .label("Expiration Date")
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
    licensefront: Joi.string()
    .required()
    .label("license front")
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
    licenseback: Joi.string()
    .required()
    .label("License Back")
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
    kbls: Joi.string()
    .required()
    .label("kbls")
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
    Authorizationfront: Joi.string()
    .required()
    .label("Authorization Front")
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
    Authorizationback: Joi.string()
    .required()
    .label("Authorization Back")
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
  }

  const handleStep2 = (name, value) => {
    const errorMessage = validateSuggest2(name, value);
    setStep2Errors({...step2Errors,[name]:errorMessage});
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
    companyInsurer: "",
    companyPoliceNum: "",
    insuranceExpDate: new Date(),
    companyRC: "",
  });

  const step3Schema = {
    companyInsurer: Joi.string()
      .min(3)
      .required()
      .label("company Insurer")
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

      companyPoliceNum: Joi.string()
      .required()
      .label("Police Num")
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

    insuranceExpDate: Joi.string()
      .required()
      .label("Insurance Exp Date")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} can't be a Past Date `;
              break;
          
            default:
              break;
          }
        });
        return errors;
      }),

    companyRC: Joi.string()
      .required()
      .label("Company RC")
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

      vehicleInsurer: Joi.string()
      .required()
      .label("Vehicle Insurer")
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

    vehiclePoliceNum: Joi.string()
      .required()
      .label("vehicle Police Num")
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

      vehicleDoOb: Joi.string()
      .required()
      .label("date of Obtaining")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be a Future Date `;
              break;
          
            default:
              break;
          }
        });
        return errors;
      }),

      ExpDateinsurance: Joi.string()
      .required()
      .label("ExpDate Insurance")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be a Past Date `;
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
  }

  const handleStep3 = (name, value) => {
    const errorMessage = validateSuggest3(name, value);
    setStep3Errors({...step3Errors,[name]:errorMessage});
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
    FirstRegistration: new Date(),
    Brand: "",
    Model: "",
    NumPlate: "",
    Color: "",
    Energy: "",
    Gearbox: "",
    Insurer: "",
    PoliceNum: "",
    VehicleInsurerStartDate: new Date(),
    VehicleInsurerEndDate: new Date(),
    TechStartDate: new Date(),
    TechEndDate: new Date(),
    PhotoPath: "",
    RegCertificatefront: "",
    RegCertificateback: "",
    GreenCardImgPath: "",
    ControlTechImgPath: "",
    checked:false,
    TechnicalControlCheck:"",
  });

  const step4Schema = {
    FirstRegistration: Joi.string()
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

      NumPlate: Joi.string()
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
      Gearbox: Joi.string()
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
      Insurer: Joi.string()
      .min(3)
      .required()
      .label("Insurer")
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
      PoliceNum: Joi.string()
      .required()
      .label("Police Num")
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
      VehicleInsurerStartDate: Joi.string()
      .required()
      .label("Vehicle Insurer Start Date")
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
      VehicleInsurerEndDate: Joi.string()
      .required()
      .label("Vehicle Insurer End Date")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} should not be Past Date `;
              break;
          
            default:
              break;
          }
        });
        return errors;
      }),
    
      PhotoPath: Joi.string()
      .required()
      .label("PhotoPath")
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
      RegCertificatefront: Joi.string()
      .required()
      .label("RegCertificatefront")
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
      RegCertificateback: Joi.string()
      .required()
      .label("RegCertificateback")
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
      GreenCardImgPath: Joi.string()
      .optional()
      .label("GreenCardImgPath")
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
      // TechEndDate: Joi.any()
      //  .when('TechStartDate', { is: "", then: Joi.required(), otherwise: Joi.optional() }),

      // TechStartDate: Joi.any()
      //  .when('TechEndDate', { is: "", then: Joi.required(), otherwise: Joi.optional() }),

     


      TechStartDate: Joi.string()
      .optional()
      .label("TechStartDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Should not be Future Date  `;
              break;
          
            default:
              break;
          }
        });
        return errors;
      }),
      TechEndDate: Joi.string()
      .optional()
      .label("TechEndDate")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} should not be Past Date  `;
              break;
          
            default:
              break;
          }
        });
        return errors;
      }),
      ControlTechImgPath: Joi.string()
      .required()
      .label("ControlTechImgPath")
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
  }
  const handleStep4 = (name, value) => {
    let errorMessage = ''
    if (name==="checked"){
      
    } else {

       errorMessage = validateSuggest4(name, value);
    }
    setStep4Errors({...step4Errors,[name]:errorMessage});
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
  const handleSubmit = async (e) => {
    let languageArray = step1.Language.map((lang) => {
      return lang.name;
    });
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
      SpokenLanguage: languageArray,
      highWayCodeImage: step1.HighWayCodeImg,
      address: step1.Address.Label,
      zip: step1.Address.Zip,
      city: step1.Address.City,
      lat: step1.Address.Lat,
      long: step1.Address.Lat,
    })
      .then(async (PersonalResponse) => {
        await API("post", "DrivingLisence", {
          obtainingDate: step2.obtainingdate,
          validityDate: step2.validitiyDate,
          already_have_license: false,
          deliveryPlace: step2.deliveryPlace,
          drivingLisenceImagePath: step2.licensefront,
          drivingLisenceImagePathBack: step2.licenseback,
          licenses_for: "",
          licenses_type: "",
          lisenceNumber: step2.licenceNo,
          otherLicense: "",
        })
          .then(async (DrivingLisenceResponse) => {
            await API("post", "ExersiceAuthorization", {
              authorizationDate: step2.DateAuthorization,
              authorizationImagePath: step2.Authorizationfront,
              authorizationImagePathBack: step2.Authorizationback,
              authorizationNumber: step2.AuthorizationNumber,
              expirationDate: step2.ExpirationDate,
              issuingAuthority: step2.issuingAuthority,
            })
              .then(async (ExersiceAuthorizationResponse) => {
                await API("post", "Business", {
                  siratImagePath: step2.kbls,
                  siretNumber: step2.siretNo,
                })
                  .then(async (BusinessResponse) => {
                    await API("post", "InsuranceCompany", {
                      endDate: step3.insuranceExpDate,
                      insuranceImagePath: step3.companyRC,
                      insurer: step3.companyInsurer,
                      policeNumber: step3.companyPoliceNum,
                      startDate: new Date(),
                    })
                      .then(async (InsuranceCompanyResponse) => {
                        let finalVehicles = {};

                        let vehiclesRes = [];
                        vehicles.map(async (vehicle) => {
                          let VehicleInsurancePromise = API(
                            "post",
                            "VehicleInsurance",
                            {
                              insurer: vehicle.Insurer,
                              policeNumber: vehicle.PoliceNum,
                              startDate: vehicle.VehicleInsurerStartDate,
                              endDate: vehicle.VehicleInsurerEndDate,
                              greenCardImagePath: vehicle.GreenCardImgPath,
                            }
                          );

                          let TechnicalControlPromise = API(
                            "post",
                            "TechnicalControl",
                            {
                              dateofTechnicalControl: new Date(),
                              endData: new Date(),
                              endDateOfTechControl: vehicle.TechEndDate,
                              startDateOfTech: vehicle.TechStartDate,
                              technicalControlImagePath:
                                vehicle.ControlTechImgPath,
                            }
                          );

                          vehiclesRes.push(
                            Promise.all([
                              VehicleInsurancePromise,
                              TechnicalControlPromise,
                            ]).then((e) => {
                              return API("post", "VehicleDetail", {
                                dateOfFirstRegistration:
                                  vehicle.FirstRegistration,
                                brand: vehicle.Brand,
                                model: vehicle.Model,
                                numberPlate: vehicle.NumPlate,
                                color: vehicle.Color,
                                energy: vehicle.Energy,
                                gearBox: vehicle.Gearbox,
                                vehicleePhotosImagePath:
                                  vehicle.ControlTechImgPath,
                                vehicleRegistrationCertificatePhotoImagePathBack:
                                  vehicle.RegCertificateback,
                                vehicleRegistrationCertificatePhotoImagePath:
                                  vehicle.RegCertificatefront,
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
                            businessInfoId: BusinessResponse.data.data.id,
                            drivingLisenceInfoId:
                              DrivingLisenceResponse.data.data.id,
                            exersiceAuthorizationInfoId:
                              ExersiceAuthorizationResponse.data.data.id,
                            insuranceCompanyInfoId:
                              InsuranceCompanyResponse.data.data.id,
                            lat: step1.Address.Lat,
                            long: step1.Address.Lng,
                            personalInfoId: PersonalResponse.data.data.id,
                            role: "Instructor",
                            status: "Active",
                            technicalControlInfoId:
                              vehicles[0].data.data.technicalControlInfoID,
                            vehicleDetailInfoId: JSON.stringify(finalVehicles),
                            vehicleInsuranceInfoid:
                              vehicles[0].data.data.vehichleInsuranceInfoId,
                          }).then(async (ProfileResponse) => {
                            await API("post", "InstructorMeetupPoints", {
                              ZipCode: step1.Address.Zip,
                              city: step1.Address.City,
                              instructorId: PersonalResponse.data.data.id,
                              lat: step1.Address.Lat,
                              long: step1.Address.Lng,
                              meetup: step1.Address.Label,
                            }).then(() => {
                              history.push("/");
                              toast.success(
                                "Instructor Registered Successfully"
                              );
                            });
                          });
                        });
                      })
                      .catch((error) => {
                        toast.error("Not Registered....Error Occured", error);
                        console.log("InsuranceCompanyResponse", error);
                      });
                  })
                  .catch((error) => {
                    toast.error("Not Registered....Error Occured", error);
                    console.log("BusinessResponse", error);
                  });
              })
              .catch((error) => {
                toast.error("Not Registered....Error Occured", error);
                console.log("ExersiceAuthorizationResponse", error);
              });
          })
          .catch((error) => {
            toast.error("Not Registered....Error Occured", error);
            console.log("DrivingLisenceResponse", error);
          });
      })
      .catch((error) => {
        console.log("PersonalResponse", error);
        toast.error("Not Registered....Error Occured", error);
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
                        vehicles={vehicles}
                        setVehicles={setVehicles}
                        step4Errors={step4Errors}
                        setStep4Errors={setStep4Errors}


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
                      disabled={ 
                        activeStep === 1
                        && step1Errors.Firstname===null 
                        && step1Errors.Surname===null 
                        && step1Errors.Address===null 
                        && step1.Address.City != ""
                        && step1.Address.Zip != ""
                        && step1Errors.Dob===null 
                        && step1Errors.Pob===null 
                        && step1Errors.Gender===null 
                        && step1Errors.Email===null 
                        && step1Errors.Phone===null 
                        && step1Errors.Password==='' 
                        && step1Errors.ConfirmPassword==='' 
                        && step1Errors.FrontImg===null 
                        && step1Errors.BackImg===null 
                        
                        // && step1Errors.ProfileImg===null 
                        // && step1Errors.Language===null 
                        // && step1Errors.Complement===null 
                        
                        // && step1Errors.Noh===null 
                        // && step1Errors.Neph===null 
                        
                        // && step1.checked===false
                        // || step1Errors.OtherPlateform===null 
                        // && step1Errors.GiveTime===null 
                        // && step1Errors.Firstname===null 
                        // && step1Errors.Surname===null 
                        // && step1Errors.Address===null 
                        // && step1.Address.City != ""
                        // && step1.Address.Zip != ""
                        // && step1Errors.Dob===null 
                        // && step1Errors.Pob===null 
                        // && step1Errors.Gender===null 
                        // && step1Errors.Email===null 
                        // && step1Errors.Phone===null 
                        // && step1Errors.Password==='' 
                        // && step1Errors.ConfirmPassword==='' 
                        // && step1Errors.FrontImg===null 
                        // && step1Errors.BackImg===null 
                        
                        // && step1Errors.ProfileImg===null 
                        // && step1Errors.Complement===null 
                        // && step1Errors.Language===null 

                        // && step1Errors.Noh===null 
                        // && step1Errors.Neph===null 




                        || activeStep === 2
                        && step2Errors.obtainingdate===null 
                        && step2Errors.validitiyDate===null 
                        && step2Errors.DateAuthorization===null 
                        && step2Errors.ExpirationDate===null 
                        && step2Errors.licenceNo===null 
                        && step2Errors.issuingAuthority===null 
                        && step2Errors.AuthorizationNumber===null 
                        && step2Errors.siretNo===null 
                        && step2Errors.licensefront===null 
                        && step2Errors.licenseback===null 
                        && step2Errors.kbls===null 
                        && step2Errors.Authorizationfront===null 
                        && step2Errors.Authorizationback===null 

                        || activeStep === 3
                        && step3Errors.companyInsurer===null 
                        && step3Errors.companyPoliceNum===null 
                        && step3Errors.insuranceExpDate===null 
                        && step3Errors.companyRC===null 

                        || activeStep === 4
                        && vehicles.length > 0

                        ? false : true }

 
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
