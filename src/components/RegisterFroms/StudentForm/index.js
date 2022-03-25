import React from "react";
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
import MultiSelect from "../../Common/MultiSelect";
import API from "../../../api/index";

const StudentForm = (props) => {
  const [firstname, setFirstname] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [address, setaddress] = React.useState("À Renasca ");
  const [dob, setDob] = React.useState(new Date());
  const [pob, setPob] = React.useState("");
  const [zip, setZip] = React.useState("20090");
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [email2, setemail2] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phone2, setPhone2] = React.useState("");
  const [city, setCity] = React.useState("Ajaccio");
  const [complement, setComplement] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [noh, setNoh] = React.useState("");
  const [neph, setNeph] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [frontImage, setFrontImage] = React.useState("");
  const [backImage, setBackImage] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [HighWayCodeImg, setHighWayCodeImg] = React.useState();
  const [checkbox1, setCheckbox1] = React.useState(false);
  const [checkbox2, setCheckbox2] = React.useState(false);
  const [lat, setLat] = React.useState(41.960096);
  const [lng, setLng] = React.useState(8.772206);
  const [date, setDate] = React.useState(new Date());

  const handleDob = (newValue) => {
    setDob(newValue);
  };
  const handleDate = (newValue) => {
    setDate(newValue);
  };
  const handleFileChange = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then((res) => {
      console.log("res", e.target.name);
      if (e.target.name === "frontImage") {
        setFrontImage(res.data.message);
      } else if (e.target.name === "backIdPhoto") {
        setBackImage(res.data.message);
      } else if (e.target.name === "photo") {
        setProfileImage(res.data.message);
      } else if (e.target.name === "highwayCodeImg") {
        setHighWayCodeImg(res.data.message);
      }
    });
  };
  // const handleLanguage = async () => {
  //   const response = await API(
  //     "get",
  //     "https://parseapi.back4app.com/classes/Continentscountriescities_Language"
  //   );
  //   console.log("response", response);
  // };
  // const handleAddress = async (e) => {
  //   const response = await API(
  //     "get",
  //     `http://api-adresse.data.gouv.fr/search/?q=${e.target.value}`
  //   );
  //   console.log("response", response);
  // };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  const handleSubmit = async () => {
    await API("post", "Personal", {
      RegistrationDate: "",
      firstName: firstname,
      surName: surname,
      dob: dob,
      placeOfBirth: pob,
      gender: gender,
      ContactEmail: email,
      email: email,
      secondEmail: email2,
      phone: phone,
      secondPhone: phone2,
      complement: complement,
      password: password,
      noOfHrsWanted: noh,
      neph: neph,
      role: "Student",
      highWayCodeDate: "",
      id: "",
      frontIdPhoto: frontImage,
      backIdPhoto: backImage,
      photo: profileImage,
      highWayCodeImage: HighWayCodeImg,
      address: address,
      zip: zip,
      city: city,
      lat: lat,
      long: lng,
    }).then(async (res) => {
      await API("post", "Profile", {});

      console.log("res", res.data.data);
    });
  };
  // const [checked, setisChecked] = React.useState(false);

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
                value={firstname}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Surname"
                name="surname"
                placeholder="Smith"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Address"
                name="address"
                placeholder="102 Street, building 02, NY"
                type="text"
                value={address}
                // onChange={handleAddress}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ marginTop: "9px" }}>
              <DatePicker
                label="Date of birth"
                name="dob"
                // value={dob}
                placeholder="19-10-1992 "
                onChange={(e) => setDob(e.target.value)}
                padding="20px 0 0 0px !important"
                width="100% !important"
              ></DatePicker>
              <div className="borderbottom"></div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Place of birth"
                name="pob"
                type="text"
                placeholder="France"
                value={pob}
                onChange={(e) => setPob(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Zip Code"
                name="zip"
                placeholder="712333"
                type="number"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <DropDown
                label="Gender"
                placeholder="Male"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                MenuItem={[
                  { name: "Male", value: "Male" },
                  { name: "Female", value: "Female" },
                  { name: "others", value: "others" },
                ]}
              ></DropDown>
              {/* <TextField
                label="Gender"
                name="gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              ></TextField> */}
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Email"
                name="email"
                type="email"
                placeholder="arslan.alikh@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Second Email"
                name="email2"
                type="email"
                placeholder="smart_coolkyo@yahoo.com"
                value={email2}
                onChange={(e) => setemail2(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Phone"
                type="text"
                placeholder="+33 123 4567890"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Second Phone"
                type="text"
                placeholder="+33 123 4567890"
                name="phone2"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="City"
                name="city"
                type="text"
                placeholder="New york"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Complement"
                type="text"
                placeholder="Student"
                name="coplement"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Password"
                type="password"
                name="password"
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmpassword"
                placeholder="**************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="Number of hours"
                type="number"
                placeholder="44"
                name="noh"
                value={noh}
                onChange={(e) => setNoh(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                label="NEPH Number"
                name="neph"
                placeholder="532-3321-111"
                type="text"
                value={neph}
                onChange={(e) => setNeph(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <MultiSelect
                selectedTags={handleSelecetedTags}
                variant="standard"
                id="tags"
                name="tags"
                placeholder="English, French"
                text="Spoken Languages"
              ></MultiSelect>
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
                label="front"
                name="frontImage"
                type="file"
                value={frontImage}
                onChange={handleFileChange}
                // setFrontImage={setFrontImage}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload back of your ID Card/Passport"
                label="back"
                name="backIdPhoto"
                type="file"
                value={backImage}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FilePicker
                title="Upload your profile picture"
                label="profile"
                name="photo"
                type="file"
                value={profileImage}
                onChange={handleFileChange}
              />
            </Grid>
          </Grid>
          <div className="termsConditionsCheckboxContainer">
            <div className="termsConditionsCheckbox">
              <Checkbox
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
                  name="dat"
                  // value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  padding="20px 0 0 0px !important"
                  width="100% !important"
                ></DatePicker>
                <div className="borderbottom"></div>
                {/* replaced  */}
                {/* <TextField
                  label="Date"
                  placeholder="English, French"
                ></TextField> */}
              </Grid>
              <Grid item xs={12} sm={12} md={4} sx={{ marginLeft: "1%" }}>
                <FilePicker
                  title="Upload Highway code image file"
                  label="high"
                  name="highwayCodeImg"
                  type="file"
                  value={HighWayCodeImg}
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
