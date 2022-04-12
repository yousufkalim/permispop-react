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

import { Preview } from "@mui/icons-material";


const StudentForm = (props) => {
  const [checkbox1, setCheckbox1] = React.useState(false);

  const [disable, setDisable] = useState(false);
  const [studentErrors, setStudentErrors] = useState({});
  const [addresses, setAddresses] = React.useState([]);
  const [student, setStudent] = React.useState({
    firstname: "",
    surname: "",
    dob: new Date(),
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
    checkbox2: false,
    date: new Date(),
    languages: [],
    Address: { zip: "", label: "", city: "", lat: "", lng: "" },
  });
  let history = useHistory();


  const studentSchema = {
    firstname: Joi.string()
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
      surname: Joi.string()
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
      // email2: Joi
      // .label("Second Email")
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {

      //       default:
      //         break;
      //     }
      //   });
      //   return errors;
      // }),
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
      // phone2: Joi
      // .label("Phone2")
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       default:
      //         break;
      //     }
      //   });
      //   return errors;
      // }),
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

      // complement: Joi.string()
      // .required()
      // .label("Complement")
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       case "string.empty":
      //         err.message = `${err.context.label} Field can't be empty`;
      //         break;
      //     }
      //   });
      //   return errors;
      // }),

      // noh: Joi.string()
      // .required()
      // .label("Number of Hours")
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       case "string.empty":
      //         err.message = `${err.context.label} Field can't be empty`;
      //         break;
      //     }
      //   });
      //   return errors;
      // }),
      // neph: Joi.string()
      // .min(14)
      // .max(14)
      // .required()
      // .label("NEPH Number") 
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       case "string.empty":
      //         err.message = `${err.context.label} Field can't be empty`;
      //         break;
      //       case "string.min":
      //         err.message = `${err.context.label} Must be exactly  ${err.context.limit} Longs caractères!`;
      //         break;
      //       case "string.max":
      //         err.message = `${err.context.label} too long ${err.context.limit} Longs caractères!`;
      //         break;
      //       default:
      //         break;
      //     }
      //   });
      //   return errors;
      // }),
      // frontImage: Joi.string()
      // .required()
      // .label("Front Image") 
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       case "string.empty":
      //         err.message = `${err.context.label} can't be empty`;
      //         break;
      //       default:
      //         break;
      //     }
      //   });
      //   return errors;
      // }),
      // backImage: Joi.string()
      // .required()
      // .label("backImage") 
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       case "string.empty":
      //         err.message = `${err.context.label} can't be empty`;
      //         break;
      //       default:
      //         break;
      //     }
      //   });
      //   return errors;
      // }),
      // profileImage: Joi.string()
      // .required()
      // .label("profile Image") 
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       case "string.empty":
      //         err.message = `${err.context.label} can't be empty`;
      //         break;
      //       default:
      //         break;
      //     }
      //   });
      //   return errors;
      // }),
      // highwayCodeImg: Joi.string()
      // .required()
      // .label("highwayCodeImg") 
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       case "string.empty":
      //         err.message = `${err.context.label} can't be empty`;
      //         break;
      //       default:
      //         break;
      //     }
      //   });
      //   return errors;
      // }),
      // date: Joi.string()
      // .required()
      // .label("Date") 
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       case "string.empty":
      //         err.message = `${err.context.label} can't be empty`;
      //         break;
      //       default:
      //         break;
      //     }
      //   });
      //   return errors;
      // }),
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
     
      // language: Joi.array()
      // .required()
      // .min(1)
      // .label("languages") 
      // .error((errors) => {
      //   errors.forEach((err) => {
      //     switch (err.type) {
      //       case "string.empty":
      //         err.message = `${err.context.label} can't be empty`;
      //         break;
      //       default:
      //         break;
      //     }
      //   });
      //   return errors;
      // }),

    
      
  };


  const handleStudent = (name, value) => {
    let errorMessage =''
    if (name==="Address"){
      errorMessage = validateSuggest(name, value.label);
    }
    else if(name==='password'){
      if(value.length<8){
        errorMessage = 'Password must be atleast 8 char long';

      }
      else if(value.length===0){
        errorMessage = 'Password cannot be empty';

      }

    }
    else if(name==='confirmpassword'){
      if(student.password != value){
        errorMessage = "Password didn't match";

      }
      else if(value.length===0){
        errorMessage = 'Password cannot be empty';

      }

    }
    else{
      errorMessage = validateSuggest(name, value);
    }
    
    setStudentErrors({...studentErrors,[name]:errorMessage});
    setStudent({ ...student, [name]: value });
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
      highWayCodeDate: student.date,
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
        toast.success("Student Registered Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not Registered....Somethong went wrong");
        setDisable(false);
      });
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
            lat: item.properties.x,
            lng: item.properties.y,
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
                Student Identity
              </Typography>
              <Typography variant="h6" className="registerSub_subtitle">
                You can provide all your documents and your NEPH mumber after
                validation of your profile isn’t that awesome? So let’s go, fill
                out the form and validate it!t
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
                label="First Name"
                name="firstname"
                required={true}
                type="text"
                placeholder="John"
                disabled={disable}
                value={student.firstname}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors['firstname']?true:false}
                ErrorMsg={studentErrors['firstname']}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Surname"
                required={true}
                name="surname"
                disabled={disable}
                placeholder="Smith"
                type="text"
                value={student.surname}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors['surname']?true:false}
                ErrorMsg={studentErrors['surname']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <AutoComplete
                name="Address"
                required={true}
                disabled={disable}
                label="Address"
                value={student.Address.label}
                options={addresses}
                placeholder="Address"
                onChangeAddress={(e) => {
                  handleAddress(e);
                }}
                error={studentErrors['Address']?true:false}
                ErrorMsg={studentErrors['Address']}
                onAddressSelect={(e) => handleSelectAddress(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <Datepicker
                label="Date of birth"
                required={true}
                disabled={disable}
                name="dob"
                value={student.dob}
                maxDate={moment()}
                placeholder="19-10-1992"
                onChange={(e) => {
                  handleStudent("dob", moment(e).format("YYYY-MM-DDThh:mm:ss"));
                }}
                padding="20px 0 0 0px !important"
                width="100% !important"
                error={studentErrors['dob']?true:false}
                ErrorMsg={studentErrors['dob']}
              ></Datepicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Place of birth"
                required={true}
                name="pob"
                disabled={disable}
                type="text"
                placeholder="France"
                value={student.pob}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
               error={studentErrors['pob']?true:false}
                ErrorMsg={studentErrors['pob']}
              ></TextField>
                
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Zip Code"
                required={true}
                name="zip"
                placeholder="712333"
                disabled={true}
                value={student.Address.zip}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Gender"
                required={true}
                placeholder="Male"
                disabled={disable}
                name="gender"
                value={student.gender}
                onChange={(e) => handleStudent("gender", e.target.value)}
                MenuItem={[
                  { name: "Male", value: "Male" },
                  { name: "Female", value: "Female" },
                  { name: "others", value: "others" },
                ]}
                error={studentErrors['gender']?true:false}
                ErrorMsg={studentErrors['gender']}
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Email"
                required={true}
                name="email"
                disabled={disable}
                type="email"
                placeholder="arslan.alikh@gmail.com"
                value={student.email}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors['email']?true:false}
                ErrorMsg={studentErrors['email']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Second Email"
                name="email2"
                disabled={disable}
                type="email"
                placeholder="smart_coolkyo@yahoo.com"
                value={student.email2}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                // error={studentErrors['email2']?true:false}
                // ErrorMsg={studentErrors['email2']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Phone"
                required={true}
                disabled={disable}
                type="text"
                placeholder="XX-XXXXXX-XX"
                name="phone"
                value={student.phone}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                error={studentErrors['phone']?true:false}
                ErrorMsg={studentErrors['phone']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Second Phone"
                type="text"
                placeholder="XX-XXXXXX-XX"
                disabled={disable}
                name="phone2"
                value={student.phone2}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                // error={studentErrors['phone2']?true:false}
                // ErrorMsg={studentErrors['phone2']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="City"
                required={true}
                name="city"
                disabled={true}
                placeholder="New york"
                value={student.Address.city}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Complement"
                type="text"
                disabled={disable}
                placeholder="Student"
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
                label="Password"
                required={true}
                disabled={disable}
                type="password"
                name="password"
                placeholder="**************"
                value={student.password}
                onChange={(e) => {
                  handleStudent("password", e.target.value);
                }}
                error={studentErrors['password']?true:false}
                ErrorMsg={studentErrors['password']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Confirm Password"
                required={true}
                disabled={disable}
                type="password"
                name="confirmpassword"
                placeholder="**************"
                value={student.confirmpassword}
                onChange={(e) => {
                  handleStudent("confirmpassword", e.target.value);
                }}
                error={studentErrors['confirmpassword']?true:false}
                ErrorMsg={studentErrors['confirmpassword']}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Number of hours"
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
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="NEPH Number"
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
              <LanguageAutoComplete
                name="language"
                disabled={disable}
                label="Spoken Language"
                value={student.language}
                options={student.languages ? student.languages : []}
                placeholder="Language"
                setVal={handleStudent}
                // error={studentErrors['language']?true:false}
                // ErrorMsg={studentErrors['language']}
              />
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
                title="Upload front of your ID Card/Passport"
                label="frontImage"
                disabled={disable}
                name="frontImage"
                type="file"
                value={student.frontImage}
                onChange={handleFileChange}
                // error={studentErrors['frontImage']?true:false}
                // ErrorMsg={studentErrors['frontImage']}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload back of your ID Card/Passport"
                disabled={disable}
                label="backImage"
                name="backImage"
                type="file"
                value={student.backImage}
                onChange={handleFileChange}
                // error={studentErrors['backImage']?true:false}
                // ErrorMsg={studentErrors['backImage']}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload your profile picture"
                disabled={disable}
                label="profileImage"
                name="profileImage"
                type="file"
                value={student.profileImage}
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
                Click me if you had
              </Typography>
            </div>
            <div className="termsConditionsCheckbox">
              <Checkbox 
               
                className="checkbox" 
                name="TermAndCondition"
                value={student.TermAndCondition} 
                onClick={
                  ()=>setStudent({ ...student, 'TermAndCondition': !student.TermAndCondition })
                }
                />
              <Typography
                variant="body1"
                className="termsConditionsCheckboxTitle"
               
              >
                Terms & Conditions Applied
              </Typography>
            </div>
          </div>
          {checkbox1 ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
                <Datepicker
                  label="Date"
                  disabled={disable}
                  name="date"
                  padding="20px 0 0 0px !important"
                  width="100% !important"
                  value={student.date}handleStudent
                  onChange={(e) => {
                    handleStudent("date", moment(e).format("YYYY-MM-DDThh:mm:ss"));
                  }}
                //   error={studentErrors['date']?true:false}
                // ErrorMsg={studentErrors['date']}
                ></Datepicker>
                <div className="borderbottom"></div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ marginLeft: "1%" }}>
                <FilePicker
                  title="Upload Highway code image file"
                  disabled={disable}
                  label="highwayCodeImg"
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
              text="Register"
              buttonLableStyle="btn_main"
              style={{ marginTop: "24px" }}
              width="10%"
              customWidth1="100%"
              height="48px"
              height2="48px"
              onClick={handleSubmit}

              disabled={
                studentErrors.firstname===null 
                && studentErrors.surname===null 
                && studentErrors.Address===null 
                && student.Address.city != ""
                && student.Address.zip != ""
                && studentErrors.password===''
                && studentErrors.confirmpassword===''
                && studentErrors.dob===null 
                && studentErrors.pob===null 
                && studentErrors.gender===null
                && studentErrors.email===null
                && studentErrors.phone===null
                && student.TermAndCondition === true

                // && studentErrors.noh===null
                // && studentErrors.neph===null
                // && studentErrors.frontImage===null
                // && studentErrors.backImage===null
                // && studentErrors.profileImage===null
                // && studentErrors.language===null
                // && studentErrors.complement===null
               

                // && checkbox1===false
                // || studentErrors.date===null
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
                ? false: true }
            ></Button>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default StudentForm;
