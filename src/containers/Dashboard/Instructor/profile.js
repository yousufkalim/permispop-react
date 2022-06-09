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
import Ratings from "../../../components/Common/Rating";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";

import moment from "moment";

const Profile = () => {
  const { i18n, t } = useTranslation();
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
  const style1 = {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "65%",
    height: "88%",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflowY: "scroll",
    borderRadius: "10px",
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 2,
    paddingTop: 2,
  };
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState();
  const [ratings, setRatings] = useState("");
  const [openmodal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [instructorMeetupPointInfos, setInstructorMeetupPointInfos] = useState("");
  const [openupdateprofilemodal, setOpenUpdateProfileModal] = useState(false);
  const [description, setDescription] = useState("");
  const [updatefield, SetUpdateField] = useState("");
  const [item, setItem] = React.useState("");
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [comment, setComment] = useState("");
  const [reminder, setReminder] = useState("");
  const [lowRating, setLowRating] = useState(false);
  const [selectedRatingValue, setSelectedRatingValue] = useState("");
  const [ratingModal, setRatingModal] = React.useState(false);
  const [updateFeedback, setUpdateFeedback] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getUser(userData);
    // toast.success("welcome");
    if (localStorage.getItem("1stLogin") == "true") {
      toast.success(t("Welcome") + " " + userData.firstName + " " + userData.surName, {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-bar",
      });
      localStorage.removeItem("1stLogin");
    }
  }, [update]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    getUserToRate(userData.id);
  }, [updateFeedback]);

  const getUserToRate = async (id) => {
    await API("get", `FeedBacks/GetAllUsersToRate/?id=${id}`).then((res) => {
      if (res.data.data.length > 0) {
        let newData = res.data.data.map(async (feedback) => {
          return await API("get", `Personal/GetAllById/?id=${feedback.toId}`).then(async (personalresponse) => {
            return await API("get", `bookings/GetBookingById/?id=${feedback.bookingId}`).then((bookingres) => {
              feedback.toId = personalresponse.data.data;
              feedback.bookingId = bookingres.data.data;
              return feedback;
            });
          });
        });

        Promise.all(newData).then((res) => {
          setRatingModal(true);
          setFeedbackData(res);
        });
      } else {
        setFeedbackData([]);
        setRatingModal(false);
      }
    });
  };

  const handleRating = async (feedback) => {
    if (selectedRatingValue === "" || selectedRatingValue === 0) {
      toast.warning(t("Rating cannot be zero"));
    } else if (reminder === "") {
      toast.warning(t("Reminder cannot be empty"));
    } else {
      setLoading(true);
      await API("post", `FeedBacks/UpdateFeedbacks`, {
        bookingId: feedback.bookingId.id,
        fromId: user.id,
        id: feedback.id,
        comment: comment,
        rating: selectedRatingValue,
        ratingFrom: user.role,
        toId: feedback.toId.id,
        lRateReason: updatefield ? updatefield : "",
        feedBackDate: new Date(),
      })
        .then(async (fedbackres) => {
          await API("post", `FeedBacks/SaveBookingReminder`, {
            BookingId: feedback.bookingId.id,
            ReminderComment: reminder,
          })
            .then((reminderres) => {
              toast.success(t("Rating submitted successfully"));
              setUpdateFeedback(!updateFeedback);
            })
            .catch((e) => {
              console.log("Error", e);
              setLoading(false);
            });
        })
        .catch((e) => {
          console.log("Error", e);
          setLoading(false);
        });
    }
  };

  // FeedBacks / UpdateFeedbacks;
  const handleRatingValue = (e, feedback) => {
    if (e.target.value <= 3) {
      setLowRating(true);
    } else {
      setLowRating(false);
    }
    setSelectedRatingValue(e.target.value);
    setSelectedFeedback(feedback.id);
  };

  const getUser = async (userData) => {
    await API("get", `Personal/GetAllById?id=${userData.id}`).then((res) => {
      setUser(res.data.data);
      getRatings(res.data.data);
      getMeetupPoints(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
    });
  };

  const getRatings = async (userData) => {
    await API("get", `FeedBacks/GetAverageRating?id=${userData.id}`).then((res) => {
      setRatings(res.data.data);
    });
  };
  const getMeetupPoints = async (userData) => {
    await API("get", `InstructorMeetupPoints/GetMeetUpPoints?id=${userData.id}`).then((res) => {
      setInstructorMeetupPointInfos(res.data.data);
    });
  };
  const changePassword = async () => {
    setDisabled(true);

    if (newPassword != "" && confirmPassword != "" && oldPassword != "") {
      if (newPassword === confirmPassword) {
        await API("post", `Personal/ChangePassword?id=${user.id}&oldPassword=${oldPassword}&newPassword=${newPassword}`).then(
          (res) => {
            toast.success(t("Password updated Successfully"));
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setDisabled(false);
            setOpenModal(false);
          }
        );
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
    if (description != "") {
      await API("post", `Profile/updateByAdminRequest`, {
        Description: description,
        UpdateField: updatefield,
        User: user.id,
      }).then((res) => {
        setDescription("");
        SetUpdateField("");
        setOpenUpdateProfileModal(false);
      });
    } else {
      toast.error(t("Description cannot be empty"));
      setDisabled(false);
    }
  };
  const updateProfileImage = async (e) => {
    const formdata = new FormData();

    formdata.append("file", e.target.files[0]);

    await API("post", "Personal/UploadProfileImage", formdata).then(async (res) => {
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
        toast.success(t("Profile Image Changed successfully!"));
        localStorage.setItem("user", JSON.stringify(e.data.data));
        window.location.reload();
      });
    });
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
            languages={user ? (user.spokenLanguage ? user.spokenLanguage : []) : []}
            ratings={ratings ? (ratings === "NaN" ? t("N/A") : Math.round(ratings * 10) / 10) : ""}
          ></ProfileDetails>
          <Grid className="ProfileDetails">
            <Typography className="Abouttitlle">{t("About")}</Typography>
            <Divider className="ProfileDivider"></Divider>
          </Grid>
          <Typography className="AboutHeading">{t("Contact Information")}</Typography>

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
              {t("Date of birth")}:
            </Grid>
            <Grid sx={12} sm={12} md={2} className="RoleInformation">
              {user ? (user.dob ? moment(user.dob).format("DD/MM/YYYY") : "N/A") : ""}
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
          {/* <Grid container spacing={1} className="formdata">
            <Grid sx={12} sm={12} md={2} className="Information">
              {t("Zip Code")}:
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
          </Grid> */}
          <Divider className="ProfileDivider" />

          <Typography className="AboutHeading">{t("Contact Information")}</Typography>

          <Grid container spacing={1} className="formdata">
            {instructorMeetupPointInfos &&
              instructorMeetupPointInfos.map((item, index) => {
                return (
                  <>
                    <Grid sx={12} sm={12} md={2} className="Information">
                      {t("Meetup point")} {index + 1}:
                    </Grid>
                    <Grid sx={12} sm={12} md={3} className="RoleInformation">
                      {item.meetUp}
                    </Grid>
                  </>
                );
              })}
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
              <Typography sx={{ color: "#110000" }}>{t("Profile Update Request")}</Typography>
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
                    sx={{
                      paddingTop: "0px !important",
                      fontSize: "5px !important",
                    }}
                  >
                    {t("Select the options")}
                  </MenuItem>
                  <MenuItem value="FirstName" name=" FirstName" onChange={(e) => SetUpdateField(e.target.value)}>
                    {t("First Name")}
                  </MenuItem>
                  <MenuItem value="Surname" name="Surname" onChange={(e) => SetUpdateField(e.target.value)}>
                    {t("Surname")}
                  </MenuItem>
                  <MenuItem value="Dateofbirth" name="Dateofbirth" onChange={(e) => SetUpdateField(e.target.value)}>
                    {t("Date of Birth")}
                  </MenuItem>
                  <MenuItem value="Meetuppoints" name="Meetuppoints" onChange={(e) => SetUpdateField(e.target.value)}>
                    {t("Meetup points")}
                  </MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ color: "#110000", marginBottom: "3px" }}>{t("Reason-Information to update")}</Typography>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder={t("Description")}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
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
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={ratingModal}
            onClose={() => setRatingModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Box sx={style1} className="Scrollbar">
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: "600",
                      color: "#49544F",
                    }}
                  >
                    Give Feedback
                  </Typography>
                </div>

                {feedbackData.map((feedback) => {
                  return (
                    <Grid container spacing={1} sx={{ marginTop: "3%" }}>
                      <Grid sx={12} sm={12} md={3}>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#149E7A",
                          }}
                        >
                          {feedback.toId.firstName + " " + feedback.toId.surName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#49544F",
                          }}
                        >
                          {feedback.toId.role}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#49544F",
                          }}
                        >
                          Booking Date:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "400",
                            color: "#49544F",
                          }}
                        >
                          {feedback?.bookingId?.bookingDate && moment(feedback?.bookingId?.bookingDate).format("DD/MM/YYYY")}
                        </Typography>
                        <div>
                          <Ratings onChange={(e) => handleRatingValue(e, feedback)}></Ratings>
                        </div>
                      </Grid>
                      <Grid sx={12} sm={12} md={1}>
                        <Divider orientation="vertical" sx={{ margin: "0px !important" }} />
                      </Grid>

                      <Grid sx={12} sm={12} md={8}>
                        <TextareaAutosize
                          aria-label="minimum height"
                          minRows={5}
                          placeholder={t("Description")}
                          name="comment"
                          onChange={(e) => setReminder(e.target.value)}
                          style={{
                            width: "100%",
                            borderRadius: "5px",
                            padding: "2%",
                            borderColor: "#FFC107",
                            background: "#FAFAFA",
                          }}
                        />
                        {lowRating && selectedFeedback == feedback.id && (
                          <div>
                            <RadioGroup>
                              <FormControlLabel
                                value="Latedelivery"
                                control={<Radio />}
                                label={t("Late delivery")}
                                onChange={(e) => SetUpdateField(e.target.value)}
                              />
                              <FormControlLabel
                                value="Payment issue"
                                control={<Radio />}
                                label={t("Payment issue")}
                                onChange={(e) => SetUpdateField(e.target.value)}
                              />
                              <FormControlLabel
                                value="Harrasment"
                                control={<Radio />}
                                label={t("Harrasment")}
                                onChange={(e) => SetUpdateField(e.target.value)}
                              />
                              <FormControlLabel
                                value="AbusingLanguage"
                                control={<Radio />}
                                label={t("Abusing Language")}
                                onChange={(e) => SetUpdateField(e.target.value)}
                              />
                            </RadioGroup>
                            <TextareaAutosize
                              aria-label="minimum height"
                              minRows={5}
                              placeholder={t("Description")}
                              name="comment"
                              onChange={(e) => setComment(e.target.value)}
                              style={{
                                width: "100%",
                                borderRadius: "5px",
                                padding: "2%",
                                border: "none",
                                background: "#FAFAFA",
                              }}
                            />
                          </div>
                        )}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            text={t("Send Rating")}
                            width="20% !important"
                            height="2%"
                            textColor="#149e7a"
                            variant="outlined"
                            color="#fff"
                            onClick={(e) => handleRating(feedback)}
                            borderRadius="2px"
                            disabled={disabled}
                          ></Button>
                          {loading ? <CircularProgress /> : ""}
                        </div>
                      </Grid>

                      <Divider
                        sx={{
                          width: "100% !important",
                          margin: "2% 0 0 0 !important",
                        }}
                      ></Divider>
                    </Grid>
                  );
                })}
              </div>
            </Box>
          </Modal>
        </>
      </Grid>
    </>
  );
};

export default Profile;
