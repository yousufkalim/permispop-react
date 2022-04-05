import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "../../Common/TextField";
import Button from "../../Common/Button";
import Divider from "../../Common/Divider";
import FilePicker from "../../Common/FilePicker";
import DatePicker from "../../Common/DatePicker";
import DoneIcon from "@mui/icons-material/Done";
import Checkbox from "@mui/material/Checkbox";
import DropDown from "../../Common/DropDown";
import API from "../../../api/index";
import axios from "axios";
import AutoComplete from "../../Common/Autocomplete";
import LanguageAutoComplete from "../../Common/LanguageAutoComplete";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const StudentForm = (props) => {
  const [checkbox1, setCheckbox1] = React.useState(false);

  const [disable, setDisable] = useState(false);
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
    noh: "",
    neph: "",
    language: [],
    frontImage: "",
    backImage: "",
    profileImage: "",
    highwayCodeImg: "",
    checkbox2: false,
    date: new Date(),
    addresses: [],
    languages: [],
    Address: { zip: "", label: "", city: "", lat: "", lng: "" },
  });
  const handleStudent = (name, value) => {
    setStudent({ ...student, [name]: value });
  };
  let history = useHistory();

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
    handleStudent("Address", {
      label: e.label,
      zip: e.PostalCode,
      city: e.city,
      lat: e.lat,
      lng: e.lng,
    });
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
        setStudent({ ...student, addresses: addressToSet });
      })
      .catch(function (error) {
        console.log(error);
      });
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
                type="text"
                placeholder="John"
                disabled={disable}
                value={student.firstname}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Surname"
                name="surname"
                disabled={disable}
                placeholder="Smith"
                type="text"
                value={student.surname}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <AutoComplete
                name="address"
                disabled={disable}
                label="Address"
                value={student.Address.label}
                options={student.addresses}
                placeholder="Address"
                onChangeAddress={(e) => {
                  handleAddress(e);
                }}
                onAddressSelect={(e) => handleSelectAddress(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of birth"
                disabled={disable}
                name="dob"
                value={student.dob}
                placeholder="19-10-1992"
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
                padding="20px 0 0 0px !important"
                width="100% !important"
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Place of birth"
                name="pob"
                disabled={disable}
                type="text"
                placeholder="France"
                value={student.pob}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Zip Code"
                name="zip"
                placeholder="712333"
                disabled={true}
                value={student.Address.zip}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Gender"
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
              ></DropDown>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Email"
                name="email"
                disabled={disable}
                type="email"
                placeholder="arslan.alikh@gmail.com"
                value={student.email}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
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
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Phone"
                disabled={disable}
                type="text"
                placeholder="XX-XXXXXX-XX"
                name="phone"
                value={student.phone}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
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
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="City"
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
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Password"
                disabled={disable}
                type="password"
                name="password"
                placeholder="**************"
                value={student.password}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Confirm Password"
                disabled={disable}
                type="password"
                name="confirmpassword"
                placeholder="**************"
                value={student.confirmPassword}
                onChange={(e) => {
                  handleStudent(e.target.name, e.target.value);
                }}
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
              <Checkbox defaultChecked className="checkbox" />
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
                <DatePicker
                  label="Date"
                  disabled={disable}
                  name="date"
                  value={student.dob}
                  onChange={(e) => {
                    handleStudent(e.target.name, e.target.value);
                  }}
                  padding="20px 0 0 0px !important"
                  width="100% !important"
                ></DatePicker>
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
              disabled={disable}
              width="10%"
              customWidth1="100%"
              height="48px"
              height2="48px"
              onClick={handleSubmit}
            ></Button>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default StudentForm;
