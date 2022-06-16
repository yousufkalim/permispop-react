import React, { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { Typography, Grid, Tab } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Views } from "react-big-calendar";

import CalendarComponent from "../../../../components/Common/Calendar";
import Events from "./Events";
import BasicModal from "../../../../components/Common/BasicModal";
import Divider from "../../../../components/Common/Divider";
import DropDown from "../../../../components/Common/DropDown";
import DatePicker from "../../../../components/Common/DatePicker";
import TextField from "../../../../components/Common/TextField";
import Button from "../../../../components/Common/Button";
import TimePicker from "../../../../components/Common/TimePicker";
import API from "../../../../api/index";
import { useTranslation } from "react-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import { ReactComponent as Delete } from "../../../../assets/images/BookingDelete.svg";
import { ReactComponent as Profile } from "../../../../assets/images/Profile.svg";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Ratings from "../../../../components/Common/Rating";
import Rating from "../../../../assets/images/path2006.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Project from "../../../../assets/images/form.svg";
import { ReactComponent as Comment } from "../../../../assets/images/ChatIcon.svg";
import { useHistory } from "react-router-dom";
const Calendar = () => {
  const currentDate = moment();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState();
  const [eventDeleteModal, setEventDeleteModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [events, setEvents] = useState([]);
  const [meetupPoints, setmeetupPoints] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [dsInstructors, setDsInstructors] = useState([]);
  const [selectedDsInstructor, setSelectedDsInstructor] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedMeetup, setSelectedMeetup] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartHours, setSelectedStartHours] = useState("");
  const [selectedEndHours, setSelectedEndHours] = useState("");
  const [selectedStartMins, setSelectedStartMins] = useState("");
  const [selectedEndMins, setSelectedEndMins] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState({});
  const [disabled, setdisabled] = useState(false);
  const [value, setValue] = useState("Availability-page");
  const { i18n, t } = useTranslation();
  const [lng, setLng] = useState();
  const [loading, setLoading] = React.useState(false);
  const [allBookingsWithUser, setAllBookingsWithUser] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [profileModal, setProfileModal] = useState(false);
  const [stop, setStop] = useState(false);
  const history = useHistory();

  useEffect(() => {
    onNavigate(new Date(), "week");
    setLng(localStorage.getItem("i18nextLng"));
  }, [localStorage.getItem("i18nextLng")]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    if (startDate != "" || endDate != "") {
      getAvailabilities(userData);
    }
  }, [update]);
  useEffect(() => {
    if (allBookingsWithUser.length > 0) handleProfileUpdated();
  }, [stop]);
  const handleProfileModalClose = () => {
    setProfileModal(false);
  };
  const getAvailabilities = async (userData) => {
    let allBookings = [];
    API(
      "get",
      `Availability/GetAvailabilityPlusBookingsSetForInstructor_New?id=${userData.id}&start=${startDate}&end=${endDate}`
    ).then((response) => {
      let studentRes = response.data.data.bookings.map((booking) => {
        return API("get", `Personal/GetAllById/?id=${booking.studentId}`);
      });
      Promise.all(studentRes).then((res) => {
        response?.data?.data?.bookings?.map((booking) => {
          let userdata = res.find((user) => {
            if (booking.studentId === user?.data?.data?.id) {
              return user;
            } else if (booking.instructionId === user?.data?.data?.id) {
              return user;
            }
          });

          booking["studentData"] = userdata?.data?.data;
          allBookings.push(booking);
        });

        setAllBookingsWithUser(allBookings);

        let allVehicles = [];
        let allAvailabilities = [];
        let allDsi = [];

        response.data.data.vehicleDetailList.map((e) => {
          allVehicles.push({
            name: e.brand + " " + e.model + " (" + e.gearBox + ")",
            value: e.id,
          });
        });

        response.data.data.availabilities.map((availability) => {
          let date = availability.date.split("-");
          let start = availability.startTime.split(":");
          let end = availability.endTime.split(":");
          let type = "";

          if (availability.vehicleId.includes("Auto")) {
            type = "Auto";
          } else if (availability.vehicleId.includes("Manual")) {
            type = "Manual";
          }

          let i = end[0] - start[0];

          if (end[1] === "30") {
            i = i + 1;
          }

          for (let j = 0; j < i; j++) {
            let startMin = 0;
            let endingMins = 0;
            let endingHours = parseInt(start[0]) + j + 1;
            if (j === 0) {
              startMin = start[1];
            }
            if (j + 1 === i) {
              if (end[1] === "30") {
                endingHours = parseInt(start[0]) + j;
              }
              endingMins = end[1];
            }

            allAvailabilities.push({
              id: availability.id,
              title: availability.status + " By " + availability.createdBy,
              start: new Date(date[0], parseInt(date[1]) - 1, date[2], parseInt(start[0]) + j, startMin, 0),
              end: new Date(date[0], parseInt(date[1]) - 1, date[2], endingHours, endingMins, 0),
              status: availability.status,
              type: type,
              meetUp: availability.meetUp,
              vehicleId: availability.vehicleId,
            });
          }
        });

        response.data.data.bookings.map((booking) => {
          let date = booking.bookingDate.split("-");
          let start = booking.startTime.split(":");
          let end = booking.endTime.split(":");

          allAvailabilities.push({
            id: booking.id,
            title: "Booking By " + booking.studentData.firstName + " " + booking.studentData.surName,
            start: new Date(date[0], parseInt(date[1]) - 1, date[2], start[0], start[1], 0),
            end: new Date(date[0], parseInt(date[1]) - 1, date[2], end[0], end[1], 0),

            bookingTime: parseInt(start[0]) + 5 + ":" + start[1] + " - " + (parseInt(end[0]) + 5) + ":" + end[1],
            status: booking.status,
            meetingPlace: booking.meetingPlace,
            duration: booking.duration,
            vehicleId: booking.vehicleId,
          });
        });

        response.data.data.drivingSchoolInstructorList.map((ds) => {
          let newDs = { name: ds.firstName + " " + ds.surName, value: ds };
          allDsi.push(newDs);
        });

        setEvents(allAvailabilities);
        setDsInstructors(allDsi);
        setVehicles(allVehicles);
      });
    });
  };

  const handleOpen = (e) => {
    setSelectedStartHours(moment(e.start).format("HH"));
    setSelectedEndHours(moment(e.end).format("HH"));
    setSelectedStartMins("00");
    setSelectedEndMins("00");

    setSelectedDate(e.start);

    if (moment(e.start).isAfter(currentDate)) {
      setOpen(true);
    } else {
      toast.error(t("can not select past time"));
    }
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  //handle Event click
  const handleEventClick = (e) => {
    setStop(!stop);
    if (e.status === "booking" || e.status === "Booking") {
      setSelectedBooking(e);
      setBookingModal(true);
    } else {
      if (moment(e.start).isAfter(currentDate)) {
        setSelectedEvent(e);
        setEventDeleteModal(true);
      } else {
        toast.error(t("can not select past event"));
      }
    }
  };

  const handleBookingClose = (e) => {
    setBookingModal(false);
  };

  const handleDeleteClose = (e) => {
    setEventDeleteModal(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddAvailability = async () => {
    let startDate = moment(selectedDate).set({
      hour: selectedStartHours,
      minute: selectedStartMins,
      second: 0,
      millisecond: 0,
    });
    let endDate = moment(selectedDate).set({
      hour: selectedEndHours,
      minute: selectedEndMins,
      second: 0,
      millisecond: 0,
    });

    var duration = moment.duration(endDate.diff(startDate));
    var minutes = duration.asMinutes();

    if (moment(startDate).isBefore(moment())) {
      toast.warning(t("Cannot create availability before current time!"));
    } else if (selectedVehicle === "") {
      toast.warning(t("Must select a vehicle to book!"));
    } else if (selectedMeetup === "") {
      toast.warning(t("Must select a meetup point!"));
    } else if (moment(startDate).isSame(endDate)) {
      toast.warning(t("Start and End date cannot be same!"));
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning(t("Start date cannot be after End date!"));
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning(t("Start date cannot be after End date!"));
    } else if (minutes === 30) {
      toast.warning(t("Cannot create a availability for 30 minutes!"));
    } else {
      let vehicleData = vehicles.find((vehicle) => {
        return selectedVehicle === vehicle.value;
      });
      let meetupPointsData = meetupPoints.find((meetupPoint) => {
        return selectedMeetup === meetupPoint.value;
      });
      let end = parseInt(selectedEndHours);
      let start = parseInt(selectedStartHours);
      if (start < 10) {
        start = "0" + start;
      }
      if (end < 10) {
        end = "0" + end;
      }
      setLoading(true);
      await API("post", "Availability", {
        VehicleId: vehicleData.name,
        createdAt: new Date(),
        createdBy: user.firstName + " " + user.surName,
        date: moment(selectedDate).format("YYYY-MM-DD"),
        day: moment(selectedDate).format("ddd"),
        description: "",
        endTime: end + ":" + selectedEndMins,
        instructorId: selectedDsInstructor.id,
        lat: user.lat,
        long: user.long,
        meetUp: meetupPointsData.name,
        meetupId: meetupPointsData.value,
        startTime: start + ":" + selectedStartMins,
        status: "Available",
        drivingSchoolId: user.id,
      })
        .then((res) => {
          toast.success(t("Availabilty Added for date") + " " + `${moment(selectedDate).format("YYYY-DD-MM")}`);

          setUpdate(!update);
          setOpen(false);
          setLoading(false);
        })
        .catch((err) => {
          toast.warning(t(`Availabilty already exists for this time slot!`));
          console.log("err", err);
          setLoading(false);
        });
    }
  };

  const handleAddUnavailability = async () => {
    let startDate = moment(selectedDate).set({
      hour: selectedStartHours,
      minute: selectedStartMins,
      second: 0,
      millisecond: 0,
    });
    let endDate = moment(selectedDate).set({
      hour: selectedEndHours,
      minute: selectedEndMins,
      second: 0,
      millisecond: 0,
    });

    var duration = moment.duration(endDate.diff(startDate));
    var minutes = duration.asMinutes();

    if (description === "") {
      toast.warning(t("Please enter a description!"));
    } else if (moment(startDate).isSame(endDate)) {
      toast.warning(t("Start and End date cannot be same!"));
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning(t("Start date cannot be after End date!"));
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning(t("Start date cannot be after End date!"));
    } else if (minutes === 30) {
      toast.warning(t("Cannot create a availability for 30 minutes!"));
    } else {
      let end = parseInt(selectedEndHours);
      let start = parseInt(selectedStartHours);

      if (start < 10) {
        start = "0" + start;
      }
      if (end < 10) {
        end = "0" + end;
      }
      setLoading(true);
      await API("post", "Availability", {
        VehicleId: "",
        createdAt: new Date(),
        createdBy: user.firstName + " " + user.surName,
        date: moment(selectedDate).format("YYYY-MM-DD"),
        day: moment().format("ddd"),
        description: description,
        endTime: end + ":" + selectedEndMins,
        instructorId: selectedDsInstructor.id,
        lat: user.lat,
        long: user.long,
        meetUp: "",
        meetupId: "",
        startTime: start + ":" + selectedStartMins,
        status: "Unavailable",
        drivingSchoolId: user.Id,
      }).then((res) => {
        toast.success(t("Unavailabilty Added for date") + " " + `${moment(selectedDate).format("YYYY-DD-MM")}`);

        setUpdate(!update);
        setDescription("");
        setOpen(false);
        setLoading(false);
      });
    }
  };

  const handleAddPersonal = async () => {
    let startDate = moment(selectedDate).set({
      hour: selectedStartHours,
      minute: selectedStartMins,
      second: 0,
      millisecond: 0,
    });
    let endDate = moment(selectedDate).set({
      hour: selectedEndHours,
      minute: selectedEndMins,
      second: 0,
      millisecond: 0,
    });

    var duration = moment.duration(endDate.diff(startDate));
    var minutes = duration.asMinutes();

    if (description === "") {
      toast.warning(t("Please enter a description!"));
    } else if (moment(startDate).isSame(endDate)) {
      toast.warning(t("Start and End date cannot be same!"));
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning(t("Start date cannot be after End date!"));
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning(t("Start date cannot be after End date!"));
    } else if (minutes === 30) {
      toast.warning(t("Cannot create a availability for 30 minutes!"));
    } else {
      let end = parseInt(selectedEndHours);
      let start = parseInt(selectedStartHours);

      if (start < 10) {
        start = "0" + start;
      }
      if (end < 10) {
        end = "0" + end;
      }
      setLoading(true);
      await API("post", "Availability", {
        VehicleId: "",
        createdAt: new Date(),
        createdBy: user.firstName + " " + user.surName,
        date: moment(selectedDate).format("YYYY-MM-DD"),
        day: moment().format("ddd"),
        description: description,
        endTime: end + ":" + selectedEndMins,
        instructorId: selectedDsInstructor.id,
        lat: user.lat,
        long: user.long,
        meetUp: "",
        meetupId: "",
        startTime: start + ":" + selectedStartMins,
        status: "Personal",
        drivingSchoolId: user.id,
      }).then((res) => {
        toast.success(t("Personal Event Added for date") + " " + `${moment(selectedDate).format("YYYY-DD-MM")}`);

        setUpdate(!update);
        setDescription("");
        setOpen(false);
        setLoading(false);
      });
    }
  };

  const handleDeleteAvailability = async () => {
    let start = moment(selectedEvent.start).format("HH:mm");
    let end = moment(selectedEvent.end).format("HH:mm");

    start = start.split(":");
    end = end.split(":");

    start = parseInt(start[0]) + ":" + start[1];
    end = parseInt(end[0]) + ":" + end[1];
    setLoading(true);
    await API(
      "delete",
      `Availability/DeleteAvailability_New?AvailabilityId=${selectedEvent.id}&StartTime=${start}&Endtime=${end}&status=deleted`
    )
      .then((res) => {
        setUpdate(!update);
        setEventDeleteModal(false);
        setdisabled(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setdisabled(false);
        setLoading(false);
      });
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

  const handleBookingDelete = async () => {
    setdisabled(true);

    setLoading(true);
    await API(
      "delete",
      `Bookings/DeleteBookingById_Neww?id=${selectedBooking.id}&StartTime=${moment(selectedBooking.start).format(
        "HH:mm"
      )}&Endtime=${moment(selectedBooking.end).format("HH:mm")}&status=deleted`
    )
      .then((res) => {
        setUpdate(!update);
        handleBookingClose();
        setdisabled(false);
      })
      .catch((err) => {
        console.log("err", err);
        setdisabled(false);
        setLoading(false);
      });
  };

  const handleDsiSelect = async (e) => {
    let meetups = [];
    e.instructorMeetupPointInfos.map((meetup) => {
      meetups.push({
        name: meetup.meetUp + " " + meetup.city + " " + meetup.zipCode,
        value: meetup.id,
      });
    });
    setmeetupPoints(meetups);

    setSelectedDsInstructor(e);
  };
  const handleProfile = (e, id) => {
    let selectedBookings = allBookingsWithUser.find((booking) => {
      if (selectedBooking.id === booking.id) {
        return booking;
      }
    });
    setSelectedUserData(selectedBookings.studentData);
    setSelectedBooking(selectedBookings);
    // setProfileData(selectedBooking.studentData);
    setProfileModal(true);
  };
  const handleProfileUpdated = async () => {
    let insdata = allBookingsWithUser.filter((item) => item?.studentData?.profileInfo?.status !== "Deleted");
    let Profile = insdata?.map((item) => {
      if (item.studentData.role === "Student") {
        return API("get", `Bookings/GetBookingsByInstructor?id=${item.studentData.id}`).then((GetBookingsByInstructor) => {
          let newProfile = item;
          newProfile.studentData["BookingLength"] = GetBookingsByInstructor.data.data.length;
          return newProfile;
        });
      }
    });
    Promise.all(Profile).then(async (e) => {
      let newnewProfile = e?.map((pro) => {
        return API("get", `FeedBacks/GetAverageRating?id=${pro?.studentData?.id}`).then((GetAverageRatingResponse) => {
          let newProfile = pro;
          newProfile.studentData["Rating"] = GetAverageRatingResponse?.data?.data;
          return newProfile;
        });
      });
      Promise.all(newnewProfile).then((n) => {
        setAllBookingsWithUser(n);
      });
    });
  };
  const handleChatClick = async () => {
    console.log("userDatauserData", user.id);
    await API("get", `Chat/getorcreatechatroom?userA=${user.id}&userB=${selectedUserData.id}`)
      .then((ChatroomResponse) => {
        console.log("ChatroomResponse", ChatroomResponse);
        localStorage.setItem("ChatroomId", JSON.stringify(ChatroomResponse.data.data.id));
        // history.push("/student/chat");
        history.push(`/DrivingSchool/chat`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <CalendarComponent
        view={{ week: true, day: true }}
        events={events}
        // onSelectSlot={handleOpen}
        role={user ? user.role : ""}
        onSelectEvent={handleEventClick}
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        onNavigate={(e) => {
          onNavigate(e, Views.WEEK);
        }}
        lng={lng}
        onAddClick={handleOpen}
      />
      {/* Add availibility modal */}

      <BasicModal
        open={open}
        closebtn={true}
        onClose={handleClose}
        modalMainTitle={t("Add Event")}
        // modalTitle="Add Event"
        modalTitleProps={{ align: "left" }}
        modalboxclassName="availability-modal"
      >
        <Divider width="100% !important" margin="2% 0px 2% 0px" />

        <TabContext value={value}>
          <TabList onChange={handleChange} className="tab-list">
            <Tab className="tab" label={t("Add Availability")} value="Availability-page" />
            <Divider orientation="vertical" flexItem width="4px !important" />
            <Tab label={t("Add Unavailability")} value="Unavailability-page" className="tab" />
            <Divider orientation="vertical" flexItem width="4px !important" />

            <Tab className="tab" label={t("Add Personal Event")} value="PersonalEvent-page" />
          </TabList>
          {/* page 1 */}
          <div className="modal-content">
            <TabPanel value="Availability-page">
              <form>
                <Grid container spacing={3}>
                  <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <DatePicker
                      label="Date"
                      name="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(moment(e))}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                    ></DatePicker>
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
                      label={t("Select Instructor")}
                      placeholder={t("Select Instructor")}
                      name="dsInstructors"
                      value={selectedDsInstructor}
                      MenuItem={dsInstructors}
                      onChange={(e) => handleDsiSelect(e.target.value)}
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
                      label="Start Hours"
                      placeholder="Start Hours"
                      name="selectedStartHours"
                      value={selectedStartHours}
                      MenuItem={[
                        { name: "06", value: "06" },
                        { name: "07", value: "07" },
                        { name: "08", value: "08" },
                        { name: "09", value: "09" },
                        { name: "10", value: "10" },
                        { name: "11", value: "11" },
                        { name: "12", value: "12" },
                        { name: "13", value: "13" },
                        { name: "14", value: "14" },
                        { name: "15", value: "15" },
                        { name: "16", value: "16" },
                        { name: "17", value: "17" },
                        { name: "18", value: "18" },
                        { name: "19", value: "19" },
                        { name: "20", value: "20" },
                        { name: "21", value: "21" },
                        { name: "22", value: "22" },
                      ]}
                      onChange={(e) => setSelectedStartHours(e.target.value)}
                    ></DropDown>
                    {/* <TimePicker
                      label={t("Start Hours")}
                      value={selectedStartHours}
                      name="startHours"
                      onChange={(e) => setSelectedStartHours(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["hours"]}
                    /> */}
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
                      label={t("Start Minutes")}
                      placeholder={t("Start Minutes")}
                      name="selectedStartMins"
                      value={selectedStartMins}
                      MenuItem={[
                        { name: "00", value: "00" },
                        { name: "30", value: "30" },
                      ]}
                      onChange={(e) => setSelectedStartMins(e.target.value)}
                    ></DropDown>

                    {/* <TimePicker
                      label={t("Start Minutes")}
                      value={selectedStartMins}
                      name="startMinutes"
                      onChange={(e) => setSelectedStartMins(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["minutes"]}
                    /> */}
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
                      label={t("End Hours")}
                      placeholder={t("End Hours")}
                      name="selectedEndHours"
                      value={selectedEndHours}
                      MenuItem={[
                        { name: "06", value: "06" },
                        { name: "07", value: "07" },
                        { name: "08", value: "08" },
                        { name: "09", value: "09" },
                        { name: "10", value: "10" },
                        { name: "11", value: "11" },
                        { name: "12", value: "12" },
                        { name: "13", value: "13" },
                        { name: "14", value: "14" },
                        { name: "15", value: "15" },
                        { name: "16", value: "16" },
                        { name: "17", value: "17" },
                        { name: "18", value: "18" },
                        { name: "19", value: "19" },
                        { name: "20", value: "20" },
                        { name: "21", value: "21" },
                        { name: "22", value: "22" },
                      ]}
                      onChange={(e) => setSelectedEndHours(e.target.value)}
                    ></DropDown>

                    {/* <TimePicker
                      label={t("End Hours")}
                      value={selectedEndHours}
                      name="EndHours"
                      onChange={(e) => setSelectedEndHours(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["hours"]}
                    /> */}
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
                      label={t("End Minutes")}
                      placeholder={t("End Minutes")}
                      name="selectedEndMins"
                      value={selectedEndMins}
                      MenuItem={[
                        { name: "00", value: "00" },
                        { name: "30", value: "30" },
                      ]}
                      onChange={(e) => setSelectedEndMins(e.target.value)}
                    ></DropDown>
                    {/* <TimePicker
                      label={t("End Minutes")}
                      value={selectedEndMins}
                      name="EndMinutes"
                      onChange={(e) => setSelectedEndMins(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["minutes"]}
                    /> */}
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
                      label={t("Select Vehicle")}
                      placeholder="vehicle"
                      name="selectedVehicle"
                      value={selectedVehicle}
                      MenuItem={vehicles}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
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
                      label={t("Meetup")}
                      placeholder={t("Meetup")}
                      name="Meetup"
                      value={selectedMeetup}
                      MenuItem={meetupPoints}
                      onChange={(e) => setSelectedMeetup(e.target.value)}
                    ></DropDown>
                  </Grid>
                </Grid>
                {/* page 2 */}
                <Grid align="right">
                  <Button
                    text={t("Cancel")}
                    onClick={handleClose}
                    variant="outlined"
                    borderRadius="7px"
                    borderColor="#363557"
                    width="15%"
                    textColor="#363557"
                    margin=" 10px 10px 0 0"
                    color="white"
                  />

                  <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    onClick={handleAddAvailability}
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
                    {t("Confirm")}
                  </LoadingButton>
                </Grid>
              </form>
            </TabPanel>
            {/* page 3 */}
            <TabPanel value="Unavailability-page">
              <form>
                <Grid container spacing={1}>
                  <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <DatePicker
                      label="Date"
                      disabled={true}
                      name="date"
                      value={selectedDate}
                      // onChange={(e) =>
                      //   setSelectedData(moment(e))
                      // }
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                    ></DatePicker>
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
                      label={t("Select Instructor")}
                      placeholder={t("Select Instructor")}
                      name="dsInstructors"
                      value={selectedDsInstructor}
                      MenuItem={dsInstructors}
                      onChange={(e) => handleDsiSelect(e.target.value)}
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
                      label={t("Start Hours")}
                      placeholder={t("Start Hours")}
                      name="selectedStartHours"
                      value={selectedStartHours}
                      MenuItem={[
                        { name: "06", value: "06" },
                        { name: "07", value: "07" },
                        { name: "08", value: "08" },
                        { name: "09", value: "09" },
                        { name: "10", value: "10" },
                        { name: "11", value: "11" },
                        { name: "12", value: "12" },
                        { name: "13", value: "13" },
                        { name: "14", value: "14" },
                        { name: "15", value: "15" },
                        { name: "16", value: "16" },
                        { name: "17", value: "17" },
                        { name: "18", value: "18" },
                        { name: "19", value: "19" },
                        { name: "20", value: "20" },
                        { name: "21", value: "21" },
                        { name: "22", value: "22" },
                      ]}
                      onChange={(e) => setSelectedStartHours(e.target.value)}
                    ></DropDown>
                    {/* <TimePicker
                      label={t("Start Hours")}
                      value={selectedStartHours}
                      name="startHours"
                      onChange={(e) => setSelectedStartHours(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["hours"]}
                    /> */}
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
                      label={t("Start Minutes")}
                      placeholder={t("Start Minutes")}
                      name="selectedStartMins"
                      value={selectedStartMins}
                      MenuItem={[
                        { name: "00", value: "00" },
                        { name: "30", value: "30" },
                      ]}
                      onChange={(e) => setSelectedStartMins(e.target.value)}
                    ></DropDown>

                    {/* <TimePicker
                      label={t("Start Minutes")}
                      value={selectedStartMins}
                      name="startMinutes"
                      onChange={(e) => setSelectedStartMins(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["minutes"]}
                    /> */}
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
                      label={t("End Hours")}
                      placeholder={t("End Hours")}
                      name="selectedEndHours"
                      value={selectedEndHours}
                      MenuItem={[
                        { name: "06", value: "06" },
                        { name: "07", value: "07" },
                        { name: "08", value: "08" },
                        { name: "09", value: "09" },
                        { name: "10", value: "10" },
                        { name: "11", value: "11" },
                        { name: "12", value: "12" },
                        { name: "13", value: "13" },
                        { name: "14", value: "14" },
                        { name: "15", value: "15" },
                        { name: "16", value: "16" },
                        { name: "17", value: "17" },
                        { name: "18", value: "18" },
                        { name: "19", value: "19" },
                        { name: "20", value: "20" },
                        { name: "21", value: "21" },
                        { name: "22", value: "22" },
                      ]}
                      onChange={(e) => setSelectedEndHours(e.target.value)}
                    ></DropDown>

                    {/* <TimePicker
                      label={t("End Hours")}
                      value={selectedEndHours}
                      name="EndHours"
                      onChange={(e) => setSelectedEndHours(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["hours"]}
                    /> */}
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
                      label={t("End Minutes")}
                      placeholder={t("End Minutes")}
                      name="selectedEndMins"
                      value={selectedEndMins}
                      MenuItem={[
                        { name: "00", value: "00" },
                        { name: "30", value: "30" },
                      ]}
                      onChange={(e) => setSelectedEndMins(e.target.value)}
                    ></DropDown>
                    {/* <TimePicker
                      label={t("End Minutes")}
                      value={selectedEndMins}
                      name="EndMinutes"
                      onChange={(e) => setSelectedEndMins(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["minutes"]}
                    /> */}
                  </Grid>
                  <Grid xs={12} sm={12} md={12}>
                    <TextField
                      label={t("Description")}
                      placeholder={t("Description")}
                      name="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid align="right" style={{ marginTop: "15px" }}>
                  <Button
                    text={t("Cancel")}
                    onClick={handleClose}
                    variant="outlined"
                    borderRadius="7px"
                    borderColor="#363557"
                    width="15%"
                    textColor="#363557"
                    margin=" 10px 10px 0 0"
                    color="white"
                  />
                  <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    onClick={handleAddUnavailability}
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
                    {t("Confirm")}
                  </LoadingButton>
                </Grid>
              </form>
            </TabPanel>

            <TabPanel value="PersonalEvent-page">
              <form>
                <Grid container spacing={3}>
                  <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <DatePicker
                      label="Date"
                      disabled={true}
                      name="date"
                      value={selectedDate}
                      // onChange={(e) =>
                      //   setSelectedData(moment(e))
                      // }
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                    ></DatePicker>
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
                      label={t("Select Instructor")}
                      placeholder={t("Select Instructor")}
                      name="dsInstructors"
                      value={selectedDsInstructor}
                      MenuItem={dsInstructors}
                      onChange={(e) => handleDsiSelect(e.target.value)}
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
                      label={t("Start Hours")}
                      placeholder={t("Start Hours")}
                      name="selectedStartHours"
                      value={selectedStartHours}
                      MenuItem={[
                        { name: "06", value: "06" },
                        { name: "07", value: "07" },
                        { name: "08", value: "08" },
                        { name: "09", value: "09" },
                        { name: "10", value: "10" },
                        { name: "11", value: "11" },
                        { name: "12", value: "12" },
                        { name: "13", value: "13" },
                        { name: "14", value: "14" },
                        { name: "15", value: "15" },
                        { name: "16", value: "16" },
                        { name: "17", value: "17" },
                        { name: "18", value: "18" },
                        { name: "19", value: "19" },
                        { name: "20", value: "20" },
                        { name: "21", value: "21" },
                        { name: "22", value: "22" },
                      ]}
                      onChange={(e) => setSelectedStartHours(e.target.value)}
                    ></DropDown>
                    {/* <TimePicker
                      label={t("Start Hours")}
                      value={selectedStartHours}
                      name="startHours"
                      onChange={(e) => setSelectedStartHours(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["hours"]}
                    /> */}
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
                      label={t("Start Minutes")}
                      placeholder={t("Start Minutes")}
                      name="selectedStartMins"
                      value={selectedStartMins}
                      MenuItem={[
                        { name: "00", value: "00" },
                        { name: "30", value: "30" },
                      ]}
                      onChange={(e) => setSelectedStartMins(e.target.value)}
                    ></DropDown>

                    {/* <TimePicker
                      label={t("Start Minutes")}
                      value={selectedStartMins}
                      name="startMinutes"
                      onChange={(e) => setSelectedStartMins(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["minutes"]}
                    /> */}
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
                      label={t("End Hours")}
                      placeholder={t("End Hours")}
                      name="selectedEndHours"
                      value={selectedEndHours}
                      MenuItem={[
                        { name: "06", value: "06" },
                        { name: "07", value: "07" },
                        { name: "08", value: "08" },
                        { name: "09", value: "09" },
                        { name: "10", value: "10" },
                        { name: "11", value: "11" },
                        { name: "12", value: "12" },
                        { name: "13", value: "13" },
                        { name: "14", value: "14" },
                        { name: "15", value: "15" },
                        { name: "16", value: "16" },
                        { name: "17", value: "17" },
                        { name: "18", value: "18" },
                        { name: "19", value: "19" },
                        { name: "20", value: "20" },
                        { name: "21", value: "21" },
                        { name: "22", value: "22" },
                      ]}
                      onChange={(e) => setSelectedEndHours(e.target.value)}
                    ></DropDown>

                    {/* <TimePicker
                      label={t("End Hours")}
                      value={selectedEndHours}
                      name="EndHours"
                      onChange={(e) => setSelectedEndHours(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["hours"]}
                    /> */}
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
                      label={t("End Minutes")}
                      placeholder={t("End Minutes")}
                      name="selectedEndMins"
                      value={selectedEndMins}
                      MenuItem={[
                        { name: "00", value: "00" },
                        { name: "30", value: "30" },
                      ]}
                      onChange={(e) => setSelectedEndMins(e.target.value)}
                    ></DropDown>
                    {/* <TimePicker
                      label={t("End Minutes")}
                      value={selectedEndMins}
                      name="EndMinutes"
                      onChange={(e) => setSelectedEndMins(e)}
                      padding="20px 0 0 0px !important"
                      width="100% !important"
                      views={["minutes"]}
                    /> */}
                  </Grid>
                  <Grid xs={12} sm={12} md={12}>
                    <TextField
                      label={t("Description")}
                      placeholder={t("Description")}
                      name="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid align="right">
                  <Button
                    text={t("Cancel")}
                    onClick={handleClose}
                    variant="outlined"
                    borderRadius="7px"
                    borderColor="#363557"
                    width="15%"
                    textColor="#363557"
                    margin=" 10px 10px 0 0"
                    color="white"
                  />
                  <Button
                    text={t("Confirm")}
                    onClick={handleAddPersonal}
                    borderRadius="7px"
                    borderColor="#363557"
                    textColor="#FFFFFF"
                    width="15%"
                    color="#149E7A !important"
                    margin=" 10px 10px 0 0"
                  />
                </Grid>
              </form>
            </TabPanel>
          </div>
        </TabContext>
      </BasicModal>
      {/* Delete availibility modal */}
      <BasicModal
        open={eventDeleteModal}
        onClose={handleDeleteClose}
        closebtn={true}
        modalMainTitle={t("Delete Availability")}
        // modalTitle="Delete Availability"
        // modalTitleProps={{ align: "left" }}
        modalboxclassName="delete-availability"
      >
        <Divider />
        <Typography gutterBottom className="delete-availability-text">
          <InfoOutlinedIcon className="info-icon" />
          {t("Would like to delete your availability?")}
        </Typography>
        <Grid align="right" className="">
          <Button
            text={t("No")}
            onClick={handleDeleteClose}
            variant="outlined"
            borderRadius="7px"
            borderColor="#363557"
            width="18%"
            textColor="#363557"
            margin=" 10px 10px 0 0"
            color="white"
            height="3rem"
          />

          <LoadingButton
            loading={loading}
            loadingPosition="start"
            onClick={(e) => handleDeleteAvailability(e)}
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
            {t("Yes")}
          </LoadingButton>
        </Grid>
      </BasicModal>
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
              <TextField label={t("User Info")} height="10px" value={selectedBooking.title} disabled={true} />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField label={t("Booking Date")} disabled={true} value={moment(selectedBooking.start).format("DD-MM-YYYY")} />
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
                label={t("Booking Time")}
                disabled={true}
                value={moment(selectedBooking.start).format("HH:mm") + " - " + moment(selectedBooking.end).format("HH:mm")}
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
                label={t("Duration")}
                disabled={true}
                value={parseInt(moment(selectedBooking.end).format("HH")) - parseInt(moment(selectedBooking.start).format("HH"))}
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
              <TextField label={t("Vechicle")} disabled={true} value={selectedBooking.vehicleId} />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={6}
              style={{
                padding: "10px",
              }}
            >
              <TextField label={t("Meetup")} disabled={true} value={selectedBooking.meetUp} />
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
                  // className={props.isSelected == row.id ? "selectedProfile" : "Profilicon"}
                  onClick={handleProfile}
                  className="Profilicon"
                  sx={{
                    margin: "0 1% 0 1%",
                    padding: ".3% 0% 0% .3%",
                  }}
                >
                  <Profile
                    style={{ padding: "25%" }}
                    // className={props.isSelected == row.id ? "SelectedIcon" : "profilesvg"}
                    className="profilesvg"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleBookingDelete} className="Profilicon" sx={{ padding: "0.5% 1% 0.5% 1%" }}>
                  <Delete className="" style={{ padding: "18%" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </div>
        </div>
      </BasicModal>
      <BasicModal open={profileModal} onClose={handleProfileModalClose} modalboxclassName="profile_modal">
        <div>
          <div className="profile_img_div">
            <img
              src={
                selectedUserData?.photo
                  ? selectedUserData?.photo
                  : selectedUserData.photo === "null" || "undefined"
                  ? selectedUserData
                  : selectedUserData.photo
              }
              alt=""
              className="profile_img"
            />
          </div>
          <div className="profile_text_div">
            <p className="profile_text_left">{selectedUserData?.firstName + " " + selectedUserData?.surName}</p>
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
              {selectedUserData?.address}
              {selectedUserData?.zip} {selectedUserData?.city}
            </p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{selectedUserData?.contactEmail}</p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{selectedUserData?.gender}</p>
          </div>

          <div className="profile_text_div">
            <p className="profile_text_right">{moment(selectedUserData?.dob).format("DD/MM/YYYY")}</p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{selectedUserData?.placeOfBirth}</p>
          </div>
          <div className="profile_text_div">
            <p className="profile_text_right">{selectedUserData?.complement} </p>
          </div>

          <div className="icons">
            <div className="profile_icons_div">
              <div className="icon_style_div">
                <img src={Project} alt="" />
              </div>
              <div className="popup_text">
                <p className="icons_text1">{selectedUserData?.BookingLength}</p>
                <p className="icons_text2">{t("Bookings")}</p>
              </div>
            </div>
            <div className="profile_icons_div">
              <div className="icon_style_div">
                <img src={Rating} alt="" />
              </div>
              <div>
                <p className="icons_text1">
                  {selectedUserData?.Rating != "NaN" && selectedUserData?.Rating ? selectedUserData?.Rating : "N/A"}
                </p>
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
