import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProfileImage from "../../../components/ProfileComponents/ProfileImage";
import ProfileDetails from "../../../components/ProfileComponents/ProfileDetails";
import Studentprofile from "../../../assets/images/Studentprofile.png";
import Typography from "@mui/material/Typography";
import Divider from "../../../components/Common/Divider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import TextField from "../../../components/Common/TextField";
import Button from "../../../components/Common/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import API from "../../../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Datepicker from "../../../components/Common/DatePicker";

const Profile = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  const [oldPassword, setOldPassword] = useState("");
  const { i18n, t } = useTranslation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState();
  const [ratings, setRatings] = useState("");
  const [neph, setNeph] = useState("");
  const [updateProfileImg, setUpdateProfileImg] = useState("");

  const [Noofhours, setNoofhours] = useState("");
  const [highwayCodeDate, setHighwayCodeDate] = useState("");
  const [update, setUpdate] = useState(false);

  const [editProfileModal, seteditProfileModal] = React.useState(false);

  const [openmodal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [openupdateprofilemodal, setOpenUpdateProfileModal] = useState(false);
  const [description, setDescription] = useState("");
  const [updatefield, SetUpdateField] = useState("");
  const [item, setItem] = React.useState("");

  const handleChange = (event) => {
    SetUpdateField(event.target.value);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    getUserData(userData.id);
  }, [update]);

  const getUserData = async (id) => {
    await API("get", `Personal/GetAllById/?id=${id}`).then((res) => {
      setUser(res.data.data);
      getRatings(res.data.data);
    });
  };

  const getRatings = async (userData) => {
    await API("get", `FeedBacks/GetAverageRating?id=${userData.id}`).then(
      (res) => {
        setRatings(res.data.data);
      }
    );
  };

  const changePassword = async () => {
    setDisabled(true);
    if (newPassword !== "" && confirmPassword !== "" && oldPassword !== "") {
      if (newPassword === confirmPassword) {
        await API(
          "post",
          `Personal/ChangePassword?id=${user.id}&oldPassword=${oldPassword}&newPassword=${newPassword}`
        ).then((res) => {
          toast.success(t("Password updated Successfully"));
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setDisabled(false);
          setOpenModal(false);
        });
      } else {
        toast.error(t("New password does not match Confirm password"));
        setDisabled(false);
      }
    } else {
      toast.warning(t("Cannot accept empty fields"));

      setDisabled(false);
    }
  };
  const updateProfile = async () => {
    if (description !== "") {
      console.log("updatefield", updatefield);
      await API("post", `Profile/updateByAdminRequest`, {
        Description: description,
        UpdateField: updatefield,
        User: user.id,
      }).then((res) => {
        toast.success(t("Request is created for profile update"));
        setDescription("");
        SetUpdateField("");
        setOpenUpdateProfileModal(false);
      });
    } else {
      toast.error(t("Description cannot be empty"));
      setDisabled(false);
    }
  };
  const handleInformation = async () => {
    await API("post", `Personal/UpdatePersonal`, {
      NEPH: neph === "" ? user.neph : neph,
      noOfHrsWanted: Noofhours === "" ? user.noOfHrsWanted : Noofhours,
      highWayCodeDate:
        highwayCodeDate === "" ? user.highWayCodeDate : highwayCodeDate,

      absentEndDate: user.absentEndDate,
      absentStartDate: user.absentStartDate,
      address: user.address,
      backIDPhoto: user.backIDPhoto,
      city: user.city,
      complement: user.complement,
      contactEmail: user.contactEmail,
      cpfAccept: user.cpfAccept,
      dob: user.dob,
      documentTested: user.documentTested,
      drivingSchoolID: user.drivingSchoolID,
      duplicate_id: user.duplicate_id,
      email: user.email,
      emailSent: user.emailSent,
      firstName: user.firstName,
      frontIDPhoto: user.frontIDPhoto,
      gender: user.gender,
      giveOurPlatformTime: user.giveOurPlatformTime,
      highWayCodeImage: user.highWayCodeImage,
      id: user.id,
      instructorMeetupPointInfos: user.instructorMeetupPointInfos,
      isOnline: user.isOnline,
      lastActiveTime: user.lastActiveTime,
      lastSeen: user.lastSeen,
      lat: user.lat,
      long: user.long,
      msgMailCount: user.msgMailCount,
      paid: user.paid,
      password: user.password,
      phone: user.phone,
      photo: user.photo,
      placeOfBirth: user.placeOfBirth,
      profileInfo: user.profileInfo,
      registrationDate: user.registrationDate,
      role: user.role,
      secondEmail: user.secondEmail,
      secondPhone: user.secondPhone,
      spokenLanguage: user.spokenLanguage,
      surName: user.surName,
      whichPlatform: user.whichPlatform,
      workWithOther: user.workWithOther,
      zip: user.zip,
    }).then(async (updatePersonalres) => {
      await API("get", `Personal/GetAllById/?id=${user.id}`).then(
        (getPersonalres) => {
          localStorage.setItem(
            "user",
            JSON.stringify(getPersonalres.data.data)
          );
          toast.success("Updated sucessfully");
          seteditProfileModal(false);
          setUpdate(!update);
        }
      );
    });
  };
  const updateProfileImage = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then(
      async (res) => {
        await API("post", `Personal/UpdatePersonal`, {
          NEPH: user.neph,
          noOfHrsWanted: user.noOfHrsWanted,
          highWayCodeDate: user.highWayCodeDate,

          absentEndDate: user.absentEndDate,
          absentStartDate: user.absentStartDate,
          address: user.address,
          backIDPhoto: user.backIDPhoto,
          city: user.city,
          complement: user.complement,
          contactEmail: user.contactEmail,
          cpfAccept: user.cpfAccept,
          dob: user.dob,
          documentTested: user.documentTested,
          drivingSchoolID: user.drivingSchoolID,
          duplicate_id: user.duplicate_id,
          email: user.email,
          emailSent: user.emailSent,
          firstName: user.firstName,
          frontIDPhoto: user.frontIDPhoto,
          gender: user.gender,
          giveOurPlatformTime: user.giveOurPlatformTime,
          highWayCodeImage: user.highWayCodeImage,
          id: user.id,
          instructorMeetupPointInfos: user.instructorMeetupPointInfos,
          isOnline: user.isOnline,
          lastActiveTime: user.lastActiveTime,
          lastSeen: user.lastSeen,
          lat: user.lat,
          long: user.long,
          msgMailCount: user.msgMailCount,
          paid: user.paid,
          password: user.password,
          phone: user.phone,
          photo: res.data.message === "" ? user.photo : res.data.message,

          placeOfBirth: user.placeOfBirth,
          profileInfo: user.profileInfo,
          registrationDate: user.registrationDate,
          role: user.role,
          secondEmail: user.secondEmail,
          secondPhone: user.secondPhone,
          spokenLanguage: user.spokenLanguage,
          surName: user.surName,
          whichPlatform: user.whichPlatform,
          workWithOther: user.workWithOther,
          zip: user.zip,
        }).then((e) => {
          toast.success("Profile Image Changed successfully!");
          setUpdate(!update);
        });
      }
    );
  };
  return (
    <React.Fragment>
      <Grid container spacing={1} className="maindiv">
        <Grid md={3} className="leftprofilediv">
          <ProfileImage
            src={user ? (user.photo ? user.photo : Studentprofile) : ""}
            onChange={(e) => updateProfileImage(e)}
            label="photo"
            name="photo"
          ></ProfileImage>
        </Grid>

        <Grid md={9}>
          <ProfileDetails
            name={user ? user.firstName + " " + user.surName : ""}
            location={user ? user.address : ""}
            role={user ? user.role : ""}
            ranking={t("Rankings")}
            // value={user? user.}
            openPasswordModal={setOpenModal}
            openProfileUpdate={setOpenUpdateProfileModal}
            languages={
              user ? (user.spokenLanguage ? user.spokenLanguage : []) : []
            }
            ratings={ratings ? (ratings === "NaN" ? t("N/A") : ratings) : ""}
          ></ProfileDetails>
          <div>
            <Grid className="ProfileDetails">
              <Typography className="Abouttitlle">{t("About")}</Typography>
              <Divider className="ProfileDivider"></Divider>
            </Grid>
            <Typography className="AboutHeading">
              {t("Contact Information")}
            </Typography>

            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("First Name")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user ? (user.firstName ? user.firstName : "N/A") : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("Surname")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user ? (user.surName ? user.surName : "N/A") : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("Gender")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user
                  ? user.gender === "Male"
                    ? t("Male")
                    : user.gender === "Female"
                    ? t("Female")
                    : user.gender === "Other"
                    ? t("Other")
                    : "N/A"
                  : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("Date of Birth")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user
                  ? user.dob
                    ? moment(user.dob).format("DD-MM-YYYY")
                    : "N/A"
                  : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("Place of Birth")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user ? (user.placeOfBirth ? user.placeOfBirth : "N/A") : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("Address")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user ? (user.address ? user.address : "N/A") : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("Complement")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user ? (user.complement ? user.complement : "N/A") : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("Postal Code")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user ? (user.zip ? user.zip : "N/A") : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("City")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user ? (user.city ? user.city : "N/A") : ""}
              </Grid>
            </Grid>
            <Divider className="ProfileDivider" />

            <Typography className="AboutHeading">
              {t("Contact Information")}
              <IconButton>
                <EditIcon
                  color="secondary"
                  sx={{ marginLeft: "5%" }}
                  onClick={(e) => seteditProfileModal(!editProfileModal)}
                />
              </IconButton>
            </Typography>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("NEPH")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user ? (user.neph ? user.neph : "N/A") : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("Number of hours")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user ? (user.noOfHrsWanted ? user.noOfHrsWanted : "N/A") : ""}
              </Grid>
            </Grid>
            <Grid container spacing={1} className="formdata">
              <Grid sx={12} sm={12} md={2} className="Information">
                {t("Highway Code Date")}:
              </Grid>
              <Grid sx={12} sm={12} md={2} className="RoleInformation">
                {user
                  ? user.highWayCodeDate
                    ? moment(user.highWayCodeDate).format("DD-MM-YYYY")
                    : "N/A"
                  : ""}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <>
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={openmodal}
            onClose={() => setOpenModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <TextField
                label={t("Old password")}
                name="oldPassword"
                value={oldPassword}
                type="password"
                placeholder={t("Enter password")}
                sx={{ marginBottom: "2% !important" }}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
              <TextField
                label={t("New password")}
                name="newPassword"
                value={newPassword}
                type="password"
                placeholder={t("Enter password")}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <TextField
                label={t("Confirm password")}
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                placeholder={t("Enter password")}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div style={{ marginTop: "2%" }}>
                <Button
                  text={t("Change Password")}
                  width="95% !important"
                  color="#149e7a"
                  borderRadius="10px"
                  onClick={changePassword}
                  disabled={disabled}
                ></Button>
              </div>
            </Box>
          </Modal>
        </>
        <>
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={openupdateprofilemodal}
            onClose={() => setOpenUpdateProfileModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <Typography sx={{ color: "#110000" }}>
                {t("Profile Update Request")}
              </Typography>
              <FormControl variant="" sx={{ ml: "-3%" }} className="MobileView">
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  //   value={item}
                  defaultValue={0}
                  onChange={handleChange}
                  sx={{
                    width: "500px",
                    fontSize: "16px",
                    color: "#110000",
                  }}
                >
                  <MenuItem
                    value={0}
                    disabled
                    sx={{ paddingTop: "0px !important" }}
                  >
                    {t("Select the options")}
                  </MenuItem>
                  <MenuItem value="FirstName" name=" FirstName">
                    {t("First Name")}
                  </MenuItem>
                  <MenuItem value="Surname" name="Surname">
                    {t("Surname")}
                  </MenuItem>
                  <MenuItem value="Dateofbirth" name="Dateofbirth">
                    {t("Date of birth")}
                  </MenuItem>
                  <MenuItem value="Meetuppoints" name="Meetuppoints">
                    {t("Meetup points")}
                  </MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ color: "#110000", marginBottom: "3px" }}>
                {t("Reason-Information to update")}
              </Typography>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder={t("Description")}
                name="description"
                onChange={(e) => setDescription(e.target.name)}
                style={{ width: "100%", borderRadius: "5px", padding: "2%" }}
              />
              <div style={{ marginTop: "2%" }}>
                <Button
                  text={t("Update Profile")}
                  width="95% !important"
                  color="#149e7a"
                  borderRadius="10px"
                  onClick={updateProfile}
                  disabled={disabled}
                ></Button>
              </div>
            </Box>
          </Modal>
        </>
        <>
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={editProfileModal}
            onClose={() => seteditProfileModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style}>
              <TextField
                label={t("NEPH")}
                name="NEPH"
                value={
                  user
                    ? user.neph === "" || user.neph === null
                      ? neph
                      : user.neph
                    : ""
                }
                type="text"
                disabled={
                  user
                    ? user.neph === "" || user.neph === null
                      ? false
                      : true
                    : false
                }
                placeholder={t("NEPH")}
                sx={{ marginBottom: "2% !important" }}
                onChange={(e) => {
                  setNeph(e.target.value);
                }}
              ></TextField>
              <TextField
                label={t("No of hours")}
                name="Noofhours"
                // value={Noofhours}
                value={
                  user
                    ? user.noOfHrsWanted === "" || user.noOfHrsWanted === null
                      ? Noofhours
                      : user.noOfHrsWanted
                    : ""
                }
                disabled={
                  user
                    ? user.noOfHrsWanted === "" || user.noOfHrsWanted === null
                      ? false
                      : true
                    : false
                }
                type="text"
                placeholder={t("No of hours")}
                onChange={(e) => {
                  setNoofhours(e.target.value);
                }}
              ></TextField>
              <Datepicker
                label={t("Date")}
                name="highwayCodeDate"
                value={
                  user
                    ? user.highWayCodeDate === "" ||
                      user.highWayCodeDate === null
                      ? highwayCodeDate
                      : user.highWayCodeDate
                    : ""
                }
                disabled={
                  user
                    ? user.highWayCodeDate === "" ||
                      user.highWayCodeDate === null
                      ? false
                      : true
                    : false
                }
                onChange={(e) => {
                  setHighwayCodeDate(moment(e).format("YYYY-MM-DDThh:mm:ss"));
                }}
                padding="20px 0 0 0px !important"
                width="100% !important"

                //   error={studentErrors['highwayCodeDate']?true:false}
                // ErrorMsg={studentErrors['highwayCodeDate']}
              ></Datepicker>

              <div style={{ marginTop: "2%" }}>
                <Button
                  text={t("Update")}
                  width="95% !important"
                  color="#149e7a"
                  borderRadius="10px"
                  onClick={handleInformation}
                  disabled={disabled}
                ></Button>
              </div>
            </Box>
          </Modal>
        </>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
