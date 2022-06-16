import React, { useState, useEffect } from "react";
import CalendarComponent from "../../../components/Common/Calendar";
import BasicModal from "../../../components/Common/BasicModal";
import Divider from "../../../components/Common/Divider";
import TextField from "../../../components/Common/TextField";
import Button from "../../../components/Common/Button";
import API from "../../../api/index";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { toast } from "react-toastify";
import { Views } from "react-big-calendar";
import DropDown from "../../../components/Common/DropDown";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { ReactComponent as Delete } from "../../../assets/images/BookingDelete.svg";
import { ReactComponent as Profile } from "../../../assets/images/Profile.svg";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Ratings from "../../../components/Common/Rating";
import Rating from "../../../assets/images/path2006.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Project from "../../../assets/images/form.svg";
import { ReactComponent as Comment } from "../../../assets/images/ChatIcon.svg";
import { useHistory } from "react-router-dom";

const Calendar = () => {
  const currentDate = moment();
  const history = useHistory();
  const { i18n, t } = useTranslation();
  const [user, setUser] = useState();
  const [selectedInstructor, setSelectedInstructor] = useState();
  const [selectedAvailability, setSelectedAvailability] = useState();
  const [update, setUpdate] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [bookings, setBookings] = React.useState([]);
  const [selectedBooking, setSelectedBooking] = useState({});
  const [bookingModal, setBookingModal] = React.useState(false);
  const [AddBookingModal, setAddBookingModal] = React.useState(false);
  const [duration, setDuration] = React.useState(1);
  const [selectedHours, setSelectedHours] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [selectedMins, setSelectedMins] = React.useState("00");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lng, setLng] = useState();
  const [loading, setLoading] = React.useState(false);
  const [userModal, setUserModal] = React.useState(false);
  const [profileData, setProfileData] = React.useState();
  useEffect(() => {
    onNavigate(new Date(), "week");
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const selectedInstructor = JSON.parse(localStorage.getItem("selectedInstructor"));
    setUser(userData);
    setSelectedInstructor(selectedInstructor);
    if (startDate != "" || endDate != "") {
      getBookingData(userData, selectedInstructor);
    }
  }, [update]);

  const getBookingData = async (userData, selectedInstructor) => {
    let allEvents = [];
    if (selectedInstructor.role === "DrivingSchool") {
      await API("get", `Bookings/GetBookingsByStudent?id=${userData.id}`).then(async (res) => {
        res.data.data.map((booking) => {
          if (booking.drivingSchoolId === "") {
            let date = moment(booking.bookingDate).format("YYYY-MM-DD");
            date = date.split("-");
            let start = booking.startTime.split(":");
            let end = moment(booking.endTime).format("HH:mm");
            end = end.split(":");
            allEvents.push({
              id: booking.id,
              title: "Booking By " + booking.instructorQuestionFifth,
              start: new Date(date[0], parseInt(date[1]) - 1, date[2], parseInt(start[0]), start[1], 0),
              end: new Date(date[0], parseInt(date[1]) - 1, date[2], parseInt(end[0]) - 5, end[1], 0),
              bookingTime: parseInt(start[0]) + ":" + start[1] + " - " + moment(booking.endTime).format("HH:mm"),
              status: booking.status,
              meetingPlace: booking.meetingPlace,
              duration: booking.duration,
              vehicleId: booking.vehicleId,
            });
          }
        });
      });

      await API(
        "get",
        `Availability/GetAvailabilityPlusBookingsSetForInstructor_New?id=${selectedInstructor.id}&start=${startDate}&end=${endDate}`
      ).then((InsAvailabilitiesRes) => {
        InsAvailabilitiesRes.data.data.availabilities.map((availability) => {
          let date = moment(availability.date).format("YYYY-MM-DD");
          date = date.split("-");
          let start = availability.startTime.split(":");
          let end = availability.endTime.split(":");
          let type = "";

          if (availability.vehicleId.includes("Auto")) {
            type = "Auto";
          } else if (availability.vehicleId.includes("Manual")) {
            type = "Manual";
          }

          let title = "";
          if (availability.status === "Available") {
            title = "Availability By" + availability.createdBy;
          } else {
            title = "Booking By " + availability.createdBy;
          }
          if (availability.status != "Available") {
          }
          // if (availability.status === "Available") {
          if (end[0] - 12 != start[0]) {
            allEvents.push({
              id: availability.id,
              title: title,
              start: new Date(date[0], parseInt(date[1]) - 1, date[2], parseInt(start[0]), start[1], 0),
              end: new Date(date[0], parseInt(date[1]) - 1, date[2], end[0], end[1], 0),
              startHour: start[0],
              endHour: end[0],
              status: availability.status,
              type: type,
              meetUp: availability.meetUp,
              vehicle: availability.vehicleId,
              instructorId: availability.instructorId,
              createdBy: availability.createdBy,
            });
          }
          // }
        });
        setBookings(allEvents);
      });
      console.log("bookings--------->", bookings);
    } else {
      await API(
        "get",
        `Availability/GetAvailabilitySetForInstructor/?id=${selectedInstructor.id}&stuid=${userData.id}&lat=${userData.lat}&lng=${userData.long}&radius=30&distancematch=false`
      ).then((InsAvailabilitiesRes) => {
        InsAvailabilitiesRes.data.data.map((availability) => {
          let date = availability.date.split("T");
          date = date[0];
          date = date.split("-");

          let start = availability.startTime.split(":");
          let end = availability.endTime.split(":");
          let type = "";

          if (availability.vehicleId.includes("Auto")) {
            type = "Auto";
          } else if (availability.vehicleId.includes("Manual")) {
            type = "Manual";
          }

          let title = "";
          if (availability.status === "Available") {
            title = "Availability By " + availability.createdBy;
          } else if (availability.status === "Unavailable") {
            title = "Unavailability By " + availability.createdBy;
          } else if (availability.status === "Personal") {
            title = "Personal event By " + availability.createdBy;
          } else {
            title = "Booking with " + availability.createdBy;
          }

          if (end[0] - 12 != start[0]) {
            allEvents.push({
              id: availability.id,
              title: title,
              start: new Date(date[0], parseInt(date[1]) - 1, date[2], parseInt(start[0]), start[1], 0),
              end: new Date(date[0], parseInt(date[1]) - 1, date[2], end[0], end[1], 0),
              startHour: start[0],
              endHour: end[0],
              status: availability.status,
              type: type,
              meetUp: availability.meetUp,
              vehicle: availability.vehicleId,
              instructorId: availability.instructorId,
              createdBy: availability.createdBy,
            });
          }
        });
        setBookings(allEvents);
      });
    }
  };

  //Add booking modal handles
  const handleOnSelectSlot = (e) => {
    if (moment(e.start).isAfter(currentDate)) {
      setAddBookingModal(true);
    } else {
      toast.error("Cannot Book after time");
    }
  };

  const handleAddBookingClose = (e) => {
    setAddBookingModal(false);
  };

  //handle Event click
  const handleEventClick = (e) => {
    if (moment(e.start).isAfter(new Date())) {
      if (e.status === "Available" || e.status === "available") {
        let count = parseInt(e.endHour) - parseInt(e.startHour);
        let array = [];
        for (let j = 0; j < count; j++) {
          array.push({
            name: parseInt(e.startHour) + j,
            value: parseInt(e.startHour) + j,
          });
        }
        setSelectedHours(array[0].value);
        setHours(array);
        setSelectedAvailability(e);
        setAddBookingModal(true);
      } else if (e.status !== "Personal" && e.status !== "Unavailable") {
        setSelectedBooking(e);
        setBookingModal(true);
      } else {
        toast.error(t("Cannot select this event"));
      }
    } else {
      toast.error(t("Can not select past event"));
    }
  };

  const handleBookingClose = (e) => {
    setBookingModal(false);
    setAddBookingModal(false);
  };

  const handleBookingDelete = async () => {
    setLoading(true);

    setdisabled(true);

    let start = moment(selectedBooking.start).format("HH:mm");
    let end = moment(selectedBooking.end).format("HH:mm");
    start = start.split(":");
    end = end.split(":");
    start = parseInt(start[0]) + ":" + start[1];
    end = parseInt(end[0]) + ":" + end[1];

    await API(
      "delete",
      `Bookings/DeleteBookingById_Neww?id=${selectedBooking.id}&StartTime=${start}&Endtime=${end}&status=deleted`
    )
      .then((res) => {
        setUpdate(!update);
        handleBookingClose();
        setdisabled(false);
        toast.success(t("Booking Deleted successfully!"));
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setdisabled(false);
      });
  };

  const handleAddBooking = async () => {
    setdisabled(true);
    setLoading(true);

    if (parseInt(selectedAvailability.startHour) + parseInt(duration) > parseInt(selectedAvailability.endHour)) {
      toast.warning(t("Booking time cannot exceed availability end time!"));
      setdisabled(false);
      setLoading(false);
    } else if (
      selectedHours === new Date(selectedAvailability.start).getHours() &&
      selectedMins < new Date(selectedAvailability.start).getMinutes()
    ) {
      toast.warning(t("Booking time cannot less then availability start time!"));
      setdisabled(false);
      setLoading(false);
    } else {
      var startDate = moment(selectedAvailability.start).set("hour", selectedHours).set("minutes", selectedMins);
      var endDate = moment(startDate).add(parseInt(duration), "hours");
      var endHours = selectedHours + parseInt(duration);
      await API("post", `Bookings`, {
        VehicleId: selectedAvailability.vehicle,
        // bookingDate: moment(startDate).add(5, "hours"),
        bookingDate: `${moment(selectedAvailability.start).format("YYYY-MM-DD")}T${
          selectedHours < 10 ? `0${selectedHours}` : selectedHours
        }:${selectedMins}`,
        drivingSchoolId: selectedInstructor.role === "DrivingSchool" ? selectedInstructor.id : "",
        duration: duration,
        endTime: `${moment(endDate).format("YYYY-MM-DD")}T${endHours < 10 ? `0${endHours}` : endHours}:${selectedMins}`,
        instructionId: selectedAvailability.instructorId,
        instructorAbsence: "",
        instructorComments: "",
        instructorComplaintReson: "",
        instructorDelay: "",
        instructorQuestionFifth: selectedAvailability.createdBy,
        meetingPlace: selectedAvailability.meetUp,
        ratingByInstructor: "",
        ratingByStudent: "",
        startTime: moment(startDate).format("HH:mm"),
        status: "In progress",
        studentAbsence: "",
        studentComplaintReson: "",
        studentDelay: "",
        studentId: user.id,
      })
        .then((BookingsResponce) => {
          console.log("BookingsResponce==>>", BookingsResponce);
          setUpdate(!update);
          toast.success(t("Booking Added successfully!"));
          handleBookingClose();
          setdisabled(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setdisabled(false);
          setLoading(false);
        });
    }
  };

  const onNavigate = (date, view) => {
    let start, end;
    if (view === "week") {
      start = moment(date).startOf("week");
      end = moment(date).endOf("week");
      setStartDate(start.format());
      setEndDate(end.format());
      setUpdate(!update);
    }
  };
  const handleProfile = async () => {
    await API("get", `Personal/GetAllById/?id=${selectedBooking.instructorId}`).then(async (PersonalResponse) => {
      let Profile = "";
      console.log("first", PersonalResponse.data.data);

      if (PersonalResponse.data.data.role === "CarRentalAgent" || PersonalResponse.data.data.role === "Instructor") {
        await API("get", `Bookings/GetBookingsByInstructor?id=${PersonalResponse.data.data.id}`).then(
          (GetBookingsByInstructor) => {
            console.log("in");
            let newProfile = PersonalResponse.data.data;
            newProfile["BookingLength"] = GetBookingsByInstructor.data.data.length;
            Profile = newProfile;
          }
        );
      } else if (PersonalResponse.data.data.role === "DrivingSchool" || PersonalResponse.data.data.role === "DSInstructor") {
        await API("get", `Bookings/GetBookingsByDrivingSchool?id=${PersonalResponse.data.data.id}`).then(
          (GetBookingsByDrivingSchool) => {
            console.log("GetBookingsByDrivingSchool", GetBookingsByDrivingSchool);
            let newProfile = PersonalResponse.data.data;
            newProfile["BookingLength"] = GetBookingsByDrivingSchool.data.data.length;
            Profile = newProfile;
          }
        );
      }

      let newnewProfile = await API("get", `FeedBacks/GetAverageRating?id=${Profile.id}`).then((GetAverageRatingResponse) => {
        console.log("Profile", Profile);
        let newProfile = Profile;

        console.log("newProfile", newProfile);
        newProfile["Rating"] = GetAverageRatingResponse.data.data;
        return newProfile;
      });
      setProfileData(newnewProfile);
      setUserModal(true);
      setBookingModal(false);
    });
  };

  const handleProfileModalClose = () => {
    setUserModal(false);
  };
  const handleChatClick = async () => {
    await API("get", `Chat/getorcreatechatroom?userA=${user.id}&userB=${selectedBooking.instructorId}`)
      .then((ChatroomResponse) => {
        console.log("ChatroomResponse", ChatroomResponse);
        localStorage.setItem("ChatroomId", JSON.stringify(ChatroomResponse.data.data.id));
        history.push("/student/chat");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <CalendarComponent
        view={{ week: true, day: true }}
        events={bookings}
        // onSelectSlot={handleOnSelectSlot}
        onSelectEvent={handleEventClick}
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        onNavigate={(e) => {
          onNavigate(e, Views.WEEK);
        }}
        lng={lng}
      />
      {/* View Booking modal */}
      <BasicModal
        open={bookingModal}
        onClose={handleBookingClose}
        closebtn={true}
        modalMainTitle="Booking"
        modalboxclassName="booking-modal"
      >
        <div className="booking-content">
          <Grid container spacing={3}>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField
                className="textFieldFont"
                label="User Info"
                height="10px"
                value={selectedBooking.title}
                disabled={true}
              />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField
                className="textFieldFont"
                label="Booking Date"
                disabled={true}
                value={moment(selectedBooking.start).format("DD-MM-YYYY")}
              />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField
                label="Booking Time"
                className="textFieldFont"
                disabled={true}
                value={
                  selectedInstructor && selectedInstructor.role === "DrivingSchool"
                    ? selectedBooking.bookingTime
                    : selectedBooking.startHour + " - " + selectedBooking.endHour
                }
              />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField
                label="Duration"
                className="textFieldFont"
                disabled={true}
                value={
                  selectedInstructor && selectedInstructor.role === "DrivingSchool"
                    ? selectedBooking.duration
                    : parseInt(selectedBooking.endHour) - parseInt(selectedBooking.startHour)
                }
              />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField
                label="Vechicle"
                className="textFieldFont"
                disabled={true}
                value={
                  selectedInstructor && selectedInstructor.role === "DrivingSchool"
                    ? selectedBooking.vehicleId
                    : selectedBooking.vehicle
                }
              />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField
                label="Meetup"
                className="textFieldFont"
                disabled={true}
                value={
                  selectedInstructor && selectedInstructor.role === "DrivingSchool"
                    ? selectedBooking.meetingPlace
                    : selectedBooking.meetUp
                }
              />
            </Grid>
          </Grid>
          <div className="booking-btn-div">
            <Grid align="right">
              <Tooltip title="Chat">
                <IconButton
                  onClick={handleChatClick}
                  className="Profilicon"
                  sx={{
                    padding: ".1% 0% 0% .1%",
                  }}
                >
                  <Comment className="profilesvg" style={{ padding: "25%" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Profile">
                <IconButton
                  className="Profilicon"
                  sx={{
                    margin: "0 1% 0 1%",
                    padding: ".3% 0% 0% .3%",
                  }}
                >
                  <Profile style={{ padding: "25%" }} onClick={handleProfile} className="profilesvg" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleBookingDelete} className="Profilicon" sx={{ padding: "0.5% 1% 0.5% 1%" }}>
                  <Delete style={{ padding: "18%" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </div>
        </div>
      </BasicModal>
      {/* add booking modal */}
      <BasicModal
        open={AddBookingModal}
        onClose={handleBookingClose}
        closebtn={true}
        modalMainTitle="Add Booking"
        modalboxclassName="booking-modal"
      >
        <Divider width="100% !important" margin="2% 0px 2% 0px" />

        <div className="booking-content">
          <Grid container spacing={3}>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <DropDown
                className="modalClass"
                label="Select Hours"
                placeholder="Select Hours"
                name="Select Hours"
                value={selectedHours}
                MenuItem={hours}
                onChange={(e) => setSelectedHours(e.target.value)}
              ></DropDown>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <DropDown
                label="Select Minutes"
                placeholder="Select Minutes"
                name="Select Minutes"
                value={selectedMins}
                MenuItem={[
                  { name: "00", value: "00" },
                  { name: "30", value: "30" },
                ]}
                onChange={(e) => setSelectedMins(e.target.value)}
              ></DropDown>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField
                label="Booking Date"
                className="textFieldFont"
                value={selectedAvailability && moment(selectedAvailability.start).format("YYYY-MM-DD")}
                disabled={true}
                sx={{ fontSize: "14px" }}
              />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <DropDown
                label="Duration"
                placeholder="Enter duration of booking"
                name="Duration"
                value={duration}
                MenuItem={[
                  { name: "1", value: "1" },
                  { name: "2", value: "2" },
                  { name: "3", value: "3" },
                  { name: "4", value: "4" },
                ]}
                onChange={(e) => setDuration(e.target.value)}
              ></DropDown>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField
                className="textFieldFont"
                label="Vechicle"
                value={selectedAvailability && selectedAvailability.vehicle}
                disabled={true}
              />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField
                className="textFieldFont"
                label="Meetup"
                value={selectedAvailability && selectedAvailability.meetUp}
                disabled={true}
              />
            </Grid>
          </Grid>
          <div className="booking-btn-div">
            <Grid align="right">
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                onClick={(e) => handleAddBooking(e)}
                sx={{
                  color: "#FFFFFF",
                  background: "#149E7A",
                  // width: "120px",
                  height: "55px",
                  marginTop: "10px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
                className="LoadingButton"
              >
                {t("Add Booking")}
              </LoadingButton>
            </Grid>
          </div>
        </div>
      </BasicModal>
      // profile modal
      <BasicModal open={userModal} onClose={handleProfileModalClose} modalboxclassName="profile_modal">
        <div>
          <div className="profile_img_div">
            <img
              src={
                profileData?.photo
                  ? profileData?.photo
                  : profileData?.photo === "null" || "undefined"
                  ? profileData
                  : profileData?.photo
              }
              alt=""
              className="profile_img"
            />
          </div>
          <div className="profile_text_div">
            <p className="profile_text_left">{profileData?.firstName + " " + profileData?.surName}</p>
          </div>
          <div className="profile_text_div">
            <p
              className="profile_text_right"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <LocationOnIcon style={{ marginTop: -5, marginLeft: 10 }} />
              {profileData?.address}
              {profileData?.zip} {profileData?.city}
            </p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{profileData?.contactEmail}</p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{profileData?.gender}</p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{moment(profileData?.dob).format("DD/MM/YYYY")}</p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{profileData?.placeOfBirth}</p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{profileData?.complement} </p>
          </div>
          <div className="icons">
            <div className="profile_icons_div">
              <div className="icon_style_div">
                <img src={Project} alt="" />
              </div>
              <div className="popup_text">
                <p className="icons_text1">{profileData?.BookingLength}</p>
                <p className="icons_text2">{t("Bookings")}</p>
              </div>
            </div>
            <div className="profile_icons_div">
              <div className="icon_style_div">
                <img src={Rating} alt="" />
              </div>
              <div>
                <p className="icons_text1">{profileData?.Rating != "NaN" && profileData?.Rating ? profileData?.Rating : "N/A"}</p>
                <p className="icons_text2">{t("Ratings")}</p>
              </div>
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default Calendar;
