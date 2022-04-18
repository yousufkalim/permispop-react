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
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedMeetup, setSelectedMeetup] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartHours, setSelectedStartHours] = useState("");
  const [selectedEndHours, setSelectedEndHours] = useState("");
  const [selectedStartMins, setSelectedStartMins] = useState("");
  const [selectedEndMins, setSelectedEndMins] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedBooking, setSelectedBooking] = useState({});
  const [disabled, setdisabled] = useState(false);
  const [value, setValue] = useState("Availability-page");
  const { i18n, t } = useTranslation();

  useEffect(() => {
    onNavigate(new Date(), "week");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    getAvailabilities(userData);
  }, [update]);

  const getAvailabilities = async (userData) => {
    API(
      "get",
      `Availability/GetAvailabilityPlusBookingsSetForInstructor_New?id=${userData.id}&start=${startDate}&end=${endDate}`
    ).then((response) => {
      let meetups = [];
      let allVehicles = [];
      let allAvailabilities = [];

      response.data.data.instructorMeetupPointList.map((meetup) => {
        meetups.push({
          name: meetup.meetUp + " " + meetup.city + " " + meetup.zipCode,
          value: meetup.id,
        });
      });

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
            title: "Availability By " + availability.createdBy,
            start: new Date(date[0], parseInt(date[1]) - 1, date[2], parseInt(start[0]) + j, startMin, 0),
            end: new Date(date[0], parseInt(date[1]) - 1, date[2], endingHours, endingMins, 0),
            status: availability.status,
            type: type,
          });
        }
      });

      response.data.data.bookings.map((booking) => {
        let date = booking.bookingDate.split("-");
        let start = booking.startTime.split(":");
        let end = booking.endTime.split(":");

        allAvailabilities.push({
          id: booking.id,
          title: "Booking By " + booking.instructorQuestionFifth,
          start: new Date(date[0], parseInt(date[1]) - 1, date[2], start[0], start[1], 0),
          end: new Date(date[0], parseInt(date[1]) - 1, date[2], end[0], end[1], 0),
          bookingTime: booking.startTime + " - " + booking.endTime,
          status: booking.status,
          meetingPlace: booking.meetingPlace,
          duration: booking.duration,
          vehicleId: booking.vehicleId,
        });
      });

      setEvents(allAvailabilities);
      setmeetupPoints(meetups);
      setVehicles(allVehicles);
    });
  };

  const handleOpen = (e) => {
    setSelectedStartHours(moment(e.start).format("HH"));
    setSelectedEndHours(moment(e.end).format("HH"));
    setSelectedStartMins(moment(e.start).format("mm"));
    setSelectedEndMins(moment(e.end).format("mm"));

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

    if (selectedVehicle === "") {
      toast.warning("Must select a vehicle to book!");
    } else if (selectedMeetup === "") {
      toast.warning("Must select a meetup point!");
    } else if (moment(startDate).isSame(endDate)) {
      toast.warning("Start and End date cannot be same!");
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning("Start date cannot be after End date!");
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning("Start date cannot be after End date!");
    } else if (minutes === 30) {
      toast.warning("Cannot create a availability for 30 minutes!");
    } else {
      let vehicleData = vehicles.find((vehicle) => {
        return selectedVehicle === vehicle.value;
      });

      let meetupPointsData = meetupPoints.find((meetupPoint) => {
        return selectedMeetup === meetupPoint.value;
      });

      await API("post", "Availability", {
        VehicleId: vehicleData.name,
        createdAt: new Date(),
        createdBy: user.firstName + " " + user.surName,
        date: moment(selectedDate).format("YYYY-MM-DD"),
        day: moment(selectedDate).format("ddd"),
        description: "",
        endTime: selectedEndHours + ":" + selectedEndMins,
        instructorId: user.id,
        lat: user.lat,
        long: user.long,
        meetUp: meetupPointsData.name,
        meetupId: meetupPointsData.value,
        startTime: selectedStartHours + ":" + selectedStartMins,
        status: "Available",
      })
        .then((res) => {
          toast.success(`Availabilty Added for date ${moment(selectedDate).format("YYYY-DD-MM")}`);
          setUpdate(!update);
          setOpen(false);
        })
        .catch((err) => {
          toast.warning(`Availabilty already exists for this time slot!`);
          console.log("err", err);
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
      toast.warning("Please enter a description!");
    } else if (moment(startDate).isSame(endDate)) {
      toast.warning("Start and End date cannot be same!");
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning("Start date cannot be after End date!");
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning("Start date cannot be after End date!");
    } else if (minutes === 30) {
      toast.warning("Cannot create a availability for 30 minutes!");
    } else {
      await API("post", "Availability", {
        VehicleId: "",
        createdAt: new Date(),
        createdBy: user.firstName + " " + user.surName,
        date: moment(selectedDate).format("YYYY-DD-MM"),
        day: moment().format("ddd"),
        description: description,
        endTime: selectedEndHours + ":" + selectedEndMins,
        instructorId: user.id,
        lat: user.lat,
        long: user.long,
        meetUp: "",
        meetupId: "",
        startTime: selectedStartHours + ":" + selectedStartMins,
        status: "Unavailable",
      }).then((res) => {
        toast.success(`Unavailabilty Added for date ${moment(selectedDate).format("YYYY-DD-MM")}`);
        setUpdate(!update);
        setDescription("");
        setOpen(false);
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
      toast.warning("Please enter a description!");
    } else if (moment(startDate).isSame(endDate)) {
      toast.warning("Start and End date cannot be same!");
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning("Start date cannot be after End date!");
    } else if (moment(startDate).isAfter(endDate)) {
      toast.warning("Start date cannot be after End date!");
    } else if (minutes === 30) {
      toast.warning("Cannot create a availability for 30 minutes!");
    } else {
      await API("post", "Availability", {
        VehicleId: "",
        createdAt: new Date(),
        createdBy: user.firstName + " " + user.surName,
        date: moment(selectedDate).format("YYYY-DD-MM"),
        day: moment().format("ddd"),
        description: description,
        endTime: selectedEndHours + ":" + selectedEndMins,
        instructorId: user.id,
        lat: user.lat,
        long: user.long,
        meetUp: "",
        meetupId: "",
        startTime: selectedStartHours + ":" + selectedStartMins,
        status: "Personal",
      }).then((res) => {
        toast.success(`Personal Event Added for date ${moment(selectedDate).format("YYYY-DD-MM")}`);
        setUpdate(!update);
        setDescription("");
        setOpen(false);
      });
    }
  };

  const handleDeleteAvailability = async () => {
    await API(
      "delete",
      `Availability/DeleteAvailability_New?AvailabilityId=${selectedEvent.id}&StartTime=${moment(selectedEvent.start).format(
        "HH:mm"
      )}&Endtime=${moment(selectedEvent.end).format("HH:mm")}&status=deleted`
    )
      .then((res) => {
        setUpdate(!update);
        setEventDeleteModal(false);
        setdisabled(false);
      })
      .catch((err) => {
        console.log("err", err);
        setdisabled(false);
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
      });
  };

  return (
    <>
      <CalendarComponent
        view={{ week: true, day: true }}
        events={events}
        onSelectSlot={handleOpen}
        onSelectEvent={handleEventClick}
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        onNavigate={(e) => {
          onNavigate(e, Views.WEEK);
        }}
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
        <Divider width="100% !important" />

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
                    md={12}
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
                    <DropDown
                      label={t("Select Vehicle")}
                      placeholder="vehicle"
                      name="selectedVehicle"
                      value={selectedVehicle}
                      MenuItem={vehicles}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                    ></DropDown>
                  </Grid>
                  <Grid xs={12} sm={12} md={6}>
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
                    width="110px !important"
                    textColor="#363557 !important"
                    margin="10px !important"
                  />
                  <Button
                    text={t("Confirm")}
                    type="submit"
                    textColor="#FFFFFF !important"
                    width="110px !important"
                    color="#149E7A !important"
                    onClick={handleAddAvailability}
                  />
                </Grid>
              </form>
            </TabPanel>
            {/* page 3 */}
            <TabPanel value="Unavailability-page">
              <form>
                <Grid container spacing={3}>
                  <Grid
                    xs={12}
                    sm={12}
                    md={12}
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
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
                    width="110px !important"
                    textColor="#363557 !important"
                    margin="10px !important"
                  />
                  <Button
                    text={t("Confirm")}
                    type="submit"
                    textColor="#FFFFFF !important"
                    width="110px !important"
                    color="#149E7A !important"
                    onClick={handleAddUnavailability}
                  />
                </Grid>
              </form>
            </TabPanel>

            <TabPanel value="PersonalEvent-page">
              <form>
                <Grid container spacing={3}>
                  <Grid
                    xs={12}
                    sm={12}
                    md={12}
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
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
                  <Grid xs={12} sm={12} md={6}>
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
                    width="110px !important"
                    textColor="#363557 !important"
                    margin="10px !important"
                  />
                  <Button
                    text={t("Confirm")}
                    type="submit"
                    textColor="#FFFFFF !important"
                    width="110px !important"
                    color="#149E7A !important"
                    onClick={handleAddPersonal}
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
            width="110px !important"
            textColor="#363557 !important"
            margin="10px !important"
          />
          <Button
            text={t("Yes")}
            type="submit"
            textColor="#FFFFFF !important"
            width="110px !important"
            color="#149E7A !important"
            onClick={(e) => handleDeleteAvailability(e)}
          />
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
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("User Info")} height="10px" value={selectedBooking.title} disabled={true} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Booking Date")} disabled={true} value={moment(selectedBooking.start).format("DD-MM-YYYY")} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Booking Time")} disabled={true} value={selectedBooking.bookingTime} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Duration")} disabled={true} value={selectedBooking.duration} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Vechicle")} disabled={true} value={selectedBooking.vehicleId} />
            </Grid>
            <Grid xs={12} sm={12} md={6}>
              <TextField label={t("Meetup")} disabled={true} value={selectedBooking.meetingPlace} />
            </Grid>
          </Grid>
          <div className="booking-btn-div">
            <Grid align="right">
              <Button
                text={t("Close")}
                onClick={handleBookingClose}
                variant="outlined"
                width="110px !important"
                textColor="#363557 !important"
                margin="10px !important"
                disabled={disabled}
              />
              <Button
                text={t("Delete")}
                type="submit"
                textColor="#FFFFFF !important"
                width="110px !important"
                color="#149E7A !important"
                onClick={handleBookingDelete}
                disabled={disabled}
              />
            </Grid>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default Calendar;
