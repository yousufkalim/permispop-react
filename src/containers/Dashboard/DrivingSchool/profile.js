import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProfileImage from "../../../components/ProfileComponents/ProfileImage";
import ProfileDetails from "../../../components/ProfileComponents/ProfileDetails";
import Studentprofile from "../../../assets/images/Studentprofile.svg";
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

const Profile = () => {
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
  const { i18n, t } = useTranslation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState();
  const [ratings, setRatings] = useState("");
  const [openmodal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [update, setUpdate] = useState(false);

  const [instructorMeetupPointInfos, setInstructorMeetupPointInfos] =
    useState("");
  const [openupdateprofilemodal, setOpenUpdateProfileModal] = useState(false);

  const [description, setDescription] = useState("");
  const [updatefield, SetUpdateField] = useState("");
  const [item, setItem] = React.useState("");

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getUser(userData);
  }, [update]);

  const getUser = async (userData) => {
    await API("get", `Personal/GetAllById?id=${userData.id}`).then((res) => {
      setUser(res.data.data);
      getRatings(res.data.data);
      getMeetupPoints(res.data.data);
    });
  };

  const getRatings = async (userData) => {
    await API("get", `FeedBacks/GetAverageRating?id=${userData.id}`).then(
      (res) => {
        setRatings(res.data.data);
      }
    );
  };

  const getMeetupPoints = async (userData) => {
    await API(
      "get",
      `InstructorMeetupPoints/GetMeetUpPoints?id=${userData.id}`
    ).then((res) => {
      setInstructorMeetupPointInfos(res.data.data);
    });
  };

  const changePassword = async () => {
    setDisabled(true);

    if (newPassword != "" && confirmPassword != "" && oldPassword != "") {
      if (newPassword === confirmPassword) {
        await API(
          "post",
          `Personal/ChangePassword?id=${user.id}&oldPassword=${oldPassword}&newPassword=${newPassword}`
        ).then((res) => {
          toast.success("Password updated Successfully");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setDisabled(false);
          setOpenModal(false);
        });
      } else {
        toast.error("New password does not match Confirm password");
        setDisabled(false);
      }
    } else {
      toast.warning("Cannot accept empty fields");

      setDisabled(false);
    }
  };
  const updateProfile = async () => {
    if (description != "") {
      await API("post", `Profile/updateByAdminRequest`, {
        Description: description,
        UpdateField: updatefield,
        User: user.id,
      }).then((res) => {
        toast.success("Request is created for profile update");
        setDescription("");
        SetUpdateField("");
        setOpenUpdateProfileModal(false);
      });
    } else {
      toast.error("Description cannot be empty");
      setDisabled(false);
    }
  };

  const updateProfileImage = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then(
      async (res) => {
        await API("post", `Personal/UpdatePersonal`, {
          photo: res.data.message === "" ? user.photo : res.data.message,
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
    <>
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
          <Grid className="ProfileDetails">
            <Typography className="Abouttitlle">{t("About")}</Typography>
            <Divider className="ProfileDivider"></Divider>
          </Grid>
          <Typography className="AboutHeading">
            {t("Contact Information")}
          </Typography>

          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              {t("Trade Name")}:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.firstName ? user.firstName : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              {t("Company Name")}:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.surName ? user.surName : "N/A") : ""}
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
          {/* <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              {t("Postal Code")}:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.zIP ? user.zIP : "N/A") : ""}
            </Grid>
          </Grid>
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              {t("City")}:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.city ? user.city : "N/A") : ""}
            </Grid>
          </Grid> */}
          <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              {t("CDF Accepted")}:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.cpfAccept ? user.cpfAccept : "N/A") : ""}
            </Grid>
          </Grid>
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
                  <MenuItem
                    value="FirstName"
                    name=" FirstName"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
                    {t("First Name")}
                  </MenuItem>
                  <MenuItem
                    value="Surname"
                    name="Surname"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
                    {t("Surname")}
                  </MenuItem>
                  <MenuItem
                    value="Dateofbirth"
                    name="Dateofbirth"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
                    {t("Date of birth")}
                  </MenuItem>
                  <MenuItem
                    value="Meetuppoints"
                    name="Meetuppoints"
                    onChange={(e) => SetUpdateField(e.target.value)}
                  >
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
      </Grid>
    </>
  );
};

export default Profile;
