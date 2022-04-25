import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Button from "../../Common/Button";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import Datepicker from "../../Common/DatePicker";
import DoneIcon from "@mui/icons-material/Done";
import Checkbox from "@mui/material/Checkbox";
import DropDown from "../../Common/DropDown";
import API from "../../../api/index";
import axios from "axios";
import AutoComplete from "../../Common/Autocomplete";
import LanguageAutoComplete from "../../Common/LanguageAutoComplete";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Joi from "joi-browser";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { Preview } from "@mui/icons-material";
import { async } from "validate.js";

const StudentForm = (props) => {
  const [checkbox1, setCheckbox1] = React.useState(false);
  const { i18n, t } = useTranslation();
  const [disable, setDisable] = useState(false);
  const [studentErrors, setStudentErrors] = useState({});
  const [addresses, setAddresses] = React.useState([]);
  const [student, setStudent] = React.useState({
    firstname: "",
    surname: "",
    dob: new Date("01-01-2000"),
    pob: "",
    gender: "",
    email: "",
    email2: "",
    phone: "",
    phone2: "",
    complement: "",
    password: "",
    confirmpassword: "",
    noh: "",
    TermAndCondition: false,
    neph: "",
    language: [],
    frontImage: "",
    backImage: "",
    profileImage: "",
    highwayCodeImg: "",
    highwayCodeDate: "",
    checkbox2: false,
    date: "",
    languages: [],
    Address: { zip: "", label: "", city: "", lat: "", lng: "" },
  });
  let history = useHistory();

  const studentSchema = {
    firstname: Joi.string()
      .min(2)
      .required()
      .label(t("First Name"))
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
    surname: Joi.string()
      .min(2)
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
    dob: Joi.string()
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
    pob: Joi.string()
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
    gender: Joi.string()
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
    email: Joi.string()
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
    email2: Joi.label("Second Email").error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          default:
            break;
        }
      });
      return errors;
    }),
    phone: Joi.string()

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
    phone2: Joi.label("Phone2").error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          default:
            break;
        }
      });
      return errors;
    }),
    password: Joi.string()

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
              err.message = `${err.context.label} cant exceed ${err.context.limit} Longs caractères!`;
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
              err.message = `${err.context.label} can't be empty`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    // confirmpassword: Joi.string()
    // .required()
    // .label("confirmpassword")
    // .valid(Joi.ref('password'))

    complement: Joi.string()
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

    noh: Joi.string()
      .label("Number of Hours")
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
    neph: Joi.string()
      .min(14)
      .max(14)
      .label("NEPH Number")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} Field can't be empty`;
              break;
            case "string.min":
              err.message = `${err.context.label} Must be exactly  ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} too long ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    frontImage: Joi.string()
      .label("Front Image")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} can't be empty`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    backImage: Joi.string()
      .label("backImage")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} can't be empty`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    profileImage: Joi.string()
      .label("profile Image")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} can't be empty`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    highwayCodeImg: Joi.string()
      .label("highwayCodeImg")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} can't be empty`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    highwayCodeDate: Joi.string()
      .label("Date")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} can't be empty`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    // checkbox2: Joi.string()
    // .label("checkbox2")
    // .error((errors) => {
    //   errors.forEach((err) => {
    //     switch (err.type) {
    //       default:
    //         break;
    //     }
    //   });
    //   return errors;
    // }),

    language: Joi.array()
      .min(1)
      .label("languages")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} can't be empty`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };

  const handleStudent = (name, value) => {
    let errorMessage = "";
    let phoneCheck = false;
    let regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (name === "Address") {
      errorMessage = validateSuggest(name, value.label);
    } else if (name === "password") {
      if (value.length < 8) {
        errorMessage = t("Password must be atleast 8 char long");
      } else if (value.length === 0) {
        errorMessage = t("Password cannot be empty");
      }
    } else if (name === "confirmpassword") {
      if (student.password != value) {
        errorMessage = t("Password didn't match");
      } else if (value.length === 0) {
        errorMessage = t("Password cannot be empty");
      }
    } else if (name === "dob") {
      let todayDate = moment().format("YYYY");
      let selectedDate = moment(value).format("YYYY");
      if (todayDate - selectedDate > 16) {
      } else {
        errorMessage = t("Student can’t be younger than 16 years old");
      }
    } else if (name === "email2") {
      if (student.email == value) {
        if (student.email === "" && value === "") {
        } else {
          errorMessage = t("Email 2 can’t be the same as the first email");
        }
      } else if (value.length === 0) {
      } else if (regex.test(value)) {
      } else if (regex.test(value) == null || regex.test(value) == "") {
        errorMessage = t("Not a Valid Email");
      }
    } else if (name === "phone") {
      if (value.length > 10) {
        phoneCheck = true;
        if (value.length === 0) {
          errorMessage = t("Phone can't be blank");
        } else if (value[0] != "0") {
          errorMessage = t("Phone number should start with 0");
        } else if (value.length < 10 && value.length > 0) {
          errorMessage = t("The phone must be at least 10 characters");
        }
      } else {
        if (value.length === 0) {
          errorMessage = t("Phone can't be blank");
        } else if (value[0] != "0") {
          errorMessage = t("Phone number should start with 0");
        } else if (value.length < 10 && value.length > 0) {
          errorMessage = t("The phone must be at least 10 characters");
        }
      }
    } else if (name === "phone2") {
      if (value.length > 10) {
        phoneCheck = true;
        if (student.phone == value) {
          if (student.phone === "" && value === "") {
          } else {
            errorMessage = t(
              "The 2nd phone number cannot be the same as the 1st"
            );
          }
        } else if (value.length === 0) {
        } else if (value[0] != "0") {
          errorMessage = t("Phone number should start with 0");
        } else if (value.length < 10 && value.length > 0) {
          errorMessage = t("The phone must be at least 10 characters");
        }
      } else {
        if (student.phone == value) {
          if (student.phone === "" && value === "") {
          } else {
            errorMessage = t(
              "The 2nd phone number cannot be the same as the 1st"
            );
          }
        } else if (value.length === 0) {
        } else if (value[0] != "0") {
          errorMessage = t("Phone number should start with 0");
        } else if (value.length < 10 && value.length > 0) {
          errorMessage = t("The phone must be at least 10 characters");
        }
      }
    } else {
      errorMessage = validateSuggest(name, value);
    }

    setStudentErrors({ ...studentErrors, [name]: errorMessage });
    if (phoneCheck) {
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const validateSuggest = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: studentSchema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleFileChange = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      if (e.target.name === "frontImage") {
        handleStudent("frontImage", res.data.message);
      } else if (e.target.name === "backImage") {
        handleStudent("backImage", res.data.message);
      } else if (e.target.name === "profileImage") {
        handleStudent("profileImage", res.data.message);
      } else if (e.target.name === "highwayCodeImg") {
        handleStudent("highwayCodeImg", res.data.message);
      }
    });
  };
  const handleLanguage = async (e) => {
    var config = {
      method: "get",
      url: `https://parseapi.back4app.com/classes/Language?limit=300&keys=name`,
      headers: {
        "X-Parse-Application-Id": "mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja", // This is the fake app's application id
        "X-Parse-Master-Key": "TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH", // This is the fake app's readonly master key
      },
    };
    await axios(config)
      .then((res) => {
        let languageToSet = [];
        res.data.results.map((item) => {
          languageToSet.push({
            name: item.name,
          });
        });
        setStudent({ ...student, languages: languageToSet });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    handleLanguage();
  }, []);
  const handleSelectAddress = (e) => {
    if (e) {
      handleStudent("Address", {
        label: e.label,
        zip: e.PostalCode,
        city: e.city,
        lat: e.lat,
        lng: e.lng,
      });
    } else {
      handleStudent("Address", {
        label: "",
        zip: "",
        city: "",
        lat: "",
        lng: "",
      });
    }
  };

  const handleSubmit = async () => {
    await API("get", `Personal/Email/?email=${student.email}`).then(
      async (emailRes) => {
        if (emailRes.data.data === null || emailRes.data.data === "") {
          setDisable(true);
          let languageArray = student.language.map((lang) => {
            return lang.name;
          });
          await API("post", "Personal", {
            RegistrationDate: new Date(),
            firstName: student.firstname,
            surName: student.surname,
            dob: student.dob,
            placeOfBirth: student.pob,
            gender: student.gender,
            ContactEmail: student.email,
            email: student.email,
            secondEmail: student.email2,
            phone: student.phone,
            secondPhone: student.phone2,
            complement: student.complement,
            password: student.password,
            noOfHrsWanted: student.noh,
            neph: student.neph,
            role: "Student",
            highWayCodeDate: student.highwayCodeDate,
            id: "",
            frontIdPhoto: student.frontImage,
            backIdPhoto: student.backImage,
            photo: student.profileImage,
            highWayCodeImage: student.highwayCodeImg,
            SpokenLanguage: languageArray,
            address: student.Address.label,
            zip: student.Address.zip,
            city: student.Address.city,
            lat: student.Address.lat,
            long: student.Address.lng,
          })
            .then(async (res) => {
              let personalInfoId = res.data.data.id;
              await API("post", "Profile", {
                businessInfoId: "",
                drivingLisenceInfoId: "",
                drivingSchoolApprovalInfoId: "",
                drivingSchoolIdentityInfoId: "",
                drivingSchoolManagerInfoId: "",
                exersiceAuthorizationInfoId: "",
                id: "",
                insuranceCompanyInfoId: "",
                lat: student.Address.lat,
                long: student.Address.lng,
                personalInfoId: personalInfoId,
                role: "student",
                status: "Active",
              });
            })
            .then(() => {
              history.push("/");
              toast.success(t("Student Registered Successfully"));
            })
            .catch((error) => {
              console.log(error);
              toast.error(t("Not Registered....Somethong went wrong"));
              setDisable(false);
            });
        } else if (emailRes.data.data) {
          toast.warning("Email already exists!");
        }
      }
    );
  };

  const handleAddress = async (e) => {
    if (e.target.value === "") {
      handleStudent("Address", {
        label: "",
        zip: "",
        city: "",
        lat: "",
        lng: "",
      });
      setAddresses([]);
    } else {
      handleStudent("Address", { ...student.Address, label: e.target.value });
      var config = {
        method: "get",
        url: `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}&type=housenumber&autocomplete=1`,
      };
      await axios(config)
        .then((res) => {
          let addressToSet = [];
          res.data.features.map((item) => {
            addressToSet.push({
              label: item.properties.label,
              city: item.properties.city,
              PostalCode: item.properties.postcode,
              lat: item.geometry.coordinates[1],
              lng: item.geometry.coordinates[0],
            });
          });
          setAddresses(addressToSet);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="student_form_main_container">
      <div className="student_form_second_container">
        <div className="main_registerSub_container">
          <div className="second_registerSub_container">
            <div className="registerSub_title_container">
              <Typography variant="h3" className="registerSub_title">
                {t("Student Identity")}
              </Typography>
              <Typography variant="h6" className="registerSub_subtitle">
                {t(
                  "You can provide all your documents and your NEPH mumber after validation of your profile isn’t that awesome? So let’s go, fill out the form and validate it!"
                )}
              </Typography>
            </div>
          </div>
        </div>
        <Box
          component="form"
          noValidate
          sx={{
            mt: 3,
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "70px",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Surname")}
                required={true}
                name="surname"
                disabled={disable}
                placeholder="Smith"
                type="text"
                value={student.surname}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors["surname"] ? true : false}
                ErrorMsg={t(studentErrors["surname"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("First Name")}
                name="firstname"
                required={true}
                type="text"
                placeholder="John"
                disabled={disable}
                value={student.firstname}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors["firstname"] ? true : false}
                ErrorMsg={t(studentErrors["firstname"])}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label={t("Gender")}
                required={true}
                placeholder={t("Male")}
                disabled={disable}
                name="gender"
                value={student.gender}
                onChange={(e) => handleStudent("gender", e.target.value)}
                MenuItem={[
                  { name: t("Male"), value: "Male" },
                  { name: t("Female"), value: "Female" },
                  { name: t("others"), value: "others" },
                ]}
                error={studentErrors["gender"] ? true : false}
                ErrorMsg={studentErrors["gender"]}
              ></DropDown>
            </Grid>

            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <Datepicker
                label={t("Date of Birth")}
                required={true}
                disabled={disable}
                name="dob"
                value={student.dob}
                maxDate={new Date()}
                placeholder="19-10-1992"
                onChange={(e) => {
                  handleStudent("dob", moment(e).format("YYYY-MM-DDThh:mm:ss"));
                }}
                padding="20px 0 0 0px !important"
                width="100% !important"
                error={studentErrors["dob"] ? true : false}
                ErrorMsg={studentErrors["dob"]}
              ></Datepicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Place of Birth")}
                required={true}
                name="pob"
                disabled={disable}
                type="text"
                placeholder="France"
                value={student.pob}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors["pob"] ? true : false}
                ErrorMsg={t(studentErrors["pob"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <LanguageAutoComplete
                name="language"
                disabled={disable}
                label={t("Spoken Language")}
                value={student.language}
                options={student.languages ? student.languages : []}
                placeholder={t("Language")}
                setVal={handleStudent}
                // error={studentErrors['language']?true:false}
                // ErrorMsg={studentErrors['language']}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <AutoComplete
                name="Address"
                required={true}
                disabled={disable}
                label={t("Address")}
                value={student.Address.label}
                options={addresses}
                placeholder={t("Address")}
                onChangeAddress={(e) => {
                  handleAddress(e);
                }}
                error={studentErrors["Address"] ? true : false}
                ErrorMsg={t(studentErrors["Address"])}
                onAddressSelect={(e) => handleSelectAddress(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Complement")}
                type="text"
                disabled={disable}
                placeholder={t("Student")}
                name="complement"
                value={student.complement}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                // error={studentErrors['complement']?true:false}
                // ErrorMsg={studentErrors['complement']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Zip Code")}
                required={true}
                name="zip"
                placeholder="712333"
                disabled={true}
                value={student.Address.zip}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("City")}
                required={true}
                name="city"
                disabled={true}
                placeholder="New york"
                value={student.Address.city}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Email")}
                required={true}
                name="email"
                disabled={disable}
                type="email"
                placeholder="arslan.alikh@gmail.com"
                value={student.email}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors["email"] ? true : false}
                ErrorMsg={t(studentErrors["email"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Second Email")}
                name="email2"
                disabled={disable}
                type="email"
                placeholder="smart_coolkyo@yahoo.com"
                value={student.email2}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors["email2"] ? true : false}
                ErrorMsg={t(studentErrors["email2"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Phone")}
                required={true}
                disabled={disable}
                type="number"
                placeholder="XX-XXXXXX-XX"
                name="phone"
                value={student.phone}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors["phone"] ? true : false}
                ErrorMsg={t(studentErrors["phone"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Second Phone")}
                type="number"
                placeholder="XX-XXXXXX-XX"
                disabled={disable}
                name="phone2"
                value={student.phone2}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors["phone2"] ? true : false}
                ErrorMsg={t(studentErrors["phone2"])}
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Password")}
                required={true}
                disabled={disable}
                type="password"
                name="password"
                placeholder="**************"
                value={student.password}
                onChange={(e) => {
                  handleStudent("password", e.target.value);
                }}
                error={studentErrors["password"] ? true : false}
                ErrorMsg={t(studentErrors["password"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Confirm Password")}
                required={true}
                disabled={disable}
                type="password"
                name="confirmpassword"
                placeholder="**************"
                value={student.confirmpassword}
                onChange={(e) => {
                  handleStudent("confirmpassword", e.target.value);
                }}
                error={studentErrors["confirmpassword"] ? true : false}
                ErrorMsg={t(studentErrors["confirmpassword"])}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("NEPH Number")}
                name="neph"
                disabled={disable}
                placeholder="532-3321-111"
                type="text"
                value={student.neph}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                // error={studentErrors['neph']?true:false}
                // ErrorMsg={studentErrors['neph']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label={t("Number of hours")}
                type="number"
                disabled={disable}
                placeholder="44"
                name="noh"
                value={student.noh}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                // error={studentErrors['noh']?true:false}
                // ErrorMsg={studentErrors['noh']}
              ></TextField>
            </Grid>
          </Grid>
          <Divider
            width="100%"
            borderColor="#D5E4E8"
            sx={{ margin: "6% 0px 6% 0px" }}
          />

          <Grid container spacing={4} alignItems="flex-end">
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title={t("Upload front of your ID Card/Passport")}
                label={t("front Image")}
                disabled={disable}
                name="frontImage"
                type="file"
                value={student.frontImage.split("_").slice(1).join("_")}
                onChange={handleFileChange}
                // error={studentErrors['frontImage']?true:false}
                // ErrorMsg={studentErrors['frontImage']}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title={t("Upload back of your ID Card/Passport")}
                disabled={disable}
                label={t("back Image")}
                name="backImage"
                type="file"
                value={student.backImage.split("_").slice(1).join("_")}
                onChange={handleFileChange}
                // error={studentErrors['backImage']?true:false}
                // ErrorMsg={studentErrors['backImage']}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title={t("Upload your profile picture")}
                disabled={disable}
                label={t("profileImage")}
                name="profileImage"
                type="file"
                value={student.profileImage.split("_").slice(1).join("_")}
                onChange={handleFileChange}
                // error={studentErrors['profileImage']?true:false}
                // ErrorMsg={studentErrors['profileImage']}
              />
            </Grid>
          </Grid>
          <div className="termsConditionsCheckboxContainer">
            <div className="termsConditionsCheckbox">
              <Checkbox
                disabled={disable}
                className="checkbox"
                onClick={(e) => setCheckbox1(!checkbox1)}
              />
              <Typography
                variant="body1"
                className="termsConditionsCheckboxTitle"
              >
                {t("Click me if you had")}
              </Typography>
            </div>
            <div className="termsConditionsCheckbox">
              <Checkbox
                className="checkbox"
                name="TermAndCondition"
                value={student.TermAndCondition}
                onClick={() =>
                  setStudent({
                    ...student,
                    TermAndCondition: !student.TermAndCondition,
                  })
                }
              />
              <Typography
                variant="body1"
                className="termsConditionsCheckboxTitle"
              >
                {t("Terms & Conditions Applied")}
              </Typography>
            </div>
          </div>
          {checkbox1 ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
                <Datepicker
                  label={t("Date")}
                  disabled={disable}
                  name="highwayCodeDate"
                  value={student.highwayCodeDate}
                  onChange={(e) => {
                    handleStudent(
                      "highwayCodeDate",
                      moment(e).format("YYYY-MM-DDThh:mm:ss")
                    );
                  }}
                  padding="20px 0 0 0px !important"
                  width="100% !important"

                  //   error={studentErrors['highwayCodeDate']?true:false}
                  // ErrorMsg={studentErrors['highwayCodeDate']}
                ></Datepicker>
                <div className="borderbottom"></div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ marginLeft: "1%" }}>
                <FilePicker
                  title={t("Upload Highway code image file")}
                  disabled={disable}
                  label={t("highwayCodeImg")}
                  name="highwayCodeImg"
                  type="file"
                  value={student.highwayCodeImg}
                  onChange={handleFileChange}
                  // error={studentErrors['highwayCodeImg']?true:false}
                  // ErrorMsg={studentErrors['highwayCodeImg']}
                />
              </Grid>
            </Grid>
          ) : (
            ""
          )}

          <Grid
            xs={12}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              endIcon={<DoneIcon sx={{ color: "#fff" }} />}
              text={t("Register")}
              buttonLableStyle="btn_main"
              style={{ marginTop: "24px" }}
              width="10%"
              customWidth1="100%"
              height="48px"
              height2="48px"
              onClick={handleSubmit}
              disabled={
                disable
                  ? true
                  : studentErrors.firstname === null &&
                    // && studentErrors.surname===null
                    // && studentErrors.Address===null
                    // && student.Address.city != ""
                    // && student.Address.zip != ""
                    // && studentErrors.password===''
                    // && studentErrors.confirmpassword===''
                    // && studentErrors.dob===null
                    // && studentErrors.pob===null
                    // && studentErrors.gender===null
                    // && studentErrors.email===null
                    // && studentErrors.phone===null
                    student.TermAndCondition === true
                  ? // && studentErrors.noh===null
                    // && studentErrors.neph===null
                    // && studentErrors.frontImage===null
                    // && studentErrors.backImage===null
                    // && studentErrors.profileImage===null
                    // && studentErrors.language===null
                    // && studentErrors.complement===null

                    // && checkbox1===false
                    // || studentErrors.highwayCodeDate===null
                    // && studentErrors.highwayCodeImg===null
                    // && studentErrors.firstname===null
                    // && studentErrors.surname===null
                    // && studentErrors.Address===null
                    // && student.Address.city != ""
                    // && student.Address.zip != ""
                    // && studentErrors.password===''
                    // && studentErrors.confirmpassword===''
                    // && studentErrors.dob===null
                    // && studentErrors.pob===null
                    // && studentErrors.gender===null
                    // && studentErrors.email===null
                    // && studentErrors.phone===null
                    // && student.TermAndCondition === true

                    // && studentErrors.language===null
                    // && studentErrors.complement===null
                    // && studentErrors.noh===null
                    // && studentErrors.neph===null
                    // && studentErrors.frontImage===null
                    // && studentErrors.backImage===null
                    // && studentErrors.profileImage===null
                    false
                  : true
              }
            ></Button>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default StudentForm;
