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
const Calendar = () => {
  const currentDate = moment();
  const { i18n, t } = useTranslation();
  const [user, setUser] = useState();
  const [selectedInstructor, setSelectedInstructor] = useState();
  const [drivingSchoolInstructors, setDrivingSchoolInstructors] = useState();
  const [selectedDSInstructor, setSelectedDSInstructor] = useState();
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
        console.log("ress--->>>", res);
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
            title = "Availability By " + availability.createdBy;
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
    } else {
      await API(
        "get",
        `Availability/GetAvailabilitySetForInstructor/?id=${selectedInstructor.id}&stuid=${userData.id}&lat=${userData.lat}&lng=${userData.lng}&radius=30&distancematch=false`
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
        toast.error("Cannot select this event");
      }
    } else {
      toast.error("Can not select past event");
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
        toast.success("Booking Deleted successfully!");
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
      toast.warning("Booking time cannot exceed availability end time!");
      setdisabled(false);
      setLoading(false);
    } else {
      var startDate = moment(selectedAvailability.start).set("hour", selectedHours);

      var endDate = moment(startDate).add(parseInt(duration) + 5, "hours");

      await API("post", `Bookings`, {
        VehicleId: selectedAvailability.vehicle,
        bookingDate: moment(startDate).add(5, "hours"),
        drivingSchoolId: selectedInstructor.role === "DrivingSchool" ? selectedInstructor.id : "",
        duration: duration,
        endTime: endDate,
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
        .then((res) => {
          console.log("res==>>>", res);
          setUpdate(!update);
          toast.success("Booking Added successfully!");
          handleBookingClose();
          setdisabled(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setdisabled(false);
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
              <TextField label="User Info" height="10px" value={selectedBooking.title} disabled={true} />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField label="Booking Date" disabled={true} value={moment(selectedBooking.start).format("DD-MM-YYYY")} />
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
              {/* <Button
                text="Delete"
                textColor="#FFFFFF !important"
                width="110px !important"
                color="#149E7A !important"
                onClick={handleBookingDelete}
                disabled={disabled}
              /> */}
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                onClick={handleBookingDelete}
                sx={{
                  color: "#FFFFFF",
                  background: "#149E7A",
                  width: "120px",
                  height: "55px",
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
                className="LoadingButton"
              >
                {t("Delete")}
              </LoadingButton>
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
                value={selectedAvailability && moment(selectedAvailability.start).format("YYYY-MM-DD")}
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
              <TextField label="Vechicle" value={selectedAvailability && selectedAvailability.vehicle} disabled={true} />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField label="Meetup" value={selectedAvailability && selectedAvailability.meetUp} disabled={true} />
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
                  width: "120px",
                  height: "55px",
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
                className="LoadingButton"
              >
                {t("Add Booking")}
              </LoadingButton>
            </Grid>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default Calendar;
